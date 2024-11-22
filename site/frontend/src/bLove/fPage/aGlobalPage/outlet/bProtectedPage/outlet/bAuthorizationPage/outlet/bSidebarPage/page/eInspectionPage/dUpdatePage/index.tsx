import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
// import fullRoute from "@/bLove/gRoute/bFullRoute";

import inspectionAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/hInspectionAPIEndpoints";
import organizationAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/dOrganizationAPIEndpoints";
import apiResponseHandler from "./extras/aAPIResponseHandler";


const InspectionUpdatePage = () => {
  // Variable
  const navigate = useNavigate();
  const { id } = useParams();

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
    retrieveAPIResponse: inspectionAPIEndpoint.useInspectionRetrievePIQuery({ params: { _id: id } }),
    updateAPITrigger: inspectionAPIEndpoint.useInspectionUpdateAPIMutation()[0],
    updateAPIResponse: inspectionAPIEndpoint.useInspectionUpdateAPIMutation()[1],
    
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
          dReportName: APICall.retrieveAPIResponse.data.retrieve.dReportName,
          dUploadDate: APICall.retrieveAPIResponse.data.retrieve.dUploadDate,
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
      InspectionUpdatePage

      {
        APICall.retrieveAPIResponse.isLoading ? "Loading..." : 
        APICall.retrieveAPIResponse.isError ? "Error..." :
        APICall.retrieveAPIResponse.isSuccess ? (
          <React.Fragment>
            {
              APICall.retrieveAPIResponse.data.success ? (
                <React.Fragment>
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
                                          <option key={index} selected={each._id === (formData.cOrganization as any)?._id} value={each._id}>{each.dName}</option>
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
                        <label>License Number</label>
                        <input name="dReportName" value={formData.dReportName} onChange={(event => handleInputChange(event))} />
                      </div>

                      <div>
                        <label>Issued Date</label>
                        <input name="dUploadDate" value={formData.dUploadDate} onChange={(event => handleInputChange(event))} />
                      </div>

                    </div>

                    <button type="submit" >Submit</button>
                  </form>
                </React.Fragment>
              ) : "Backend Error"
            }
          </React.Fragment>
        ) :
        "Let me understand first"
      }

    </React.Fragment>
  )
}

export default InspectionUpdatePage;
