import React, { useEffect, useState } from 'react'
import { AddButton, AddHeading, AddLicense, AddLicenseForm, ButtonTag, CancelButton, ContactInfo, ContactInput, Dropdown, DropdownOption, ExpiryDate, FileInput, FileInputContainer, FileInputLabel, Input2, InputHeading, IssueDate, Para } from '../../style';
import apiResponseHandler from './extras/aAPIResponseHandler';
import allLicenseType from '@/bLove/hAsset/data/allLicenseType';


const InspectionTabCreateComponent = (props: any) => {
  // Destructure Props
  const { 
    setInspectionTabList,
    setInspectionTabCreate,
    setInspectionTabUpdate,
    APICall,
    // ReduxCall,
    organizationID
  } = props;

  // State Variable
  const [formData, setFormData] = useState({
    cOrganization: organizationID,

    dReportName: "",
    dUploadDate: "",
  })  

  // Event Handlers
  const activateInspectionList = () => {
    setInspectionTabList(true)
    setInspectionTabCreate(false)
    setInspectionTabUpdate(false)
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
    apiResponseHandler.createAPIResponseHandler(formData, APICall.inspectionCreateAPITrigger, activateInspectionList)
  };
  
    // All Render
  // Extra Render
  useEffect(() => {
    console.log(formData)
  }, [formData])

  // JSX
  return (
    <React.Fragment>
      {/* InspectionTabCreateComponent */}

      <AddLicense>
        <AddHeading>Add Inspection Report</AddHeading>
        <AddLicenseForm onSubmit={() => "handleSubmit"}>
          <InputHeading>Report Name</InputHeading>
          <Input2
            type="text"
            placeholder="Report Name"
            name="dReportName"
            value={formData.dReportName}
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
              <Para>Add New Inspection Report</Para>
            </AddButton>
            <CancelButton onClick={() => activateInspectionList()}>
              <Para>Cancel</Para>
            </CancelButton>
          </ButtonTag>
        </AddLicenseForm>
      </AddLicense>

    </React.Fragment>
  )
}

export default InspectionTabCreateComponent;
