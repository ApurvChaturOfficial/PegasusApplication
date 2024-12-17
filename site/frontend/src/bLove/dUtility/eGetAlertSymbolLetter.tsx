import styled from "styled-components";


const AlertTag = styled.h2`
  color: red;
  margin: 0;
  margin-top: 4px;
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 1.2px;
`;

const getAlertSymbolLetter = (dateOfExpiry: any) => {
  const currentDate = new Date();
  const expiryDate = new Date(dateOfExpiry);
  const differenceInDays = Math.floor(
    ((expiryDate as any) - (currentDate as any)) / (1000 * 60 * 60 * 24)
  );

  if (differenceInDays > 180) {
    return <AlertTag>Expiring in more than 6 months</AlertTag>;
  } else if (differenceInDays > 60) {
    return <AlertTag>Expiring in {differenceInDays} days</AlertTag>;
  } else if (differenceInDays < 0) {
    return <AlertTag>License Expired</AlertTag>;
  } else {
    return <AlertTag>Expiring in {differenceInDays} days</AlertTag>;
  }
};

export default getAlertSymbolLetter;
