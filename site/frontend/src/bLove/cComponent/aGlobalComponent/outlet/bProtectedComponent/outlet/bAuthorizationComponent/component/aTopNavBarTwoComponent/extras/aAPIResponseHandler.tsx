import { NavigateFunction } from "react-router-dom";
// import fullRoute from "@/bLove/gRoute/bFullRoute";
import { Bounce, toast } from "react-toastify";


const apiResponseHandler = {
  logoutAPIResponseHandler: async (logoutAPITrigger: any, _navigate: NavigateFunction, _Redux: any) => {
    try {
      const serverResponse = await logoutAPITrigger();

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

        // Redux.dispatch(
        //   Redux.action.receivedObject({
        //     ProfileRetrieve: null
        //   })
        // )  

        // toast({
        //   variant: "default",
        //   title: "Yayy! Congratulations...",
        //   description: serverResponse.data.message,
        // })

        // return navigate(fullRoute.aGlobalRoute.bProtectedRoute.aAuthenticationRoute.aSignInRoute)
        return window.location.reload()
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
