import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
// import fullRoute from "@/bLove/gRoute/bFullRoute";

import organizationAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/dOrganizationAPIEndpoints";
import licenseAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/eLicenseAPIEndpoints";
import apiResponseHandler from "./extras/aAPIResponseHandler";

import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import { AddNew, ButtonTwo, CityInfo, ContactInfo, ContactInput, Container, Dropdown, DropdownOption, EmailInfo, ExpiryDate, FileInput, FileInputContainer, FileInputLabel, FinalTag, Form, Input, InputHeading, IssueDate, licenseTypes, MainHeading, PanCard, PhoneInfo, PinCode, RemoveButton, StateInfo, statesAndCities, UploadedFile } from "./style";


const OrganizationCreatePage = () => {
  // Variable
  const navigate = useNavigate();

  // State Variable
  const [formData, setFormData] = useState({
    dName: "",
    dType: "",
    dPhoneNumber: "",
    dCompanyEmail: "",
    dAddress: "",
    dSelectedState: "",
    dSelectedCity: "",
    dCountry: "",
    dPin: "",
    dPanNumber: "",

    cLicenses: [{
      dSelectedLicense: "",
      dLicenseNumber: "",
      dLicenseIssueDate: "",
      dLicenseExpiryDate: "",
    }]
  })

  // Redux Call
  const ReduxCall = {
    state: useSelector((fullState: RootState) => fullState.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }

  // API Call
  const APICall = {
    createAPITrigger: organizationAPIEndpoint.useOrganizationCreateAPIMutation()[0],
    createAPIResponse: organizationAPIEndpoint.useOrganizationCreateAPIMutation()[1],

    // Relation... Muaaah....
    licenseCreateAPITrigger: licenseAPIEndpoint.useLicenseCreateAPIMutation()[0],

  }

  // Event Handlers
  // Add License
  const addNewLicense = () => {
    setFormData({
      ...formData, cLicenses: [
        ...formData.cLicenses, {
          dSelectedLicense: "",
          dLicenseNumber: "",
          dLicenseIssueDate: "",
          dLicenseExpiryDate: "",
        }
      ],
    });
  };

  // Remove License
  const removeLicense = (index: number) => {
    const updatedLicenses = formData.cLicenses.filter((_, i) => i !== index);
    setFormData({ ...formData, cLicenses: updatedLicenses });
  };

  // Handle Input Change
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  // Handle License Input Change
  const handleLicenseInputChange = (event: any, index: number) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      const updatedLicenses = (prevFormData.cLicenses.length > 0) ? [...(prevFormData as any).cLicenses] : [];
      updatedLicenses[index] = {
        ...updatedLicenses[index],
        [name]: value,
      };
  
      return {
        ...prevFormData,
        cLicenses: updatedLicenses,
      };
    });
  };

  // Handle Submit
  const handleSubmit = (event: any) => {
    event.preventDefault();

    console.log("formDataObj", formData);
    apiResponseHandler.createAPIResponseHandler(formData, APICall.createAPITrigger, navigate, APICall.licenseCreateAPITrigger)
  };

  // All Render
  // Extra Render
  useEffect(() => {
    console.log(formData)
  }, [formData])
  
    // Extra Render
    useEffect(() => {
      console.log(ReduxCall.state)
    }, [ReduxCall.state])
  
  // JSX
  return (
    <React.Fragment>
      {/* OrganizationCreatePage */}

      <>
        <TopNavBarComponent />
        <Container>
          <MainHeading>Add Organization</MainHeading>
          <Form onSubmit={handleSubmit}>
            <InputHeading>Name of Firm</InputHeading>
            <Input
              type="text"
              placeholder="Name of Firm"
              name="dName"
              value={formData.dName}
              onChange={handleInputChange}
            />
            <InputHeading>Select type of Firm</InputHeading>
            <Input
              type="text"
              placeholder="Select type of firm"
              name="dType"
              value={formData.dType}
              onChange={handleInputChange}
            />
            <ContactInfo>
              <PhoneInfo>
                <InputHeading>Phone</InputHeading>
                <ContactInput
                  type="text"
                  placeholder="Phone"
                  name="dPhoneNumber"
                  value={formData.dPhoneNumber}
                  onChange={handleInputChange}
                />
              </PhoneInfo>
              <EmailInfo>
                <InputHeading>Email</InputHeading>
                <ContactInput
                  type="email"
                  placeholder="Email"
                  name="dCompanyEmail"
                  value={formData.dCompanyEmail}
                  onChange={handleInputChange}
                />
              </EmailInfo>
            </ContactInfo>
            <InputHeading>Address</InputHeading>
            <Input
              type="text"
              placeholder="Address"
              name="dAddress"
              value={formData.dAddress}
              onChange={handleInputChange}
            />
            <ContactInfo>
              <StateInfo>
                <InputHeading>Select State</InputHeading>
                <Dropdown
                  value={formData.dSelectedState}
                  onChange={handleInputChange}
                  name="dSelectedState"
                >
                  <DropdownOption value="" disabled>
                    Select State
                  </DropdownOption>
                  {Object.keys(statesAndCities).map((state) => (
                    <DropdownOption key={state} value={state}>
                      {state}
                    </DropdownOption>
                  ))}
                </Dropdown>
              </StateInfo>
              <CityInfo>
                <InputHeading>Select City</InputHeading>
                <Dropdown
                  value={formData.dSelectedCity}
                  onChange={handleInputChange}
                  name="dSelectedCity"
                >
                  <DropdownOption value="" disabled>
                    Select City
                  </DropdownOption>
                  {(statesAndCities as any)[formData.dSelectedState]?.map((city: any) => (
                    <DropdownOption key={city} value={city}>
                      {city}
                    </DropdownOption>
                  ))}
                </Dropdown>
              </CityInfo>
            </ContactInfo>
            <ContactInfo>
              <PinCode>
                <InputHeading>Pin Code</InputHeading>
                <ContactInput
                  type="text"
                  placeholder="Pin Code"
                  name="dPin"
                  value={formData.dPin}
                  onChange={handleInputChange}
                />
              </PinCode>
              <PanCard>
                <InputHeading>PAN Card</InputHeading>
                <ContactInput
                  type="text"
                  placeholder="PAN Card"
                  name="dPanNumber"
                  value={formData.dPanNumber}
                  onChange={handleInputChange}
                />
              </PanCard>
            </ContactInfo>
            <MainHeading>Add Licenses</MainHeading>
            {formData.cLicenses.map((license: any, index: any) => (
              <div key={index}>
                <InputHeading>License Number</InputHeading>
                <Input
                  type="text"
                  placeholder="License Number"
                  name="dLicenseNumber"
                  value={license.dLicenseNumber}
                  onChange={(e) => handleLicenseInputChange(e, index)}
                />
                <FinalTag>
                  <IssueDate>
                    <InputHeading>Issue Date</InputHeading>
                    <ContactInput
                      type="date"
                      placeholder="Issue Date"
                      name="dLicenseIssueDate"
                      value={license.dLicenseIssueDate}
                      onChange={(e) => handleLicenseInputChange(e, index)}
                    />
                  </IssueDate>
                  <ExpiryDate>
                    <InputHeading>Expiry Date</InputHeading>
                    <ContactInput
                      type="date"
                      placeholder="Expiry Date"
                      name="dLicenseExpiryDate"
                      value={license.dLicenseExpiryDate}
                      onChange={(e) => handleLicenseInputChange(e, index)}
                    />
                  </ExpiryDate>
                </FinalTag>
                <InputHeading>Select type of License</InputHeading>
                <Dropdown
                  value={license.dSelectedLicense}
                  onChange={(e) => handleLicenseInputChange(e, index)}
                  name="dSelectedLicense"
                >
                  <DropdownOption value="" disabled>
                    Select type of License
                  </DropdownOption>
                  {licenseTypes.map((licenseType: any) => (
                    <DropdownOption key={licenseType} value={licenseType}>
                      {licenseType}
                    </DropdownOption>
                  ))}
                </Dropdown>
                <FileInputContainer>
                  <FileInputLabel htmlFor={`file-upload-${index}`}>
                    Upload File
                  </FileInputLabel>
                  <FileInput
                    id={`file-upload-${index}`}
                    type="file"
                    name="file"
                    // onChange={(e) => handleFileChange(e, index)}
                  />
                </FileInputContainer>
                {license.file && <UploadedFile>{license.file.name}</UploadedFile>}
                <RemoveButton type="button" onClick={() => removeLicense(index)}>
                  Remove
                </RemoveButton>
              </div>
            ))}
            <AddNew type="button" onClick={addNewLicense}>
              Add New
            </AddNew>
            <ButtonTwo type="submit">Save & Next</ButtonTwo>
          </Form>
        </Container>
      </>

    </React.Fragment>
  )
}

export default OrganizationCreatePage;
