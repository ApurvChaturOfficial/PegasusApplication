import React, { useEffect, useState } from 'react'
import { AddButton, AddHeading, AddLicense, AddLicenseForm, ButtonTag, CancelButton, ContactInfo, ContactInput, Dropdown, DropdownOption, ExpiryDate, FileInput, FileInputContainer, FileInputLabel, Input2, InputHeading, IssueDate, Para } from '../../style';
import apiResponseHandler from './extras/aAPIResponseHandler';
import allLicenseType from '@/bLove/hAsset/data/allLicenseType';
import { RowInput, SecondaryHeading } from '../../../../cServicePage/bCreatePage/style';
import { AddNew, FinalTag, RemoveButton } from '../../../bCreatePage/style';


const ServiceTabCreateComponent = (props: any) => {
  // Destructure Props
  const { 
    setServiceTabList,
    setServiceTabCreate,
    setServiceTabUpdate,
    APICall,
    // ReduxCall,
    organizationID
  } = props;

  // State Variable
  const [formData, setFormData] = useState({
    cEnrolledService: [{
      cService: "",

      dLicenseNumber: "",
      dIssueDate: "",
      dExpiryDate: "",
      dUploadDate: "",
    }],
  })  

  // Event Handlers
  const activateServiceList = () => {
    setServiceTabList(true)
    setServiceTabCreate(false)
    setServiceTabUpdate(false)
  }
  
  // Submit handler
  const handleSubmit = (event: any) => {
    event.preventDefault();

    // console.log("formDataObj", formData);
    apiResponseHandler.updateAPIResponseHandler(formData, APICall.updateAPITrigger, activateServiceList, APICall.enrolledServiceCreateAPITrigger, APICall.retrieveAPIResponse?.data?.retrieve)
  };

  // Add License
  const addService = () => {
    setFormData({
      ...formData, cEnrolledService: [
        ...formData.cEnrolledService, {
          cService: "",
          dLicenseNumber: "",
          dIssueDate: "",
          dExpiryDate: "",
          dUploadDate: ""
        }
      ],
    });
  };

  // Remove License
  const removeService = (index: number) => {
    const updatedLicenses = formData.cEnrolledService.filter((_, i) => i !== index);
    setFormData({ ...formData, cEnrolledService: updatedLicenses });
  };

  // Handle Service Input Change
  const handleServiceInputChange = (event: any, index: number) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      const updatedEnrolledServices = (prevFormData.cEnrolledService.length > 0) ? [...(prevFormData as any).cEnrolledService] : [];
      
      updatedEnrolledServices[index] = {
        ...updatedEnrolledServices[index],
        [name]: value,
      };
  
      return {
        ...prevFormData,
        cEnrolledService: updatedEnrolledServices,
      };
    });
  };  
  
  // All Render
  // Extra Render
  useEffect(() => {
    console.log(formData)
  }, [formData])

  // JSX
  return (
    <React.Fragment>
      {/* ServiceTabCreateComponent */}

      <AddLicense>
        <AddHeading>Add Services</AddHeading>
        
        {formData.cEnrolledService.map((each, index: any) => (
          <React.Fragment>
            <AddLicenseForm onSubmit={() => "handleSubmit"}>
              <InputHeading style={{ color: "tomato", display: "flex", flexBasis: 1, justifyContent: "space-between", alignItems: "baseline" }} >
                <span style={{width: "300px"}} >Service {index + 1}</span>

                <RemoveButton type="button" onClick={() => removeService(index)}>
                  Remove
                </RemoveButton>
              </InputHeading>
              <InputHeading>Select Service</InputHeading>
              <Dropdown 
                name="cService"
                onChange={(e) => handleServiceInputChange(e, index)}
              >
                <DropdownOption selected disabled>
                  Select Servcie
                </DropdownOption>
                  {APICall.serviceListAPIResponse.isLoading ? null : 
                    APICall.serviceListAPIResponse.isError ? null :
                      APICall.serviceListAPIResponse.isSuccess ? (
                        APICall.serviceListAPIResponse.data.success ? (
                          APICall.serviceListAPIResponse.data.list.length > 0 ? (
                            <React.Fragment>
                              {
                                APICall.serviceListAPIResponse.data.list?.map((each: any, index: any) => (
                                  <DropdownOption key={index} value={each._id}>
                                    {each.aTitle}
                                  </DropdownOption>
                                ))
                              }
                            </React.Fragment>
                          ) : []
                        ) : []
                      ) : []
                  }
              </Dropdown>
              <InputHeading>Enter License Number</InputHeading>
              <Input2
                type="text"
                placeholder="License Number"
                name="dLicenseNumber"
                value={each.dLicenseNumber}
                onChange={(e) => handleServiceInputChange(e, index)}
              />
              <ContactInfo>
                <IssueDate>
                  <InputHeading>Date of Issue</InputHeading>
                  <ContactInput
                    type="date"
                    placeholder="Issue Date"
                    name="dIssueDate"
                    value={each.dIssueDate}
                    onChange={(e) => handleServiceInputChange(e, index)}
                  />
                </IssueDate>
                <ExpiryDate>
                  <InputHeading>Date of Expiry</InputHeading>
                  <ContactInput
                    type="date"
                    placeholder="Expiry Date"
                    name="dExpiryDate"
                    value={each.dExpiryDate}
                    onChange={(e) => handleServiceInputChange(e, index)}
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

            </AddLicenseForm>
            </React.Fragment>
        ))}

        <AddLicenseForm>
          <AddNew type="button" onClick={addService}>
            Add New
          </AddNew>
        </AddLicenseForm>

        <AddLicenseForm>
          <ButtonTag>
            <AddButton type="submit" onClick={handleSubmit}>
              <Para>Add New License</Para>
            </AddButton>
            <CancelButton onClick={() => activateServiceList()}>
              <Para>Cancel</Para>
            </CancelButton>
          </ButtonTag>
        </AddLicenseForm>

      </AddLicense>

    </React.Fragment>
  )
}

export default ServiceTabCreateComponent;
