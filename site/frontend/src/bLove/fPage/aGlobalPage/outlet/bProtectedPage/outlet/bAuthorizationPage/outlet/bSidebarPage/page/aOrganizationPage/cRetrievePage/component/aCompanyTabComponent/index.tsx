import React from "react"
import { AddressDetail, AddressTag, Button, ButtonHeading, ButtonTag1, ButtonTag2, CompanyEmail, Companyphone, CompName, ContactInfoTag, ContactNum, FirmDetail, FirmName, FirmType, Image, LeftContainer, LineOne, MainContainer, NameHeading, PANCardTag, PANDetail, RightContainer, RightHeading } from "../../style";
import licenseicon from "@/bLove/hAsset/icon/file-badge.png";
import inspectionicon from "@/bLove/hAsset/icon/layers.png";
import documentsicon from "@/bLove/hAsset/icon/file-input.png";
import remaindersicon from "@/bLove/hAsset/icon/bell-ring.png";


const CompanyTabComponent = (props: any) => {
  // Destructure Props
  const { 
    APICall,

    setCompanyTab, 
    setLicenseTab, licenseListAPITrigger,
    setReminderTab, 
    setInspectionTab, inspectionListAPITrigger,
    setDocumentTab, documentListAPITrigger,
    setServiceTab, 
    // _serviceListAPITrigger,

    setLicenseTabList,
    setLicenseTabCreate,
    setLicenseTabUpdate,

    setInspectionTabList,
    setInspectionTabCreate,
    setInspectionTabUpdate,

    setDocumentTabList,
    setDocumentTabCreate,
    setDocumentTabUpdate,

    setServiceTabList,
    setServiceTabCreate,
    setServiceTabUpdate,
  } = props;

  // Event Handlers
  const activateLicense = () => {
    setCompanyTab(false)
    setLicenseTab(true)
    setReminderTab(false)
    setInspectionTab(false)
    setDocumentTab(false)
    setServiceTab(false)

    setLicenseTabList(true)
    setLicenseTabCreate(false)
    setLicenseTabUpdate(false)

    setInspectionTabList(false)
    setInspectionTabCreate(false)
    setInspectionTabUpdate(false)

    setDocumentTabList(false)
    setDocumentTabCreate(false)
    setDocumentTabUpdate(false)

    setServiceTabList(false)
    setServiceTabCreate(false)
    setServiceTabUpdate(false)

    licenseListAPITrigger()
  }

  const activateReminder = () => {
    setCompanyTab(false)
    setLicenseTab(false)
    setReminderTab(true)
    setInspectionTab(false)
    setDocumentTab(false)
    setServiceTab(false)

    setLicenseTabList(false)
    setLicenseTabCreate(false)
    setLicenseTabUpdate(false)

    setInspectionTabList(false)
    setInspectionTabCreate(false)
    setInspectionTabUpdate(false)

    setDocumentTabList(false)
    setDocumentTabCreate(false)
    setDocumentTabUpdate(false)

    setServiceTabList(false)
    setServiceTabCreate(false)
    setServiceTabUpdate(false)
  }

  const activateInspection = () => {
    setCompanyTab(false)
    setLicenseTab(false)
    setReminderTab(false)
    setInspectionTab(true)
    setDocumentTab(false)
    setServiceTab(false)

    setLicenseTabList(false)
    setLicenseTabCreate(false)
    setLicenseTabUpdate(false)

    setInspectionTabList(true)
    setInspectionTabCreate(false)
    setInspectionTabUpdate(false)

    setDocumentTabList(false)
    setDocumentTabCreate(false)
    setDocumentTabUpdate(false)

    setServiceTabList(false)
    setServiceTabCreate(false)
    setServiceTabUpdate(false)

    inspectionListAPITrigger()
  }

  const activateDocument = () => {
    setCompanyTab(false)
    setLicenseTab(false)
    setReminderTab(false)
    setInspectionTab(false)
    setDocumentTab(true)
    setServiceTab(false)

    setLicenseTabList(false)
    setLicenseTabCreate(false)
    setLicenseTabUpdate(false)

    setInspectionTabList(false)
    setInspectionTabCreate(false)
    setInspectionTabUpdate(false)

    setDocumentTabList(true)
    setDocumentTabCreate(false)
    setDocumentTabUpdate(false)

    setServiceTabList(false)
    setServiceTabCreate(false)
    setServiceTabUpdate(false)

    documentListAPITrigger()
  }

  // const activateService = () => {
  //   setCompanyTab(false)
  //   setLicenseTab(false)
  //   setReminderTab(false)
  //   setInspectionTab(false)
  //   setDocumentTab(false)
  //   setServiceTab(true)

  //   setLicenseTabList(false)
  //   setLicenseTabCreate(false)
  //   setLicenseTabUpdate(false)

  //   setInspectionTabList(false)
  //   setInspectionTabCreate(false)
  //   setInspectionTabUpdate(false)

  //   setDocumentTabList(false)
  //   setDocumentTabCreate(false)
  //   setDocumentTabUpdate(false)

  //   setServiceTabList(true)
  //   setServiceTabCreate(false)
  //   setServiceTabUpdate(false)

  //   serviceListAPITrigger()
  // }
 
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
            <ButtonTag1 onClick={() => activateLicense()} >
              <ButtonHeading>Licenses</ButtonHeading>
              <Button to="">
                <Image src={licenseicon} />
                Licenses
              </Button>
            </ButtonTag1>
            <ButtonTag2 onClick={() => activateInspection()} >
              <ButtonHeading>Inspections</ButtonHeading>
              <Button to="">
                <Image src={inspectionicon} />
                Inspections
              </Button>
            </ButtonTag2>
          </LineOne>
          <LineOne>
            <ButtonTag1 onClick={() => activateDocument()} >
              <ButtonHeading>Documents</ButtonHeading>
              <Button to="">
                <Image src={documentsicon} />
                Documents
              </Button>
            </ButtonTag1>
            <ButtonTag2 onClick={() => activateReminder()} >
              <ButtonHeading>Remainders</ButtonHeading>
              <Button to="">
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
