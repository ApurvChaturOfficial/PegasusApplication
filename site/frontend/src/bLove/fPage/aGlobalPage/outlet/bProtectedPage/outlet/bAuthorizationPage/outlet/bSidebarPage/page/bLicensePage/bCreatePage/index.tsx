import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import fullRoute from "@/bLove/gRoute/bFullRoute";

import organizationAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/dOrganizationAPIEndpoints";
import licenseAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/eLicenseAPIEndpoints";
import apiResponseHandler from "./extras/aAPIResponseHandler";

import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import handleImageCreateForObject from "@/bLove/dUtility/aImageForObject/aHandleImageCreateForObject";
import handleImageUpdateForObject from "@/bLove/dUtility/aImageForObject/bHandleImageUpdateForObject";
import handleImageDeleteForObject from "@/bLove/dUtility/aImageForObject/cHandleImageDeleteForObject";
import fullRoute from "@/bLove/gRoute/bFullRoute";
import allCategoryType from "@/bLove/hAsset/data/allCategoryType";
import firmBasedLicenseType from "@/bLove/hAsset/data/firmBasedLicenseType";
import { FileIcon } from "lucide-react";
import { ButtonContainer, CancelButton, ContactInput, Container, Dropdown, Dropdown1, DropdownOption, ExpiryDate, FileInput, FileInputContainer, FileInputLabel, FinalTag, Form, Input, InputHeading, IssueDate, MainHeading, SubmitButton, UploadedFile } from "./style";


const LicenseCreatePage = () => {
  // Variable
  const navigate = useNavigate();

  // State Variable
  const [fileLoading, setFileLoading] = useState(false)
  const [formData, setFormData] = useState({
    cOrganization: "",

    dSelectedLicense: "",
    dLicenseNumber: "",
    dCategory: "",
    dOwnLoan: "",
    dIssueDate: "",
    dExpiryDate: "",
    dFileUploaded: null,
    dFileUploadedID: null,
  })
  const [organziationType, setOrganziationType] = useState("")

  // Redux Call
  const ReduxCall = {
    state: useSelector((fullState: RootState) => fullState.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }

  // API Call
  const licenseAPI = licenseAPIEndpoint.useLicenseCreateAPIMutation();
  const organziationAPI = organizationAPIEndpoint.useOrganizationListAPIQuery(null)

  const APICall = {
    createAPITrigger: licenseAPI[0],
    createAPIResponse: licenseAPI[1],

    // Requirements... Muaaah...
    organizationListAPIResponse: organziationAPI,

  }

  // Event Handlers
  // Handle Input Change
  const handleOrganizationInputChange = (event: any) => {
    const { name, value } = event.target;

    const selectedOrganization = APICall.organizationListAPIResponse?.data?.list?.find(
      (each: any) => each._id === value
    );

    setFormData({ ...formData, [name]: value });
    setOrganziationType(selectedOrganization?.dType)
  };
  
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
                  onChange={handleOrganizationInputChange}
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

                <InputHeading>Select License <em style={{ color: "tomato" }} >{organziationType ? `(Firm Type: ${organziationType})` : "(Select Firm Type for Options)"}</em></InputHeading>
                <Dropdown
                  name="dSelectedLicense"
                  value={formData.dSelectedLicense}
                  onChange={handleInputChange}
                >
                  <DropdownOption value="" disabled>
                    Select License
                  </DropdownOption>
                  {
                    firmBasedLicenseType?.
                      filter(each => each.firm === organziationType)[0]?.
                      license?.
                      map(each => (
                        <DropdownOption
                          key={each}
                          value={each}
                        >
                          {each}
                        </DropdownOption>
                      ))
                  }
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
                    <InputHeading>Category</InputHeading>
                    <Dropdown1
                      onChange={handleInputChange}
                      name="dCategory"
                    >
                      <DropdownOption selected disabled>
                        Select Category
                      </DropdownOption>
                      {
                        allCategoryType.map(each => (
                          <DropdownOption
                            key={each}
                            value={each}
                          >
                            {each}
                          </DropdownOption>
                        ))
                      }
                    </Dropdown1>
                  </IssueDate>
                  <ExpiryDate>
                    <InputHeading>Own / Loan</InputHeading>
                    <Dropdown1
                      onChange={handleInputChange}
                      name="dOwnLoan"
                    >
                      <DropdownOption selected disabled>
                        Select
                      </DropdownOption>
                      <DropdownOption value="Own" >Own</DropdownOption>
                      <DropdownOption value="Loan" >Loan</DropdownOption>
                    </Dropdown1>
                  </ExpiryDate>
                </FinalTag>

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
                
                <InputHeading>Upload Scan Copy License <em style={{ color: "tomato" }} >(.pdf, .doc, .docx, .jpg, .jpeg, .png)</em></InputHeading> 

                {/* --------------------------------------------------------------- */}
                <FileInputContainer>
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
                    {formData.dFileUploaded && !fileLoading && (
                      <>
                        {(formData.dFileUploaded as any).match(/\.(jpeg|jpg|png)$/i) ? (
                          <img
                            style={{
                              height: "70px",
                              objectFit: "cover",
                            }}
                            src={formData.dFileUploaded}
                            alt="Preview"
                          />
                        ) : <FileIcon size={"50px"} />}
                      </>                    
                    )}
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
                <SubmitButton 
                  type="submit" 
                  onClick={handleSubmit}
                  disabled={
                    fileLoading ||
                    APICall.createAPIResponse.isLoading
                  }
                >{(
                    fileLoading ||
                    APICall.createAPIResponse.isLoading
                  ) ? 
                  "Loading..." : "Submit"
                }</SubmitButton>
                <CancelButton 
                  type="button" 
                  onClick={() => navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.bLicenseRoute.aListRoute)}
                  disabled={
                    fileLoading ||
                    APICall.createAPIResponse.isLoading
                  }
                >{(
                    fileLoading ||
                    APICall.createAPIResponse.isLoading
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

export default LicenseCreatePage;
