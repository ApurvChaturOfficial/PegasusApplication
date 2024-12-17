import React, { useEffect, useState } from 'react'
import { AddButton, AddHeading, AddLicense, AddLicenseForm, BaseHeader, ButtonBack, ButtonLink4, ButtonTag, Buttontag3, CancelButton, ContactInfo, ContactInput, DownloadButton, Dropdown, DropdownOption, ExpiryDate, FileInput, FileInputContainer, FileInputLabel, FirstRow, Input2, InputHeading, IssueDate, LastRow, LastRowInfo, LicenseFormNumber, LicenseInfoTag, LicenseInfoTag2, Para, UploadButton } from '../../style';
import getAlertSymbolLetter from '@/bLove/dUtility/eGetAlertSymbolLetter';
import apiResponseHandler from './extras/aAPIResponseHandler';
import allLicenseType from '@/bLove/hAsset/data/allLicenseType';


const InspectionTabUpdateComponent = (props: any) => {
  // Destructure Props
  const { 
    setInspectionTabList,
    setInspectionTabCreate,
    setInspectionTabUpdate,
    APICall,
    // ReduxCall,
    organizationID                                                             
  } = props

  // State Variable
  const [formData, setFormData] = useState({
    cOrganization: organizationID,

    dReportName: "",
    dUploadDate: "",
  })  

  // Event Handlers
  // Cancel or Back
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
    apiResponseHandler.updateAPIResponseHandler(formData, APICall.inspectionUpdateAPITrigger, activateInspectionList, APICall.inspectionRetrieveAPIResponse.data.retrieve._id)
  };  

  // All Render
  // First Render
  useEffect(() => {
    APICall.inspectionRetrieveAPIResponse.isLoading ? null : 
    APICall.inspectionRetrieveAPIResponse.isError ? null :
    APICall.inspectionRetrieveAPIResponse.isSuccess ? (
      APICall.inspectionRetrieveAPIResponse.data.success ? (
        setFormData({
          cOrganization: APICall.inspectionRetrieveAPIResponse.data.retrieve.cOrganization,
          dReportName: APICall.inspectionRetrieveAPIResponse.data.retrieve.dReportName,
          dUploadDate: APICall.inspectionRetrieveAPIResponse.data.retrieve.dUploadDate,
        })
      ) : null
    ) : null
  }, [APICall.inspectionRetrieveAPIResponse])

  // JSX
  return (
    <React.Fragment>
      {/* InspectionTabUpdateComponent */}

      {
        APICall.inspectionRetrieveAPIResponse.isLoading ? "Loading..." : 
        APICall.inspectionRetrieveAPIResponse.isError ? "Error..." :
        APICall.inspectionRetrieveAPIResponse.isSuccess ? (
          <React.Fragment>
            {
              APICall.inspectionRetrieveAPIResponse.data.success ? (
                <React.Fragment>
                  <FirstRow>
                    <ButtonBack onClick={() => activateInspectionList()}>&lt; Back</ButtonBack>
                  </FirstRow>
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
              ) : "Backend Error"
            }
          </React.Fragment>
        ) :
        "Let me understand first"
      } 

    </React.Fragment>
  )
}

export default InspectionTabUpdateComponent;
