import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
// import fullRoute from "@/bLove/gRoute/bFullRoute";

import serviceAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/fServiceAPIEndpoints";
import organizationAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/dOrganizationAPIEndpoints";
import apiResponseHandler from "./extras/aAPIResponseHandler";


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
  // Extra Render
  useEffect(() => {
    console.log(ReduxCall.state)
  }, [ReduxCall.state])

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
                            APICall.organizationListAPIResponse.data.list?.map((each: any, index: any) => (
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

    </React.Fragment>
  )
}

export default ServiceCreatePage;
