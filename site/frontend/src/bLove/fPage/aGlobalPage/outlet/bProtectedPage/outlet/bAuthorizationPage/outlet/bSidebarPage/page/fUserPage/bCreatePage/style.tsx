// import { Link } from "react-router-dom";
import styled from "styled-components";


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
  overflow-y: auto;
`;

const Heading = styled.h1`
  margin: 30px 50px 5px 50px;
  font-size: 2rem;
  font-weight: 400;
  letter-spacing: 1.2px;
`;

const BackButtonContainer = styled.div`
  margin: 20px 50px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  font-size: 0.9rem;
  font-weight: 500;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: #007bff;

  &:hover {
    background-color: #f0f7ff;
  }
`;

const FormContainer = styled.div`
  margin: 30px 50px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 1rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 50%; /* Make the input smaller */
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px; /* Less rounded corners */
  font-size: 1rem;
`;

const Select = styled.select`
  width: 50%; /* Make the select box smaller */
  padding: 10px;
  margin-bottom: 20px; /* Added more spacing before the buttons */
  border: 1px solid #ccc;
  border-radius: 8px; /* Less rounded corners */
  font-size: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%; /* Limit width of the buttons to match input */
  gap: 10px; /* Reduce space between buttons */
  margin-top: 15px; /* Added margin for spacing between input and buttons */
`;

const SendMailButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 8px; /* Less rounded corners */
  font-size: 1rem;
  cursor: pointer;
  flex-grow: 1; /* Make buttons take equal space */

  &:hover {
    background-color: #0056b3;
  }
`;

const DeleteButton = styled.button`
  background-color: transparent;
  color: #ff4d4d;
  padding: 12px 25px;
  border: 2px solid #ff4d4d;
  border-radius: 8px; /* Less rounded corners */
  font-size: 1rem;
  cursor: pointer;
  flex-grow: 1; /* Make buttons take equal space */

  &:hover {
    background-color: #ff4d4d;
    color: white;
  }
`;

export {
  MainContainer,
  LeftContainer,
  RightContainer,
  Heading,
  BackButtonContainer,
  BackButton,
  FormContainer,
  Label,
  Input,
  Select,
  ButtonContainer,
  SendMailButton,
  DeleteButton,
}
