import React, { useEffect } from "react"
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import fullRoute from "@/bLove/gRoute/bFullRoute";

import organizationAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/dOrganizationAPIEndpoints";
import apiResponseHandler from "./extras/aAPIResponseHandler";

import { ButtonLink, Container, Form, Image, Input, MainContainer, PageHeading, Para, SearchButton } from "./style"
import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import Filter from "@/bLove/hAsset/icon/filter.png";
import PlusSign from "@/bLove/hAsset/icon/plus-circle.png";
import CompanyCard from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/outlet/bSidebarComponent/children/aOrganiztionComponent/aListComponent/component/CompanyCardComponent";


const OrganizationListPage = () => {
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
            placeholder="Search Your Organizations"
            name="search"
            // value={searchInput}
            // onChange={handleSearchInputChange}
          />
          <SearchButton type="submit">
            <Image src={Filter} alt="Filter" />
            <Para>Filter</Para>
          </SearchButton>
          <ButtonLink to={fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.aOrganizationRoute.bCreateRoute}>
            <Image src={PlusSign} alt="PlusSign" />
            <Para>Add</Para>
          </ButtonLink>
        </Form>

        <Container>
          {APICall.listAPIResponse.isLoading ? null : 
            APICall.listAPIResponse.isError ? null :
              APICall.listAPIResponse.isSuccess ? (
                APICall.listAPIResponse.data.success ? (
                  APICall.listAPIResponse.data.list.length > 0 ? (
                    <React.Fragment>
                      {
                        APICall.listAPIResponse.data.list?.filter((each: any) => each.bCreatedBy?._id === (ReduxCall.state.receivedObject as any)?.ProfileRetrieve?._id).map((each: any, index: any) => (
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
      </MainContainer>

    </React.Fragment>
  )
}

export default OrganizationListPage;
