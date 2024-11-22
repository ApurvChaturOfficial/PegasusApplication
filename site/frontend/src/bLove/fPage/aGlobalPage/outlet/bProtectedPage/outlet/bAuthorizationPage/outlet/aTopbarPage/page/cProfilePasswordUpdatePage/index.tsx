import React from "react"

import ProfilePasswordUpdateComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/outlet/aTopbarComponent/children/cProfilePasswordUpdateComponent";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/aConnection/dReduxConnection";
// import globalSlice from "@/bLove/bRedux/aGlobalSlice";
// import userAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/bUserAdministration/aUserAPIEndpoints";
// import data from "./extras/bData";
// import { formSchema } from "./extras/cType";
// import apiResponseHandler from "./extras/aAPIResponseHandler";


const ProfilePasswordUpdatePage = () => {
  // Redux Call
  // const ReduxCall = {
  //   state: useSelector((fullState: RootState) => fullState.globalSlice),
  //   dispatch: useDispatch(),
  //   action: globalSlice.actions
  // }

  // // API Call
  // const APICall = {
  //   updateAPITrigger: userAPIEndpoint.useUserProfilePasswordUpdateAPIMutation()[0],
  //   updateAPIResponse: userAPIEndpoint.useUserProfilePasswordUpdateAPIMutation()[1],
  // }  
  
  // JSX
  return (
    <React.Fragment>
      ProfilePasswordUpdatePage
      <ProfilePasswordUpdateComponent 
        // ReduxCall={ReduxCall}
        // APICall={{
        //   updateAPITrigger: APICall.updateAPITrigger,
        //   updateAPIResponse: APICall.updateAPIResponse,
        // }}
        // extras={{
        //   apiResponseHandler: {
        //     updateAPIResponseHandler: apiResponseHandler.updateAPIResponseHandler
        //   },
        //   data: data(APICall),
        //   formSchema: formSchema,
        //   formDefaultValue: {
        //     eOldPassword: "",
        //     eNewPassword: "",
        //     eConfirmPassword: "",
        //   },
        // }}                
      />
    </React.Fragment>
  )
}

export default ProfilePasswordUpdatePage;
