import React, { useEffect, useState } from 'react'
import { AddButton, AddHeading, AddLicense, AddLicenseForm, BaseHeader, ButtonBack, ButtonLink4, ButtonTag, Buttontag3, CancelButton, ContactInfo, ContactInput, DownloadButton, Dropdown, DropdownOption, ExpiryDate, FileInput, FileInputContainer, FileInputLabel, FirstRow, Input2, InputHeading, IssueDate, LastRow, LastRowInfo, LicenseFormNumber, LicenseInfoTag, LicenseInfoTag2, Para, UploadButton } from '../../style';
import getAlertSymbolLetter from '@/bLove/dUtility/eGetAlertSymbolLetter';
import allLicenseType from '@/bLove/hAsset/data/allLicenseType';
import apiResponseHandler from './extras/aAPIResponseHandler';


const LicenseTabUpdateComponent = (props: any) => {
  // Destructure Props
  const { 
    setLicenseTabList,
    setLicenseTabCreate,
    setLicenseTabUpdate,
    APICall,
    // ReduxCall,
    organizationID                                                             
  } = props

  // State Variable
  const [formData, setFormData] = useState({
    cOrganization: organizationID,

    dSelectedLicense: "",
    dLicenseNumber: "",
    dIssueDate: "",
    dExpiryDate: "",
  })  

  // Event Handlers
  // Cancel or Back
  const activateLicenseList = () => {
    setLicenseTabList(true)
    setLicenseTabCreate(false)
    setLicenseTabUpdate(false)
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
    apiResponseHandler.updateAPIResponseHandler(formData, APICall.licenseUpdateAPITrigger, activateLicenseList, APICall.licenseRetrieveAPIResponse.data.retrieve._id)
  };  

  // All Render
  // First Render
  useEffect(() => {
    APICall.licenseRetrieveAPIResponse.isLoading ? null : 
    APICall.licenseRetrieveAPIResponse.isError ? null :
    APICall.licenseRetrieveAPIResponse.isSuccess ? (
      APICall.licenseRetrieveAPIResponse.data.success ? (
        setFormData({
          cOrganization: APICall.licenseRetrieveAPIResponse.data.retrieve.cOrganization,
          dSelectedLicense: APICall.licenseRetrieveAPIResponse.data.retrieve.dSelectedLicense,
          dLicenseNumber: APICall.licenseRetrieveAPIResponse.data.retrieve.dLicenseNumber,
          dIssueDate: APICall.licenseRetrieveAPIResponse.data.retrieve.dIssueDate,
          dExpiryDate: APICall.licenseRetrieveAPIResponse.data.retrieve.dExpiryDate,
        })
      ) : null
    ) : null
  }, [APICall.licenseRetrieveAPIResponse])

  // JSX
  return (
    <React.Fragment>
      {/* LicenseTabUpdateComponent */}

      {
        APICall.licenseRetrieveAPIResponse.isLoading ? "Loading..." : 
        APICall.licenseRetrieveAPIResponse.isError ? "Error..." :
        APICall.licenseRetrieveAPIResponse.isSuccess ? (
          <React.Fragment>
            {
              APICall.licenseRetrieveAPIResponse.data.success ? (
                <React.Fragment>
                  <FirstRow>
                    <ButtonBack onClick={() => activateLicenseList()}>&lt; Back</ButtonBack>
                  </FirstRow>
                  <AddLicense>
                    <AddHeading>Update License</AddHeading>
                    <AddLicenseForm onSubmit={() => "handleSubmit"}>
                      <InputHeading>Select License</InputHeading>
                      <Dropdown 
                        name="dSelectedLicense"
                        onChange={handleInputChange}
                      >
                        <DropdownOption selected disabled>
                          Select License
                        </DropdownOption>
                        {allLicenseType.map((each: any) => (
                          <DropdownOption 
                            key={each} 
                            value={each}
                            selected={each === formData.dSelectedLicense}
                          >
                            {each}
                          </DropdownOption>
                        ))}
                      </Dropdown>
                      <InputHeading>Enter License Number</InputHeading>
                      <Input2
                        type="text"
                        placeholder="License Number"
                        name="dLicenseNumber"
                        value={formData.dLicenseNumber}
                        onChange={handleInputChange}
                      />
                      <ContactInfo>
                        <IssueDate>
                          <InputHeading>Date of Issue</InputHeading>
                          <ContactInput
                            type="date"
                            placeholder="Issue Date"
                            name="dIssueDate"
                            value={formData.dIssueDate}
                            onChange={handleInputChange}
                          />
                        </IssueDate>
                        <ExpiryDate>
                          <InputHeading>Date of Expiry</InputHeading>
                          <ContactInput
                            type="date"
                            placeholder="Expiry Date"
                            name="dExpiryDate"
                            value={formData.dExpiryDate}
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
                          <Para>Update License</Para>
                        </AddButton>
                        <CancelButton onClick={() => activateLicenseList()}>
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

export default LicenseTabUpdateComponent;
