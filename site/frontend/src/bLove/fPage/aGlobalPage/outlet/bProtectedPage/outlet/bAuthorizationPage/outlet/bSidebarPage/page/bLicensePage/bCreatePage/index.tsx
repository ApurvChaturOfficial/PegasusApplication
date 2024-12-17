import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
// import fullRoute from "@/bLove/gRoute/bFullRoute";

import licenseAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/eLicenseAPIEndpoints";
import organizationAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/dOrganizationAPIEndpoints";
import apiResponseHandler from "./extras/aAPIResponseHandler";

import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import { ButtonContainer, ContactInput, Container, Dropdown, DropdownOption, ExpiryDate, FileInput, FileInputContainer, FinalTag, Form, Input, InputHeading, IssueDate, MainHeading, SubmitButton } from "./style";
import allLicenseType from "@/bLove/hAsset/data/allLicenseType";


const LicenseCreatePage = () => {
  // Variable
  const navigate = useNavigate();

  // State Variable
  const [formData, setFormData] = useState({
    cOrganization: "",

    dSelectedLicense: "",
    dLicenseNumber: "",
    dIssueDate: "",
    dExpiryDate: "",
  })

  // Redux Call
  const ReduxCall = {
    state: useSelector((fullState: RootState) => fullState.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }

  // API Call
  const APICall = {
    createAPITrigger: licenseAPIEndpoint.useLicenseCreateAPIMutation()[0],
    createAPIResponse: licenseAPIEndpoint.useLicenseCreateAPIMutation()[1],

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

    // console.log("formDataObj", formData);
    apiResponseHandler.createAPIResponseHandler(formData, APICall.createAPITrigger, navigate)
  };

  // All Render
  // Extra Render
  useEffect(() => {
    console.log(formData)
  }, [formData])

  // JSX
  return (
    <React.Fragment>
      {/* LicenseCreatePage */}

      <>
        <TopNavBarComponent />
        <Container>
          <MainHeading>Add License</MainHeading>
          <Form onSubmit={handleSubmit}>
            {/* {formData.licenses.map((license, index) => ( */}
              <div>
                <InputHeading>Select Organization</InputHeading>
                <Dropdown
                  value={formData.cOrganization}
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
                </Dropdown>

                <InputHeading>Select License</InputHeading>
                <Dropdown
                  name="dSelectedLicense"
                  value={formData.dSelectedLicense}
                  onChange={handleInputChange}
                >
                  <DropdownOption value="" disabled>
                    Select License
                  </DropdownOption>
                  {allLicenseType.map((each) => (
                    <DropdownOption key={each} value={each} >
                      {each}
                    </DropdownOption>
                  ))}
                </Dropdown>
                <InputHeading>Enter License Number</InputHeading>
                <Input
                  type="text"
                  placeholder="License Number"
                  name="dLicenseNumber"
                  value={formData.dLicenseNumber}
                  onChange={handleInputChange}
                />
                <FinalTag>
                  <IssueDate>
                    <InputHeading>Issue Date</InputHeading>
                    <ContactInput
                      type="date"
                      placeholder="Issue Date"
                      name="dIssueDate"
                      value={formData.dIssueDate}
                      onChange={handleInputChange}
                    />
                  </IssueDate>
                  <ExpiryDate>
                    <InputHeading>Expiry Date</InputHeading>
                    <ContactInput
                      type="date"
                      placeholder="Expiry Date"
                      name="dExpiryDate"
                      value={formData.dExpiryDate}
                      onChange={handleInputChange}
                    />
                  </ExpiryDate>
                </FinalTag>
                <InputHeading>Upload Scan Copy License</InputHeading>
                <FileInputContainer>
                  {/* <FileInputLabel htmlFor={`file-upload-${index}`}>
                    {license.file ? license.file.name : "Choose File"}
                  </FileInputLabel> */}
                  <FileInput
                    type="file"
                    // id={`file-upload-${index}`}
                    name="file"
                    // onChange={(e) => handleFileChange(e, index)}
                  />
                </FileInputContainer>
                {/* {formData.licenses.length > 1 && (
                  <RemoveButton
                    type="button"
                    onClick={() => removeLicense(index)}
                  >
                    Remove
                  </RemoveButton>
                )} */}
              </div>
            {/* // ))} */}
            <>
              {/* <TopButtonContainer>
                <AddNew type="button" onClick={addNewLicense}>
                  Add New
                </AddNew>
              </TopButtonContainer> */}
              <ButtonContainer>
                <SubmitButton type="submit" onClick={handleSubmit}>
                  Submit
                </SubmitButton>
                {/* <CancelButton type="button" onClick={handleCancel}>
                  Cancel
                </CancelButton> */}
              </ButtonContainer>
            </>
          </Form>
        </Container>
      </>


    </React.Fragment>
  )
}

export default LicenseCreatePage;
