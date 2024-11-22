import { Bounce, toast } from "react-toastify";


const apiResponseHandler = {
  retrieveAPIResponseHandler: (retrieveAPIResponse: any) => {
    // Handle loading
    if (retrieveAPIResponse.isLoading) return;
    console.log(retrieveAPIResponse.data)

    // Handle error
    if (retrieveAPIResponse.isError) {
      if (retrieveAPIResponse.error && retrieveAPIResponse.error.originalStatus === 404) {
        return toast.error(("There was a problem with server connection."), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });
  
        // toast({
        //   variant: "destructive",
        //   title: "Uh oh! Cannot connect with server.",
        //   description: "There was a problem with server connection.",
        // });
      } else if (retrieveAPIResponse.error && retrieveAPIResponse.error?.data?.success === false) {
        return toast.error((retrieveAPIResponse.error?.data.message || "There was an error."), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });
        
        // toast({
        //   variant: "destructive",
        //   title: "Uh oh! Something went wrong.",
        //   description: retrieveAPIResponse.error?.data.message || "There was an error.",
        // });
      } else {
        return toast.error(("An unexpected error occurred."), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });

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
      return toast.success((retrieveAPIResponse.data.message || "Something loaded successfully."), {
        position: "bottom-right",
        autoClose: 5000,
        transition: Bounce,
      });

      // toast({
      //   variant: "default",
      //   title: "Yayy! Congratulations...",
      //   description: retrieveAPIResponse.data.message || "Something loaded successfully.",
      // });
    }
  }
}

export default apiResponseHandler;
