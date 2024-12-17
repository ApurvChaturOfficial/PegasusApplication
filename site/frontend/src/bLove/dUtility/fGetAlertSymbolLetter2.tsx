import styled from "styled-components";


const AlertTag2 = styled.h2`
  color: red;
  margin: 0;
  margin-top: 4px;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 1.2px;
`;

const getAlertSymbolLetter2 = (dateOfExpiry: any) => {
  const currentDate = new Date();
  const expiryDate = new Date(dateOfExpiry);
  const differenceInDays = Math.floor(
    ((expiryDate as any) - (currentDate as any)) / (1000 * 60 * 60 * 24)
  );

  if (differenceInDays > 180) {
    return <AlertTag2>Expiring in more than 6 months</AlertTag2>;
  } else if (differenceInDays > 60) {
    return <AlertTag2>Expiring in {differenceInDays} days</AlertTag2>;
  } else if (differenceInDays < 0) {
    return <AlertTag2>License Expired</AlertTag2>;
  } else {
    return <AlertTag2>Expiring in {differenceInDays} days</AlertTag2>;
  }
};

export default getAlertSymbolLetter2;
