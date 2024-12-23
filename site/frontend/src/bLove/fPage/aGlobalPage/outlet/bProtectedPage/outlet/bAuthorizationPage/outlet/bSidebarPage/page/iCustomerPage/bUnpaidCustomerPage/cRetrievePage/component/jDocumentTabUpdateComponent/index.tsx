import React, { useEffect, useState } from 'react';
import { AddButton, AddHeading, AddLicense, AddLicenseForm, ButtonBack, ButtonTag, CancelButton, ContactInfo, ContactInput, ExpiryDate, FileInput, FileInputContainer, FileInputLabel, FirstRow, Input2, InputHeading, IssueDate, Para, UploadedFile } from '../../style';
import apiResponseHandler from './extras/aAPIResponseHandler';
import handleImageDeleteForObject from '@/bLove/dUtility/aImageForObject/cHandleImageDeleteForObject';
import handleImageCreateForObject from '@/bLove/dUtility/aImageForObject/aHandleImageCreateForObject';
import handleImageUpdateForObject from '@/bLove/dUtility/aImageForObject/bHandleImageUpdateForObject';


const DocumentTabUpdateComponent = (props: any) => {
  // Destructure Props
  const { 
    setDocumentTabList,
    setDocumentTabCreate,
    setDocumentTabUpdate,
    APICall,
    // ReduxCall,
    organizationID                                                             
  } = props

  // State Variable
  const [fileLoading, setFileLoading] = useState(false)
  const [formData, setFormData] = useState({
    cOrganization: organizationID,

    dDocumentName: "",
    dUploadDate: "",
    dComment: "",
    dFileUploaded: "",
    dFileUploadedID: "",
  })  

  // Event Handlers
  // Cancel or Back
  const activateDocumentList = () => {
    setDocumentTabList(true)
    setDocumentTabCreate(false)
    setDocumentTabUpdate(false)
  }

  // Handle Input Change
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit handler
  const handleSubmit = (event: any) => {
    event.preventDefault();

    // console.log("formDataObj", formData);
    apiResponseHandler.updateAPIResponseHandler(formData, APICall.documentUpdateAPITrigger, activateDocumentList, APICall.documentRetrieveAPIResponse.data.retrieve._id)
  };  

  // All Render
  // First Render
  useEffect(() => {
    APICall.documentRetrieveAPIResponse.isLoading ? null : 
    APICall.documentRetrieveAPIResponse.isError ? null :
    APICall.documentRetrieveAPIResponse.isSuccess ? (
      APICall.documentRetrieveAPIResponse.data.success ? (
        setFormData({
          cOrganization: APICall.documentRetrieveAPIResponse.data.retrieve.cOrganization,
          dDocumentName: APICall.documentRetrieveAPIResponse.data.retrieve.dDocumentName,
          dUploadDate: APICall.documentRetrieveAPIResponse.data.retrieve.dUploadDate,
          dComment: APICall.documentRetrieveAPIResponse.data.retrieve.dComment,
          dFileUploaded: APICall.documentRetrieveAPIResponse.data.retrieve.dFileUploaded,
          dFileUploadedID: APICall.documentRetrieveAPIResponse.data.retrieve.dFileUploadedID
        })
      ) : null
    ) : null
  }, [APICall.documentRetrieveAPIResponse])
    
  // JSX
  return (
    <React.Fragment>
      {/* DocumentTabUpdateComponent */}

      {
        APICall.documentRetrieveAPIResponse.isLoading ? "Loading..." : 
        APICall.documentRetrieveAPIResponse.isError ? "Error..." :
        APICall.documentRetrieveAPIResponse.isSuccess ? (
          <React.Fragment>
            {
              APICall.documentRetrieveAPIResponse.data.success ? (
                <React.Fragment>
                  <FirstRow>
                    <ButtonBack onClick={() => activateDocumentList()}>&lt; Back</ButtonBack>
                  </FirstRow>
                  <AddLicense>
                    <AddHeading>Update Document</AddHeading>
                    <AddLicenseForm onSubmit={() => "handleSubmit"}>
                      <InputHeading>Document Name</InputHeading>
                      <Input2
                        type="text"
                        placeholder="Enter Document Name"
                        name="dDocumentName"
                        value={formData.dDocumentName}
                        onChange={handleInputChange}
                      />
                      <ContactInfo>
                        <IssueDate>
                          <InputHeading>Date of Upload</InputHeading>
                          <ContactInput
                            type="date"
                            placeholder="Issue Date"
                            name="dUploadDate"
                            value={formData.dUploadDate}
                            onChange={handleInputChange}
                          />
                        </IssueDate>
                        <ExpiryDate>
                          <InputHeading>Comment</InputHeading>
                          <Input2
                            type="text"
                            placeholder="Enter Comment"
                            name="dComment"
                            value={formData.dComment}
                            onChange={handleInputChange}
                          />
                        </ExpiryDate>
                      </ContactInfo>
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

                      <ButtonTag>
                        <AddButton type="submit" onClick={handleSubmit}>
                          <Para>Update Document</Para>
                        </AddButton>
                        <CancelButton onClick={() => activateDocumentList()}>
                          <Para>Cancel</Para>
                        </CancelButton>
                      </ButtonTag>
                    </AddLicenseForm>
                  </AddLicense>
                </React.Fragment>
              ) : "Backend Error"
            }
          </React.Fragment>
        ) :
        "Let me understand first"
      } 

    </React.Fragment>
  )
}

export default DocumentTabUpdateComponent;
