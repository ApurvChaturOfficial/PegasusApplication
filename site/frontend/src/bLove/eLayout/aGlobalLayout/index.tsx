import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";

import userAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/bUserAdministration/aUserAPIEndpoints";
import GlobalComponent from "@/bLove/cComponent/aGlobalComponent";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import apiResponseHandler from "./extras/aAPIResponseHandler";


const GlobalLayout = () => {
  // Redux
  const Redux = {
    state: useSelector((state: RootState) => state.globalSlice),
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
    apiResponseHandler.retrieveAPIResponseHandler(APICall.retrieveAPIResponse, Redux);
  }, [APICall.retrieveAPIResponse])
  
  // Auth Render
  useEffect(() => {
    // console.log("ExtraObject", (Redux.state.extraObject as any)?.ProfileRetrieve?._id);
    apiResponseHandler.retrieveAPIResponseHandler(APICall.retrieveAPIResponse, Redux);
  }, [(Redux.state.extraObject as any)?.ProfileRetrieve?._id])
  
  // Extra Render
  useEffect(() => {
    console.log("ReceivedObject", Redux.state.receivedObject)
  }, [Redux.state.receivedObject])
  
  // JSX
  return (
    <React.Fragment>
      {/* GlobalLayout */}
      {/* { APICall.retrieveAPIResponse.isLoading ? (
        <div className='min-h-screen flex justify-center items-center' >Checking Profile...</div>
      ) : ( */}
        <GlobalComponent>
          <Outlet />
        </GlobalComponent>
      {/* ) */}
    </React.Fragment>
  )
}

export default GlobalLayout; 
