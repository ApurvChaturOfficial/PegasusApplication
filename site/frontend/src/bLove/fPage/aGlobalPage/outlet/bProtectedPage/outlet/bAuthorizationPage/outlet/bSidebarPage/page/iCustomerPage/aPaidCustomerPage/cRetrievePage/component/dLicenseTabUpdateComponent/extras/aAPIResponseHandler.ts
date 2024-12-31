import { Bounce, toast } from "react-toastify";


const apiResponseHandler = {
  updateAPIResponseHandler: async (data: any, updateAPITrigger: any, navigate: any, licenseID: any, licenseRetrieve: any, enrolledServiceUpdateAPITrigger: any) => {
    try {
      const serverResponse = await updateAPITrigger({ params: { _id: licenseID }, body: {
        aTitle: data.dLicenseNumber,

        cOrganization: data.cOrganization,

        dSelectedLicense: data.dSelectedLicense,
        dLicenseNumber: data.dLicenseNumber,
        dCategory: data.dCategory,
        dOwnLoan: data.dOwnLoan,
        dIssueDate: data.dIssueDate,
        dExpiryDate: data.dExpiryDate,
        dFileUploaded: data.dFileUploaded,
        dFileUploadedID: data.dFileUploadedID,
      } });

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

        if (licenseRetrieve.data.retrieve?.cEnrolledService) {
          apiResponseHandler.enrolledServiceUpdateAPIResponseHandler(
            licenseRetrieve.data.retrieve?.cEnrolledService,
            enrolledServiceUpdateAPITrigger
          )
        }

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

        return navigate()
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

  },

  enrolledServiceUpdateAPIResponseHandler: async (enrolledServiceID: any, updateAPITrigger: any) => {
    try {
      const serverResponse = await updateAPITrigger({ params: { _id: enrolledServiceID }, body: {
        dActionStatus: true,
      } });

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
        
        toast.success(serverResponse.data.message, {
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

        // return navigate(
        //   fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.fUserRoute.aListRoute, 
        //   { state: { user: true, role: false } }
        // )
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

  },

}

export default apiResponseHandler;
