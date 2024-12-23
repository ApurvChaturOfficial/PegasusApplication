import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
// import fullRoute from "@/bLove/gRoute/bFullRoute";

import licenseAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/eLicenseAPIEndpoints";
import organizationAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/dOrganizationAPIEndpoints";
import apiResponseHandler from "./extras/aAPIResponseHandler";

import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import { ButtonContainer, CancelButton, ContactInput, Container, Dropdown, DropdownOption, ExpiryDate, FileInput, FileInputContainer, FileInputLabel, FinalTag, Form, Input, InputHeading, IssueDate, MainHeading, SubmitButton, UploadedFile } from "./style";
import allLicenseType from "@/bLove/hAsset/data/allLicenseType";
import handleImageDeleteForObject from "@/bLove/dUtility/aImageForObject/cHandleImageDeleteForObject";
import handleImageCreateForObject from "@/bLove/dUtility/aImageForObject/aHandleImageCreateForObject";
import handleImageUpdateForObject from "@/bLove/dUtility/aImageForObject/bHandleImageUpdateForObject";
import fullRoute from "@/bLove/gRoute/bFullRoute";


const LicenseCreatePage = () => {
  // Variable
  const navigate = useNavigate();

  // State Variable
  const [fileLoading, setFileLoading] = useState(false)
  const [formData, setFormData] = useState({
    cOrganization: "",

    dSelectedLicense: "",
    dLicenseNumber: "",
    dIssueDate: "",
    dExpiryDate: "",
    dFileUploaded: null,
    dFileUploadedID: null,
  })

  // Redux Call
  const ReduxCall = {
    state: useSelector((fullState: RootState) => fullState.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }

  // API Call
  const APICall = {
    createAPITrigger: licenseAPIEndpoint.useLicenseCreateAPIMutation()[0],
    createAPIResponse: licenseAPIEndpoint.useLicenseCreateAPIMutation()[1],

    // Requirements... Muaaah...
    organizationListAPIResponse: organizationAPIEndpoint.useOrganizationListAPIQuery(null),

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

    // console.log("formDataObj", formData);
    apiResponseHandler.createAPIResponseHandler(formData, APICall.createAPITrigger, navigate)
  };

  // All Render
  // Extra Render
  useEffect(() => {
    console.log(formData)
  }, [formData])

  // JSX
  return (
    <React.Fragment>
      {/* LicenseCreatePage */}

      <>
        <TopNavBarComponent />
        <Container>
          <MainHeading>Add License</MainHeading>
          <Form onSubmit={handleSubmit}>
            {/* {formData.licenses.map((license, index) => ( */}
              <div>
                <InputHeading>Select Organization</InputHeading>
                <Dropdown
                  value={formData.cOrganization}
                  onChange={handleInputChange}
                  name="cOrganization"
                >
                  <DropdownOption value="" disabled>
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
                                  <DropdownOption
                                    key={index}
                                    value={each._id}
                                  >
                                    {each.dName}
                                  </DropdownOption>                                
                                ))
                              }
                            </React.Fragment>
                          ) : []
                        ) : []
                      ) : []
                  }
                </Dropdown>

                <InputHeading>Select License</InputHeading>
                <Dropdown
                  name="dSelectedLicense"
                  value={formData.dSelectedLicense}
                  onChange={handleInputChange}
                >
                  <DropdownOption value="" disabled>
                    Select License
                  </DropdownOption>
                  {allLicenseType.map((each) => (
                    <DropdownOption key={each} value={each} >
                      {each}
                    </DropdownOption>
                  ))}
                </Dropdown>
                <InputHeading>Enter License Number</InputHeading>
                <Input
                  type="text"
                  placeholder="License Number"
                  name="dLicenseNumber"
                  value={formData.dLicenseNumber}
                  onChange={handleInputChange}
                />
                <FinalTag>
                  <IssueDate>
                    <InputHeading>Issue Date</InputHeading>
                    <ContactInput
                      type="date"
                      placeholder="Issue Date"
                      name="dIssueDate"
                      value={formData.dIssueDate}
                      onChange={handleInputChange}
                    />
                  </IssueDate>
                  <ExpiryDate>
                    <InputHeading>Expiry Date</InputHeading>
                    <ContactInput
                      type="date"
                      placeholder="Expiry Date"
                      name="dExpiryDate"
                      value={formData.dExpiryDate}
                      onChange={handleInputChange}
                    />
                  </ExpiryDate>
                </FinalTag>
                <InputHeading>Upload Scan Copy License</InputHeading>

                {/* --------------------------------------------------------------- */}
                <FileInputContainer>
                  <div style={{ display: "flex", flexDirection: "column" }} >
                    {formData.dFileUploaded && <img style={{ 
                        height: "70px", 
                        objectFit: "cover"
                    }} src={formData.dFileUploaded} />}
                    {formData.dFileUploaded && <FileInputLabel htmlFor="fileUpdate">{fileLoading ? "Loading..." : "Change File"}</FileInputLabel>}
                    {formData.dFileUploaded && (
                      <FileInputLabel 
                        style={{ color: "tomato" }}
                        onClick={() => handleImageDeleteForObject("dFileUploaded", "dFileUploadedID", setFormData, setFileLoading, formData.dFileUploadedID)} 
                      >{fileLoading ? "Loading..." : "Remove File"}</FileInputLabel>
                    )}
                  </div>
                  {!formData.dFileUploaded && <FileInputLabel htmlFor="fileInput">{fileLoading ? "Loading..." : "Choose File"}</FileInputLabel>}
                  <FileInput
                    type="file"
                    id="fileInput"
                    disabled={fileLoading}
                    onChange={(event: any) => handleImageCreateForObject(event, "dFileUploaded", "dFileUploadedID", setFormData, setFileLoading)}
                    name="file"
                  />
                  <FileInput
                    type="file"
                    id="fileUpdate"
                    disabled={fileLoading}
                    onChange={(event: any) => handleImageUpdateForObject(event, "dFileUploaded", "dFileUploadedID", setFormData, setFileLoading, formData.dFileUploadedID)}
                    name="file"
                  />
                </FileInputContainer>
                {formData.dFileUploaded && <UploadedFile>Uploaded File: {(
                  <a
                    href={formData.dFileUploaded || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {formData.dFileUploaded}
                  </a> 
                )}</UploadedFile>}
                {/* --------------------------------------------------------------- */}

              </div>
            {/* // ))} */}
            <>
              {/* <TopButtonContainer>
                <AddNew type="button" onClick={addNewLicense}>
                  Add New
                </AddNew>
              </TopButtonContainer> */}
              <ButtonContainer>
                <SubmitButton type="submit" onClick={handleSubmit}>
                  Submit
                </SubmitButton>
                <CancelButton type="button" onClick={() => navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.bLicenseRoute.aListRoute)}>
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

export default LicenseCreatePage;
