import React from "react"
import { AddressDetail, AddressTag, Button, ButtonHeading, ButtonTag1, ButtonTag2, CompanyEmail, Companyphone, CompName, ContactInfoTag, ContactNum, FirmDetail, FirmName, FirmType, Image, LeftContainer, LineOne, MainContainer, NameHeading, PANCardTag, PANDetail, RightContainer, RightHeading } from "../../style";
import licenseicon from "@/bLove/hAsset/icon/file-badge.png";
import inspectionicon from "@/bLove/hAsset/icon/layers.png";
import documentsicon from "@/bLove/hAsset/icon/file-input.png";
import remaindersicon from "@/bLove/hAsset/icon/bell-ring.png";


const CompanyTabComponent = (props: any) => {
  // Destructure Props
  const { APICall } = props;
 
  // JSX
  return (
    <React.Fragment>
      {/* CompanyTabComponent */}
      <MainContainer>
        <LeftContainer>
          <FirmName>
            <CompName>{APICall.retrieveAPIResponse.data.retrieve.dName}</CompName>
            <NameHeading>Firm Name</NameHeading>
          </FirmName>
          <FirmType>
            <FirmDetail>{APICall.retrieveAPIResponse.data.retrieve.dType}</FirmDetail>
            <NameHeading>Firm Type</NameHeading>
          </FirmType>
          <ContactInfoTag>
            <Companyphone>
              <ContactNum>{APICall.retrieveAPIResponse.data.retrieve.dPhoneNumber}</ContactNum>
              <NameHeading>Phone Number</NameHeading>
            </Companyphone>
            <CompanyEmail>
              <ContactNum>{APICall.retrieveAPIResponse.data.retrieve.dCompanyEmail}</ContactNum>
              <NameHeading>Email</NameHeading>
            </CompanyEmail>
          </ContactInfoTag>
          <AddressTag>
            <AddressDetail>{APICall.retrieveAPIResponse.data.retrieve.dAddress}</AddressDetail>
            <NameHeading>Address</NameHeading>
          </AddressTag>
          <PANCardTag>
            <PANDetail>{APICall.retrieveAPIResponse.data.retrieve.dPanNumber}</PANDetail>
            <NameHeading>PAN Card</NameHeading>
          </PANCardTag>
        </LeftContainer>
        <RightContainer>
          <RightHeading>Documents</RightHeading>
          <LineOne>
            <ButtonTag1>
              <ButtonHeading>Licenses</ButtonHeading>
              <Button to="licenses">
                <Image src={licenseicon} />
                Licenses
              </Button>
            </ButtonTag1>
            <ButtonTag2>
              <ButtonHeading>Inspections</ButtonHeading>
              <Button to="inspections">
                <Image src={inspectionicon} />
                Inspections
              </Button>
            </ButtonTag2>
          </LineOne>
          <LineOne>
            <ButtonTag1>
              <ButtonHeading>Documents</ButtonHeading>
              <Button to="documents">
                <Image src={documentsicon} />
                Documents
              </Button>
            </ButtonTag1>
            <ButtonTag2>
              <ButtonHeading>Remainders</ButtonHeading>
              <Button to="remainders">
                <Image src={remaindersicon} />
                Remainders
              </Button>
            </ButtonTag2>
          </LineOne>
        </RightContainer>
      </MainContainer>

    </React.Fragment>
  )
}

export default CompanyTabComponent;
