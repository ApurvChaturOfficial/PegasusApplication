import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import fullRoute from "@/bLove/gRoute/bFullRoute";

import organizationAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/dOrganizationAPIEndpoints";
import serviceAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/fServiceAPIEndpoints";
import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import { Bounce, toast } from "react-toastify";
import apiResponseHandler from "./extras/aAPIResponseHandler";
import { AddNew, ButtonContainer, CancelButton, CityInfo, ContactInfo, ContactInput, Container, Dropdown, DropdownOption, ExpiryDate, FileInput, FileInputContainer, FileInputLabel, FinalTag, Form, InputHeading, InputHeadingp, IssueDate, MainHeading, RemoveButton, RowContainer, RowInput, SecondaryHeading, StateInfo, SubmitButton, UploadedFile } from "./style";
import enrolledServiceAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/iEnrolledServiceAPIEndpoints";
import handleImageDeleteForList from "@/bLove/dUtility/bImageForList/cHandleImageDeleteForList";
import handleImageCreateForList from "@/bLove/dUtility/bImageForList/aHandleImageCreateForList";
import handleImageUpdateForList from "@/bLove/dUtility/bImageForList/bHandleImageUpdateForList";
import licenseAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/eLicenseAPIEndpoints";
import fullRoute from "@/bLove/gRoute/bFullRoute";
// import fullRoute from "@/bLove/gRoute/bFullRoute";


const ServiceCreatePage = () => {
  // Variable
  const navigate = useNavigate();

  // State Variable
  const [organizationRetireve, setOrganizationRetireve] = useState({
    _id: "",

    cEnrolledService: [],

    dType: "",
    dPhoneNumber: "",
    dCompanyEmail: "",
    dAddress: "",
    dSelectedState: "",
    dSelectedCity: "",
    dPin: "",
    dPanNumber: "",
  })

  const [fileLoading, setFileLoading] = useState(false)
  const [formData, setFormData] = useState({
    cEnrolledService: [{
      cService: "",

      dLicenseNumber: "",
      dIssueDate: "",
      dExpiryDate: "",
      dUploadDate: "",
      dFileUploaded: null,
      dFileUploadedID: null,  
    }],
  })
  
  // Redux Call
  const ReduxCall = {
    state: useSelector((fullState: RootState) => fullState.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }

  // API Call
  const APICall = {
    updateAPITrigger: organizationAPIEndpoint.useOrganizationUpdateAPIMutation()[0],
    updateAPIResponse: organizationAPIEndpoint.useOrganizationUpdateAPIMutation()[1],

    // Requirements... Muaaah...
    serviceListAPIResponse: serviceAPIEndpoint.useServiceListAPIQuery(null),

    organizationListAPIResponse: organizationAPIEndpoint.useOrganizationListAPIQuery(null),

    organizationRetrieveAPITrigger: organizationAPIEndpoint.useLazyOrganizationRetrievePIQuery()[0],
    organizationRetrieveAPIResponse: organizationAPIEndpoint.useLazyOrganizationRetrievePIQuery()[1],

    enrolledServiceCreateAPITrigger: enrolledServiceAPIEndpoint.useEnrolledServiceCreateAPIMutation()[0],
    enrolledServiceCreateAPIResponse: enrolledServiceAPIEndpoint.useEnrolledServiceCreateAPIMutation()[1],

    licenseCreateAPITrigger: licenseAPIEndpoint.useLicenseCreateAPIMutation()[0],
    licenseCreateAPIResponse: licenseAPIEndpoint.useLicenseCreateAPIMutation()[1],
  }

  // Event Handlers
  // Handle Input Change
  const handleOrganizationInputChange = (event: any) => {
    const { value } = event.target;
    organizationRetrieveAPIHandler(value)
  };

  // Add License
  const addService = () => {
    setFormData({
      ...formData, cEnrolledService: [
        ...formData.cEnrolledService, {
          cService: "",
          dLicenseNumber: "",
          dIssueDate: "",
          dExpiryDate: "",
          dUploadDate: "",
          dFileUploaded: null,
          dFileUploadedID: null,      
        }
      ],
    });
  };

  // Remove License
  const removeService = (index: number) => {
    const updatedLicenses = formData.cEnrolledService.filter((_, i) => i !== index);
    setFormData({ ...formData, cEnrolledService: updatedLicenses });
  };

  // Handle Service Input Change
  const handleServiceInputChange = (event: any, index: number) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      const updatedEnrolledServices = (prevFormData.cEnrolledService.length > 0) ? [...(prevFormData as any).cEnrolledService] : [];
      
      updatedEnrolledServices[index] = {
        ...updatedEnrolledServices[index],
        [name]: value,
      };
  
      return {
        ...prevFormData,
        cEnrolledService: updatedEnrolledServices,
      };
    });
  };  
  
  // Submit handler
  const handleSubmit = (event: any) => {
    event.preventDefault();

    // console.log("formDataObj", formData);
    apiResponseHandler.updateAPIResponseHandler(formData, APICall.updateAPITrigger, navigate, APICall.enrolledServiceCreateAPITrigger, APICall.licenseCreateAPITrigger, organizationRetireve)
  };

  const organizationRetrieveAPIHandler = async (id: string) => {
    try {
      const serverResponse = await APICall.organizationRetrieveAPITrigger({ params: { _id: id } });

      // console.log(serverResponse)

      if (serverResponse.error && (serverResponse.error as any).originalStatus === 404) {
        return toast.error(("There was a problem with server connection."), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });
      } 
      
      if (serverResponse.error && (serverResponse.error as any)?.data?.success === false) {
        return toast.error(((serverResponse.error as any).data.message || "There was an error occured."), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });
      }

      if (serverResponse.data && serverResponse.data?.success === true) {
        toast.success((serverResponse.data.message), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });

        setOrganizationRetireve({
          ...organizationRetireve,

          _id: serverResponse.data.retrieve?._id, 
          
          cEnrolledService: serverResponse.data.retrieve?.cEnrolledService, 

          dType: serverResponse.data.retrieve?.dType,
          dPhoneNumber: serverResponse.data.retrieve?.dPhoneNumber,
          dCompanyEmail: serverResponse.data.retrieve?.dCompanyEmail,
          dAddress: serverResponse.data.retrieve?.dAddress,
          dSelectedState: serverResponse.data.retrieve?.dSelectedState,
          dSelectedCity: serverResponse.data.retrieve?.dSelectedCity,
          dPin: serverResponse.data.retrieve?.dPin,
          dPanNumber: serverResponse.data.retrieve?.dPanNumber,      
        })

        // return navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.aOrganizationRoute.aListRoute);
      }

      return;

    } catch (error: any) {
      return toast.error(("There was a problem with try block code"), {
        position: "bottom-right",
        autoClose: 5000,
        transition: Bounce,
      });
    }    

  }

  // All Render
  // Extra Render
  useEffect(() => {
    console.log(formData)
  }, [formData])

  // Extra Render
  useEffect(() => {
    console.log(organizationRetireve)
  }, [organizationRetireve])

  // JSX
  return (
    <React.Fragment>
      {/* ServiceCreatePage */}

      <>
        <TopNavBarComponent />
        <Container>
          <MainHeading>Add Service</MainHeading>
          <Form onSubmit={handleSubmit}>
            <div>
              <InputHeading>Select Your Firm</InputHeading>
              <Dropdown
                // value={Documents.selectedOrganization}
                onChange={handleOrganizationInputChange}
                name="cOrganization"
              >
                <DropdownOption selected disabled>
                  Select Organization
                </DropdownOption>
                {APICall.organizationListAPIResponse.isLoading ? null : 
                  APICall.organizationListAPIResponse.isError ? null :
                    APICall.organizationListAPIResponse.isSuccess ? (
                      APICall.organizationListAPIResponse.data.success ? (
                        APICall.organizationListAPIResponse.data.list.length > 0 ? (
                          <React.Fragment>
                            {
                              APICall.organizationListAPIResponse.data.list?.filter((each: any) => each.bCreatedBy?._id === (ReduxCall.state.receivedObject as any)?.ProfileRetrieve?._id).map((each: any, index: any) => (
                                <DropdownOption key={index} value={each._id}>
                                  {each.aTitle}
                                </DropdownOption>
                              ))
                            }
                          </React.Fragment>
                        ) : []
                      ) : []
                    ) : []
                }
              </Dropdown>
              <React.Fragment>
                <SecondaryHeading>Confirm Firm Details</SecondaryHeading>
                
                <InputHeading>Type of Firm</InputHeading>
                <RowInput
                  type="text"
                  placeholder="XXXX XXXX"
                  name="dType"
                  value={organizationRetireve.dType || ""}
                  disabled
                />

                <RowContainer>
                  <div>
                    <InputHeadingp>Phone</InputHeadingp>
                    <RowInput
                      type="text"
                      placeholder="XXXX XXXX"
                      name="dPhoneNumber"
                      value={organizationRetireve.dPhoneNumber || ""}
                      disabled
                    />
                  </div>

                  <div>
                    <InputHeading>Email</InputHeading>
                    <RowInput
                      type="text"
                      placeholder="XXXX XXXX"
                      name="dCompanyEmail"
                      value={organizationRetireve.dCompanyEmail || ""}
                      disabled
                    />
                  </div>
                </RowContainer>

                <InputHeading>Address</InputHeading>
                <RowInput
                  type="text"
                  placeholder="XXXX XXXX"
                  name="address"
                  value={organizationRetireve.dAddress || ""}
                  disabled
                />
                <ContactInfo>
                  <StateInfo>
                    <InputHeading>Select State</InputHeading>
                    <RowInput
                      type="text"
                      placeholder="XXXX XXXX"
                      name="address"
                      value={organizationRetireve.dSelectedState || ""}
                      disabled
                    />
                  </StateInfo>
                  <CityInfo>
                    <InputHeading>Select City</InputHeading>

                    <RowInput
                      type="text"
                      placeholder="XXXX XXXX"
                      name="address"
                      value={organizationRetireve.dSelectedCity || ""}
                      disabled
                    />
                  </CityInfo>
                </ContactInfo>
            
                <RowContainer>
                  <div>
                    <InputHeadingp>Enter Pin Code</InputHeadingp>
                    <RowInput
                      type="text"
                      placeholder="XXXX XXXX"
                      name="phone"
                      value={organizationRetireve.dPin}
                      disabled
                    />
                  </div>

                  <div>
                    <InputHeading>Enter PAN Card Number</InputHeading>
                    <RowInput
                      type="text"
                      placeholder="XXXX XXXX"
                      name="email"
                      value={organizationRetireve.dPanNumber}
                      disabled
                    />
                  </div>
                </RowContainer>
              </React.Fragment>

              <br/>
              <br/>

              <SecondaryHeading>Add Services</SecondaryHeading>

              {formData.cEnrolledService.map((each, index: any) => (
                <React.Fragment>
                  <div>
                    <InputHeading style={{ color: "tomato", display: "flex", justifyContent: "space-between", alignItems: "center" }} >
                      Service {index + 1}

                      <RemoveButton type="button" onClick={() => removeService(index)}>
                        Remove
                      </RemoveButton>
                    </InputHeading>
                    <InputHeading>Select Service</InputHeading>
                    <Dropdown
                      onChange={(e) => handleServiceInputChange(e, index)}
                      name="cService"
                    >
                      <DropdownOption selected disabled>
                        Select Service
                      </DropdownOption>
                      {APICall.serviceListAPIResponse.isLoading ? null : 
                        APICall.serviceListAPIResponse.isError ? null :
                          APICall.serviceListAPIResponse.isSuccess ? (
                            APICall.serviceListAPIResponse.data.success ? (
                              APICall.serviceListAPIResponse.data.list.length > 0 ? (
                                <React.Fragment>
                                  {
                                    APICall.serviceListAPIResponse.data.list?.map((each: any, index: any) => (
                                      <DropdownOption key={index} value={each._id}>
                                        {each.aTitle}
                                      </DropdownOption>
                                    ))
                                  }
                                </React.Fragment>
                              ) : []
                            ) : []
                          ) : []
                      }
                    </Dropdown>
    
                    <InputHeading>Enter License Number</InputHeading>
                      <RowInput
                        type="text"
                        placeholder="Enter License ID Number"
                        name="dLicenseNumber"
                        value={each.dLicenseNumber}
                        onChange={(e) => handleServiceInputChange(e, index)}
                      />
                    
                    <FinalTag>
                      <IssueDate>
                        <InputHeading>Issue Date</InputHeading>
                        <ContactInput
                          type="date"
                          placeholder="Issue Date"
                          name="dIssueDate"
                          value={each.dIssueDate}
                          onChange={(e) => handleServiceInputChange(e, index)}
                        />
                      </IssueDate>
                      { <ExpiryDate>
                        <InputHeading>Expiry Date</InputHeading>
                        <ContactInput
                          type="date"
                          placeholder="Expiry Date"
                          name="dExpiryDate"
                          value={each.dExpiryDate}
                          onChange={(e) => handleServiceInputChange(e, index)}
                        />
                      </ExpiryDate> }
                    </FinalTag>
                    
                    <InputHeading>Upload Scan Copy</InputHeading>

                    {/* --------------------------------------------------------------- */}
                    <FileInputContainer>
                      <div style={{ display: "flex", flexDirection: "column" }} >
                        {formData.cEnrolledService?.[index]?.dFileUploaded && <img style={{ 
                            height: "70px", 
                            objectFit: "cover"
                        }} src={formData.cEnrolledService?.[index]?.dFileUploaded} />}
                        {formData.cEnrolledService?.[index]?.dFileUploaded && <FileInputLabel htmlFor={`fileUpdate${index}`}>{fileLoading ? "Loading..." : "Change File"}</FileInputLabel>}
                        {formData.cEnrolledService?.[index]?.dFileUploaded && (
                          <FileInputLabel 
                            style={{ color: "tomato" }}
                            onClick={() => handleImageDeleteForList(index, "cEnrolledService", "dFileUploaded", "dFileUploadedID", setFormData, setFileLoading, formData.cEnrolledService?.[index]?.dFileUploadedID)} 
                          >{fileLoading ? "Loading..." : "Remove File"}</FileInputLabel>
                        )}
                      </div>
                      {!formData.cEnrolledService?.[index]?.dFileUploaded && <FileInputLabel htmlFor={`fileInput${index}`}>{fileLoading ? "Loading..." : "Choose File"}</FileInputLabel>}
                      <FileInput
                        type="file"
                        id={`fileInput${index}`}
                        disabled={fileLoading}
                        onChange={(event: any) => handleImageCreateForList(event, index, "cEnrolledService", "dFileUploaded", "dFileUploadedID", setFormData, setFileLoading)}
                        name="file"
                      />
                      <FileInput
                        type="file"
                        id={`fileUpdate${index}`}
                        disabled={fileLoading}
                        onChange={(event: any) => handleImageUpdateForList(event, index, "cEnrolledService", "dFileUploaded", "dFileUploadedID", setFormData, setFileLoading, formData.cEnrolledService?.[index]?.dFileUploadedID)}
                        name="file"
                      />
                    </FileInputContainer>
                    {formData.cEnrolledService?.[index]?.dFileUploaded && <UploadedFile>Uploaded File: {(
                      <a
                        href={formData.cEnrolledService?.[index]?.dFileUploaded || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {formData.cEnrolledService?.[index]?.dFileUploaded}
                      </a> 
                    )}</UploadedFile>}
                    {/* --------------------------------------------------------------- */}


                    <IssueDate>
                      <InputHeading>Date of Upload</InputHeading>
                      <RowInput
                        type="date"
                        name="dUploadDate"
                        value={each.dUploadDate}
                        onChange={(e) => handleServiceInputChange(e, index)}
                      />
                    </IssueDate>
                  </div>
                </React.Fragment>
              
              ))}
              <AddNew type="button" onClick={addService}>
                Add New
              </AddNew>              
            </div>

            <>
              <ButtonContainer>
                <SubmitButton type="submit" onClick={handleSubmit}>Submit</SubmitButton>
                <CancelButton type="button" onClick={() => navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.cServiceRoute.aListRoute)}>
                  Cancel
                </CancelButton>
              </ButtonContainer>
            </>
          </Form>
        </Container>
      </>

    </React.Fragment>
  )
}

export default ServiceCreatePage;
