// import { toast } from "@/aConnection/bShadcnConnection/hooks/use-toast";

// import { Bounce, toast } from "react-toastify";


const apiResponseHandler = {
  retrieveAPIResponseHandler: (retrieveAPIResponse: any, Redux: any) => {
    // Handle loading
    if (retrieveAPIResponse.isLoading) return;

    // Handle error
    if (retrieveAPIResponse.isError) {
      if (retrieveAPIResponse.error && retrieveAPIResponse.error.originalStatus === 404) {
        // toast.error(("There was a problem with server connection."), {
        //   position: "bottom-right",
        //   autoClose: 2000,
        //   transition: Bounce,
        // });
  
        // toast({
        //   variant: "destructive",
        //   title: "Uh oh! Cannot connect with server.",
        //   description: "There was a problem with server connection.",
        // });
      } else if (retrieveAPIResponse.error && retrieveAPIResponse.error?.data?.success === false) {
        // toast.error((retrieveAPIResponse.error?.data.message || "There was an error."), {
        //   position: "bottom-right",
        //   autoClose: 2000,
        //   transition: Bounce,
        // });
  
        // toast({
        //   variant: "destructive",
        //   title: "Uh oh! Something went wrong.",
        //   description: retrieveAPIResponse.error?.data.message || "There was an error.",
        // });
      } else {
        // toast.error(("An unexpected error occurred."), {
        //   position: "bottom-right",
        //   autoClose: 2000,
        //   transition: Bounce,
        // });
  
        // toast({
        //   variant: "destructive",
        //   title: "Error",
        //   description: "An unexpected error occurred.",
        // });
      }
      return;
    }

    // Handle success
    if (retrieveAPIResponse.isSuccess && retrieveAPIResponse.data?.success) {
      Redux.dispatch(
        Redux.action.receivedObjectAction({
          ProfileRetrieve: retrieveAPIResponse.data.user_profile_retrieve
        })
      )
  
      // toast.success((retrieveAPIResponse.data.message || "Something loaded successfully."), {
      //   position: "bottom-right",
      //   autoClose: 2000,
      //   transition: Bounce,
      // });
    }
  }
}

export default apiResponseHandler;
