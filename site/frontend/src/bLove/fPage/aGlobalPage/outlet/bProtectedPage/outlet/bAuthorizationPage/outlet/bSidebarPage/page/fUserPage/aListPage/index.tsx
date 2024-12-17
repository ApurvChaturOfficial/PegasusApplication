import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import fullRoute from "@/bLove/gRoute/bFullRoute";

import userAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/bUserAdministration/aUserAPIEndpoints";
import roleAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/bUserAdministration/bRoleAPIEndpoints";
import { useLocation, useNavigate } from "react-router-dom";
// import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import { ButtonLink2, ButtonLink3, EditRoleButton, Form, Heading, Image3, Input, LeftContainer, MainContainer, Navigation, NavLinks, RightContainer, RoleTable, RoleTableBody, RoleTableHeading, SearchButton, Table, TableBody, TableHeading } from "./style";
import SidebarNavigation from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/outlet/bSidebarComponent/component/SidebarNavigation/SidebarNavigation";
import FilterIcon from '@/bLove/hAsset/icon/filter.png'; // Adjust the path if needed
import PlusSignIcon from '@/bLove/hAsset/icon/plus-circle.png'; // Adjust the path if needed
import apiResponseHandler from "./extras/aAPIResponseHandler";
import TopNavBarTwoComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarTwoComponent";


const UserListPage = () => {
  // Variable
  const navigate = useNavigate();
  const location = useLocation();

  // State Variable
  const [activeTab, setActiveTab] = useState(location.state?.role ? "Roles" : "Employees");

  // Redux Call
  const ReduxCall = {
    state: useSelector((fullState: RootState) => fullState.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }

  // API Call
  const APICall = {
    userListAPIResponse: userAPIEndpoint.useUserListAPIQuery(null),
    roleListAPIResponse: roleAPIEndpoint.useRoleListAPIQuery(null),
  }

  // All Render
  // Success Render
  useEffect(() => {
    apiResponseHandler.listAPIResponseHandler(APICall.userListAPIResponse)
  }, [APICall.userListAPIResponse])

    // Extra Render
    useEffect(() => {
      console.log(ReduxCall.state)
    }, [ReduxCall.state])
  
  // JSX
  return (
    <React.Fragment>
      {/* UserListPage */}

      <>
        <TopNavBarTwoComponent />
        <MainContainer>
          <LeftContainer>
            <SidebarNavigation />
          </LeftContainer>
          <RightContainer>
            <Heading>Employee Management</Heading>
            <NavLinks>
              <Navigation active={activeTab === "Employees"} onClick={() => setActiveTab("Employees")}>
                Employees
              </Navigation>
              <Navigation active={activeTab === "Roles"} onClick={() => setActiveTab("Roles")}>
                Roles
              </Navigation>
            </NavLinks>
            {activeTab === "Employees" && (
              <>
                <Form>
                  <Input type="text" placeholder="Search your Employees" />
                  <SearchButton>
                    <Image3 src={FilterIcon} alt="Filter" />
                    Filters
                  </SearchButton>
                  <ButtonLink2 to={fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.fUserRoute.bCreateRoute}>
                    <Image3 src={PlusSignIcon} alt="Add" />
                    Add
                  </ButtonLink2>
                </Form>
                <Table>
                  <thead>
                    <tr>
                      <TableHeading>Employee Name</TableHeading>
                      <TableHeading>Contact</TableHeading>
                      <TableHeading>Email</TableHeading>
                      <TableHeading>Joined On</TableHeading>
                      <TableHeading>Role</TableHeading>
                      <TableHeading>Actions</TableHeading>
                    </tr>
                  </thead>
                  <tbody>

                    {APICall.userListAPIResponse.isLoading ? null : 
                      APICall.userListAPIResponse.isError ? null :
                        APICall.userListAPIResponse.isSuccess ? (
                          APICall.userListAPIResponse.data.success ? (
                            APICall.userListAPIResponse.data.list.length > 0 ? (
                              <React.Fragment>
                                {
                                  APICall.userListAPIResponse.data.list?.map((each: any, index: any) => (
                                    <tr key={index}>
                                      <TableBody>{each.eFirstname}</TableBody>
                                      <TableBody>{each.eMobile}</TableBody>
                                      <TableBody>{each.eEmail}</TableBody>
                                      <TableBody>{each.bCreatedAt}</TableBody>
                                      <TableBody>{each.cRole?.aTitle}</TableBody>
                                      <TableBody>
                                        <ButtonLink3
                                          onClick={() => navigate(`${fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.fUserRoute.dUpdateRoute}/${each._id}`)}
                                        >Change Role</ButtonLink3>
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
            {activeTab === "Roles" && (
              <>
                <Form>
                  <Input type="text" placeholder="Search your Roles" />
                  <SearchButton>
                    <Image3 src={FilterIcon} alt="Filter" />
                    Filters
                  </SearchButton>
                  <ButtonLink2 to={fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.gRoleRoute.bCreateRoute}>
                    <Image3 src={PlusSignIcon} alt="Add" />
                    Add
                  </ButtonLink2>
                </Form>
                <RoleTable>
                  <thead>
                    <tr>
                      <RoleTableHeading>Role Name</RoleTableHeading>
                      <RoleTableHeading>Created On</RoleTableHeading>
                      <RoleTableHeading>Employee Count</RoleTableHeading>
                      <RoleTableHeading>Actions</RoleTableHeading>
                      <th></th> 
                    </tr>
                  </thead>
                  <tbody>

                    {APICall.roleListAPIResponse.isLoading ? null : 
                      APICall.roleListAPIResponse.isError ? null :
                        APICall.roleListAPIResponse.isSuccess ? (
                          APICall.roleListAPIResponse.data.success ? (
                            APICall.roleListAPIResponse.data.list.length > 0 ? (
                              <React.Fragment>
                                {
                                  APICall.roleListAPIResponse.data.list?.map((each: any, index: any) => (
                                    <tr key={index}>
                                      <RoleTableBody>{each.aTitle}</RoleTableBody>
                                      <RoleTableBody>{each.bCreatedAt}</RoleTableBody>
                                      <RoleTableBody>{each.employeeCount}</RoleTableBody>
                                      <RoleTableBody>
                                        <EditRoleButton 
                                          onClick={() => navigate(`${fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.gRoleRoute.dUpdateRoute}/${each._id}`)}
                                        >Edit & View Role</EditRoleButton>
                                      </RoleTableBody>
                                    </tr> 
                                  ))
                                }
                              </React.Fragment>
                            ) : []
                          ) : []
                        ) : []
                    }

                  </tbody>
                </RoleTable>
              </>
            
            )}
          </RightContainer>
        </MainContainer>
      </>

    </React.Fragment>
  )
}

export default UserListPage;
