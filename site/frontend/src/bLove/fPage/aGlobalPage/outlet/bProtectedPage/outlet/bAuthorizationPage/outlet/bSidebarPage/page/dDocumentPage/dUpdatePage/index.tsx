import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
// import fullRoute from "@/bLove/gRoute/bFullRoute";

import documentAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/gDocumentAPIEndpoints";
import organizationAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/dOrganizationAPIEndpoints";
import apiResponseHandler from "./extras/aAPIResponseHandler";
import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import { ButtonContainer, CancelButton, Container, Dropdown, DropdownOption, FileInput, FileInputContainer, FileInputLabel, Form, Input, InputHeading, IssueDate, MainHeading, RowContainer, RowInput, SubmitButton, UploadedFile } from "./style";
import handleImageDeleteForObject from "@/bLove/dUtility/aImageForObject/cHandleImageDeleteForObject";
import handleImageCreateForObject from "@/bLove/dUtility/aImageForObject/aHandleImageCreateForObject";
import handleImageUpdateForObject from "@/bLove/dUtility/aImageForObject/bHandleImageUpdateForObject";


const DocumentUpdatePage = () => {
  // Variable
  const navigate = useNavigate();
  const { id } = useParams();

  // State Variable
  const [fileLoading, setFileLoading] = useState(false)
  const [formData, setFormData] = useState({
    cOrganization: "",

    dDocumentName: "",
    dUploadDate: "",
    dComment: "",
    dFileUploaded: "",
    dFileUploadedID: "",
  })

  // Redux Call
  const ReduxCall = {
    state: useSelector((fullState: RootState) => fullState.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }

  // API Call
  const APICall = {
    retrieveAPIResponse: documentAPIEndpoint.useDocumentRetrievePIQuery({ params: { _id: id } }),
    updateAPITrigger: documentAPIEndpoint.useDocumentUpdateAPIMutation()[0],
    updateAPIResponse: documentAPIEndpoint.useDocumentUpdateAPIMutation()[1],

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

    console.log("formDataObj", formData);
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
          dDocumentName: APICall.retrieveAPIResponse.data.retrieve.dDocumentName,
          dUploadDate: APICall.retrieveAPIResponse.data.retrieve.dUploadDate,
          dComment: APICall.retrieveAPIResponse.data.retrieve.dComment,
          dFileUploaded: APICall.retrieveAPIResponse.data.retrieve.dFileUploaded,
          dFileUploadedID: APICall.retrieveAPIResponse.data.retrieve.dFileUploadedID
        })
      ) : null
    ) : null
  }, [APICall.retrieveAPIResponse])
  

  // Extra Render
  useEffect(() => {
    console.log(formData)
  }, [formData])

  // JSX
  return (
    <React.Fragment>
      {/* DocumentUpdatePage */}

      <>
        <TopNavBarComponent />
        {
          APICall.retrieveAPIResponse.isLoading ? "Loading..." : 
          APICall.retrieveAPIResponse.isError ? "Error..." :
          APICall.retrieveAPIResponse.isSuccess ? (
            <React.Fragment>
              {
                APICall.retrieveAPIResponse.data.success ? (
                  <React.Fragment>
                    <Container>
                      <MainHeading>Edit Document</MainHeading>
                      <Form onSubmit={handleSubmit}>
                        <div>
                          <InputHeading>Select Organization</InputHeading>
                          <Dropdown
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
                            {/* {companyData.map((Organization) => (
                              <DropdownOption key={Organization.companyName} value={Organization.companyName}>
                                {Organization.companyName}
                              </DropdownOption>
                            ))} */}
                          </Dropdown>

                          
                          <InputHeading>Document Name</InputHeading>
                          <Input
                            type="text"
                            placeholder="Enter Document Name"
                            name="dDocumentName"
                            value={formData.dDocumentName}
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

                            <div>
                              <InputHeading>Comment</InputHeading>
                              <RowInput
                                type="text"
                                placeholder="Enter Comment"
                                name="dComment"
                                value={formData.dComment}
                                onChange={handleInputChange}
                              />
                            </div>
                          </RowContainer> 
                        
                          <InputHeading>Upload Scan Copy</InputHeading>

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

                        <>
                          <ButtonContainer>
                            <SubmitButton type="submit" onClick={handleSubmit}>Submit</SubmitButton>
                            <CancelButton type="button" onClick={() => "handleCancel"}>Cancel</CancelButton>
                          </ButtonContainer>
                        </>
                      </Form>
                    </Container>
                  </React.Fragment>
                ) : "Backend Error"
              }
            </React.Fragment>
          ) :
          "Let me understand first"
        }

      </>
      
    </React.Fragment>
  )
}

export default DocumentUpdatePage;
