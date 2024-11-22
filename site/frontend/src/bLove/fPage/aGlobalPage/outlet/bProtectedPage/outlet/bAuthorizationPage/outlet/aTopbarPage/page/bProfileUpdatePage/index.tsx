import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";

import userAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/bUserAdministration/aUserAPIEndpoints";
import roleAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/bUserAdministration/bRoleAPIEndpoints";

import ProfileUpdateComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/outlet/aTopbarComponent/children/bProfileUpdateComponent";
import data from "./extras/bData";
import apiResponseHandler from "./extras/aAPIResponseHandler";
import { formSchema } from "./extras/cType";


const ProfileUpdatePage = () => {
  // Redux Call
  const ReduxCall = {
    state: useSelector((fullState: RootState) => fullState.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }

  // API Call
  const APICall = {
    retrieveAPIResponse: userAPIEndpoint.useUserProfileRetrieveAPIQuery(null),
    updateAPITrigger: userAPIEndpoint.useUserProfileUpdateAPIMutation()[0],
    updateAPIResponse: userAPIEndpoint.useUserProfileUpdateAPIMutation()[1],

    // Relationship... Muaaah...
    roleListAPIResponse: roleAPIEndpoint.useRoleListAPIQuery(null),

  }  
  
  // JSX
  return (
    <React.Fragment>
      ProfileUpdatePage
      <ProfileUpdateComponent 
        ReduxCall={ReduxCall}
        APICall={{
          retrieveAPIResponse: APICall.retrieveAPIResponse,
          updateAPITrigger: APICall.updateAPITrigger,
          updateAPIResponse: APICall.updateAPIResponse,
        }}
        extras={{
          apiResponseHandler: {
            updateAPIResponseHandler: apiResponseHandler.updateAPIResponseHandler
          },
          data: data(APICall),
          formSchema: formSchema,
          formDefaultValue: {
            aTitle: "",
            aSubtitle: "",
            aDescription: "",
            aDetail: "",
            aStatus: "",
            aSlug: "",

            eFirstname: "",
            eLastname: "",
            // eEmail: "",
            eMobile: "",
          },
          previousValue: (form: any) => (
            form.setValue("aTitle", APICall.retrieveAPIResponse.data.user_profile_retrieve?.aTitle),
            form.setValue("aSubtitle", APICall.retrieveAPIResponse.data.user_profile_retrieve?.aSubtitle),
            form.setValue("aDescription", APICall.retrieveAPIResponse.data.user_profile_retrieve?.aDescription),
            form.setValue("aDetail", APICall.retrieveAPIResponse.data.user_profile_retrieve?.aDetail),
            form.setValue("aStatus", APICall.retrieveAPIResponse.data.user_profile_retrieve?.aStatus ? "active" : "inactive"),
            form.setValue("aSlug", APICall.retrieveAPIResponse.data.user_profile_retrieve?.aSlug),

            form.setValue("eFirstname", APICall.retrieveAPIResponse.data.user_profile_retrieve?.eFirstname),
            form.setValue("eLastname", APICall.retrieveAPIResponse.data.user_profile_retrieve?.eLastname),
            // form.setValue("eEmail", APICall.retrieveAPIResponse.data.user_profile_retrieve?.eEmail),
            form.setValue("eMobile", APICall.retrieveAPIResponse.data.user_profile_retrieve?.eMobile)
          )
        }}        
      />
    </React.Fragment>
  )
}

export default ProfileUpdatePage;
