import React from "react"

// import userAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/bUserAdministration/aUserAPIEndpoints";
import ForgotPasswordComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/aAuthenticationComponent/children/cForgotPasswordComponent";

// import apiResponseHandler from "./extras/aAPIResponseHandler";
// import { formSchema } from "./extras/cType";
// import data from "./extras/bData";


const ForgotPasswordPage = () => {
  // API Call
  // const APICall = {
  //   submitAPITrigger: userAPIEndpoint.useUserForgotPasswordAPIMutation()[0],
  //   submitAPIResponse: userAPIEndpoint.useUserForgotPasswordAPIMutation()[1],
  // }
  
  // JSX
  return (
    <React.Fragment>
      {/* ForgotPasswordPage */}
      <ForgotPasswordComponent 
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
        //     eEmail: "",
        //   },
        //   data: data as any
        // }}        
      />
    </React.Fragment>
  )
}

export default ForgotPasswordPage;
