// import { Link } from "react-router-dom";
import styled from "styled-components";


const companyData = [
  {
    companyName: "CompanyName1",
    firmType: "Firmtype1",
    contactInfo: {
      id: "ABC12345XYZ",
      phone: "+91-987653210",
      email: "untawalegaurav22@gmail.com",
    },
    address: "Rachana Avenue, FC road, Deccan, Pune, Maharashtra, 411004",
    panCard: "ABAB1176C",
  },
  {
    companyName: "CompanyName2",
    firmType: "Firmtype2",
    contactInfo: {
      id: "XYZ98765ABC",
      phone: "+91-1234567890",
      email: "untawalegaurav22@gmail.com",
    },
    address: "Rachana Avenue, FC road, Deccan, Pune, Maharashtra, 411004",
    panCard: "ABAB1176C",
  },
  {
    companyName: "CompanyName3",
    firmType: "Firmtype2",
    contactInfo: {
      id: "XYZ98765ABC",
      phone: "+91-1234567890",
      email: "untawalegaurav22@gmail.com",
    },
    address: "Rachana Avenue, FC road, Deccan, Pune, Maharashtra, 411004",
    panCard: "ABAB1176C",
  },
  {
    companyName: "CompanyName4",
    firmType: "Exporter",
    contactInfo: {
      id: "XYZ98765ABC",
      phone: "+91-1234567890",
      email: "23.digvijaypatil@gmail.com",
    },
    address: "Rachana Avenue, FC road, Deccan, Pune, Maharashtra, 411004",
    panCard: "ABAB1176C",
  },
];


const Container = styled.div`
display: flex;
height: auto;
flex-direction: column;
margin: 10px 50px;
`;

const Form = styled.form`
display: flex;
flex-direction: column;
width: 750px;
`;

const InputHeading = styled.div`
margin-top: 10px;
margin-bottom: 2px;
font-weight: 500;
`;

const Input = styled.input`
margin: 2px 0;
padding: 10px;
border: 1px solid #ccc;
border-radius: 10px;
width: 720px;
height: 20px;
margin-right: 50px;
`;



const MainHeading = styled.h1`
margin-bottom: 0px;
padding: 0px;
font-weight: 500;
letter-spacing: 1.2px;
font-family: "Inter", sans-serif;
font-style: normal;
font-variation-settings: "slnt" 0;
`;





const Dropdown = styled.select`
padding: 10px;
border-radius: 10px;
border: 1px solid #ccc;
font-size: 16px;
width: 743px;
margin-top: 10px;
margin-right: 10px;
`;

const DropdownOption = styled.option`
font-size: 16px;
font-weight: 400 !important;
`;




const ContactInput = styled.input`
margin: 10px 0;
padding: 10px;
border: 1px solid #ccc;
border-radius: 10px;
width: 324px;
height: 20px;
margin-right: 50px;
`;



const IssueDate = styled.div``;

const ExpiryDate = styled.div``;

const FileInputContainer = styled.div`
margin: 10px 0;
padding: 10px;
border: 1px dashed #ccc;
border-radius: 10px;
width: 720px;
height: 100px;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
color: #007bff;
`;

const FileInput = styled.input`
display: none;
`;

const FileInputLabel = styled.label`
cursor: pointer;
color: #007bff;
`;

const UploadedFile = styled.div`
margin-top: 10px;
`;

const FinalTag = styled.div`
display: flex;
flex-direction: row;
`;



const AddNew = styled.button`
margin: 10px 20px 10px 0px;
padding: 15px 30px;
border: 1px solid #00cf07;
border-radius: 15px;
font-size: 1.1rem;
background-color: #00cf07;
color: #fff;

&:hover {
  cursor: pointer;
  color: #00cf07;
  background-color: #fff;
}
`;

const RemoveButton = styled.button`
background-color: #dc3545;
color: white;
border: none;
padding: 10px;
border-radius: 15px;
margin-top: 25px; /* added margin */
margin-left: 0px;
width: 25%;
margin-left: 75%;

&:hover {
  background-color: #c82333;
  cursor: pointer;
}
`;

const ButtonTwo = styled.button`
background-color: #007bff;
color: white;
border: none;
padding: 10px 20px;
margin-top: 50px;
cursor: pointer;
border-radius: 15px;
width: 100%;
font-size: 1rem;
letter-spacing: 1.2px;
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

const ButtonContainer = styled.div`
margin-top: 20px;
`;
const TopButtonContainer = styled.div`
display: flex;
justify-content: flex-end; // Aligns the Add New button to the right
margin-bottom: -20px; // Adds some space between the button rows
`;

const CommonButton = styled.button`
padding: 15px 30px;
border-radius: 15px;
font-size: 1.1rem;
flex-grow: 1; // Allows buttons to grow and fill the container space
color: white;
cursor: pointer;

&:hover {
  opacity: 0.8;
}
`;

const SubmitButton = styled(CommonButton)`
  padding: 15px 35px;
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

const RowContainer = styled.div`
display: flex;
justify-content: space-between; // Ensures that child components are spread out

margin-top: 10px;
`;

const RowInput = styled.input`
padding: 10px;
border: 1px solid #ccc;
border-radius: 10px;
width: 92%; // Adjusted width to fit in a row
margin-right: 180px;
`;

export {
  companyData,
  Container,
  Form,
  InputHeading,
  Input,
  MainHeading,
  Dropdown,
  DropdownOption,
  ContactInput,
  IssueDate,
  ExpiryDate,
  FileInputContainer,
  FileInput,
  FileInputLabel,
  UploadedFile,
  FinalTag,
  AddNew,
  RemoveButton,
  ButtonTwo,
  CancelButton,
  ButtonContainer,
  TopButtonContainer,
  CommonButton,
  SubmitButton,
  RowContainer,
  RowInput,
}
