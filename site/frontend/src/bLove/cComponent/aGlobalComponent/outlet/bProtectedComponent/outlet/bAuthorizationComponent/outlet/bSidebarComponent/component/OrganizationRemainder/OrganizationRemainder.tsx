import _React, { useState } from "react";
import styled from "styled-components";
import DeleteIcon from "@/bLove/hAsset/icon/trash.png";

const RemainderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 50px;
  border-bottom: 1px solid #b5b5b5;
  &:first-child {
    border-bottom: none;
  }
`;

const Heading = styled.h1`
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.1rem;
  margin-bottom: 0;
  color: #242424;
`;

const Content = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  margin-top: 0;
  padding: 0;
  margin-bottom: 1rem;
  color: #242424;
`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  border: 1px solid #fff;
  border-radius: 15px;
  background-color: #fff;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
`;

const Image = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const ContentTag = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 60%;
  width: 100%;
`;

const getDaysUntilExpiry = (dateOfExpiry: any) => {
  const currentDate = new Date();
  const expiryDate = new Date(dateOfExpiry);
  const differenceInDays = Math.floor(((expiryDate as any) - (currentDate as any)) / (1000 * 60 * 60 * 24));

  return differenceInDays;
};

const OrganizationRemainder = ({ license = [] }) => {
  const [licenses, setLicenses] = useState(license);

  const handleDelete = (index: any) => {
    const updatedLicenses = licenses.filter((_, i) => i !== index);
    setLicenses(updatedLicenses);
  };

  return (
    <>
      {licenses.length > 0 ? (
        licenses.map((license, index) => {
          const daysUntilExpiry = getDaysUntilExpiry((license as any).dateOfExpiry);

          return (
            <RemainderContainer key={index}>
              {daysUntilExpiry < 30 && (
                <>
                  <ContentTag>
                    <Heading>Renewal Pending</Heading>
                    <Content>
                      Renewal Pending for license number {"license.license"}. Please renew
                      at the earliest.
                    </Content>
                  </ContentTag>
                  <Button onClick={() => handleDelete(index)}>
                    <Image src={DeleteIcon} alt="Delete Icon" />
                  </Button>
                </>
              )}
            </RemainderContainer>
          );
        })
      ) : (
          <Content>No Remainder</Content>
      )}
    </>
  );
};

export default OrganizationRemainder;
