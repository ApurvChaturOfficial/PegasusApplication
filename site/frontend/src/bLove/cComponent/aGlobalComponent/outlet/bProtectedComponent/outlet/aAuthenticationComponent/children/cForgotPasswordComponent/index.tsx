import React, { useState } from "react"
// import AuthFormComponent, { AuthFormPropsType } from "../../component/aAuthFormComponent";
import { Button, Container, ContentWrapper, Form, Image, ImageWrapper, Input, InputHeading, MainHeading, PageLink, Para, Star } from "./style";
import LessThanSign from '@/bLove/hAsset/icon/LessThanSign.png'
import userAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/bUserAdministration/aUserAPIEndpoints";
import apiResponseHandler from "./extras/aAPIResponseHandler";
import { useNavigate } from "react-router-dom";
import fullRoute from "@/bLove/gRoute/bFullRoute";


const ForgotPasswordComponent = () => {
  // State Variable
  const [formData, setFormData] = useState("");

  // Variable
  const navigate = useNavigate()

  // API Call
  const APICall = {
    forgotPasswordAPITrigger: userAPIEndpoint.useUserForgotPasswordAPIMutation()[0],
    forgotPasswordAPIResponse: userAPIEndpoint.useUserForgotPasswordAPIMutation()[1],
  } 

  // Handle Submit
  const handleSubmit = (event: any) => {
    event.preventDefault();

    // console.log("formDataObj", formData);
    apiResponseHandler.forgotPasswordAPIResponseHandler(formData, APICall.forgotPasswordAPITrigger, navigate)
  };
  
  // JSX
  return (
    <React.Fragment>
      {/* ForgotPasswordComponent */}

      <Container>
        <ImageWrapper />
        <PageLink to={fullRoute.aGlobalRoute.bProtectedRoute.aAuthenticationRoute.aSignInRoute}>
          <Para>
            <Image src={LessThanSign} alt="LessThanSign" /> Back
          </Para>
        </PageLink>
        <ContentWrapper>
          <MainHeading>We will get you back in no time!</MainHeading>
          <br /><br /><br />
          <Form onSubmit={handleSubmit}>
            <InputHeading>
              Enter Email ID registered<Star>*</Star>
            </InputHeading>
            <Input
              type="email"
              placeholder="Enter your Email"
              value={formData}
              onChange={(event) => setFormData(event.target.value)}
            />
            <br />
            <Button type="submit">Send Link</Button>
          </Form>
        </ContentWrapper>
      </Container>

      {/* <AuthFormComponent APICall={props.APICall} extras={props.extras} /> */}
    </React.Fragment>
  )
}

export default ForgotPasswordComponent;
