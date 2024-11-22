import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import fullRoute from "@/bLove/gRoute/bFullRoute";

// import licenseAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/eLicenseAPIEndpoints";
// import organizationAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/dOrganizationAPIEndpoints";
import apiResponseHandler from "./extras/aAPIResponseHandler";
// import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import { BackButton, BackButtonContainer, ButtonContainer, DeleteButton, FormContainer, Heading, Input, Label, LeftContainer, MainContainer, RightContainer, Select, SendMailButton } from "./style";
import SidebarNavigation from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/outlet/bSidebarComponent/component/SidebarNavigation/SidebarNavigation";
import userAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/bUserAdministration/aUserAPIEndpoints";
import roleAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/bUserAdministration/bRoleAPIEndpoints";
import TopNavBarTwoComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarTwoComponent";


const UserUpdatePage = () => {
  // Variable
  const navigate = useNavigate();
  const { id } = useParams();

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
    retrieveAPIResponse: userAPIEndpoint.useUserRetrievePIQuery({ params: { _id: id } }),
    updateAPITrigger: userAPIEndpoint.useUserUpdateAPIMutation()[0],
    updateAPIResponse: userAPIEndpoint.useUserUpdateAPIMutation()[1],

    deleteAPITrigger: userAPIEndpoint.useUserDeleteAPIMutation()[0],
    deleteAPIResponse: userAPIEndpoint.useUserDeleteAPIMutation()[1],

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
    apiResponseHandler.updateAPIResponseHandler(formData, APICall.updateAPITrigger, navigate, { id: id })
  };

  const handleSubmit2 = (event: any) => {
    event.preventDefault();

    apiResponseHandler.deleteAPIResponseHandler(formData, APICall.deleteAPITrigger, navigate, { id: id })
  };


  // All Render
  // First Render
  useEffect(() => {
    APICall.retrieveAPIResponse.isLoading ? null : 
    APICall.retrieveAPIResponse.isError ? null :
    APICall.retrieveAPIResponse.isSuccess ? (
      APICall.retrieveAPIResponse.data.success ? (
        setFormData({
          cRole: APICall.retrieveAPIResponse.data.retrieve.cRole?._id,
          
          eFirstname: APICall.retrieveAPIResponse.data.retrieve.eFirstname,
          eMobile: APICall.retrieveAPIResponse.data.retrieve.eMobile,
          eEmail: APICall.retrieveAPIResponse.data.retrieve.eEmail
        })
      ) : null
    ) : null
  }, [APICall.retrieveAPIResponse])
  

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
      {/* UserUpdatePage */}

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
                      License Detail
                      <div>
                        <label>Select Organization</label>
                        <select name="cOrganization" onChange={(event => handleInputChange(event))} >
                          <option disabled selected >--Select--</option>
                          {APICall.organizationListAPIResponse.isLoading ? null : 
                            APICall.organizationListAPIResponse.isError ? null :
                              APICall.organizationListAPIResponse.isSuccess ? (
                                APICall.organizationListAPIResponse.data.success ? (
                                  APICall.organizationListAPIResponse.data.list.length > 0 ? (
                                    <React.Fragment>
                                      {
                                        APICall.organizationListAPIResponse.data.list?.filter((each: any) => each.bCreatedBy?._id === (ReduxCall.state.receivedObject as any)?.ProfileRetrieve?._id).map((each: any, index: any) => (
                                          <option key={index} selected={each._id === (formData.cOrganization as any)?._id} value={each._id}>{each.dName}</option>
                                        ))
                                      }
                                    </React.Fragment>
                                  ) : []
                                ) : []
                              ) : []
                          }
                        </select>
                      </div>

                      <div>
                        <label>Select License</label>
                        <select name="dSelectedLicense" onChange={(event => handleInputChange(event))} >
                          <option disabled selected >--Select--</option>
                          <option value="Licence 1" selected={"Licence 1" === formData.dSelectedLicense} >License 1</option>
                          <option value="Licence 2" selected={"Licence 2" === formData.dSelectedLicense} >License 2</option>
                          <option value="Licence 3" selected={"Licence 3" === formData.dSelectedLicense} >License 3</option>
                          <option value="Licence 4" selected={"Licence 4" === formData.dSelectedLicense} >License 4</option>
                        </select>
                      </div>

                      <div>
                        <label>License Number</label>
                        <input name="dLicenseNumber" value={formData.dLicenseNumber} onChange={(event => handleInputChange(event))} />
                      </div>

                      <div>
                        <label>Issued Date</label>
                        <input name="dIssueDate" value={formData.dIssueDate} onChange={(event => handleInputChange(event))} />
                      </div>

                      <div>
                        <label>Expiry Date</label>
                        <input name="dExpiryDate" value={formData.dExpiryDate} onChange={(event => handleInputChange(event))} />
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
        -----------------------------------
      </div> */}

      <>
        <TopNavBarTwoComponent />
        <MainContainer>
          <LeftContainer>
            <SidebarNavigation/>
          </LeftContainer>
          <RightContainer>
            <BackButtonContainer>
            <BackButton onClick={() => navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.fUserRoute.aListRoute)} >
              ← Back
            </BackButton>

            </BackButtonContainer>
            <Heading>Edit Employee</Heading>

            {
              APICall.retrieveAPIResponse.isLoading ? "Loading..." : 
              APICall.retrieveAPIResponse.isError ? "Error..." :
              APICall.retrieveAPIResponse.isSuccess ? (
                <React.Fragment>
                  {
                    APICall.retrieveAPIResponse.data.success ? (
                      <React.Fragment>
                        <FormContainer>
                          <Label>Employee Name</Label>
                          <Input
                            type="text"
                            name="eFirstname"
                            value={formData.eFirstname}
                            onChange={handleInputChange}
                            placeholder="Enter employee name"
                            disabled
                          />
                          <Label>Contact Number</Label>
                          <Input
                            type="text"
                            name="eMobile"
                            value={formData.eMobile}
                            onChange={handleInputChange}
                            placeholder="Enter contact number"
                            disabled
                          />
                          <Label>Email ID</Label>
                          <Input
                            type="email"
                            name="eEmail"
                            value={formData.eEmail}
                            onChange={handleInputChange}
                            placeholder="Enter email ID"
                            disabled
                          />
                          <Label>Select Role</Label>
                          <Select
                            name="cRole"
                            value={formData.cRole}
                            onChange={handleInputChange}
                            disabled={(
                              APICall.retrieveAPIResponse.data.retrieve.eEmail === "shraddha.kapoor@pegasus.com" || 
                              APICall.retrieveAPIResponse.data.retrieve.eEmail === "anushka.sharma@pegasus.com" || 
                              APICall.retrieveAPIResponse.data.retrieve.eEmail === "kangana.ranawat@pegasus.com"
                            )}
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

                          {
                            (
                              APICall.retrieveAPIResponse.data.retrieve.eEmail === "shraddha.kapoor@pegasus.com" || 
                              APICall.retrieveAPIResponse.data.retrieve.eEmail === "anushka.sharma@pegasus.com" || 
                              APICall.retrieveAPIResponse.data.retrieve.eEmail === "kangana.ranawat@pegasus.com"
                            ) ? null : (
                              <ButtonContainer>
                                <SendMailButton onClick={handleSubmit}>
                                  Edit Employee
                                </SendMailButton>
                                <SendMailButton disabled onClick={() => "handleSendMail"}>
                                  Send Joining Mail
                                </SendMailButton>
                                <DeleteButton onClick={handleSubmit2}>
                                  Delete Employee
                                </DeleteButton>
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

export default UserUpdatePage;
