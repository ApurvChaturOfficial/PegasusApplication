import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import fullRoute from "@/bLove/gRoute/bFullRoute";
import allFirmType from "@/bLove/hAsset/data/allFirmType";
import LessThanSign from '@/bLove/hAsset/icon/LessThanSign.png';
import { Button, CityInfo, ContactInfo, ContactInput, Container, ContentWrapper, ContinueLink, Dropdown, DropdownOption, EmailInfo, Form, HyperLink, Image, ImageWrapper, Input, InputHeading, MainHeading, PageLink, PanCard, Para, PhoneInfo, PinCode, StateInfo, statesAndCities } from "./style";


const SignUpBComponent = () => {
  // Variable
  const location = useLocation();

  // State Variable
  const [formData, setFormData] = useState({
    name_of_firm: "",
    type_of_firm: "",
    phone_number: "",
    company_email: "",
    address: "",
    selectedState: "",
    selectedCity: "",
    country: "India",
    pin: "",
    pan_number: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStateChange = (e: any) => {
    const state = e.target.value;
    setFormData({ ...formData, selectedState: state, selectedCity: "" });
  };

  const handleCityChange = (e: any) => {
    const city = e.target.value;
    setFormData({ ...formData, selectedCity: city });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    navigate(fullRoute.aGlobalRoute.bProtectedRoute.aAuthenticationRoute.bSignUpCRoute, {
      state: {
        formData: {
          ...location.state.formData,
          ...formData
        }
      }
    });
  };

  // JSX
  return (
    <React.Fragment>
      {/* SignUpBComponent */}

      <Container>
        <ImageWrapper />
        <PageLink to={fullRoute.aGlobalRoute.bProtectedRoute.aAuthenticationRoute.bSignUpARoute}>
          <Para>
            <Image src={LessThanSign} alt="LessThanSign" /> Back
          </Para>
        </PageLink>

        <ContentWrapper>
          <MainHeading>Welcome to In Time Alerts</MainHeading>
          <Para>
            by<HyperLink href="#">Pegasus Clinicare</HyperLink>
          </Para>
          <Form onSubmit={handleSubmit}>
            <InputHeading>Name of Firm</InputHeading>
            <Input
              type="text"
              placeholder="Name of Firm"
              name="name_of_firm"
              value={formData.name_of_firm}
              onChange={handleInputChange}
            />
            <InputHeading>Select type of Firm</InputHeading>
            <Dropdown
              name="type_of_firm"
              value={formData.type_of_firm}
              onChange={handleInputChange}
            >
              <DropdownOption value="" disabled>
                Type of Firm
              </DropdownOption>
              {allFirmType.map((each) => (
                <DropdownOption
                  key={each}
                  value={each} // .toLowerCase().replace(/\s+/g, "-")
                >
                  {each}
                </DropdownOption>
              ))}
            </Dropdown>
            <ContactInfo>
              <PhoneInfo>
                <InputHeading>Phone</InputHeading>
                <ContactInput
                  type="text"
                  placeholder="Phone"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                />
              </PhoneInfo>
              <EmailInfo>
                <InputHeading>Email</InputHeading>
                <ContactInput
                  type="email"
                  placeholder="Email"
                  name="company_email"
                  value={formData.company_email}
                  onChange={handleInputChange}
                />
              </EmailInfo>
            </ContactInfo>
            <InputHeading>Address</InputHeading>
            <Input
              type="text"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
            <ContactInfo>
              <StateInfo>
                <InputHeading>Select State</InputHeading>
                <Dropdown
                  value={formData.selectedState}
                  onChange={handleStateChange}
                  name="selectedState"
                >
                  <DropdownOption value="" disabled>
                    Select State
                  </DropdownOption>
                  {Object.keys(statesAndCities).map((state) => (
                    <DropdownOption key={state} value={state}>
                      {state}
                    </DropdownOption>
                  ))}
                </Dropdown>
              </StateInfo>
              <CityInfo>
                <InputHeading>Select City</InputHeading>
                <Dropdown
                  value={formData.selectedCity}
                  onChange={handleCityChange}
                  name="selectedCity"
                >
                  <DropdownOption value="" disabled>
                    Select City
                  </DropdownOption>
                  {formData?.selectedState && (statesAndCities as any)[formData?.selectedState]?.map((city: any) => (
                  // {[]?.map((city) => (
                    <DropdownOption
                      key={city}
                      value={(city as string).toLowerCase().replace(/\s+/g, "-")}
                    >
                      {city}
                    </DropdownOption>
                  ))}
                </Dropdown>
              </CityInfo>
            </ContactInfo>
            <ContactInfo>
              <PinCode>
                <InputHeading>Enter Pin Code</InputHeading>
                <ContactInput
                  type="text"
                  placeholder="Enter Pin Code"
                  name="pin"
                  value={formData.pin}
                  onChange={handleInputChange}
                />
              </PinCode>
              <PanCard>
                <InputHeading>PAN Card Number</InputHeading>
                <ContactInput
                  type="text"
                  placeholder="Enter PAN Card Number"
                  name="pan_number"
                  value={formData.pan_number}
                  onChange={handleInputChange}
                />
              </PanCard>
            </ContactInfo>
            <ContinueLink>
              <Button type="submit">Continue</Button>
            </ContinueLink>
          </Form>
        </ContentWrapper>
      </Container>
      
      {/* <AuthFormComponent Redux={props.Redux} APICall={props.APICall} extras={props.extras} /> */}
    </React.Fragment>
  )
}

export default SignUpBComponent;
