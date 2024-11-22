import styled from "styled-components";
import { Link } from "react-router-dom";

const MainContainer = styled.div`
  margin: 20px;
`;

const CardLink = styled(Link)`
  text-decoration: none;
`;

const Card = styled.div`
  background-color: #ffffff;
  color: #242424;
  border: 1px solid #b5b5b5;
  border-radius: 10px;
  padding: 0;
  margin: 0 5px 0 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 420px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }
`;

const CompanyHeading = styled.h2`
  font-size: 1.5em;
  margin: 0;
  padding: 10px 0 0 0;
  padding-left: 20px;
  color: #242424;
  font-weight: 400;
  letter-spacing: 0.15rem;
`;

const FirmType = styled.p`
  font-size: 1.2em;
  color: #0080ff;
  margin: 0;
  padding: 5px 20px;
`;

const CompanyId = styled.p`
  font-size: 1rem;
  margin: 0;
  padding: 10px;
  padding-left: 20px;
  color: #242424;
`;

const HorizontalLine = styled.hr`
  border: 0;
  border-top: 1px solid #b5b5b5;
  margin: 0;
  padding: 0;
`;

const CompanyInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

const CompanyContact = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const CompanyPhone = styled.p`
  font-size: 0.8rem;
  margin: 0;
  padding: 0;
  color: #242424;
`;

const CompanyEmail = styled.p`
  font-size: 0.8rem;
  margin: 0;
  padding: 0;
  color: #242424;
`;

const VerticalLine = styled.hr`
  border: 0;
  border-left: 1.5px solid #b5b5b5;
  margin: 0 10px;
  padding: 0;
`;

const CompanyAddress = styled.p`
  font-size: 0.8em;
  color: #242424;
  margin: 0;
  text-align: left;
  padding: 6px;
  padding-bottom: 20px;

`;

const CompanyCard = ({ companyName, firmType, contactInfo, address }: any) => {
  return (
    <MainContainer>
      <CardLink to={`/organizations/${companyName}`}>
        <Card>
          <CompanyHeading>{companyName}</CompanyHeading>
          <FirmType>{firmType}</FirmType>
          <CompanyId>{contactInfo.id}</CompanyId>
          <HorizontalLine />
          <CompanyInfo>
            <CompanyContact>
              <CompanyPhone>{contactInfo.phone}</CompanyPhone>
              <CompanyEmail>{contactInfo.email}</CompanyEmail>
            </CompanyContact>
            <VerticalLine />
            <CompanyAddress>{address}</CompanyAddress>
          </CompanyInfo>
        </Card>
      </CardLink>
    </MainContainer>
  );
};

export default CompanyCard;
