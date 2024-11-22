import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import fullRoute from "@/bLove/gRoute/bFullRoute";

import userAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/bUserAdministration/aUserAPIEndpoints";
import roleAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/bUserAdministration/bRoleAPIEndpoints";
import apiResponseHandler from "./extras/aAPIResponseHandler";
// import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import { BackButton, BackButtonContainer, ButtonContainer, FormContainer, Heading, Input, Label, LeftContainer, MainContainer, RightContainer, Select, SendMailButton } from "./style";
import SidebarNavigation from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/outlet/bSidebarComponent/component/SidebarNavigation/SidebarNavigation";
import TopNavBarTwoComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarTwoComponent";


const UserCreatePage = () => {
  // Variable
  const navigate = useNavigate();

  // State Variable
  const [formData, setFormData] = useState({
    cRole: "",

    eFirstname: "",
    eMobile: "",
    eEmail: "",
  })
  
  // Redux Call
  const ReduxCall = {
    state: useSelector((fullState: RootState) => fullState.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }

  // API Call
  const APICall = {
    createAPITrigger: userAPIEndpoint.useUserCreateAPIMutation()[0],
    createAPIResponse: userAPIEndpoint.useUserCreateAPIMutation()[1],

    // Requirements... Muaaah...
    roleListAPIResponse: roleAPIEndpoint.useRoleListAPIQuery(null),

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
    apiResponseHandler.createAPIResponseHandler(formData, APICall.createAPITrigger, navigate)
  };

  // // Simulate form submission (sending mail)
  // const handleSendMail = () => {
  //   alert(`Sending joining mail to: ${employeeData.name}`);
  //   // Handle actual mail sending logic here
  // };

  // // Simulate deleting an employee
  // const handleDeleteEmployee = () => {
  //   if (window.confirm('Are you sure you want to delete this employee?')) {
  //     alert(`Deleted employee: ${employeeData.name}`);
  //     // Handle actual delete logic here
  //   }
  // };

  // All Render
  // Extra Render
  useEffect(() => {
    console.log(APICall.roleListAPIResponse)
  }, [APICall.roleListAPIResponse])

  // Extra Render
  useEffect(() => {
    console.log(ReduxCall.state)
  }, [ReduxCall.state])
  

  // JSX
  return (
    <React.Fragment>
      {/* UserCreatePage */}

      {/* <form onSubmit={handleSubmit} noValidate >
        <div>
          License Detail
          <div>
            <label>Employee Name</label>
            <input name="eFirstname" onChange={handleInputChange} />
          </div>

          <div>
            <label>Contact Number</label>
            <input name="eMobile" onChange={handleInputChange} />
          </div>

          <div>
            <label>Email ID</label>
            <input name="eEmail" onChange={handleInputChange} />
            <label>Password: Pegasus@123</label>
          </div>

          <div>
            <label>Select Role</label>
            <select name="cRole" onChange={handleInputChange} >
              <option disabled selected >--Select--</option>
              {APICall.roleListAPIResponse.isLoading ? null : 
                APICall.roleListAPIResponse.isError ? null :
                  APICall.roleListAPIResponse.isSuccess ? (
                    APICall.roleListAPIResponse.data.success ? (
                      APICall.roleListAPIResponse.data.list.length > 0 ? (
                        <React.Fragment>
                          {
                              APICall.roleListAPIResponse.data.list.map((each: any, index: any) => (
                                <option key={index} value={each._id}>{each.aTitle}</option>
                              ))
                            }
                          </React.Fragment>
                        ) : []
                      ) : []
                    ) : []
                }
            </select>
          </div>


        </div>

        <button type="submit" >Submit</button>
      </form>

      <div>
        ----------------------------------------------------------
      </div> */}

      <>
        <TopNavBarTwoComponent />
        <MainContainer>
          <LeftContainer>
            <SidebarNavigation />
          </LeftContainer>
          <RightContainer>
            <BackButtonContainer>
            <BackButton onClick={() => navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.fUserRoute.aListRoute)} >
              ← Back
            </BackButton>

            </BackButtonContainer>
            <Heading>Add Employee</Heading>
            <FormContainer>
              <Label>Employee Name</Label>
              <Input
                type="text"
                name="eFirstname"
                value={formData.eFirstname}
                onChange={handleInputChange}
                placeholder="Enter employee name"
              />
              <Label>Contact Number</Label>
              <Input
                type="text"
                name="eMobile"
                value={formData.eMobile}
                onChange={handleInputChange}
                placeholder="Enter contact number"
              />
              <Label>Email ID (<small>Password: Pegasus@123</small>)</Label>
              <Input
                type="email"
                name="eEmail"
                value={formData.eEmail}
                onChange={handleInputChange}
                placeholder="Enter email ID"
              />
              <Label>Select Role</Label>
              <Select
                name="cRole"
                value={formData.cRole}
                onChange={handleInputChange}
              >
                <option disabled selected >--Select--</option>
                {APICall.roleListAPIResponse.isLoading ? null : 
                  APICall.roleListAPIResponse.isError ? null :
                    APICall.roleListAPIResponse.isSuccess ? (
                      APICall.roleListAPIResponse.data.success ? (
                        APICall.roleListAPIResponse.data.list.length > 0 ? (
                          <React.Fragment>
                            {
                              APICall.roleListAPIResponse.data.list.map((each: any, index: any) => (
                                <option key={index} value={each._id}>{each.aTitle}</option>
                              ))
                            }
                          </React.Fragment>
                        ) : []
                      ) : []
                    ) : []
                }
              </Select>

              <ButtonContainer>
                <SendMailButton onClick={handleSubmit}>
                  Create Employee
                </SendMailButton>
                {/* <SendMailButton onClick={() => "handleSendMail"}>
                  Send Joining Mail
                </SendMailButton> */}
                {/* <DeleteButton onClick={() => "handleDeleteEmployee"}>
                  Delete Employee
                </DeleteButton> */}
              </ButtonContainer>
            </FormContainer>
          </RightContainer>
        </MainContainer>
      </>


    </React.Fragment>
  )
}

export default UserCreatePage;
