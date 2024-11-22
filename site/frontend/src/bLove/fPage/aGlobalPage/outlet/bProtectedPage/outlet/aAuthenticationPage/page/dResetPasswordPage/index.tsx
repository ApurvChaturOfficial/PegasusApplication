import React from "react"
// import { useParams } from "react-router-dom";

// import userAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/bUserAdministration/aUserAPIEndpoints";
import ResetPasswordComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/aAuthenticationComponent/children/dResetPasswordComponent";

// import apiResponseHandler from "./extras/aAPIResponseHandler";
// import { formSchema } from "./extras/cType";
// import data from "./extras/bData";


const ResetPasswordPage = () => {
  // Variables
  // const { token } = useParams()

  // // API Call
  // const APICall = {
  //   submitAPITrigger: userAPIEndpoint.useUserResetPasswordAPIMutation()[0],
  //   submitAPIResponse: userAPIEndpoint.useUserResetPasswordAPIMutation()[1],
  // }
  
  // JSX
  return (
    <React.Fragment>
      ResetPasswordPage
      <ResetPasswordComponent 
        // APICall={{
        //   submitAPITrigger: APICall.submitAPITrigger,
        //   submitAPIResponse: APICall.submitAPIResponse,
        // }}
        // extras={{
        //   apiResponseHandler: {
        //     submitAPIResponseHandler: apiResponseHandler.submitAPIResponseHandler
        //   },
        //   formSchema: formSchema,
        //   formDefaultValue: {
        //     ePassword: "",
        //     eConfirmPassword: "",
        //   },
        //   data: data as any
        // }}  
        // token={token}      
      />
    </React.Fragment>
  )
}

export default ResetPasswordPage;
