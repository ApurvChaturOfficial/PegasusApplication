import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
// import fullRoute from "@/bLove/gRoute/bFullRoute";

import licenseAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/eLicenseAPIEndpoints";
import organizationAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/dOrganizationAPIEndpoints";
import apiResponseHandler from "./extras/aAPIResponseHandler";
import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import { ButtonContainer, CancelButton, ContactInput, Container, Dropdown, DropdownOption, ExpiryDate, FileInput, FileInputContainer, FileInputLabel, FinalTag, Form, Input, InputHeading, IssueDate, MainHeading, SubmitButton, UploadedFile } from "./style";
import handleImageDeleteForObject from "@/bLove/dUtility/aImageForObject/cHandleImageDeleteForObject";
import handleImageCreateForObject from "@/bLove/dUtility/aImageForObject/aHandleImageCreateForObject";
import handleImageUpdateForObject from "@/bLove/dUtility/aImageForObject/bHandleImageUpdateForObject";
import fullRoute from "@/bLove/gRoute/bFullRoute";
import LoaderComponent from "@/bLove/cComponent/aGlobalComponent/component/aLoaderComponent";
import ErrorComponent from "@/bLove/cComponent/aGlobalComponent/component/bErrorComponent";
import firmBasedLicenseType from "@/bLove/hAsset/data/firmBasedLicenseType";
import { Dropdown1 } from "../bCreatePage/style";
import allCategoryType from "@/bLove/hAsset/data/allCategoryType";
import { FileIcon } from "lucide-react";


const LicenseUpdatePage = () => {
  // Variable
  const navigate = useNavigate();
  const { id } = useParams();

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
    dFileUploaded: "",
    dFileUploadedID: "",
  })
  const [organziationType, setOrganziationType] = useState("")

  // Redux Call
  const ReduxCall = {
    state: useSelector((fullState: RootState) => fullState.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }

  // API Call
  const licenseRetrieveAPI = licenseAPIEndpoint.useLicenseRetrievePIQuery({ params: { _id: id } });
  const licenseUpdateAPI = licenseAPIEndpoint.useLicenseUpdateAPIMutation();
  const organziationListAPI = organizationAPIEndpoint.useOrganizationListAPIQuery(null)

  const APICall = {
    retrieveAPIResponse: licenseRetrieveAPI,
    updateAPITrigger: licenseUpdateAPI[0],
    updateAPIResponse: licenseUpdateAPI[1],

    // Requirements... Muaaah...
    organizationListAPIResponse: organziationListAPI,
    
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
    apiResponseHandler.updateAPIResponseHandler(formData, APICall.updateAPITrigger, navigate, { id: id })
  };

  // All Render
  // First Render
  useEffect(() => {
    APICall.retrieveAPIResponse.isLoading ? null : 
    APICall.retrieveAPIResponse.isError ? null :
    APICall.retrieveAPIResponse.isSuccess ? (
      APICall.retrieveAPIResponse.data.success ? (
        setFormData({
          cOrganization: APICall.retrieveAPIResponse.data.retrieve.cOrganization,
          dSelectedLicense: APICall.retrieveAPIResponse.data.retrieve.dSelectedLicense,
          dLicenseNumber: APICall.retrieveAPIResponse.data.retrieve.dLicenseNumber,
          dCategory: APICall.retrieveAPIResponse.data.retrieve.dCategory,
          dOwnLoan: APICall.retrieveAPIResponse.data.retrieve.dOwnLoan,
          dIssueDate: APICall.retrieveAPIResponse.data.retrieve.dIssueDate,
          dExpiryDate: APICall.retrieveAPIResponse.data.retrieve.dExpiryDate,
          dFileUploaded: APICall.retrieveAPIResponse.data.retrieve.dFileUploaded,
          dFileUploadedID: APICall.retrieveAPIResponse.data.retrieve.dFileUploadedID
        }),

        setOrganziationType(
          APICall.organizationListAPIResponse?.data?.list?.find(
            (each: any) => each._id === APICall.retrieveAPIResponse.data.retrieve.cOrganization._id
          )?.dType || null
        )

      ) : null
    ) : null
  }, [APICall.retrieveAPIResponse])
  
  // JSX
  return (
    <React.Fragment>
      {/* LicenseUpdatePage */}

      <>
        <TopNavBarComponent />
        {
          APICall.retrieveAPIResponse.isLoading ? <LoaderComponent /> : 
          APICall.retrieveAPIResponse.isError ? <ErrorComponent message="Error..." /> :
          APICall.retrieveAPIResponse.isSuccess ? (
            <React.Fragment>
              {
                APICall.retrieveAPIResponse.data.success ? (
                  <React.Fragment>
                    <Container>
                      <MainHeading>Edit License</MainHeading>
                      <Form onSubmit={handleSubmit}>

                        <div>
                          <InputHeading>Select Organization</InputHeading>
                          <Dropdown
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
                                            <DropdownOption 
                                              key={index} 
                                              value={each._id}
                                              selected={each._id === (formData.cOrganization as any)?._id}
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
                                    selected={each === formData.dSelectedLicense}
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
                                      selected={each === formData.dCategory}
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
                                <DropdownOption value="Own" selected={"Own" === formData.dOwnLoan} >Own</DropdownOption>
                                <DropdownOption value="Loan" selected={"Loan" === formData.dOwnLoan} >Loan</DropdownOption>
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

                        <>
                          <ButtonContainer>
                            <SubmitButton 
                              type="submit" 
                              onClick={handleSubmit}
                              disabled={
                                fileLoading ||
                                APICall.updateAPIResponse.isLoading
                              }            
                            >{(
                                fileLoading ||
                                APICall.updateAPIResponse.isLoading
                              ) ? 
                              "Loading..." : "Submit"
                            }</SubmitButton>
                            <CancelButton 
                              type="button" 
                              onClick={() => navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.bLicenseRoute.aListRoute)}
                              disabled={
                                fileLoading ||
                                APICall.updateAPIResponse.isLoading
                              }            
                            >{(
                                fileLoading ||
                                APICall.updateAPIResponse.isLoading
                              ) ? 
                              "Loading..." : "Cancel"
                            }</CancelButton>
                          </ButtonContainer>
                        </>
                      </Form>
                    </Container>
                  </React.Fragment>
                ) : <ErrorComponent message="Backend Error..." />
              }
            </React.Fragment>
          ) : <ErrorComponent message="Let me understand first" />
        } 

      </>

    </React.Fragment>
  )
}

export default LicenseUpdatePage;
