import { NavigateFunction } from "react-router-dom";
import fullRoute from "@/bLove/gRoute/bFullRoute";
import { Bounce, toast } from "react-toastify";


const apiResponseHandler = {
  updateAPIResponseHandler: async (data: any, updateAPITrigger: any, navigate: NavigateFunction, enrolledServiceCreateAPITrigger: any, organizationRetrieve: any) => {
    try {

      const enrolledServiceIDList: string[] = [];

      // Step 1
      for (const each of data.cEnrolledService || []) {

        const serverResponse = await enrolledServiceCreateAPITrigger({ body: {
            aTitle: each.dLicenseNumber,

            cOrganization: organizationRetrieve._id,
            cService: each.cService,
    
            dLicenseNumber: each.dLicenseNumber,
            dIssueDate: each.dIssueDate,
            dExpiryDate: each.dExpiryDate,
            dUploadDate: each.dUploadDate,
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
          enrolledServiceIDList.push(serverResponse.data.create._id);

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
        }
      }

      console.log(enrolledServiceIDList)

      // Step 2
      const serverResponse = await updateAPITrigger({ params: { _id: organizationRetrieve._id }, body: {
        cEnrolledService: organizationRetrieve?.cEnrolledService?.length > 0 ?
          [...organizationRetrieve.cEnrolledService, ...enrolledServiceIDList] :
          [...enrolledServiceIDList],
      } });

      console.log(serverResponse)

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

        return navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.cServiceRoute.aListRoute)
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
