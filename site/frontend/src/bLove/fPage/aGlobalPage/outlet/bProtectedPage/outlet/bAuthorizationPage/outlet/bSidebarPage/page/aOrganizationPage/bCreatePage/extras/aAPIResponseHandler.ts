import { NavigateFunction } from "react-router-dom";
import fullRoute from "@/bLove/gRoute/bFullRoute";
import { Bounce, toast } from "react-toastify";


const apiResponseHandler = {
  createAPIResponseHandler: async (data: any, createAPITrigger: any, navigate: NavigateFunction, otherCreateAPITrigger: any) => {
    try {
      const serverResponse = await createAPITrigger({ body: {
        aTitle: data.dName,

        dName: data.dName,
        dType: data.dType,
        dCompanyEmail: data.dCompanyEmail,
        dPhoneNumber: data.dPhoneNumber,
        dAddress: data.dAddress,
        dSelectedState: data.dSelectedState,
        dSelectedCity: data.dSelectedCity,
        dCountry: data.dCountry,
        dPin: data.dPin,
        dPanNumber: data.dPanNumber,
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

        if (data.cLicenses && data.cLicenses.length > 0) {
          // data.cLicenses.map(async (eachLicense: any) => (
          //   await apiResponseHandler.licenseCreateAPIResponseHandler(eachLicense, otherCreateAPITrigger, navigate, serverResponse.data?.create?._id)
          // ))

          await Promise.all(
            data.cLicenses.map((eachLicense: any) =>
              apiResponseHandler.licenseCreateAPIResponseHandler(
                eachLicense,
                otherCreateAPITrigger,
                navigate,
                serverResponse.data?.create?._id
              )
            )
          );
        } else {
          return navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.aOrganizationRoute.aListRoute)
        }
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

  licenseCreateAPIResponseHandler: async (data: any, createAPITrigger: any, navigate: NavigateFunction, organizationID: any) => {
    try {
      const serverResponse = await createAPITrigger({ body: {
        aTitle: data.dSelectedLicense || "",

        cOrganization: organizationID,

        dSelectedLicense: data.dSelectedLicense,
        dLicenseNumber: data.dLicenseNumber,
        dIssueDate: data.dLicenseIssueDate,
        dExpiryDate: data.dLicenseExpiryDate,
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

        return navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.aOrganizationRoute.aListRoute)
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
