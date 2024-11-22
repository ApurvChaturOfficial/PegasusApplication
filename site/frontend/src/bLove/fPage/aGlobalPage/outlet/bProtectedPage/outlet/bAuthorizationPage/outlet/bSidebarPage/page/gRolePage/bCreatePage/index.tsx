import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import fullRoute from "@/bLove/gRoute/bFullRoute";

import roleAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/bUserAdministration/bRoleAPIEndpoints";
import apiResponseHandler from "./extras/aAPIResponseHandler";
// import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import { AddRoleButton, BackButton, BackButtonContainer, ButtonContainer, FormContainer, Heading, Input, Label, LeftContainer, MainContainer, PermissionsTable, RightContainer } from "./style";
import SidebarNavigation from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/outlet/bSidebarComponent/component/SidebarNavigation/SidebarNavigation";
import TopNavBarTwoComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarTwoComponent";


const RoleCreatePage = () => {
  // Variable
  const navigate = useNavigate();

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
    createAPITrigger: roleAPIEndpoint.useRoleCreateAPIMutation()[0],
    createAPIResponse: roleAPIEndpoint.useRoleCreateAPIMutation()[1],
  }

  // Event Handlers
  // Handle Input Change
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  // Handle Permission Change
  const handlePermissionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    entityIndex: number,
    permissionType: keyof typeof formData.dPermission[0]["menu"]
  ) => {
    const updatedPermissions = [...formData.dPermission];
    updatedPermissions[entityIndex].menu[permissionType] = event.target.checked;
    setFormData({ ...formData, dPermission: updatedPermissions });
  };
  
  // Submit handler
  const handleSubmit = (event: any) => {
    event.preventDefault();

    console.log("formDataObj", formData);
    apiResponseHandler.createAPIResponseHandler(formData, APICall.createAPITrigger, navigate)
  };

  // All Render
  // Extra Render
  useEffect(() => {
    console.log(formData)
  }, [formData])

  // Extra Render
  useEffect(() => {
    console.log(ReduxCall.state)
  }, [ReduxCall.state])
  

  // JSX
  return (
    <React.Fragment>
      {/* RoleCreatePage */}

      {/* <form onSubmit={handleSubmit} noValidate >
        <div>
          Role Detail

          <div>
            <label>Role Name</label>
            <input name="aTitle" onChange={(event => handleInputChange(event))} />
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

      <div>
        --------------------------------------------------------------
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
            <Heading>Add Role</Heading>
            <FormContainer>
              <Label>Role Name</Label>
              <Input
                type="text"
                name="aTitle"
                value={formData.aTitle}
                onChange={handleInputChange}
                placeholder="Enter role name"
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

              <ButtonContainer>
                <AddRoleButton onClick={handleSubmit}>
                  Add Role
                </AddRoleButton>
                {/* <DeleteRoleButton onClick={handleDeleteRole}>
                  Delete Role
                </DeleteRoleButton> */}
              </ButtonContainer>
            </FormContainer>
          </RightContainer>
        </MainContainer>
      </>

    </React.Fragment>
  )
}

export default RoleCreatePage;
