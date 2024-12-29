import { RootState } from "@/aConnection/dReduxConnection";
import organizationAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/dOrganizationAPIEndpoints";
import enrolledServiceAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/iEnrolledServiceAPIEndpoints";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import LoaderComponent from "@/bLove/cComponent/aGlobalComponent/component/aLoaderComponent";
import ErrorComponent from "@/bLove/cComponent/aGlobalComponent/component/bErrorComponent";
import TopNavBarTwoComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarTwoComponent";
import SidebarNavigation from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/outlet/bSidebarComponent/component/SidebarNavigation/SidebarNavigation";
import fullRoute from "@/bLove/gRoute/bFullRoute";
import { RefreshCwIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SubmitButtonNew } from "../../aPaidCustomerPage/aListPage/style";
import apiResponseHandler from "./extras/aAPIResponseHandler";
import { ButtonLink3, Form, Heading, Input2, LeftContainer, MainContainer, Para, RightContainer, SearchButton, ServiceSubContainer, Table, TableBody, TableHeading } from "./style";


const UnpaidCustomerListPage = () => {
  // Variable
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("")

  // Redux Call
  const ReduxCall = {
    state: useSelector((fullState: RootState) => fullState.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }

  // API Call
  const APICall = {
    organizationListAPIResponse: organizationAPIEndpoint.useOrganizationListAPIQuery(null),
    
    // Requirements... Muaaah...
    organizationUpdateAPITrigger: organizationAPIEndpoint.useOrganizationUpdateAPIMutation()[0],
    organizationUpdateAPIResponse: organizationAPIEndpoint.useOrganizationUpdateAPIMutation()[1],    
    
    enrolledServiceUpdateAPITrigger: enrolledServiceAPIEndpoint.useEnrolledServiceUpdateAPIMutation()[0],
    enrolledServiceUpdateAPIResponse: enrolledServiceAPIEndpoint.useEnrolledServiceUpdateAPIMutation()[1],    
  }

  // Event Handlers
  // Handle Confirm Payment
  const handleConfirmPayment = (organizationRetrieve: any) => {
    // console.log(organizationRetrieve)
    apiResponseHandler.updateAPIResponseHandler({}, APICall.organizationUpdateAPITrigger, APICall.enrolledServiceUpdateAPITrigger, organizationRetrieve)
  }

  // All Render
  // Success Render
  useEffect(() => {
    apiResponseHandler.listAPIResponseHandler(APICall.organizationListAPIResponse)
  }, [APICall.organizationListAPIResponse])
    
  // JSX
  return (
    <React.Fragment>
      {/* UnpaidCustomerListPage */}

      <>
        <TopNavBarTwoComponent />
        <MainContainer>
          <LeftContainer>
            <SidebarNavigation />
          </LeftContainer>
          <RightContainer>
            <ServiceSubContainer>
            <>
              <Heading>Unpaid Customers</Heading>
              <Form>
                <Input2
                  type="text"
                  placeholder="Search Your Customers by Organization"
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                />
                <SearchButton type="button" onClick={() => APICall.organizationListAPIResponse.refetch()} >
                  <RefreshCwIcon style={{ width: "20px", height: "20px", marginRight: "10px" }}  />
                  <Para>Refresh</Para>
                </SearchButton>
              </Form>

              <Table>
                <thead>
                  <tr>
                    <TableHeading>Organization</TableHeading>
                    <TableHeading>Type of Firm</TableHeading>
                    <TableHeading>Contact Person</TableHeading>
                    <TableHeading>Contact</TableHeading>
                    <TableHeading>Email</TableHeading>
                    <TableHeading>Payment Pending</TableHeading>
                    {(ReduxCall.state.receivedObject as any)?.ProfileRetrieve?.cRole?.aTitle === "Pegasus Super Admin" && (
                      <TableHeading>Action</TableHeading>
                    )}
                  </tr>
                </thead>
                <tbody>

                  {(APICall.organizationListAPIResponse.isLoading || APICall.organizationListAPIResponse.isFetching) ? null : 
                    APICall.organizationListAPIResponse.isError ? null :
                      APICall.organizationListAPIResponse.isSuccess ? (
                        APICall.organizationListAPIResponse.data.success ? (
                          APICall.organizationListAPIResponse.data.list.length > 0 ? (
                            <React.Fragment>
                              {
                                APICall.organizationListAPIResponse.data.list?.
                                  filter((each: any) => !each.dEnrolledServicePaymentStatus)?.
                                  filter((each: any) => each.dName?.toLowerCase().includes(searchInput?.toLowerCase()))?.
                                  map((each: any, index: any) => (
                                  <tr key={index}>
                                    <TableBody>{each.dName}</TableBody>
                                    <TableBody>{each.dType}</TableBody>
                                    <TableBody>{each.bCreatedBy?.eFirstname}</TableBody>
                                    <TableBody>{each.dPhoneNumber}</TableBody>
                                    <TableBody>{each.dCompanyEmail}</TableBody>
                                    <TableBody>
                                      <em style={{ color: "tomato" }} >({each.cEnrolledService?.filter((each1: any) => !each1.dPaymentStatus)?.length})</em>
                                      {(ReduxCall.state.receivedObject as any)?.ProfileRetrieve?.cRole?.aTitle === "Pegasus Super Admin" && (
                                        each.cEnrolledService?.filter((each1: any) => !each1.dPaymentStatus)?.length > 0 && (
                                          <SubmitButtonNew onClick={() => handleConfirmPayment(each)} >
                                            Confirm Payment
                                          </SubmitButtonNew>
                                        )
                                      )}
                                    </TableBody>
                                    {(ReduxCall.state.receivedObject as any)?.ProfileRetrieve?.cRole?.aTitle === "Pegasus Super Admin" && (
                                      <TableBody>
                                        <ButtonLink3
                                          onClick={() => navigate(`${fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.iCustomerRoute.bUnpaidCustomerRoute.bUnpaidCustomerRetrieveRoute}/${each._id}`)}
                                        >View
                                        </ButtonLink3>
                                      </TableBody>
                                    )}
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

              {(APICall.organizationListAPIResponse.isLoading || APICall.organizationListAPIResponse.isFetching) ? <LoaderComponent /> :
                APICall.organizationListAPIResponse.isError ? <ErrorComponent message="Error..." /> :
                (APICall.organizationListAPIResponse.data?.list?.
                  filter((each: any) => !each.dEnrolledServicePaymentStatus)?.
                  filter((each: any) => each.dName?.toLowerCase().includes(searchInput?.toLowerCase()))?.
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

export default UnpaidCustomerListPage;
