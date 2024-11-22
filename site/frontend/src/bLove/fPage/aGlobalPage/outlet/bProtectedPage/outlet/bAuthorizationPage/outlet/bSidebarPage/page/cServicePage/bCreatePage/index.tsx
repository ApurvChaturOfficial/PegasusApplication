import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
// import fullRoute from "@/bLove/gRoute/bFullRoute";

import serviceAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/fServiceAPIEndpoints";
import organizationAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/dOrganizationAPIEndpoints";
import apiResponseHandler from "./extras/aAPIResponseHandler";
import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import { ButtonContainer, CancelButton, ContactInput, Container, Dropdown, DropdownOption, ExpiryDate, FileInput, FileInputContainer, FileInputLabel, FinalTag, Form, InputHeading, IssueDate, MainHeading, RowInput, SubmitButton } from "./style";


const ServiceCreatePage = () => {
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
    createAPITrigger: serviceAPIEndpoint.useServiceCreateAPIMutation()[0],
    createAPIResponse: serviceAPIEndpoint.useServiceCreateAPIMutation()[1],

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
      ServiceCreatePage

      <form onSubmit={handleSubmit} noValidate >
        <div>
          Service Detail
          <div>
            <label>Select Organization</label>
            <select name="cOrganization" onChange={(event => handleInputChange(event))} >
              <option disabled selected >--Select--</option>
              {APICall.organizationListAPIResponse.isLoading ? null : 
                APICall.organizationListAPIResponse.isError ? null :
                  APICall.organizationListAPIResponse.isSuccess ? (
                    APICall.organizationListAPIResponse.data.success ? (
                      APICall.organizationListAPIResponse.data.list.length > 0 ? (
                        <React.Fragment>
                          {
                            APICall.organizationListAPIResponse.data.list?.filter((each: any) => each.bCreatedBy?._id === (ReduxCall.state.receivedObject as any)?.ProfileRetrieve?._id).map((each: any, index: any) => (
                              <option key={index} value={each._id}>{each.dName}</option>
                            ))
                          }
                        </React.Fragment>
                      ) : []
                    ) : []
                  ) : []
              }
            </select>
          </div>

          <div>
            <label>Form Number</label>
            <input name="dFormNumber" onChange={(event => handleInputChange(event))} />
          </div>

          <div>
            <label>Form Type</label>
            <select name="dFormType" onChange={(event => handleInputChange(event))} >
              <option disabled selected >--Select--</option>
              <option value="Type 1" >Type 1</option>
              <option value="Type 2" >Type 2</option>
              <option value="Type 3" >Type 3</option>
              <option value="Type 4" >Type 4</option>
            </select>
          </div>

          <div>
            <label>Category</label>
            <select name="dCategory" onChange={(event => handleInputChange(event))} >
              <option disabled selected >--Select--</option>
              <option value="Category 1" >Category 1</option>
              <option value="Category 2" >Category 2</option>
              <option value="Category 3" >Category 3</option>
              <option value="Category 4" >Category 4</option>
            </select>
          </div>

          <div>
            <label>Own / Loan</label>
            <select name="dOwnLoan" onChange={(event => handleInputChange(event))} >
              <option disabled selected >--Select--</option>
              <option value="Own 1" >Own 1</option>
              <option value="Loan 2" >Loan 2</option>
            </select>
          </div>

          <div>
            <label>Govt. Fees</label>
            <input name="dGovtFees" onChange={(event => handleInputChange(event))} />
          </div>

          <div>
            <label>Our Fees</label>
            <input name="dOurFees" onChange={(event => handleInputChange(event))} />
          </div>

          <div>
            <label>Added Date</label>
            <input name="dAddedDate" onChange={(event => handleInputChange(event))} />
          </div>

          <div>
            <label>Service Validiy</label>
            <input name="dServiceValidity" onChange={(event => handleInputChange(event))} />
          </div>

        </div>

        <button type="submit" >Submit</button>
      </form>

      <div>
        --------------------------------------------------------------
      </div>

      <>
        <TopNavBarComponent />
        <Container>
          <MainHeading>Add Service</MainHeading>
          <Form onSubmit={handleSubmit}>
            <div>
              <InputHeading>Select Your Firm</InputHeading>
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
                                <DropdownOption key={index} value={each._id}>
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

              {/* <SecondaryHeading>Confirm Firm Details</SecondaryHeading>

              
              <InputHeading>Type of Firm</InputHeading>
              <Dropdown
                value={Documents.selectedOrganization}
                onChange={(e) => handleInputChange(e, index)}
                name="select your firm"
              >
                <DropdownOption value="" disabled>
                  Select Firm
                </DropdownOption>
                {license.map((license) => (
                  <DropdownOption key={license} value={license}>
                    {license}
                  </DropdownOption>
                ))}
              </Dropdown>

              <RowContainer>
              <div>
                  <InputHeadingp>Phone</InputHeadingp>
                  <RowInput
                    type="text"
                    placeholder="+91-9911991191"
                    name="phone"
                    value={document.Comment}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
                

                <div>
                  <InputHeading>Email</InputHeading>
                  <RowInput
                    type="text"
                    placeholder="jdsfsnk@gmail.com"
                    name="email"
                    value={document.Comment}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
              </RowContainer>

              <InputHeading>Address</InputHeading>
              <RowInput
                type="text"
                placeholder="Enter Address"
                name="address"
                value={document.Comment}
                onChange={(e) => handleInputChange(e, index)}
              /> */}
              
              
              
                
              {/* <ContactInfo>
            <StateInfo>
              <InputHeading>Select State</InputHeading>
              <Dropdown
                value={formData.selectedState}
                onChange={handleStateChange}
                name="selectedState"
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
                value={formData.selectedCity}
                onChange={handleCityChange}
                name="selectedCity"
              >
                <DropdownOption value="" disabled>
                  Select City
                </DropdownOption>
                {statesAndCities[formData.selectedState]?.map((city) => (
                  <DropdownOption
                    key={city}
                    value={city.toLowerCase().replace(/\s+/g, "-")}
                  >
                    {city}
                  </DropdownOption>
                ))}
              </Dropdown>
            </CityInfo>
          </ContactInfo> */}
          
          {/* <RowContainer>
              <div>
                  <InputHeadingp>Enter Pin Code</InputHeadingp>
                  <RowInput
                    type="text"
                    placeholder="Enter pin code"
                    name="phone"
                    // value={document.Comment}
                    // onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
                

                <div>
                  <InputHeading>Enter PAN Card Number</InputHeading>
                  <RowInput
                    type="text"
                    placeholder="Enter Pan Card Number"
                    name="email"
                    // value={document.Comment}
                    // onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
              </RowContainer> */}

              {/* <SecondaryHeading>Add Service</SecondaryHeading> */}

              <InputHeading>Select Service</InputHeading>
              <Dropdown
                // value={Documents.selectedOrganization}
                // onChange={(e) => handleInputChange(e, index)}
                name="select your firm"
              >
                <DropdownOption value="" disabled>
                  Select Firm
                </DropdownOption>
                {/* {license.map((license) => (
                  <DropdownOption key={license} value={license}>
                    {license}
                  </DropdownOption>
                ))} */}
              </Dropdown>

              <InputHeading>Enter License Number</InputHeading>
                  <RowInput
                    type="text"
                    placeholder="Enter License ID Number"
                    name="licneseID"
                    // value={document.Comment}
                    // onChange={(e) => handleInputChange(e, index)}
                  />
              
              <FinalTag>
                <IssueDate>
                  <InputHeading>Issue Date</InputHeading>
                  <ContactInput
                    type="date"
                    placeholder="Issue Date"
                    name="issueDate"
                    // value={license.issueDate}
                    // onChange={(e) => handleInputChange(e, index)}
                  />
                </IssueDate>
                <ExpiryDate>
                  <InputHeading>Expiry Date</InputHeading>
                  <ContactInput
                    type="date"
                    placeholder="Expiry Date"
                    name="expiryDate"
                    // value={license.expiryDate}
                    // onChange={(e) => handleInputChange(e, index)}
                  />
                </ExpiryDate>
              </FinalTag>

              
              <InputHeading>Upload Scan Copy</InputHeading>
              <FileInputContainer>
                <FileInputLabel htmlFor={``}>
                  {/* {Documents.file ? Documents.file.name : "Choose File"} */}
                </FileInputLabel>
                <FileInput
                  type="file"
                  // id={`file-upload-${index}`}
                  name="file"
                  // onChange={(e) => handleFileChange(e, index)}
                />
              </FileInputContainer>
              <IssueDate>
                  <InputHeading>Date of Upload</InputHeading>
                  <RowInput
                    type="date"
                    name="issueDate"
                    // value={document.issueDate}
                    // onChange={(e) => handleInputChange(e, index)}
                  />
                </IssueDate>
              
            </div>
            <>
              <ButtonContainer>
                <SubmitButton type="submit" onClick={() => "handleSubmit"}>Submit</SubmitButton>
                <CancelButton type="button" onClick={() => "handleCancel"}>Cancel</CancelButton>
              </ButtonContainer>
            </>
          </Form>
        </Container>
      </>

    </React.Fragment>
  )
}

export default ServiceCreatePage;
