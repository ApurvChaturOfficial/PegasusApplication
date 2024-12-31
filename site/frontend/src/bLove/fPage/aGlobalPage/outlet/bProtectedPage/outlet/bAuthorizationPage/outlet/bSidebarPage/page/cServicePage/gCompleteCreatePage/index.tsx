import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import fullRoute from "@/bLove/gRoute/bFullRoute";

import serviceAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/fServiceAPIEndpoints";
// import organizationAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/dOrganizationAPIEndpoints";
import TopNavBarTwoComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarTwoComponent";
import SidebarNavigation from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/outlet/bSidebarComponent/component/SidebarNavigation/SidebarNavigation";
import allCategoryType from "@/bLove/hAsset/data/allCategoryType";
import allFirmType from "@/bLove/hAsset/data/allFirmType";
import allLicenseType from "@/bLove/hAsset/data/allLicenseType";
import apiResponseHandler from "./extras/aAPIResponseHandler";
import { AddButton, AddHeading, AddService, AddServiceForm, CancelButton, DropTag, FeeTag, Input, InputHeading, InputTag, InputTag2, InputTag3, LeftContainer, MainContainer, ownLoanOptions, RightContainer, Select, Select2, ServiceSubContainer, SubmitTag, ValidityTag } from "./style";
import fullRoute from "@/bLove/gRoute/bFullRoute";


const ServiceCreatePage = () => {
  // Variable
  const navigate = useNavigate();

  // State Variable
  const [formData, setFormData] = useState({
    dFormNumber: "",
    dFormType: "",
    dCategory: "",
    dOwnLoan: "",
    dGovtFees: "",
    dOurFees: "",
    dAddedDate: "",
    dServiceValidity: "",
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
  // Extra Render
  useEffect(() => {
    console.log(ReduxCall.state)
  }, [ReduxCall.state])

  // JSX
  return (
    <React.Fragment>
      {/* ServiceCreatePage */}

      <>
        <TopNavBarTwoComponent />
        <MainContainer>
        <LeftContainer>
          <SidebarNavigation />
        </LeftContainer>
        <RightContainer>
          <ServiceSubContainer>
            <>
              <AddService>
                <AddHeading>Add New Service</AddHeading>
                <AddServiceForm onSubmit={handleSubmit}>

                  <InputTag>
                    <InputHeading>Form Number</InputHeading>
                    <Select
                      id="formNumber"
                      name="dFormNumber" 
                      onChange={(event => handleInputChange(event))}
                    >
                      <option selected disabled>--Select Form Number--</option>
                      {allLicenseType.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                  </InputTag>

                  <DropTag>
                    <InputTag2>
                      <InputHeading>Select type of firm</InputHeading>
                      <Select2
                        id="firm-type"
                        // value={formType}
                        // onChange={handleChange}
                        name="dFormType" 
                        onChange={(event => handleInputChange(event))}
                      >
                        <option selected disabled>--Select--</option>
                        {allFirmType.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </Select2>
                    </InputTag2>

                    <InputTag3>
                      <InputHeading>Select Category</InputHeading>
                      <Select2
                        id="category"
                        // value={category}
                        // onChange={handleChange}
                        name="dCategory" 
                        onChange={(event => handleInputChange(event))}
                      >
                        <option selected disabled>--Select--</option>
                        {allCategoryType.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </Select2>
                    </InputTag3>
                  </DropTag>
                  <InputTag>
                    <InputHeading>Own/Loan</InputHeading>
                    <Select
                      id="own-loan"
                      // value={ownLoan}
                      // onChange={handleChange}
                      name="dOwnLoan" 
                      onChange={(event => handleInputChange(event))}
                    >
                      <option selected disabled>--Select--</option>
                      {ownLoanOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                  </InputTag>

                  <FeeTag>
                    <InputTag2>
                      <InputHeading>Govt Fee (₹)</InputHeading>
                      <Input
                        type="text"
                        id="govt-fees"
                        placeholder="Enter in ₹ "
                        // value={govtFees}
                        // onChange={handleChange}
                        name="dGovtFees" 
                        onChange={(event => handleInputChange(event))}
                      />
                    </InputTag2>
                    <InputTag3>
                      <InputHeading>Our Fee (₹)</InputHeading>
                      <Input
                        type="text"
                        id="our-fees"
                        placeholder="Enter in ₹ "
                        // value={ourFees}
                        // onChange={handleChange}
                        name="dOurFees" 
                        onChange={(event => handleInputChange(event))}
                      />
                    </InputTag3>
                  </FeeTag>
                  <ValidityTag>
                    <InputTag2>
                      <InputHeading>Date Added</InputHeading>
                      <Input
                        type="date"
                        id="added-date"
                        // value={addedDate}
                        // onChange={handleChange}
                        name="dAddedDate" 
                        onChange={(event => handleInputChange(event))}
                      />
                    </InputTag2>
                    <InputTag3>
                      <InputHeading>Service Validity (In Years)</InputHeading>
                      <Input
                        type="text"
                        id="validity"
                        placeholder="Enter number"
                        // value={validity}
                        // onChange={handleChange}
                        name="dServiceValidity" 
                        onChange={(event => handleInputChange(event))}
                      />
                    </InputTag3>
                  </ValidityTag>
                  <SubmitTag>
                    <AddButton type="submit">Add Service</AddButton>
                    <CancelButton type="button" onClick={() => navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.cServiceRoute.fCompleteListRoute)}>
                      Cancel
                    </CancelButton>
                  </SubmitTag>
                </AddServiceForm>
              </AddService>
            </>
          </ServiceSubContainer>
        </RightContainer>
        </MainContainer>
      </>

    </React.Fragment>
  )
}

export default ServiceCreatePage;
