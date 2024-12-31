import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import fullRoute from "@/bLove/gRoute/bFullRoute";

import organizationAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/dOrganizationAPIEndpoints";
import inspectionAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/hInspectionAPIEndpoints";
import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import handleImageCreateForObject from "@/bLove/dUtility/aImageForObject/aHandleImageCreateForObject";
import handleImageUpdateForObject from "@/bLove/dUtility/aImageForObject/bHandleImageUpdateForObject";
import handleImageDeleteForObject from "@/bLove/dUtility/aImageForObject/cHandleImageDeleteForObject";
import fullRoute from "@/bLove/gRoute/bFullRoute";
import { FileIcon } from "lucide-react";
import apiResponseHandler from "./extras/aAPIResponseHandler";
import { ButtonContainer, CancelButton, Container, Dropdown, DropdownOption, FileInput, FileInputContainer, FileInputLabel, Form, Input, InputHeading, IssueDate, MainHeading, RowContainer, RowInput, SubmitButton, UploadedFile } from "./style";


const InspectionCreatePage = () => {
  // Variable
  const navigate = useNavigate();

  // State Variable
  const [fileLoading, setFileLoading] = useState(false)
  const [formData, setFormData] = useState({
    cOrganization: "",

    dReportName: "",
    dUploadDate: "",
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
  const inspectionCreateAPI = inspectionAPIEndpoint.useInspectionCreateAPIMutation();
  const organziationListAPI = organizationAPIEndpoint.useOrganizationListAPIQuery(null)

  const APICall = {
    createAPITrigger: inspectionCreateAPI[0],
    createAPIResponse: inspectionCreateAPI[1],

    // Requirements... Muaaah...
    organizationListAPIResponse: organziationListAPI,

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

  // JSX
  return (
    <React.Fragment>
      {/* InspectionCreatePage */}

      <>
        <TopNavBarComponent />
        <Container>
          <MainHeading>Add New Inspection Report</MainHeading>
          <Form onSubmit={handleSubmit}>
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

              
              <InputHeading>Report Name</InputHeading>
              <Input
                type="text"
                placeholder="Enter Report Name"
                name="dReportName"
                value={formData.dReportName}
                onChange={handleInputChange}
              />
              <RowContainer>
                <IssueDate>
                  <InputHeading>Date of Upload</InputHeading>
                  <RowInput
                    type="date"
                    name="dUploadDate"
                    value={formData.dUploadDate}
                    onChange={handleInputChange}
                  />
                </IssueDate>
              </RowContainer> 
            
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
                  onClick={() => navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.eInspectionRoute.aListRoute)}
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

export default InspectionCreatePage;
