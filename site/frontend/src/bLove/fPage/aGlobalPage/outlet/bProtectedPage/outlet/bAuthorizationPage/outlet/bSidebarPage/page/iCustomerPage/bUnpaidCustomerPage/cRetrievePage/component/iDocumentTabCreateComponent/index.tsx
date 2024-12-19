import React, { useEffect, useState } from 'react';
import { AddButton, AddHeading, AddLicense, AddLicenseForm, ButtonTag, CancelButton, ContactInfo, ContactInput, ExpiryDate, FileInput, FileInputContainer, FileInputLabel, Input2, InputHeading, IssueDate, Para } from '../../style';
import apiResponseHandler from './extras/aAPIResponseHandler';


const DocumentTabCreateComponent = (props: any) => {
  // Destructure Props
  const { 
    setDocumentTabList,
    setDocumentTabCreate,
    setDocumentTabUpdate,
    APICall,
    // ReduxCall,
    organizationID
  } = props;

  // State Variable
  const [formData, setFormData] = useState({
    cOrganization: organizationID,

    dDocumentName: "",
    dUploadDate: "",
    dComment: "",
  })  

  // Event Handlers
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
    apiResponseHandler.createAPIResponseHandler(formData, APICall.documentCreateAPITrigger, activateDocumentList)
  };
  
    // All Render
  // Extra Render
  useEffect(() => {
    console.log(formData)
  }, [formData])

  // JSX
  return (
    <React.Fragment>
      {/* DocumentTabCreateComponent */}

      <AddLicense>
        <AddHeading>Add Document</AddHeading>
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
              <InputHeading>Date of Issue</InputHeading>
              <ContactInput
                type="date"
                placeholder="Issue Date"
                name="dUploadDate"
                value={formData.dUploadDate}
                onChange={handleInputChange}
              />
            </IssueDate>
            <ExpiryDate>
              <InputHeading>Date of Expiry</InputHeading>
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
          <FileInputContainer>
            <FileInputLabel htmlFor="fileInput">Choose File</FileInputLabel>
            <FileInput
              type="file"
              id="fileInput"
              // onChange={handleFileChange}
            />
          </FileInputContainer>
          {/* {formData.file && (
            <UploadedFile>Uploaded File: {formData.file.name}</UploadedFile>
          )} */}

          <ButtonTag>
            <AddButton type="submit" onClick={handleSubmit}>
              <Para>Add New License</Para>
            </AddButton>
            <CancelButton onClick={() => activateDocumentList()}>
              <Para>Cancel</Para>
            </CancelButton>
          </ButtonTag>
        </AddLicenseForm>
      </AddLicense>

    </React.Fragment>
  )
}

export default DocumentTabCreateComponent;
