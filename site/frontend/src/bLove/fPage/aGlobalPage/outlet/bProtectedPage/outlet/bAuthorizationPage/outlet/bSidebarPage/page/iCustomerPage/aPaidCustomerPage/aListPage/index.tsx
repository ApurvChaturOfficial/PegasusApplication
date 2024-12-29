import { RootState } from "@/aConnection/dReduxConnection";
import userAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/bUserAdministration/aUserAPIEndpoints";
import organizationAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/dOrganizationAPIEndpoints";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import LoaderComponent from "@/bLove/cComponent/aGlobalComponent/component/aLoaderComponent";
import ErrorComponent from "@/bLove/cComponent/aGlobalComponent/component/bErrorComponent";
import TopNavBarTwoComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarTwoComponent";
import SidebarNavigation from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/outlet/bSidebarComponent/component/SidebarNavigation/SidebarNavigation";
import fullRoute from "@/bLove/gRoute/bFullRoute";
import { RefreshCwIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Para } from "../cRetrievePage/style";
import apiResponseHandler from "./extras/aAPIResponseHandler";
import { ButtonLink3, EmployeeDropdown, Form, Heading, Input, LeftContainer, MainContainer, Navigation, NavLinks, RightContainer, SearchButton, Table, TableBody, TableHeading } from "./style";


const PaidCustomerListPage = () => {
  // Variable
  const navigate = useNavigate();
  const location = useLocation();
  const [searchInput, setSearchInput] = useState("")

  // State Variable
  const [activeTab, setActiveTab] = useState(location.state?.role ? "Completed" : "Pending");

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
    userListAPIResponse: userAPIEndpoint.useUserListAPIQuery(null),

    organizationUpdateAPITrigger: organizationAPIEndpoint.useOrganizationUpdateAPIMutation()[0],
    organizationUpdateAPIResponse: organizationAPIEndpoint.useOrganizationUpdateAPIMutation()[1],
  }

  // Event Handler
  // Handle Assign Customer To Employee
  const handleAssignCustomerToEmployee = (organizationDetail: any, customerDetail: any) => {
    apiResponseHandler.updateAPIResponseHandler(
      { cAssignedEmployee: customerDetail.target.value },
      APICall.organizationUpdateAPITrigger,
      { id: organizationDetail?._id }
    )
  }

  // All Render
  // Success Render
  useEffect(() => {
    apiResponseHandler.listAPIResponseHandler(APICall.organizationListAPIResponse)
  }, [APICall.organizationListAPIResponse])
  
  // JSX
  return (
    <React.Fragment>
      {/* PaidCustomerListPage */}

      <>
        <TopNavBarTwoComponent />
        <MainContainer>
          <LeftContainer>
            <SidebarNavigation />
          </LeftContainer>
          <RightContainer>
            <Heading>Subscribed Customers</Heading>
            <NavLinks>
              <Navigation active={activeTab === "Pending"} onClick={() => setActiveTab("Pending")}>
                Pending
              </Navigation>
              <Navigation active={activeTab === "Completed"} onClick={() => setActiveTab("Completed")}>
                Completed
              </Navigation>
            </NavLinks>
            {activeTab === "Pending" && (
              <>
                <Form>
                  <Input  
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
                      <TableHeading>Assigned Emp.</TableHeading>
                      <TableHeading>Action Pending</TableHeading>
                      <TableHeading>Action</TableHeading>
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
                                    filter((each: any) => each.dEnrolledServicePaymentStatus)?.
                                    filter((each: any) => each.cEnrolledService?.some((each1: any) => each1.dActionStatus === false))?.
                                    filter((each: any) => each.dName?.toLowerCase().includes(searchInput?.toLowerCase()))?.
                                    map((each: any, index: any) => (
                                    <tr key={index}>
                                      <TableBody>{each.dName}</TableBody>
                                      <TableBody>{each.dType}</TableBody>
                                      <TableBody>{each.bCreatedBy?.eFirstname}</TableBody>
                                      <TableBody>{each.dPhoneNumber}</TableBody>
                                      <TableBody>{each.dCompanyEmail}</TableBody>
                                      {
                                        (ReduxCall.state.receivedObject as any)?.ProfileRetrieve?.cRole?.aTitle === "Pegasus Super Admin" ? (
                                          <TableBody>
                                            <EmployeeDropdown
                                              value={each.cAssignedEmployee?._id}
                                              onChange={(event: any) => handleAssignCustomerToEmployee(each, event)}
                                            >
                                              <option selected disabled>--Select Employee--</option>
                                              {(APICall.userListAPIResponse.isLoading || APICall.userListAPIResponse.isFetching) ? null : 
                                                APICall.userListAPIResponse.isError ? null :
                                                  APICall.userListAPIResponse.isSuccess ? (
                                                    APICall.userListAPIResponse.data.success ? (
                                                      APICall.userListAPIResponse.data.list.length > 0 ? (
                                                        <React.Fragment>
                                                          {
                                                            APICall.userListAPIResponse.data.list?.filter((each: any) => each.cRole?.aTitle === "Pegasus Employee").map((each1: any, index1: any) => (
                                                              <option key={index1} value={each1._id} >
                                                                {each1.eFirstname}
                                                              </option>
                                                            ))
                                                          }
                                                        </React.Fragment>
                                                      ) : []
                                                    ) : []
                                                  ) : []
                                              }                                          
                                            </EmployeeDropdown>
                                          </TableBody>
                                        ) : (
                                          <TableBody>
                                            <ButtonLink3
                                              disabled
                                              onClick={() => console.log("first")}
                                            >{each.cAssignedEmployee?.eFirstname}
                                            </ButtonLink3>
                                          </TableBody>
                                        )
                                      }
                                      <TableBody>{each.cEnrolledService?.filter((each1: any) => !each1.dActionStatus)?.length}</TableBody>
                                      <TableBody>                                        
                                        {
                                          (
                                            (ReduxCall.state.receivedObject as any)?.ProfileRetrieve?.cRole?.aTitle === "Pegasus Super Admin" ||
                                            (
                                              (ReduxCall.state.receivedObject as any)?.ProfileRetrieve?.cRole?.aTitle === "Pegasus Employee" &&
                                              each.cAssignedEmployee?._id === (ReduxCall.state.receivedObject as any)?.ProfileRetrieve?._id
                                            )
                                          ) ? (
                                            <ButtonLink3
                                              onClick={() => navigate(`${fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.iCustomerRoute.aPaidCustomerRoute.bPaidCustomerRetrieveRoute}/${each._id}`)}
                                            >View
                                            </ButtonLink3>
                                          ) : null
                                        }
                                      </TableBody>
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
                    filter((each: any) => each.dEnrolledServicePaymentStatus)?.
                    filter((each: any) => each.cEnrolledService?.some((each1: any) => each1.dActionStatus === false))?.
                    filter((each: any) => each.dName?.toLowerCase().includes(searchInput?.toLowerCase()))?.
                    length === 0) ? <ErrorComponent message="No items here..." /> : null
                }

              </>
            )}
            {activeTab === "Completed" && (
              <>
                <Form>
                  <Input  
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
                      {/* <TableHeading>Pending</TableHeading> */}
                      <TableHeading>Action</TableHeading>
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
                                    filter((each: any) => each.dEnrolledServicePaymentStatus)?.
                                    filter((each: any) => each.cEnrolledService?.every((each1: any) => each1.dActionStatus === true))?.
                                    filter((each: any) => each.dName?.toLowerCase().includes(searchInput?.toLowerCase()))?.
                                    map((each: any, index: any) => (
                                    <tr key={index}>
                                      <TableBody>{each.aTitle}</TableBody>
                                      <TableBody>{each.dType}</TableBody>
                                      <TableBody>{each.bCreatedBy?.eFirstname}</TableBody>
                                      <TableBody>{each.dPhoneNumber}</TableBody>
                                      <TableBody>{each.dCompanyEmail}</TableBody>
                                      {/* <TableBody>{each.cEnrolledService?.length}</TableBody> */}
                                      <TableBody>
                                        <ButtonLink3
                                          onClick={() => navigate(`${fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.iCustomerRoute.aPaidCustomerRoute.bPaidCustomerRetrieveRoute}/${each._id}`)}
                                        >View
                                        </ButtonLink3>
                                      </TableBody>
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
                    filter((each: any) => each.dEnrolledServicePaymentStatus)?.
                    filter((each: any) => each.cEnrolledService?.every((each1: any) => each1.dActionStatus === true))?.
                    filter((each: any) => each.dName?.toLowerCase().includes(searchInput?.toLowerCase()))?.
                    length === 0) ? <ErrorComponent message="No items here..." /> : null
                }

              </>
            )}
          </RightContainer>
        </MainContainer>
      </>

    </React.Fragment>
  )
}

export default PaidCustomerListPage;
