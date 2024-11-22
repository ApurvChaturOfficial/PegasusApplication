import React from "react"
import { Button, Container, ContentWrapper, Form, Image, ImageWrapper, Input, InputHeading, MainHeading, PageLink, Para, Star, SubHeading } from "./style";
import LessThanSign from '@/bLove/hAsset/icon/LessThanSign.png'


const ResetPasswordComponent = () => {
  // JSX
  return (
    <React.Fragment>
      ResetPasswordComponent

      <Container>
        <ImageWrapper />
        <PageLink to="/">
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
            You will receive an OTP on your mail if it was registered on In Time
            Alerts
          </SubHeading>
          <Form onSubmit={() => "handleSubmit"}>
            <InputHeading>
              OTP<Star>*</Star>
            </InputHeading>
            <Input
              type="number"
              placeholder="Enter Otp"
              // value={otp}
              // onChange={handleInputChange}
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
