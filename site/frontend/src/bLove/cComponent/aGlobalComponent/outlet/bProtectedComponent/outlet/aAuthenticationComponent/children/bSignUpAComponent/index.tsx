import React, { useState } from "react"
import { useNavigate } from "react-router-dom";

import { Button, Container, ContentWrapper, Form, HorizontalLine, HyperLink, Image, ImageWrapper, Input, InputHeading, MainHeading, PageLink, Para, Star } from "./style";
import LessThanSign from '@/bLove/hAsset/icon/LessThanSign.png'
import fullRoute from "@/bLove/gRoute/bFullRoute";


const SignUpAComponent = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    navigate(fullRoute.aGlobalRoute.bProtectedRoute.aAuthenticationRoute.bSignUpBRoute, { state: { formData } });
  };

  // JSX
  return (
    <React.Fragment>
      {/* SignUpAComponent */}

      <Container>
        <ImageWrapper />
        <PageLink to={fullRoute.aGlobalRoute.bProtectedRoute.aAuthenticationRoute.bSignUpRoute}>
          <Para>
            <Image src={LessThanSign} alt="LessThanSign" /> Back
          </Para>
        </PageLink>
        <ContentWrapper>
          <MainHeading>Welcome to In Time Alerts</MainHeading>
          <Para>
            by<HyperLink href="#">Pegasus Clinicare</HyperLink>
          </Para>
          <br />
          <Form onSubmit={handleSubmit}>
            <InputHeading>
              Full Name<Star>*</Star>
            </InputHeading>
            <Input 
              type="text" 
              placeholder="Full Name"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
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
            <HorizontalLine></HorizontalLine>
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
            <Button type="submit">Continue</Button>
          </Form>
        </ContentWrapper>
      </Container>
      
      {/* <AuthFormComponent Redux={props.Redux} APICall={props.APICall} extras={props.extras} /> */}
    </React.Fragment>
  )
}

export default SignUpAComponent;
