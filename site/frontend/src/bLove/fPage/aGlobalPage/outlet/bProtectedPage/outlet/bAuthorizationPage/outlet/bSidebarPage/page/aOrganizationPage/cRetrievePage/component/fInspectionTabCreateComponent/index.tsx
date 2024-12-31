import handleImageCreateForObject from '@/bLove/dUtility/aImageForObject/aHandleImageCreateForObject';
import handleImageUpdateForObject from '@/bLove/dUtility/aImageForObject/bHandleImageUpdateForObject';
import handleImageDeleteForObject from '@/bLove/dUtility/aImageForObject/cHandleImageDeleteForObject';
import React, { useEffect, useState } from 'react';
import { AddButton, AddHeading, AddLicense, AddLicenseForm, ButtonTag, CancelButton, ContactInfo, ContactInput, FileInput, FileInputContainer, FileInputLabel, Input2, InputHeading, IssueDate, Para, UploadedFile } from '../../style';
import apiResponseHandler from './extras/aAPIResponseHandler';
import { FileIcon } from 'lucide-react';


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
  const [fileLoading, setFileLoading] = useState(false)
  const [formData, setFormData] = useState({
    cOrganization: organizationID,

    dReportName: "",
    dUploadDate: "",
    dFileUploaded: null,
    dFileUploadedID: null,
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
          <InputHeading>Upload Scan Copy <em style={{ color: "tomato" }} >(.pdf, .doc, .docx, .jpg, .jpeg, .png)</em></InputHeading>

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

          <ButtonTag>
            <AddButton 
              type="submit" 
              onClick={handleSubmit}
              disabled={
                fileLoading ||
                APICall.inspectionCreateAPIResponse.isLoading
              }
            >
              <Para>
                {(
                    fileLoading ||
                    APICall.inspectionCreateAPIResponse.isLoading
                  ) ? 
                  "Loading..." : "Add New Inspection Report"
                }
              </Para>
            </AddButton>
            <CancelButton 
              onClick={() => activateInspectionList()}
              disabled={
                fileLoading ||
                APICall.inspectionCreateAPIResponse.isLoading
              }
            >
              <Para>
                {(
                    fileLoading ||
                    APICall.inspectionCreateAPIResponse.isLoading
                  ) ? 
                  "Loading..." : "Cancel"
                }
              </Para>
            </CancelButton>
          </ButtonTag>
        </AddLicenseForm>
      </AddLicense>

    </React.Fragment>
  )
}

export default InspectionTabCreateComponent;
