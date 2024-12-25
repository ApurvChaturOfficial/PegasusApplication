import React, { useState } from "react"
import { Button, Container, ContentWrapper, Form, Image, ImageWrapper, Input, InputHeading, MainHeading, PageLink, Para, Star, SubHeading } from "./style";
import LessThanSign from '@/bLove/hAsset/icon/LessThanSign.png'
import fullRoute from "@/bLove/gRoute/bFullRoute";
import userAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/bUserAdministration/aUserAPIEndpoints";
import { useNavigate, useParams } from "react-router-dom";
import apiResponseHandler from "./extras/aAPIResponseHandler";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";


const ResetPasswordComponent = () => {
  // Redux
  const Redux = {
    state: useSelector((state: RootState) => state.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }
  
  // Variable
  const { token } = useParams();
  const navigate = useNavigate();

  // State Variable
  const [formData, setFormData] = useState({
    eNewPassword: "",
    eConfirmPassword: ""
  })

  // API Call
  const APICall = {
    resetPasswordAPITrigger: userAPIEndpoint.useUserResetPasswordAPIMutation()[0],
    resetPasswordAPIResponse: userAPIEndpoint.useUserResetPasswordAPIMutation()[1],
  }   

  // Handle Submit
  const handleSubmit = (event: any) => {
    event.preventDefault();

    // console.log("formDataObj", formData);
    apiResponseHandler.resetPasswordAPIResponseHandler(formData, APICall.resetPasswordAPITrigger, navigate, token, Redux)
  };  

  // JSX
  return (
    <React.Fragment>
      {/* ResetPasswordComponent */}

      <Container>
        <ImageWrapper />
        <PageLink to={fullRoute.aGlobalRoute.bProtectedRoute.aAuthenticationRoute.cForgotPasswordRoute}>
          <Para>
            <Image src={LessThanSign} alt="LessThanSign" /> Back
          </Para>
        </PageLink>
        <ContentWrapper>
          <MainHeading>We will get you back in no time!</MainHeading>
          <br />
          <br />
          <br />
          <SubHeading>
            Create Your New Password
          </SubHeading>
          <Form onSubmit={handleSubmit}>
          <InputHeading>
              New Password<Star>*</Star>
            </InputHeading>
            <Input
              type="password"
              placeholder="Enter New Password"
              value={formData.eNewPassword}
              onChange={event => setFormData((prevValue) => ({ ...prevValue, eNewPassword: event.target.value }))}
            />
            <InputHeading>
              Confirm Password<Star>*</Star>
            </InputHeading>
            <Input
              type="password"
              placeholder="Enter Confirm Password"
              value={formData.eConfirmPassword}
              onChange={event => setFormData((prevValue) => ({ ...prevValue, eConfirmPassword: event.target.value }))}
            />
            <br />
            <Button type="submit">Change Password</Button>
          </Form>
        </ContentWrapper>
      </Container>
      
      {/* <AuthFormComponent APICall={props.APICall} extras={props.extras} token={props.token} /> */}
    </React.Fragment>
  )
}

export default ResetPasswordComponent;
