import fullRoute from "@/bLove/gRoute/bFullRoute";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import serviceAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/fServiceAPIEndpoints";

// import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import LoaderComponent from "@/bLove/cComponent/aGlobalComponent/component/aLoaderComponent";
import ErrorComponent from "@/bLove/cComponent/aGlobalComponent/component/bErrorComponent";
import TopNavBarTwoComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarTwoComponent";
import SidebarNavigation from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/outlet/bSidebarComponent/component/SidebarNavigation/SidebarNavigation";
import PlusSign from "@/bLove/hAsset/icon/plus-circle.png";
import { RefreshCwIcon } from "lucide-react";
import apiResponseHandler from "./extras/aAPIResponseHandler";
import { ButtonLink2, Form, Heading, Image, Input2, LeftContainer, MainContainer, Para, RightContainer, SearchButton, ServiceSubContainer, Table, TableBody, TableHeading } from "./style";


const ServiceCompleteListPage = () => {
  // Variable
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("")

  // API Call
  const APICall = {
    listAPIResponse: serviceAPIEndpoint.useServiceListAPIQuery(null),
  }
  
  // All Render
  // Success Render
  useEffect(() => {
    apiResponseHandler.listAPIResponseHandler(APICall.listAPIResponse)
  }, [APICall.listAPIResponse])
  
  // JSX
  return (
    <React.Fragment>
      {/* ServiceCompleteListPage */}

      <>
        <TopNavBarTwoComponent />
        <MainContainer>
          <LeftContainer>
            <SidebarNavigation />
          </LeftContainer>
          <RightContainer>
            <ServiceSubContainer>
            <>
              <Heading>Service Management</Heading>
              <Form>
                <Input2
                  type="text"
                  placeholder="Search your Services"
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                />
                <SearchButton type="button" onClick={() => APICall.listAPIResponse.refetch()} >
                  <RefreshCwIcon style={{ width: "20px", height: "20px", marginRight: "10px" }}  />
                  <Para>Refresh</Para>
                </SearchButton>

                <ButtonLink2 onClick={() => navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.cServiceRoute.gCompleteCreateRoute)} >
                  <Image src={PlusSign} alt="PlusSign" />
                  <Para>Add</Para>
                </ButtonLink2>
              </Form>
              <Table>
                <thead>
                  <tr>
                    <TableHeading>Form Number</TableHeading>
                    <TableHeading>Type of Firm</TableHeading>
                    <TableHeading>Category</TableHeading>
                    <TableHeading>Own/Loan</TableHeading>
                    <TableHeading>Govt Fee (₹)</TableHeading>
                    <TableHeading>Our Fee (₹)</TableHeading>
                    <TableHeading>Date Added</TableHeading>
                    <TableHeading>Service Validity</TableHeading>
                  </tr>
                </thead>
                <tbody>
                  {(APICall.listAPIResponse.isLoading || APICall.listAPIResponse.isFetching) ? null : 
                    APICall.listAPIResponse.isError ? null :
                      APICall.listAPIResponse.isSuccess ? (
                        APICall.listAPIResponse.data.success ? (
                          APICall.listAPIResponse.data.list.length > 0 ? (
                            <React.Fragment>
                              {
                                APICall.listAPIResponse.data.list?.
                                filter((each: any) => each?.aTitle?.toLowerCase().includes(searchInput?.toLowerCase())).
                                map((each: any, index: any) => (
                                  <tr key={index}>
                                    <TableBody>{each.dFormNumber}</TableBody>
                                    <TableBody>{each.dFormType}</TableBody>
                                    <TableBody>{each.dCategory}</TableBody>
                                    <TableBody>{each.dOwnLoan}</TableBody>
                                    <TableBody>{each.dGovtFees}</TableBody>
                                    <TableBody>{each.dOurFees}</TableBody>
                                    <TableBody>{each.dAddedDate}</TableBody>
                                    <TableBody>{each.dServiceValidity}</TableBody>
                                  </tr>
                                ))
                              }
                            </React.Fragment>
                          ) : []
                        ) : []
                      ) : []
                  }
                </tbody>
              </Table>

              {(APICall.listAPIResponse.isLoading || APICall.listAPIResponse.isFetching) ? <LoaderComponent /> :
                APICall.listAPIResponse.isError ? <ErrorComponent message="Error..." /> :
                (APICall.listAPIResponse.data?.list?.
                  filter((each: any) => each?.aTitle?.toLowerCase().includes(searchInput?.toLowerCase())).
                  length === 0) ? <ErrorComponent message="No items here..." /> : null
              }

            </>
            </ServiceSubContainer>
          </RightContainer>
        </MainContainer>
      </>

    </React.Fragment>
  )
}

export default ServiceCompleteListPage;
