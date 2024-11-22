import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";

import ProfileRetrieveComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/outlet/aTopbarComponent/children/aProfileRetrieveComponent";
import userAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/bUserAdministration/aUserAPIEndpoints";
import apiResponseHandler from "./extras/aAPIResponseHandler";
import data from "./extras/bData";


const ProfileRetrievePage = () => {
  // Redux Call
  const ReduxCall = {
    state: useSelector((fullState: RootState) => fullState.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }

  // API Call
  const APICall = {
    retrieveAPIResponse: userAPIEndpoint.useUserProfileRetrieveAPIQuery(null),
  }

  // All Render
  // First Render
  useEffect(() => {
    apiResponseHandler.retrieveAPIResponseHandler(APICall.retrieveAPIResponse);
  }, [APICall.retrieveAPIResponse])
  
  // Extra Render
  useEffect(() => {
    // console.log(ReduxCall.state)

    APICall.retrieveAPIResponse.isLoading ? null : 
    APICall.retrieveAPIResponse.isError ? null :
      APICall.retrieveAPIResponse.isSuccess ? (
        APICall.retrieveAPIResponse.data.success ? (
          null
          // console.log(APICall.retrieveAPIResponse.data.user_profile_retrieve)
        ) : null
      ) : null

  }, [ReduxCall.state])
  
  
  // JSX
  return (
    <React.Fragment>
      {/* ProfileRetrievePage */}
      <ProfileRetrieveComponent 
        ReduxCall={ReduxCall}
        APICall={{
          retrieveAPIResponse: APICall.retrieveAPIResponse
        }}
        extras={{
          apiResponseHandler: {
            retrieveAPIResponseHandler: apiResponseHandler.retrieveAPIResponseHandler
          },
          data: data(APICall)
        }}                        
      />
    </React.Fragment>
  )
}

export default ProfileRetrievePage;
