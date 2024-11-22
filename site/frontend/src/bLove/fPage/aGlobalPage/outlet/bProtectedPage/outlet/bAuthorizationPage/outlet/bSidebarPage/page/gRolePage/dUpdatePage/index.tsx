import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import fullRoute from "@/bLove/gRoute/bFullRoute";

import roleAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/bUserAdministration/bRoleAPIEndpoints";
import apiResponseHandler from "./extras/aAPIResponseHandler";

// import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import { AddRoleButton, BackButton, BackButtonContainer, ButtonContainer, DeleteRoleButton, FormContainer, Heading, Input, Label, LeftContainer, MainContainer, PermissionsTable, RightContainer } from "./style";
import SidebarNavigation from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/outlet/bSidebarComponent/component/SidebarNavigation/SidebarNavigation";
import TopNavBarTwoComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarTwoComponent";


const RoleUpdatePage = () => {
  // Variable
  const navigate = useNavigate();
  const { id } = useParams();

  // State Variable
  const [formData, setFormData] = useState({
    aTitle: "",

    dPermission: [
      {
        entity: "Home",
        menu: { list: false, create: false, read: false, update: false, delete: false }
      },
      {
        entity: "Service Management",
        menu: { list: false, create: false, read: false, update: false, delete: false }
      },
      {
        entity: "Subscribed Customers",
        menu: { list: false, create: false, read: false, update: false, delete: false }
      },
      {
        entity: "Unpaid Customers",
        menu: { list: false, create: false, read: false, update: false, delete: false }
      },
      {
        entity: "All Licences",
        menu: { list: false, create: false, read: false, update: false, delete: false }
      },
      {
        entity: "All Documents",
        menu: { list: false, create: false, read: false, update: false, delete: false }
      },
      {
        entity: "Payment Management",
        menu: { list: false, create: false, read: false, update: false, delete: false }
      },
      {
        entity: "Custom Notifications",
        menu: { list: false, create: false, read: false, update: false, delete: false }
      },
      {
        entity: "Employee Management",
        menu: { list: false, create: false, read: false, update: false, delete: false }
      },
    ],
  })

  // Redux Call
  const ReduxCall = {
    state: useSelector((fullState: RootState) => fullState.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }

  // API Call
  const APICall = {
    retrieveAPIResponse: roleAPIEndpoint.useRoleRetrievePIQuery({ params: { _id: id } }),
    updateAPITrigger: roleAPIEndpoint.useRoleUpdateAPIMutation()[0],
    updateAPIResponse: roleAPIEndpoint.useRoleUpdateAPIMutation()[1],

    deleteAPITrigger: roleAPIEndpoint.useRoleDeleteAPIMutation()[0],
    deleteAPIResponse: roleAPIEndpoint.useRoleDeleteAPIMutation()[1],
  }  

    // Event Handlers
  // Handle Input Change
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };
  
  // Submit handler
  const handleSubmit = (event: any) => {
    event.preventDefault();

    console.log("formDataObj", formData);
    apiResponseHandler.updateAPIResponseHandler(formData, APICall.updateAPITrigger, navigate, { id: id })
  };

  const handleSubmit2 = (event: any) => {
    event.preventDefault();

    apiResponseHandler.deleteAPIResponseHandler(formData, APICall.deleteAPITrigger, navigate, { id: id })
  };

  // Handle Permission Change
  const handlePermissionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    entityIndex: number,
    permissionType: any
  ) => {
    setFormData((prev) => {
      const updatedPermissions = prev.dPermission.map((permission, index) =>
        index === entityIndex
          ? {
              ...permission,
              menu: {
                ...permission.menu,
                [permissionType]: event.target.checked,
              },
            }
          : permission
      );
      return { ...prev, dPermission: updatedPermissions };
    });
  };
  
  // All Render
  // First Render
  useEffect(() => {
    APICall.retrieveAPIResponse.isLoading ? null : 
    APICall.retrieveAPIResponse.isError ? null :
    APICall.retrieveAPIResponse.isSuccess ? (
      APICall.retrieveAPIResponse.data.success ? (
        setFormData({
          aTitle: APICall.retrieveAPIResponse.data.retrieve.aTitle,
          dPermission: APICall.retrieveAPIResponse.data.retrieve.dPermission,
        })
      ) : null
    ) : null
  }, [APICall.retrieveAPIResponse])

  // Extra Render
  useEffect(() => {
    console.log(ReduxCall.state)
  }, [ReduxCall.state])

  // JSX
  return (
    <React.Fragment>
      {/* RoleUpdatePage */}

      {/* {
        APICall.retrieveAPIResponse.isLoading ? "Loading..." : 
        APICall.retrieveAPIResponse.isError ? "Error..." :
        APICall.retrieveAPIResponse.isSuccess ? (
          <React.Fragment>
            {
              APICall.retrieveAPIResponse.data.success ? (
                <React.Fragment>
                  <form onSubmit={handleSubmit} noValidate >
                    <div>
                      Role Detail
                      <div>
                        <label>Role Name</label>
                        <input name="aTitle" value={formData.aTitle} onChange={(event => handleInputChange(event))} />
                      </div>

                      <div>
                        <label>Permission</label>            
                        <table>
                          <thead>
                            <tr>
                              <th>Entity Name</th>
                              <th>List</th>
                              <th>Create</th>
                              <th>Read</th>
                              <th>Update</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {formData.dPermission.map((each, index) => (
                              <tr key={index}>
                                <td>{each.entity}</td>
                                <td>
                                  <input
                                    type="checkbox"
                                    checked={each.menu.list}
                                    onChange={(event) => handlePermissionChange(event, index, "list")}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="checkbox"
                                    checked={each.menu.create}
                                    onChange={(event) => handlePermissionChange(event, index, "create")}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="checkbox"
                                    checked={each.menu.read}
                                    onChange={(event) => handlePermissionChange(event, index, "read")}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="checkbox"
                                    checked={each.menu.update}
                                    onChange={(event) => handlePermissionChange(event, index, "update")}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="checkbox"
                                    checked={each.menu.delete}
                                    onChange={(event) => handlePermissionChange(event, index, "delete")}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                      </div>

                    </div>

                    <button type="submit" >Submit</button>
                  </form>
                </React.Fragment>
              ) : "Backend Error"
            }
          </React.Fragment>
        ) :
        "Let me understand first"
      } */}

      {/* <div>
        ------------------------------------------------------------------------
      </div> */}

      <>
        <TopNavBarTwoComponent />
        <MainContainer>
          <LeftContainer>
            <SidebarNavigation />
          </LeftContainer>
            <RightContainer>
              <BackButtonContainer>
                <BackButton onClick={() => navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.fUserRoute.aListRoute)}>← Back</BackButton>
              </BackButtonContainer>
              <Heading>Edit Role</Heading>

              {
                APICall.retrieveAPIResponse.isLoading ? "Loading..." : 
                APICall.retrieveAPIResponse.isError ? "Error..." :
                APICall.retrieveAPIResponse.isSuccess ? (
                  <React.Fragment>
                    {
                      APICall.retrieveAPIResponse.data.success ? (
                        <React.Fragment>
                          <FormContainer>
                            <Label>Role Name</Label>
                            <Input
                              type="text"
                              name="aTitle"
                              value={formData.aTitle}
                              onChange={handleInputChange}
                              placeholder="Enter role name"
                              disabled={(
                                APICall.retrieveAPIResponse.data.retrieve.aTitle === "Pegasus Super Admin" || 
                                APICall.retrieveAPIResponse.data.retrieve.aTitle === "Pegasus Employee" || 
                                APICall.retrieveAPIResponse.data.retrieve.aTitle === "Pegasus Customer"
                              )}
                            />

                            <PermissionsTable>
                              <thead>
                                <tr>
                                  <th>Entity Name</th>
                                  <th>List</th>
                                  <th>Create</th>
                                  <th>Read</th>
                                  <th>Update</th>
                                  <th>Delete</th>
                                </tr>
                              </thead>
                              <tbody>
                                {formData.dPermission.map((each, index) => (
                                  <tr key={index}>
                                    <td>{each.entity}</td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        checked={each.menu.list}
                                        onChange={(event) => handlePermissionChange(event, index, "list")}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        checked={each.menu.create}
                                        onChange={(event) => handlePermissionChange(event, index, "create")}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        checked={each.menu.read}
                                        onChange={(event) => handlePermissionChange(event, index, "read")}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        checked={each.menu.update}
                                        onChange={(event) => handlePermissionChange(event, index, "update")}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        checked={each.menu.delete}
                                        onChange={(event) => handlePermissionChange(event, index, "delete")}
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </PermissionsTable>

                            {
                              (
                                APICall.retrieveAPIResponse.data.retrieve.aTitle === "Pegasus Super Admin" || 
                                APICall.retrieveAPIResponse.data.retrieve.aTitle === "Pegasus Employee" || 
                                APICall.retrieveAPIResponse.data.retrieve.aTitle === "Pegasus Customer"
                              ) ? null : (
                                <ButtonContainer>
                                  <AddRoleButton onClick={handleSubmit}>
                                    Edit Role
                                  </AddRoleButton>
    
                                  <DeleteRoleButton onClick={handleSubmit2}>
                                    Delete Role
                                  </DeleteRoleButton>
                                </ButtonContainer>
                              )
                            }
                              
                          </FormContainer>
                        </React.Fragment>
                      ) : "Backend Error"
                    }
                  </React.Fragment>
                ) :
                "Let me understand first"
              }

            </RightContainer>
        </MainContainer>
      </>

    </React.Fragment>
  )
}

export default RoleUpdatePage;
