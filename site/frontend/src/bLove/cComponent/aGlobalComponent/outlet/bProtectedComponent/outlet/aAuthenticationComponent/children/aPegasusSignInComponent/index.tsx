import React, { useState } from "react"

import { Button, Container, ContentWrapper, ContinueLink, Form, HorizontalLine, HyperLink, HyperLink2, Image, ImageWrapper, Input, InputHeading, MainHeading, PageLink, Para, Star } from "./style";
import LessThanSign from '@/bLove/hAsset/icon/LessThanSign.png'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import userAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/bUserAdministration/aUserAPIEndpoints";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import fullRoute from "@/bLove/gRoute/bFullRoute";


const PegasusSignInComponent = () => {
  // Redux
  const Redux = {
    state: useSelector((state: RootState) => state.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }
  
  // API Call
  const APICall = {
    submitAPITrigger: userAPIEndpoint.useUserSignInAPIMutation()[0],
    submitAPIResponse: userAPIEndpoint.useUserSignInAPIMutation()[1],
  }

  //
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //
  const navigate = useNavigate();

  const loginAPIHandler = async (finalFormData: any) => {
    try {
      const serverResponse = await APICall.submitAPITrigger({ body: {
        eEmail: finalFormData.email,
        ePassword: finalFormData.password,
      } });

      console.log(serverResponse)

      if (serverResponse.error && (serverResponse.error as any).originalStatus === 404) {
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
      
      if (serverResponse.error && (serverResponse.error as any)?.data?.success === false) {
        return toast.error(((serverResponse.error as any).data.message || "There was an error occured."), {
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
        const userRole = await serverResponse.data.user_login?.cRole?.aTitle
        
        if (userRole === "Pegasus Customer") {
          return toast.warn(("Pegasus Customers are not allowed to login from this route"), {
            position: "bottom-right",
            autoClose: 5000,
            transition: Bounce,
          });
        } 

        if (userRole === "Pegasus Employee") { 
          Redux.dispatch(
            Redux.action.receivedObjectAction({
              ProfileRetrieve: serverResponse.data.user_login
            })
          )

          toast.success((serverResponse.data.message), {
            position: "bottom-right",
            autoClose: 5000,
            transition: Bounce,
          });
  
          return navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.hDashboardRoute)
        } 
        
        if (userRole === "Pegasus Super Admin") {
          Redux.dispatch(
            Redux.action.receivedObjectAction({
              ProfileRetrieve: serverResponse.data.user_login
            })
          )

          toast.success((serverResponse.data.message), {
            position: "bottom-right",
            autoClose: 5000,
            transition: Bounce,
          });
  
          return navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.hDashboardRoute)
        }
        
        return navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.hDashboardRoute)
        
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

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    // const finalFormData = {
    //   ...formData,
    //   ...location.state.formData
    // }

    console.log("Form submitted:", formData);

    loginAPIHandler(formData)

  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // JSX
  return (
    <React.Fragment>
      {/* PegasusSignInComponent */}

      <Container>
        <ImageWrapper />
        <PageLink to="/">
          <Para>
            <Image src={LessThanSign} alt="LessThanSign" /> Back
          </Para>
        </PageLink>
        <ContentWrapper>
          <MainHeading>Welcome to In Time Alerts</MainHeading>
          <Para>
            For Pegasus Employee
          </Para>
          <Para>
            by<HyperLink href="#">Pegasus Clinicare</HyperLink>
          </Para>
          <br />
          <Form onSubmit={handleSubmit}>
            <InputHeading>
              Email<Star>*</Star>
            </InputHeading>
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <InputHeading>
              Password<Star>*</Star>
            </InputHeading>
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <Para>
              <HyperLink2 href={fullRoute.aGlobalRoute.bProtectedRoute.aAuthenticationRoute.cForgotPasswordRoute}>Forget Password?</HyperLink2>
            </Para>
            <HorizontalLine></HorizontalLine>
            <Link to={fullRoute.aGlobalRoute.bProtectedRoute.aAuthenticationRoute.aSignInRoute}>Pegasus Customer?</Link>
            {/* <GoogleLogin
              onSuccess={responseGoogleSuccess}
              onFailure={responseGoogleFailure}
              render={(renderProps) => (
                <CustomGoogleButton onClick={renderProps.onClick}>
                  <LogoImage src={GoogleLogo} alt="GoogleLogo" />
                  <span>Sign In with Google</span>
                </CustomGoogleButton>
              )}
            /> */}
            <ContinueLink>
              <Button type="submit">Go to Dashboard</Button>
            </ContinueLink>
          </Form>
        </ContentWrapper>
      </Container>

      {/* <AuthFormComponent Redux={props.Redux} APICall={props.APICall} extras={props.extras} /> */}
    </React.Fragment>
  )
}

export default PegasusSignInComponent;
