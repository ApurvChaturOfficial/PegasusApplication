import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
// import fullRoute from "@/bLove/gRoute/bFullRoute";

import inspectionAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/hInspectionAPIEndpoints";
import organizationAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/dOrganizationAPIEndpoints";
import apiResponseHandler from "./extras/aAPIResponseHandler";


const InspectionCreatePage = () => {
  // Variable
  const navigate = useNavigate();

  // State Variable
  const [formData, setFormData] = useState({
    cOrganization: "",

    dReportName: "",
    dUploadDate: "",
  })
  
  // Redux Call
  const ReduxCall = {
    state: useSelector((fullState: RootState) => fullState.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }

  // API Call
  const APICall = {
    createAPITrigger: inspectionAPIEndpoint.useInspectionCreateAPIMutation()[0],
    createAPIResponse: inspectionAPIEndpoint.useInspectionCreateAPIMutation()[1],

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
      InspectionCreatePage

      <form onSubmit={handleSubmit} noValidate >
        <div>
          License Detail
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
            <label>Report name</label>
            <input name="dReportName" onChange={(event => handleInputChange(event))} />
          </div>

          <div>
            <label>Upload Date</label>
            <input name="dUploadDate" onChange={(event => handleInputChange(event))} />
          </div>

        </div>

        <button type="submit" >Submit</button>
      </form>

    </React.Fragment>
  )
}

export default InspectionCreatePage;
