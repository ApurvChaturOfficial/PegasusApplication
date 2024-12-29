import fullRoute from "@/bLove/gRoute/bFullRoute";
import React, { useEffect, useState } from "react";

import userAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/bUserAdministration/aUserAPIEndpoints";
import roleAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/bUserAdministration/bRoleAPIEndpoints";
import { useLocation, useNavigate } from "react-router-dom";
// import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import LoaderComponent from "@/bLove/cComponent/aGlobalComponent/component/aLoaderComponent";
import ErrorComponent from "@/bLove/cComponent/aGlobalComponent/component/bErrorComponent";
import TopNavBarTwoComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarTwoComponent";
import SidebarNavigation from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/outlet/bSidebarComponent/component/SidebarNavigation/SidebarNavigation";
import PlusSignIcon from '@/bLove/hAsset/icon/plus-circle.png'; // Adjust the path if needed
import { RefreshCwIcon } from "lucide-react";
import { Para } from "../../aOrganizationPage/aListPage/style";
import apiResponseHandler from "./extras/aAPIResponseHandler";
import { ButtonLink2, ButtonLink3, EditRoleButton, Form, Heading, Image3, Input, LeftContainer, MainContainer, Navigation, NavLinks, RightContainer, RoleTable, RoleTableBody, RoleTableHeading, SearchButton, Table, TableBody, TableHeading } from "./style";


const UserListPage = () => {
  // Variable
  const navigate = useNavigate();
  const location = useLocation();

  // State Variable
  const [activeTab, setActiveTab] = useState(location.state?.role ? "Roles" : "Employees");
  const [searchInput1, setSearchInput1] = useState("")
  const [searchInput2, setSearchInput2] = useState("")

  // API Call
  const APICall = {
    userListAPIResponse: userAPIEndpoint.useUserListAPIQuery(null),
    roleListAPIResponse: roleAPIEndpoint.useRoleListAPIQuery(null),
  }

  // All Render
  // Success Render 1
  useEffect(() => {
    apiResponseHandler.listAPIResponseHandler(APICall.userListAPIResponse)
  }, [APICall.userListAPIResponse])
  
  // Success Render 2
  useEffect(() => {
    apiResponseHandler.listAPIResponseHandler(APICall.roleListAPIResponse)
  }, [APICall.roleListAPIResponse])
  
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
                  <Input
                    type="text"
                    placeholder="Search Your Employees by Name"
                    value={searchInput1}
                    onChange={(event) => setSearchInput1(event.target.value)}
                  />
                  <SearchButton type="button" onClick={() => APICall.userListAPIResponse.refetch()} >
                    <RefreshCwIcon style={{ width: "20px", height: "20px", marginRight: "10px" }}  />
                    <Para>Refresh</Para>
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

                    {(APICall.userListAPIResponse.isLoading || APICall.userListAPIResponse.isFetching) ? null : 
                      APICall.userListAPIResponse.isError ? null :
                        APICall.userListAPIResponse.isSuccess ? (
                          APICall.userListAPIResponse.data.success ? (
                            APICall.userListAPIResponse.data.list.length > 0 ? (
                              <React.Fragment>
                                {
                                  APICall.userListAPIResponse.data.list?.
                                    filter((each: any) => each.eFirstname?.toLowerCase().includes(searchInput1?.toLowerCase())).
                                    map((each: any, index: any) => (
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

                {(APICall.userListAPIResponse.isLoading || APICall.userListAPIResponse.isFetching) ? <LoaderComponent /> :
                  APICall.userListAPIResponse.isError ? <ErrorComponent message="Error..." /> :
                  (APICall.userListAPIResponse.data?.list?.
                    filter((each: any) => each.eFirstname?.toLowerCase().includes(searchInput1?.toLowerCase())).
                    length === 0) ? <ErrorComponent message="No items here..." /> : null
                }

              </>
            )}
            {activeTab === "Roles" && (
              <>
                <Form>
                  <Input
                    type="text"
                    placeholder="Search Your Roles by Name"
                    value={searchInput2}
                    onChange={(event) => setSearchInput2(event.target.value)}
                  />
                  <SearchButton type="button" onClick={() => APICall.roleListAPIResponse.refetch()} >
                    <RefreshCwIcon style={{ width: "20px", height: "20px", marginRight: "10px" }}  />
                    <Para>Refresh</Para>
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

                    {(APICall.roleListAPIResponse.isLoading || APICall.roleListAPIResponse.isFetching) ? null : 
                      APICall.roleListAPIResponse.isError ? null :
                        APICall.roleListAPIResponse.isSuccess ? (
                          APICall.roleListAPIResponse.data.success ? (
                            APICall.roleListAPIResponse.data.list.length > 0 ? (
                              <React.Fragment>
                                {
                                  APICall.roleListAPIResponse.data.list?.
                                    filter((each: any) => each.aTitle?.toLowerCase().includes(searchInput2?.toLowerCase())).
                                    map((each: any, index: any) => (
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

                {(APICall.roleListAPIResponse.isLoading || APICall.roleListAPIResponse.isFetching) ? <LoaderComponent /> :
                  APICall.roleListAPIResponse.isError ? <ErrorComponent message="Error..." /> :
                  (APICall.roleListAPIResponse.data?.list?.
                    filter((each: any) => each.aTitle?.toLowerCase().includes(searchInput2?.toLowerCase())).
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

export default UserListPage;
