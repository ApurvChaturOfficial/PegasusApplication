import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
// import fullRoute from "@/bLove/gRoute/bFullRoute";

import licenseAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/eLicenseAPIEndpoints";
import organizationAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/dOrganizationAPIEndpoints";
import apiResponseHandler from "./extras/aAPIResponseHandler";
import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import { ButtonContainer, CancelButton, ContactInput, Container, Dropdown, DropdownOption, ExpiryDate, FileInput, FileInputContainer, FileInputLabel, FinalTag, Form, Input, InputHeading, IssueDate, MainHeading, SubmitButton } from "./style";


const LicenseUpdatePage = () => {
  // Variable
  const navigate = useNavigate();
  const { id } = useParams();

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
    retrieveAPIResponse: licenseAPIEndpoint.useLicenseRetrievePIQuery({ params: { _id: id } }),
    updateAPITrigger: licenseAPIEndpoint.useLicenseUpdateAPIMutation()[0],
    updateAPIResponse: licenseAPIEndpoint.useLicenseUpdateAPIMutation()[1],

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

    console.log("formDataObj", formData);
    apiResponseHandler.updateAPIResponseHandler(formData, APICall.updateAPITrigger, navigate, { id: id })
  };

  // All Render
  // First Render
  useEffect(() => {
    APICall.retrieveAPIResponse.isLoading ? null : 
    APICall.retrieveAPIResponse.isError ? null :
    APICall.retrieveAPIResponse.isSuccess ? (
      APICall.retrieveAPIResponse.data.success ? (
        setFormData({
          cOrganization: APICall.retrieveAPIResponse.data.retrieve.cOrganization,
          dSelectedLicense: APICall.retrieveAPIResponse.data.retrieve.dSelectedLicense,
          dLicenseNumber: APICall.retrieveAPIResponse.data.retrieve.dLicenseNumber,
          dIssueDate: APICall.retrieveAPIResponse.data.retrieve.dIssueDate,
          dExpiryDate: APICall.retrieveAPIResponse.data.retrieve.dExpiryDate,
        })
      ) : null
    ) : null
  }, [APICall.retrieveAPIResponse])
  
  // Extra Render
  useEffect(() => {
    console.log(formData)
  }, [formData])

  // JSX
  return (
    <React.Fragment>
      {/* LicenseUpdatePage */}

      <>
        <TopNavBarComponent />
        {
          APICall.retrieveAPIResponse.isLoading ? "Loading..." : 
          APICall.retrieveAPIResponse.isError ? "Error..." :
          APICall.retrieveAPIResponse.isSuccess ? (
            <React.Fragment>
              {
                APICall.retrieveAPIResponse.data.success ? (
                  <React.Fragment>
                    <Container>
                      <MainHeading>Edit License</MainHeading>
                      <Form onSubmit={handleSubmit}>

                        <div>
                          <InputHeading>Select Organization</InputHeading>
                          <Dropdown
                            onChange={handleInputChange}
                            name="cOrganization"
                          >
                            <DropdownOption selected disabled>
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
                                              selected={each._id === (formData.cOrganization as any)?._id}
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
                            <DropdownOption value="license1">License 1</DropdownOption>
                            <DropdownOption value="license2">License 2</DropdownOption>
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
                            <FileInputLabel>
                              {/* {license.file ? license.file.name : "Choose File"} */}
                            </FileInputLabel>
                            <FileInput
                              type="file"
                              // id={`file-upload-${index}`}
                              name="file"
                              // onChange={(e) => handleFileChange(e, index)}
                            />
                          </FileInputContainer>
                          
                        </div>

                        <>
                          <ButtonContainer>
                            <SubmitButton type="submit" onClick={handleSubmit}>Submit</SubmitButton>
                            <CancelButton type="button" onClick={() => "handleCancel"}>Cancel</CancelButton>
                          </ButtonContainer>
                        </>
                      </Form>
                    </Container>
                  </React.Fragment>
                ) : "Backend Error"
              }
            </React.Fragment>
          ) :
          "Let me understand first"
        } 

      </>

    </React.Fragment>
  )
}

export default LicenseUpdatePage;
