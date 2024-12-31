import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import fullRoute from "@/bLove/gRoute/bFullRoute";

import organizationAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/dOrganizationAPIEndpoints";
import licenseAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/eLicenseAPIEndpoints";
import serviceAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/fServiceAPIEndpoints";
import enrolledServiceAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/iEnrolledServiceAPIEndpoints";
import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import handleImageCreateForList from "@/bLove/dUtility/bImageForList/aHandleImageCreateForList";
import handleImageUpdateForList from "@/bLove/dUtility/bImageForList/bHandleImageUpdateForList";
import handleImageDeleteForList from "@/bLove/dUtility/bImageForList/cHandleImageDeleteForList";
import fullRoute from "@/bLove/gRoute/bFullRoute";
import { FileIcon } from "lucide-react";
import { Bounce, toast } from "react-toastify";
import apiResponseHandler from "./extras/aAPIResponseHandler";
import { AddNew, ButtonContainer, CancelButton, CityInfo, ContactInfo, ContactInput, Container, Dropdown, DropdownOption, ExpiryDate, FileInput, FileInputContainer, FileInputLabel, FinalTag, Form, InputHeading, InputHeadingp, IssueDate, MainHeading, RemoveButton, RowContainer, RowInput, SecondaryHeading, StateInfo, SubmitButton, UploadedFile } from "./style";
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
  const organizationList = organizationAPIEndpoint.useOrganizationListAPIQuery(null)
  const organizationLazyRetrieve = organizationAPIEndpoint.useLazyOrganizationRetrievePIQuery()

  const organizationUpdateAPI = organizationAPIEndpoint.useOrganizationUpdateAPIMutation();
  const enrolledServiceCreateAPI = enrolledServiceAPIEndpoint.useEnrolledServiceCreateAPIMutation();
  const licenseCreateAPI = licenseAPIEndpoint.useLicenseCreateAPIMutation();

  const APICall = {
    updateAPITrigger: organizationUpdateAPI[0],
    updateAPIResponse: organizationUpdateAPI[1],

    // Requirements... Muaaah...
    serviceListAPIResponse: serviceAPIEndpoint.useServiceListAPIQuery(null),

    organizationListAPIResponse: organizationList,

    organizationRetrieveAPITrigger: organizationLazyRetrieve[0],
    organizationRetrieveAPIResponse: organizationLazyRetrieve[1],

    enrolledServiceCreateAPITrigger: enrolledServiceCreateAPI[0],
    enrolledServiceCreateAPIResponse: enrolledServiceCreateAPI[1],

    licenseCreateAPITrigger: licenseCreateAPI[0],
    licenseCreateAPIResponse: licenseCreateAPI[1],
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
                  --Select Organization--
                </DropdownOption>
                {APICall.organizationListAPIResponse.isLoading ? (
                  <DropdownOption selected disabled>
                    Loading...
                  </DropdownOption>
                ) : 
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
                  placeholder={(APICall.organizationRetrieveAPIResponse.isLoading || APICall.organizationRetrieveAPIResponse.isFetching) ? "Loading..." : "XXXX XXXX"}
                  name="dType"
                  value={(APICall.organizationRetrieveAPIResponse.isLoading || APICall.organizationRetrieveAPIResponse.isFetching) ? "Loading..." : organizationRetireve.dType || ""}
                  disabled
                />

                <RowContainer>
                  <div>
                    <InputHeadingp>Phone</InputHeadingp>
                    <RowInput
                      type="text"
                      placeholder={(APICall.organizationRetrieveAPIResponse.isLoading || APICall.organizationRetrieveAPIResponse.isFetching) ? "Loading..." : "XXXX XXXX"}
                      name="dPhoneNumber"
                      value={(APICall.organizationRetrieveAPIResponse.isLoading || APICall.organizationRetrieveAPIResponse.isFetching) ? "Loading..." : organizationRetireve.dPhoneNumber || ""}
                      disabled
                    />
                  </div>

                  <div>
                    <InputHeading>Email</InputHeading>
                    <RowInput
                      type="text"
                      placeholder={(APICall.organizationRetrieveAPIResponse.isLoading || APICall.organizationRetrieveAPIResponse.isFetching) ? "Loading..." : "XXXX XXXX"}
                      name="dCompanyEmail"
                      value={(APICall.organizationRetrieveAPIResponse.isLoading || APICall.organizationRetrieveAPIResponse.isFetching) ? "Loading..." : organizationRetireve.dCompanyEmail || ""}
                      disabled
                    />
                  </div>
                </RowContainer>

                <InputHeading>Address</InputHeading>
                <RowInput
                  type="text"
                  placeholder={(APICall.organizationRetrieveAPIResponse.isLoading || APICall.organizationRetrieveAPIResponse.isFetching) ? "Loading..." : "XXXX XXXX"}
                  name="address"
                  value={(APICall.organizationRetrieveAPIResponse.isLoading || APICall.organizationRetrieveAPIResponse.isFetching) ? "Loading..." : organizationRetireve.dAddress || ""}
                  disabled
                />
                <ContactInfo>
                  <StateInfo>
                    <InputHeading>Select State</InputHeading>
                    <RowInput
                      type="text"
                      placeholder={(APICall.organizationRetrieveAPIResponse.isLoading || APICall.organizationRetrieveAPIResponse.isFetching) ? "Loading..." : "XXXX XXXX"}
                      name="address"
                      value={(APICall.organizationRetrieveAPIResponse.isLoading || APICall.organizationRetrieveAPIResponse.isFetching) ? "Loading..." : organizationRetireve.dSelectedState || ""}
                      disabled
                    />
                  </StateInfo>
                  <CityInfo>
                    <InputHeading>Select City</InputHeading>

                    <RowInput
                      type="text"
                      placeholder={(APICall.organizationRetrieveAPIResponse.isLoading || APICall.organizationRetrieveAPIResponse.isFetching) ? "Loading..." : "XXXX XXXX"}
                      name="address"
                      value={(APICall.organizationRetrieveAPIResponse.isLoading || APICall.organizationRetrieveAPIResponse.isFetching) ? "Loading..." : organizationRetireve.dSelectedCity || ""}
                      disabled
                    />
                  </CityInfo>
                </ContactInfo>
            
                <RowContainer>
                  <div>
                    <InputHeadingp>Enter Pin Code</InputHeadingp>
                    <RowInput
                      type="text"
                      placeholder={(APICall.organizationRetrieveAPIResponse.isLoading || APICall.organizationRetrieveAPIResponse.isFetching) ? "Loading..." : "XXXX XXXX"}
                      name="phone"
                      value={(APICall.organizationRetrieveAPIResponse.isLoading || APICall.organizationRetrieveAPIResponse.isFetching) ? "Loading..." : organizationRetireve.dPin || ""}
                      disabled
                    />
                  </div>

                  <div>
                    <InputHeading>Enter PAN Card Number</InputHeading>
                    <RowInput
                      type="text"
                      placeholder={(APICall.organizationRetrieveAPIResponse.isLoading || APICall.organizationRetrieveAPIResponse.isFetching) ? "Loading..." : "XXXX XXXX"}
                      name="email"
                      value={(APICall.organizationRetrieveAPIResponse.isLoading || APICall.organizationRetrieveAPIResponse.isFetching) ? "Loading..." : organizationRetireve.dPanNumber || ""}
                      disabled
                    />
                  </div>
                </RowContainer>
              </React.Fragment>

              <br/>
              <br/>

              <div style={{ display: "flex", alignItems: "flex-end", gap: "6px" }} >
                <SecondaryHeading>Add Services</SecondaryHeading>
                {!organizationRetireve?._id && <span style={{ marginBottom: "9px", color: "tomato" }} ><em>(Select Firm, before adding licenses)</em></span>}
              </div>

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
                      disabled={!organizationRetireve?._id}
                    >
                      <DropdownOption selected disabled>
                        --Select Service--
                      </DropdownOption>
                      {APICall.serviceListAPIResponse.isLoading ? null : 
                        APICall.serviceListAPIResponse.isError ? null :
                          APICall.serviceListAPIResponse.isSuccess ? (
                            APICall.serviceListAPIResponse.data.success ? (
                              APICall.serviceListAPIResponse.data.list.length > 0 ? (
                                <React.Fragment>
                                  {
                                    APICall.serviceListAPIResponse.data.list?.
                                      filter((each : any) => each.dFormType === organizationRetireve.dType)?.
                                      map((each: any, index: any) => (
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
                        disabled={!organizationRetireve?._id}
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
                          disabled={!organizationRetireve?._id}
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
                          disabled={!organizationRetireve?._id}
                        />
                      </ExpiryDate> }
                    </FinalTag>
                    
                    <InputHeading>Upload Scan Copy</InputHeading>

                    {/* --------------------------------------------------------------- */}
                    <FileInputContainer>
                      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
                        {formData.cEnrolledService?.[index]?.dFileUploaded && !fileLoading && (
                          <>
                            {(formData.cEnrolledService?.[index]?.dFileUploaded as any).match(/\.(jpeg|jpg|png)$/i) ? (
                              <img
                                style={{
                                  height: "70px",
                                  objectFit: "cover",
                                }}
                                src={formData.cEnrolledService?.[index]?.dFileUploaded}
                                alt="Preview"
                              />
                            ) : <FileIcon size={"50px"} />}
                          </>                    
                        )}
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
                        disabled={fileLoading || !organizationRetireve?._id}
                        onChange={(event: any) => handleImageCreateForList(event, index, "cEnrolledService", "dFileUploaded", "dFileUploadedID", setFormData, setFileLoading)}
                        name="file"
                      />
                      <FileInput
                        type="file"
                        id={`fileUpdate${index}`}
                        disabled={fileLoading || !organizationRetireve?._id}
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
                        disabled={!organizationRetireve?._id}
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
                <SubmitButton 
                  type="submit" 
                  onClick={handleSubmit}
                  disabled={
                    fileLoading ||
                    APICall.updateAPIResponse.isLoading ||
                    APICall.licenseCreateAPIResponse.isLoading ||
                    APICall.enrolledServiceCreateAPIResponse.isLoading
                  }
                >{(
                    fileLoading ||
                    APICall.updateAPIResponse.isLoading ||
                    APICall.licenseCreateAPIResponse.isLoading ||
                    APICall.enrolledServiceCreateAPIResponse.isLoading 
                  ) ? 
                  "Loading..." : "Submit"
                }</SubmitButton>
                <CancelButton 
                  type="button" 
                  onClick={() => navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.cServiceRoute.aListRoute)}
                  disabled={
                    fileLoading ||
                    APICall.updateAPIResponse.isLoading ||
                    APICall.licenseCreateAPIResponse.isLoading ||
                    APICall.enrolledServiceCreateAPIResponse.isLoading 
                  }
                >{(
                    fileLoading ||
                    APICall.updateAPIResponse.isLoading ||
                    APICall.licenseCreateAPIResponse.isLoading ||
                    APICall.enrolledServiceCreateAPIResponse.isLoading
                  ) ? 
                  "Loading..." : "Cancel"
                }</CancelButton>
              </ButtonContainer>
            </>
          </Form>
        </Container>
      </>

    </React.Fragment>
  )
}

export default ServiceCreatePage;
