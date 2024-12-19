import { RootState } from "@/aConnection/dReduxConnection";
import userAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/bUserAdministration/aUserAPIEndpoints";
import organizationAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/dOrganizationAPIEndpoints";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import TopNavBarTwoComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarTwoComponent";
import SidebarNavigation from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/outlet/bSidebarComponent/component/SidebarNavigation/SidebarNavigation";
import fullRoute from "@/bLove/gRoute/bFullRoute";
import FilterIcon from '@/bLove/hAsset/icon/filter.png'; // Adjust the path if needed
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import apiResponseHandler from "./extras/aAPIResponseHandler";
import { ButtonLink3, EmployeeDropdown, Form, Heading, Image3, Input, LeftContainer, MainContainer, Navigation, NavLinks, RightContainer, SearchButton, SubmitButtonNew, Table, TableBody, TableHeading } from "./style";


const PaidCustomerListPage = () => {
  // Variable
  const navigate = useNavigate();
  const location = useLocation();

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
                  <Input type="text" placeholder="Search Your Customers" />
                  <SearchButton>
                    <Image3 src={FilterIcon} alt="Filter" />
                    Filters
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
                      <TableHeading>Pending</TableHeading>
                      <TableHeading>Action</TableHeading>
                    </tr>
                  </thead>
                  <tbody>

                    {APICall.organizationListAPIResponse.isLoading ? null : 
                      APICall.organizationListAPIResponse.isError ? null :
                        APICall.organizationListAPIResponse.isSuccess ? (
                          APICall.organizationListAPIResponse.data.success ? (
                            APICall.organizationListAPIResponse.data.list.length > 0 ? (
                              <React.Fragment>
                                {
                                  APICall.organizationListAPIResponse.data.list
                                    ?.filter((each: any) => each.dEnrolledServicePaymentStatus)
                                    ?.map((each: any, index: any) => (
                                    <tr key={index}>
                                      <TableBody>{each.aTitle}</TableBody>
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
                                              {APICall.userListAPIResponse.isLoading ? null : 
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
                                            {
                                              ((ReduxCall.state.receivedObject as any)?.ProfileRetrieve?.cRole?.aTitle === "Pegasus Employee" &&
                                              each.cAssignedEmployee?._id === (ReduxCall.state.receivedObject as any)?.ProfileRetrieve?._id) ? (
                                                <SubmitButtonNew onClick={() => console.log("Payment Confirmed")} >
                                                  View Services
                                                </SubmitButtonNew>
                                              ) : ( each.cAssignedEmployee ? (
                                                <ButtonLink3
                                                  disabled
                                                  onClick={() => {}}
                                                >{each.cAssignedEmployee?.eFirstname}
                                                </ButtonLink3>
                                              ) : null )
                                            }
                                          </TableBody>
                                        )
                                      }
                                      <TableBody>{each.cEnrolledService?.filter((each1: any) => !each1.dActionStatus)?.length}</TableBody>
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
              </>
            )}
            {activeTab === "Completed" && (
              <>
                <Form>
                  <Input type="text" placeholder="Search Your Customers" />
                  <SearchButton>
                    <Image3 src={FilterIcon} alt="Filter" />
                    Filters
                  </SearchButton>
                  {/* <ButtonLink2 to={fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.fUserRoute.bCreateRoute}>
                    <Image3 src={PlusSignIcon} alt="Add" />
                    Add
                  </ButtonLink2> */}
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

                    {APICall.organizationListAPIResponse.isLoading ? null : 
                      APICall.organizationListAPIResponse.isError ? null :
                        APICall.organizationListAPIResponse.isSuccess ? (
                          APICall.organizationListAPIResponse.data.success ? (
                            APICall.organizationListAPIResponse.data.list.length > 0 ? (
                              <React.Fragment>
                                {
                                  APICall.organizationListAPIResponse.data.list
                                    ?.filter((each: any) => each.dEnrolledServicePaymentStatus)
                                    ?.map((each: any, index: any) => (
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
              </>
            )}
          </RightContainer>
        </MainContainer>
      </>

    </React.Fragment>
  )
}

export default PaidCustomerListPage;
