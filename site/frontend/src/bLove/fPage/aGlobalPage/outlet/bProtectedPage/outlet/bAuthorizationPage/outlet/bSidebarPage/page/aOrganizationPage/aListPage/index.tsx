import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import fullRoute from "@/bLove/gRoute/bFullRoute";
import { useDispatch, useSelector } from "react-redux";

import organizationAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/dOrganizationAPIEndpoints";
import apiResponseHandler from "./extras/aAPIResponseHandler";

import LoaderComponent from "@/bLove/cComponent/aGlobalComponent/component/aLoaderComponent";
import ErrorComponent from "@/bLove/cComponent/aGlobalComponent/component/bErrorComponent";
import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import CompanyCard from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/outlet/bSidebarComponent/children/aOrganiztionComponent/aListComponent/component/CompanyCardComponent";
import PlusSign from "@/bLove/hAsset/icon/plus-circle.png";
import { RefreshCwIcon } from "lucide-react";
import { ButtonLink, Container, Form, Image, Input, MainContainer, PageHeading, Para, SearchButton } from "./style";


const OrganizationListPage = () => {
  // State Variable
  const [searchInput, setSearchInput] = useState("")

  // Redux Call
  const ReduxCall = {
    state: useSelector((fullState: RootState) => fullState.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }

  // API Call
  const APICall = {
    listAPIResponse: organizationAPIEndpoint.useOrganizationListAPIQuery(null),
  }

  // All Render
  // Success Render
  useEffect(() => {
    apiResponseHandler.listAPIResponseHandler(APICall.listAPIResponse)
  }, [APICall.listAPIResponse])
  
  // JSX
  return (
    <React.Fragment>
      {/* OrganizationListPage */}

      <TopNavBarComponent />
      <MainContainer>
        <br />
        <PageHeading>Your Organization</PageHeading>
        <br />
        <Form>
          <Input
            type="text"
            placeholder="Search Your Organizations by Name"
            name="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <SearchButton type="button" onClick={() => APICall.listAPIResponse.refetch()} >
            <RefreshCwIcon style={{ width: "20px", height: "20px", marginRight: "10px" }}  />
            <Para>Refresh</Para>
          </SearchButton>
          <ButtonLink to={fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.aOrganizationRoute.bCreateRoute}>
            <Image src={PlusSign} alt="PlusSign" />
            <Para>Add</Para>
          </ButtonLink>
        </Form>
        
        <Container>
          {(APICall.listAPIResponse.isLoading || APICall.listAPIResponse.isLoading) ? null : 
            APICall.listAPIResponse.isError ? null :
              APICall.listAPIResponse.isSuccess ? (
                APICall.listAPIResponse.data.success ? (
                  APICall.listAPIResponse.data.list.length > 0 ? (
                    <React.Fragment>
                      {
                        APICall.listAPIResponse.data.list?.
                          filter((each: any) => each.bCreatedBy?._id === (ReduxCall.state.receivedObject as any)?.ProfileRetrieve?._id).
                          filter((each: any) => each.dName?.toLowerCase().includes(searchInput?.toLowerCase())).
                          map((each: any, index: any) => (
                          <CompanyCard 
                            key={index}
                            id={each._id}
                            companyName={each.dName}
                            firmType={each.dType}
                            contactInfo={{
                              id: each._id,
                              phone: each.dPhoneNumber,
                              email: each.dCompanyEmail,
                            }}
                            address={each.dAddress}
                          />
                        ))
                      }
                    </React.Fragment>
                  ) : []
                ) : []
              ) : []
          }
        </Container>

        {APICall.listAPIResponse.isLoading && <LoaderComponent />} 
        {APICall.listAPIResponse.isFetching && <LoaderComponent />} 
        {APICall.listAPIResponse.isError && <ErrorComponent message="Error..." />}

      </MainContainer>

    </React.Fragment>
  )
}

export default OrganizationListPage;
