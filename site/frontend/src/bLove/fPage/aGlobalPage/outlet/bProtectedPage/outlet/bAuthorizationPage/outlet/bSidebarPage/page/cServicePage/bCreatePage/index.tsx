import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import fullRoute from "@/bLove/gRoute/bFullRoute";

import organizationAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/dOrganizationAPIEndpoints";
import serviceAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/fServiceAPIEndpoints";
import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import { Bounce, toast } from "react-toastify";
import apiResponseHandler from "./extras/aAPIResponseHandler";
import { ButtonContainer, CancelButton, CityInfo, ContactInfo, Container, Dropdown, DropdownOption, Form, InputHeading, InputHeadingp, MainHeading, RowContainer, RowInput, SecondaryHeading, StateInfo, SubmitButton } from "./style";
// import fullRoute from "@/bLove/gRoute/bFullRoute";


const ServiceCreatePage = () => {
  // Variable
  const navigate = useNavigate();

  // State Variable
  const [formData, setFormData] = useState({
    cService: "",
  })
  const [organizationRetireve, setOrganizationRetireve] = useState({
    _id: "",

    cService: [],

    dType: "",
    dPhoneNumber: "",
    dCompanyEmail: "",
    dAddress: "",
    dSelectedState: "",
    dSelectedCity: "",
    dPin: "",
    dPanNumber: "",
  })

  // Redux Call
  const ReduxCall = {
    state: useSelector((fullState: RootState) => fullState.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }

  // API Call
  const APICall = {
    updateAPITrigger: organizationAPIEndpoint.useOrganizationUpdateAPIMutation()[0],
    updateAPIResponse: organizationAPIEndpoint.useOrganizationUpdateAPIMutation()[1],

    // Requirements... Muaaah...
    serviceListAPIResponse: serviceAPIEndpoint.useServiceListAPIQuery(null),

    organizationListAPIResponse: organizationAPIEndpoint.useOrganizationListAPIQuery(null),

    organizationRetrieveAPITrigger: organizationAPIEndpoint.useLazyOrganizationRetrievePIQuery()[0],
    organizationRetrieveAPIResponse: organizationAPIEndpoint.useLazyOrganizationRetrievePIQuery()[1],
  }

  // Event Handlers
  // Handle Input Change
  const handleOrganizationInputChange = (event: any) => {
    const { value } = event.target;
    
    // setFormData({ ...formData, [name]: value });
    // console.log(value)
    organizationRetrieveAPIHandler(value)

  };
  
  // Handle Input Change
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };
  
  // Submit handler
  const handleSubmit = (event: any) => {
    event.preventDefault();

    console.log("formDataObj", formData);
    apiResponseHandler.updateAPIResponseHandler(formData, APICall.updateAPITrigger, navigate, organizationRetireve)
  };

  const organizationRetrieveAPIHandler = async (id: string) => {
    try {
      const serverResponse = await APICall.organizationRetrieveAPITrigger({ params: { _id: id } });

      // console.log(serverResponse)

      if (serverResponse.error && (serverResponse.error as any).originalStatus === 404) {
        return toast.error(("There was a problem with server connection."), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });
      } 
      
      if (serverResponse.error && (serverResponse.error as any)?.data?.success === false) {
        return toast.error(((serverResponse.error as any).data.message || "There was an error occured."), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });
      }

      if (serverResponse.data && serverResponse.data?.success === true) {
        toast.success((serverResponse.data.message), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });

        setOrganizationRetireve({
          ...organizationRetireve,

          _id: serverResponse.data.retrieve?._id, 
          
          cService: serverResponse.data.retrieve?.cService, 

          dType: serverResponse.data.retrieve?.dType,
          dPhoneNumber: serverResponse.data.retrieve?.dPhoneNumber,
          dCompanyEmail: serverResponse.data.retrieve?.dCompanyEmail,
          dAddress: serverResponse.data.retrieve?.dAddress,
          dSelectedState: serverResponse.data.retrieve?.dSelectedState,
          dSelectedCity: serverResponse.data.retrieve?.dSelectedCity,
          dPin: serverResponse.data.retrieve?.dPin,
          dPanNumber: serverResponse.data.retrieve?.dPanNumber,      
        })

        // return navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.aOrganizationRoute.aListRoute);
      }

      return;

    } catch (error: any) {
      return toast.error(("There was a problem with try block code"), {
        position: "bottom-right",
        autoClose: 5000,
        transition: Bounce,
      });
    }    

  }

  // All Render
  // Extra Render
  useEffect(() => {
    console.log(formData)
  }, [formData])

  // Extra Render
  useEffect(() => {
    console.log(organizationRetireve)
  }, [organizationRetireve])

  // JSX
  return (
    <React.Fragment>
      {/* ServiceCreatePage */}

      {/* <form onSubmit={handleSubmit} noValidate >
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
      </form> */}

      {/* <div>
        --------------------------------------------------------------
      </div> */}

      <>
        <TopNavBarComponent />
        <Container>
          <MainHeading>Add Service</MainHeading>
          <Form onSubmit={handleSubmit}>
            <div>
              <InputHeading>Select Your Firm</InputHeading>
              <Dropdown
                // value={Documents.selectedOrganization}
                onChange={handleOrganizationInputChange}
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

              <React.Fragment>
                <SecondaryHeading>Confirm Firm Details</SecondaryHeading>
                
                <InputHeading>Type of Firm</InputHeading>
                <RowInput
                  type="text"
                  placeholder="Firm Type"
                  name="dType"
                  value={organizationRetireve.dType || ""}
                  disabled
                  // onChange={(e) => handleInputChange(e, index)}
                />

                <RowContainer>
                  <div>
                    <InputHeadingp>Phone</InputHeadingp>
                    <RowInput
                      type="text"
                      placeholder="+91-9911991191"
                      name="dPhoneNumber"
                      value={organizationRetireve.dPhoneNumber || ""}
                      disabled
                      // onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>

                  <div>
                    <InputHeading>Email</InputHeading>
                    <RowInput
                      type="text"
                      placeholder="jdsfsnk@gmail.com"
                      name="dCompanyEmail"
                      value={organizationRetireve.dCompanyEmail || ""}
                      disabled
                      // onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>
                </RowContainer>

                <InputHeading>Address</InputHeading>
                <RowInput
                  type="text"
                  placeholder="Enter Address"
                  name="address"
                  value={organizationRetireve.dAddress || ""}
                  disabled
                  // onChange={(e) => handleInputChange(e, index)}
                />
                <ContactInfo>
                  <StateInfo>
                    <InputHeading>Select State</InputHeading>
                    {/* <Dropdown
                      value={organizationRetireve.dSelectedState}
                      // onChange={handleStateChange}
                      name="selectedState"
                    >
                      <DropdownOption value="" disabled>
                        Select State
                      </DropdownOption>
                    </Dropdown> */}
                    <RowInput
                      type="text"
                      placeholder="Enter Address"
                      name="address"
                      value={organizationRetireve.dSelectedState || ""}
                      disabled
                      // onChange={(e) => handleInputChange(e, index)}
                    />
                  </StateInfo>
                  <CityInfo>
                    <InputHeading>Select City</InputHeading>

                    <RowInput
                      type="text"
                      placeholder="Enter Address"
                      name="address"
                      value={organizationRetireve.dSelectedCity || ""}
                      disabled
                      // onChange={(e) => handleInputChange(e, index)}
                    />

                    {/* <Dropdown
                      value={organizationRetireve.dSelectedCity}
                      // onChange={handleCityChange}
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
                    </Dropdown> */}
                  </CityInfo>
                </ContactInfo>
            
                <RowContainer>
                  <div>
                    <InputHeadingp>Enter Pin Code</InputHeadingp>
                    <RowInput
                      type="text"
                      placeholder="Enter pin code"
                      name="phone"
                      value={organizationRetireve.dPin}
                      disabled
                      // onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>

                  <div>
                    <InputHeading>Enter PAN Card Number</InputHeading>
                    <RowInput
                      type="text"
                      placeholder="Enter Pan Card Number"
                      name="email"
                      value={organizationRetireve.dPanNumber}
                      disabled
                      // onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>
                </RowContainer>
              </React.Fragment>

              <SecondaryHeading>Add Service</SecondaryHeading>

              <InputHeading>Select Service</InputHeading>
              <Dropdown
                // value={Documents.selectedOrganization}
                onChange={handleInputChange}

                name="cService"
              >
                <DropdownOption selected disabled>
                  Select Service
                </DropdownOption>
                {/* {license.map((license) => (
                  <DropdownOption key={license} value={license}>
                    {license}
                  </DropdownOption>
                ))} */}

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

              {/* <InputHeading>Enter License Number</InputHeading>
                  <RowInput
                    type="text"
                    placeholder="Enter License ID Number"
                    name="licneseID"
                    // value={document.Comment}
                    // onChange={(e) => handleInputChange(e, index)}
                  /> */}
              
              {/* <FinalTag>
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
                { <ExpiryDate>
                  <InputHeading>Expiry Date</InputHeading>
                  <ContactInput
                    type="date"
                    placeholder="Expiry Date"
                    name="expiryDate"
                    // value={license.expiryDate}
                    // onChange={(e) => handleInputChange(e, index)}
                  />
                </ExpiryDate> }
              </FinalTag> */}

              
              {/* <InputHeading>Upload Scan Copy</InputHeading>
              <FileInputContainer>
                <FileInputLabel htmlFor={`file-upload-${index}`}>
                  {Documents.file ? Documents.file.name : "Choose File"}
                </FileInputLabel>
                <FileInput
                  type="file"
                  id={`file-upload-${"index"}`}
                  name="file"
                  onChange={(e) => handleFileChange(e, index)}
                />
              </FileInputContainer>
              <IssueDate>
                  <InputHeading>Date of Upload</InputHeading>
                  <RowInput
                    type="date"
                    name="issueDate"
                    value={document.issueDate}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </IssueDate> */}
              
            </div>

            <>
              <ButtonContainer>
                <SubmitButton type="submit" onClick={handleSubmit}>Submit</SubmitButton>
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
