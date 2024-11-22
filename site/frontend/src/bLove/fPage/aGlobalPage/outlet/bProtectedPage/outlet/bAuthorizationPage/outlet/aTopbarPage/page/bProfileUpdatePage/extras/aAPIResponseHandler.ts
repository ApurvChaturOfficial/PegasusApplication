import fullRoute from "@/bLove/gRoute/bFullRoute";
import { NavigateFunction } from "react-router-dom";
import { z } from "zod";
import { formSchema } from "./cType";
import { Bounce, toast } from "react-toastify";


const apiResponseHandler = {
  updateAPIResponseHandler: async (data: z.infer<typeof formSchema>, createAPITrigger: any, form: any, navigate: NavigateFunction) => {
    try {
      const serverResponse = await createAPITrigger({ 
        body: {
          aTitle: data.aTitle,
          aSubtitle: data.aSubtitle,
          aDescription: data.aDescription,
          aDetail: data.aDetail,
          aStatus: data.aStatus ==="active" ? true : false,
          aSlug: data.aSlug,

          eFirstname: data.eFirstname,
          eLastname: data.eLastname,
          // eEmail: data.eEmail,
          eMobile: data.eMobile,
        } 
      });

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
        return toast.error((serverResponse.error.data.message || "There was an error occured."), {
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
        form.reset();

        return navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.aTopbarRoute.aProfileRetrieveRoute)
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
