import React from "react"
import { Button, Container, ContentWrapper, HyperLink, Image, ImageWrapper, LinkButton, MainHeading, PageLink, PageLinkButton, Para, SubHeading } from "./style";
import HomeIcon from "@/bLove/hAsset/icon/home.png"
import fullRoute from "@/bLove/gRoute/bFullRoute";


const SignUpComponent = () => {
  // JSX
  return (
    <React.Fragment>
      {/* SignUpComponent */}

      <Container>
        <ImageWrapper />
          <PageLink to={fullRoute.aGlobalRoute.bProtectedRoute.aAuthenticationRoute.bSignUpRoute}><Image src={HomeIcon} alt="Home" />Home</PageLink>
        <ContentWrapper>
          <MainHeading>Welcome to In Time Alerts</MainHeading>
          <Para>by<HyperLink href="#">Pegasus Clinicare</HyperLink></Para><br />
          <SubHeading>Create your free account!</SubHeading>
          <Para>3 simple steps to get your reminders!</Para>
          <PageLinkButton to={fullRoute.aGlobalRoute.bProtectedRoute.aAuthenticationRoute.bSignUpARoute}><Button>Start</Button></PageLinkButton>
          <Para>Already have an account? <LinkButton to={fullRoute.aGlobalRoute.bProtectedRoute.aAuthenticationRoute.aSignInRoute}>Sign in</LinkButton></Para>
        </ContentWrapper>
      </Container>
      
      {/* <AuthFormComponent Redux={props.Redux} APICall={props.APICall} extras={props.extras} /> */}
    </React.Fragment>
  )
}

export default SignUpComponent;
