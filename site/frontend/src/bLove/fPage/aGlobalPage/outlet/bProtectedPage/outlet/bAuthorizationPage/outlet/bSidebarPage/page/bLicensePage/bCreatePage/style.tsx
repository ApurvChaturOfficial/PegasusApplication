// import { Link } from "react-router-dom";
import styled from "styled-components";


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
  width: 745px;
  margin-top: 10px;
  margin-right: 10px;
`;

const Dropdown1 = styled.select`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 16px;
  width: 350px;
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
  justify-content: space-between
`;

const AddNew = styled.button`
  margin: 10px 20px 10px 0px;
  padding: 10px 32px;
  border: 1px solid #005ab4;
  border-radius: 10px;
  font-size: 1.1rem;
  background-color: #005ab4;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    color: #005ab4;
    background-color: #fff;
  }
`;

const RemoveButton = styled.button`
  padding: 10px 35px;
  border: 1px solid #ff0000;
  border-radius: 10px;
  font-size: 1.1rem;
  background-color: #ff0000;
  color: #fff;
  cursor: pointer;
  margin-left: 20px;
  transition: all 0.3s ease-in-out;
  margin-left: 79%;

  &:hover {
    background-color: #fff;
    color: #ff0000;
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

export {
  Container,
  Form,
  InputHeading,
  Input,
  MainHeading,
  Dropdown,
  Dropdown1,
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
}
