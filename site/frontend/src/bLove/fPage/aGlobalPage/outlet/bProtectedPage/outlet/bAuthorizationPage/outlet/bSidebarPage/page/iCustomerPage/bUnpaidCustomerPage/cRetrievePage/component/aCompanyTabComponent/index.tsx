import React from "react"
import styled from "styled-components";


const Container = styled.div`
  margin: 20px;
  margin-left: 48px;
`;

// const FirstRow = styled.div`
//   display: flex;
//   flex-direction: row;
//   margin: 4px 1px;
// `;

// const LastRow = styled.div`
//   display: flex;
//   flex-direction: row;
//   margin: 10px 50px 10px 150px;
// `;

// const LastRowInfo = styled.div`
//   display: flex;
//   flex-direction: column;
//   flex-basis: 22%;
// `;

// const ButtonBack = styled.button`
//   margin: 0;
//   padding: 10px 20px 10px 0px;
//   border: none;
//   background-color: #fff;
//   color: #0080ff;
//   text-decoration: none;
//   font-size: 1rem;

//   &:hover {
//     cursor: pointer;
//   }
// `;

const CompName = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 1.2px;
  margin-bottom: 0px;
`;

const NameHeading = styled.h3`
  font-size: 0.8rem;
  font-weight: 400;
  color: #242424;
  margin-bottom: 10px;
  margin-top: 2px;
`;

const FirmDetail = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  letter-spacing: 1.2px;
  margin-bottom: 0px;
`;

const ContactNum = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  letter-spacing: 1.2px;
  margin-bottom: 0px;
`;

const AddressDetail = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  margin-bottom: 0px;
`;

const PANDetail = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  letter-spacing: 1px;
  margin-bottom: 0px;
`;

const FirmName = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const FirmType = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const ContactInfoTag = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

const Companyphone = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
`;

const CompanyEmail = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
`;

const AddressTag = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const PANCardTag = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;


const CompanyTabComponent = (props: any) => {
  // Destructure Props
  const { 
    APICall,
  } = props;
 
  // JSX
  return (
    <React.Fragment>
      {/* CompanyTabComponent */}

      <Container>
        {/* <Heading>Company Information</Heading> */}
        {/* <FirstRow>
          <ButtonBack onClick={handlebacktable}>
            &lt; Back
          </ButtonBack>
        </FirstRow> */}
        <FirmName>
          <CompName>{APICall.retrieveAPIResponse.data.retrieve?.dName}</CompName>
          <NameHeading>Firm Name</NameHeading>
        </FirmName>
        <FirmType>
          <FirmDetail>{APICall.retrieveAPIResponse.data.retrieve?.dType}</FirmDetail>
          <NameHeading>Firm Type</NameHeading>
        </FirmType>
        <ContactInfoTag>
          <Companyphone>
            <ContactNum>{APICall.retrieveAPIResponse.data.retrieve?.dPhoneNumber}</ContactNum>
            <NameHeading>Phone Number</NameHeading>
          </Companyphone>
          <CompanyEmail>
            <ContactNum>{APICall.retrieveAPIResponse.data.retrieve?.dCompanyEmail}</ContactNum>
            <NameHeading>Email</NameHeading>
          </CompanyEmail>
        </ContactInfoTag>
        <AddressTag>
          <AddressDetail>{APICall.retrieveAPIResponse.data.retrieve?.dAddress}</AddressDetail>
          <NameHeading>Address</NameHeading>
        </AddressTag>
        <PANCardTag>
          <PANDetail>{APICall.retrieveAPIResponse.data.retrieve?.dPanNumber}</PANDetail>
          <NameHeading>PAN Card</NameHeading>
        </PANCardTag>
        {/* <p>Name: {company.companyName}</p>
        <p>Type: {company.firmType}</p> */}
      </Container>

    </React.Fragment>
  )
}

export default CompanyTabComponent;
