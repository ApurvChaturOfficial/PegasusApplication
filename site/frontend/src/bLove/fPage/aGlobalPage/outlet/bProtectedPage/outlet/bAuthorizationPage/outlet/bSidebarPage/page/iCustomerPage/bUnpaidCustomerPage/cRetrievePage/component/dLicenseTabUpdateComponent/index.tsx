import LoaderComponent from '@/bLove/cComponent/aGlobalComponent/component/aLoaderComponent';
import ErrorComponent from '@/bLove/cComponent/aGlobalComponent/component/bErrorComponent';
import handleImageCreateForObject from '@/bLove/dUtility/aImageForObject/aHandleImageCreateForObject';
import handleImageUpdateForObject from '@/bLove/dUtility/aImageForObject/bHandleImageUpdateForObject';
import handleImageDeleteForObject from '@/bLove/dUtility/aImageForObject/cHandleImageDeleteForObject';
import allCategoryType from '@/bLove/hAsset/data/allCategoryType';
import firmBasedLicenseType from '@/bLove/hAsset/data/firmBasedLicenseType';
import { FileIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { ContactInfo1 } from '../../../../../aOrganizationPage/cRetrievePage/style';
import { Dropdown1 } from '../../../../../bLicensePage/bCreatePage/style';
import { AddButton, AddHeading, AddLicense, AddLicenseForm, ButtonBack, ButtonTag, CancelButton, ContactInfo, ContactInput, Dropdown, DropdownOption, ExpiryDate, FileInput, FileInputContainer, FileInputLabel, FirstRow, Input2, InputHeading, IssueDate, Para, UploadedFile } from '../../style';
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
  const [fileLoading, setFileLoading] = useState(false)
  const [formData, setFormData] = useState({
    cOrganization: organizationID,

    dSelectedLicense: "",
    dLicenseNumber: "",
    dCategory: "",
    dOwnLoan: "",
    dIssueDate: "",
    dExpiryDate: "",
    dFileUploaded: "",
    dFileUploadedID: "",
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
          dCategory: APICall.licenseRetrieveAPIResponse.data.retrieve.dCategory,
          dOwnLoan: APICall.licenseRetrieveAPIResponse.data.retrieve.dOwnLoan,
          dIssueDate: APICall.licenseRetrieveAPIResponse.data.retrieve.dIssueDate,
          dExpiryDate: APICall.licenseRetrieveAPIResponse.data.retrieve.dExpiryDate,
          dFileUploaded: APICall.licenseRetrieveAPIResponse.data.retrieve.dFileUploaded,
          dFileUploadedID: APICall.licenseRetrieveAPIResponse.data.retrieve.dFileUploadedID
        })
      ) : null
    ) : null
  }, [APICall.licenseRetrieveAPIResponse])

  // JSX
  return (
    <React.Fragment>
      {/* LicenseTabUpdateComponent */}

      {
        APICall.licenseRetrieveAPIResponse.isLoading ? <LoaderComponent /> : 
        APICall.licenseRetrieveAPIResponse.isError ? <ErrorComponent message="Error..." /> :
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
                      <InputHeading>Select License<em style={{ color: "tomato" }} >{` (Firm Type: ${APICall.retrieveAPIResponse.data?.retrieve?.dType})`}</em></InputHeading>
                      <Dropdown 
                        name="dSelectedLicense"
                        onChange={handleInputChange}
                      >
                        <DropdownOption selected disabled>
                          Select License
                        </DropdownOption>
                        {
                          firmBasedLicenseType?.
                            filter(each => each.firm === APICall.retrieveAPIResponse.data?.retrieve?.dType)[0]?.
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
                      <Input2
                        type="text"
                        placeholder="License Number"
                        name="dLicenseNumber"
                        value={formData.dLicenseNumber}
                        onChange={handleInputChange}
                      />

                      <ContactInfo1>
                        <IssueDate>
                          <InputHeading>Category</InputHeading>
                          <Dropdown1 
                            name="dCategory"
                            onChange={handleInputChange}
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
                            name="dOwnLoan"
                            onChange={handleInputChange}
                          >
                            <DropdownOption selected disabled>
                              Select
                            </DropdownOption>
                            <DropdownOption value="Own" selected={"Own" === formData.dOwnLoan} >Own</DropdownOption>
                            <DropdownOption value="Loan" selected={"Loan" === formData.dOwnLoan} >Loan</DropdownOption>
                          </Dropdown1>
                        </ExpiryDate>
                      </ContactInfo1>

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

                      <ButtonTag>
                        <AddButton 
                          type="submit" 
                          onClick={handleSubmit}
                          disabled={
                            fileLoading ||
                            APICall.licenseUpdateAPIResponse.isLoading
                          }            
                        >
                          <Para>
                            {(
                                fileLoading ||
                                APICall.licenseUpdateAPIResponse.isLoading
                              ) ? 
                              "Loading..." : "Update License"
                            }
                          </Para>
                        </AddButton>
                        <CancelButton 
                          onClick={() => activateLicenseList()}
                          disabled={
                            fileLoading ||
                            APICall.licenseUpdateAPIResponse.isLoading
                          }            
                        >
                          <Para>
                            {(
                                fileLoading ||
                                APICall.licenseUpdateAPIResponse.isLoading
                              ) ? 
                              "Loading..." : "Cancel"
                            }
                          </Para>
                        </CancelButton>
                      </ButtonTag>
                    </AddLicenseForm>
                  </AddLicense>

                </React.Fragment>
              ) : <ErrorComponent message="Backend Error..." />
            }
          </React.Fragment>
        ) : <ErrorComponent message="Let me understand first" />
      } 

    </React.Fragment>
  )
}

export default LicenseTabUpdateComponent;
