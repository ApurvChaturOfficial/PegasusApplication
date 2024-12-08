// import { Link } from "react-router-dom";
import styled from "styled-components";


const services = [
  {
    id: 1,
    formNumber: "AD345",
    formType: "Type 1",
    category: "Category 1",
    ownLoan: "Own",
    govtFees: "₹100",
    OurFees: "₹50",
    addedDate: "2024-01-01",
  },
  {
    id: 2,
    formNumber: "12B46",
    formType: "Type 2",
    category: "Category 2",
    ownLoan: "Loan",
    govtFees: "₹200",
    OurFees: "₹100",
    addedDate: "2024-02-01",
  },
  {
    id: 3,
    formNumber: "1234BC",
    formType: "Type 3",
    category: "Category 3",
    ownLoan: "Own",
    govtFees: "₹300",
    OurFees: "₹150",
    addedDate: "2024-03-01",
  },
  {
    id: 4,
    formNumber: "12348",
    formType: "Type 4",
    category: "Category 4",
    ownLoan: "Loan",
    govtFees: "₹400",
    OurFees: "₹200",
    addedDate: "2024-04-01",
  },
];

const ownLoanOptions = ["Own", "Loan"];

const FirmTypeOptions = ["Type 1", "Type 2", "Type 3", "Type 4"];

const categoryOptions = ["Category 1", "Category 2", "Category 3", "Category 4"];


const Heading = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  font-weight: 400;
  letter-spacing: 1.2px;
  margin: 30px 50px 15px 30px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 17%;
  padding: 0;
  overflow-y: auto;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 83%;
  padding: 0;
  margin: 0;
  overflow-y: auto;
`;

const Table = styled.table`
  margin: 15px 30px;
  width: 95%;
  border-collapse: collapse;
  border: 1px solid #b5b5b5;
  border-radius: 10px;
  overflow: hidden;

  th,
  td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #b5b5b5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  th {
    padding: 15px;
    font-weight: 600;
    background-color: #f0f7ff;
  }

`;


const TableHeading = styled.th`
`;

const TableBody = styled.td`
`;

const Image = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const Form = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 0 30px;
  height: 60px;
`;

const SearchButton = styled.button`
  display: flex;
  flex-direction: row;
  margin: 10px 5px 10px 10px;
  padding: 8px 20px;
  flex-basis: 9.5%;
  border: 1px solid #242424;
  border-radius: 10px;
  font-size: 1.1rem;
  justify-content: center;
  align-items: center;
  background-color: #fff;

  &:hover {
    cursor: pointer;
    background-color: #f0f7ff;
  }
`;

const Para = styled.span`
  margin: 0;
  padding: 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  flex-basis: 80%;
  border: 1px solid #b5b5b5;
  border-radius: 10px;
  background-color: #fff;
  font-size: 0.9rem;
  letter-spacing: 0.1rem;
`;

const Input2 = styled.input`
  width: 100%;
  padding: 8px 20px;
  margin: 8px 0;
  flex-basis: 80%;
  border: 1px solid #f0f7ff;
  border-radius: 10px;
  background-color: #f0f7ff;
  font-size: 0.9rem;
  letter-spacing: 0.1rem;
`;

const ButtonLink2 = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 5px;
  padding: 8px 20px;
  flex-basis: 9.5%;
  border: 1px solid #242424;
  border-radius: 10px;
  font-size: 1.1rem;
  background-color: #fff;
  text-decoration: none;
  color: inherit;

  &:hover {
    cursor: pointer;
    background-color: #f0f7ff;
  }
`;

const ServiceSubContainer = styled.div`
  margin: 15px 0px;
`;

const AddService = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 5px;
  font-size: 1.1rem;
`;

const AddHeading = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 1.2px;
  margin: 25px 50px 5px 60px;
`;

const AddServiceForm = styled.form`
  width: 60%;
  margin: 0px 100px;
`;

const AddButton = styled.button`
    padding: 15px 45px;
  border: 1px solid #00cf07;
  border-radius: 15px;
  font-size: 1.1rem;
  background-color: #00cf07;
  color: #fff;
  cursor: pointer;
  margin-right: 20px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #fff;
    color: #00cf07;
  }

`;

const CancelButton = styled.button`
  padding: 15px 35px;
  border: 1px solid #ff0000;
  border-radius: 15px;
  font-size: 1.1rem;
  background-color: #fff;
  color: #ff0000;
  cursor: pointer;
  margin-left: 20px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #ff0000;
    color: #fff;
  }
`;

const InputTag = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px;
  font-size: 1.1rem;
`;

const InputTag2 = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 45%;
  margin: 10px 0px;
  font-size: 1.1rem;
`;

const InputTag3 = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 45%;
  margin: 10px 0px;
  font-size: 1.1rem;
`;

const InputHeading = styled.div`
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0;
  margin-top: 8px;
`;

const SubmitTag = styled.div`
margin-top: 30px;`;

const FeeTag = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ValidityTag = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const DropTag = styled.div`
  display: flex;
  flex-direction: row;
`;

const Select = styled.select`
  width: 795px;
  padding: 10px 20px;
  margin: 5px 0;
  border: 1px solid #b5b5b5;
  border-radius: 10px;
  font-size: 1rem;
  background-color: #fff;

  &:focus {
    border-color: #b5b5b5;
    outline: none;
  }
`;

const Select2 = styled.select`
  width: 360px;
  padding: 10px 20px;
  margin: 5px 0px;
  margin-right : 70px;
  border: 1px solid #b5b5b5;
  border-radius: 10px;
  background-color: #fff;
  font-size: 1rem;

  &:focus {
    border-color: #b5b5b5;
    outline: none;
  }
`;

export {
  services,
  ownLoanOptions,
  FirmTypeOptions,
  categoryOptions,
  Heading,
  MainContainer,
  LeftContainer,
  RightContainer,
  Table,
  TableHeading,
  TableBody,
  Image,
  Form,
  SearchButton,
  Para,
  Input,
  Input2,
  ButtonLink2,
  ServiceSubContainer,
  AddService,
  AddHeading,
  AddServiceForm,
  AddButton,
  CancelButton,
  InputTag,
  InputTag2,
  InputTag3,
  InputHeading,
  SubmitTag,
  FeeTag,
  ValidityTag,
  DropTag,
  Select,
  Select2,
}
