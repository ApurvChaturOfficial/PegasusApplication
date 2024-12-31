import fullRoute from "@/bLove/gRoute/bFullRoute";
import { NavigateFunction } from "react-router-dom";
import { Bounce, toast } from "react-toastify";


const apiResponseHandler = {
  updateAPIResponseHandler: async (data: any, createAPITrigger: any, navigate: NavigateFunction, params: any) => {

    try {
      const serverResponse = await createAPITrigger({ 
        params: { _id: params.id },
        body: {
          aTitle: data.dLicenseNumber,

          cOrganization: data.cOrganization,
  
          dSelectedLicense: data.dSelectedLicense,
          dLicenseNumber: data.dLicenseNumber,
          dIssueDate: data.dIssueDate,
          dExpiryDate: data.dExpiryDate,
          dCategory: data.dCategory,
          dOwnLoan: data.dOwnLoan,  
          dFileUploaded: data.dFileUploaded,
          dFileUploadedID: data.dFileUploadedID,
        } 
      });

      // console.log(serverResponse)

      if (serverResponse.error && serverResponse.error.originalStatus === 404) {
        return toast.error(("There was a problem with server connection."), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });

        // return toast({
        //   variant: "destructive",
        //   title: "Uh oh! Cannot connect with server.",
        //   description: "There was a problem with server connection.",
        // })  
      } 
      
      if (serverResponse.error && serverResponse.error?.data?.success === false) {
        return toast.error((serverResponse.error?.data.message || "There was an error."), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });

        // return toast({
        //   variant: "destructive",
        //   title: "Uh oh! Something went wrong.",
        //   description: serverResponse.error.data.message || "There was an error occured.",
        // })  
      }

      if (serverResponse.data && serverResponse.data?.success === true) {
        toast.success((serverResponse.data.message), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });

        // toast({
        //   variant: "default",
        //   title: "Yayy! Congratulations...",
        //   description: serverResponse.data.message,
        // })
        // form.reset();

        return navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.bLicenseRoute.aListRoute)
      }

      return;
    } catch (error: any) {
      return toast.error(("There was a problem with try block code"), {
        position: "bottom-right",
        autoClose: 5000,
        transition: Bounce,
      });

      // return toast({
      //   variant: "destructive",
      //   title: "Uh oh! Bad code... Bad code.",
      //   description: "There was a problem with try block code",
      // })
    }

  }

}

export default apiResponseHandler;
