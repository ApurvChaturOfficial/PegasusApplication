import { NavigateFunction } from "react-router-dom";
import fullRoute from "@/bLove/gRoute/bFullRoute";
import { Bounce, toast } from "react-toastify";


const apiResponseHandler = {
  resetPasswordAPIResponseHandler: async (data: any, resetPasswordAPITrigger: any, navigate: NavigateFunction, token: any, Redux: any) => {
    try {
      const serverResponse = await resetPasswordAPITrigger({ params: { token }, body: {
        ePassword: data.eNewPassword,
        eConfirmPassword: data.eConfirmPassword,
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

        const userRole = await serverResponse.data.user_reset_password?.cRole?.aTitle

        Redux.dispatch(
          Redux.action.receivedObjectAction({
            ProfileRetrieve: serverResponse.data.user_reset_password
          })
        )

        if (userRole === "Pegasus Employee") { 
          toast.success((serverResponse.data.message), {
            position: "bottom-right",
            autoClose: 5000,
            transition: Bounce,
          });
  
          return navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.hDashboardRoute)
        } 
        
        if (userRole === "Pegasus Super Admin") {
          toast.success((serverResponse.data.message), {
            position: "bottom-right",
            autoClose: 5000,
            transition: Bounce,
          });
  
          return navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.hDashboardRoute)
        }
        
        if (userRole === "Pegasus Customer") {
          toast.success((serverResponse.data.message), {
            position: "bottom-right",
            autoClose: 5000,
            transition: Bounce,
          });
  
          return navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.aOrganizationRoute.aListRoute)
        } 

        return null

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
