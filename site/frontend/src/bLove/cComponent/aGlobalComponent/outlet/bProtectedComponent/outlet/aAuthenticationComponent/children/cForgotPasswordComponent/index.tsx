import React from "react"
// import AuthFormComponent, { AuthFormPropsType } from "../../component/aAuthFormComponent";
import { Button, Container, ContentWrapper, Form, Image, ImageWrapper, Input, InputHeading, MainHeading, PageLink, Para, Star } from "./style";
import LessThanSign from '@/bLove/hAsset/icon/LessThanSign.png'


const ForgotPasswordComponent = () => {
  // JSX
  return (
    <React.Fragment>
      {/* ForgotPasswordComponent */}

      <Container>
        <ImageWrapper />
        <PageLink to="/">
          <Para>
            <Image src={LessThanSign} alt="LessThanSign" /> Back
          </Para>
        </PageLink>
        <ContentWrapper>
          <MainHeading>We will get you back in no time!</MainHeading>
          <br /><br /><br />
          <Form onSubmit={() => "handleSubmit"}>
            <InputHeading>
              Enter Email ID registered<Star>*</Star>
            </InputHeading>
            <Input
              type="email"
              placeholder="Enter your Email"
              // value={email}
              // onChange={handleInputChange}
            />
            <br />
            <Button type="submit">Send OTP</Button>
          </Form>
        </ContentWrapper>
      </Container>

      {/* <AuthFormComponent APICall={props.APICall} extras={props.extras} /> */}
    </React.Fragment>
  )
}

export default ForgotPasswordComponent;
