import styled from "styled-components";
import BellImage from "@/bLove/hAsset/assets/bell.png"
import { Link } from "react-router-dom";


const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const ImageWrapper = styled.div`
  flex-basis: 40%;
  background: url(${BellImage}) no-repeat center center;
  background-size: cover;
`;

const ContentWrapper = styled.div`
  flex-basis: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-right: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 750px;
`;

const InputHeading = styled.div`
  margin-top: 10px;
  font-weight: 500;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 720px;
  height: 20px;
  margin-right: 50px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 15px;
  width: 50%;
  font-size: 1rem;
  letter-spacing: 1.2px;
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

const Para = styled.p`
  margin: 5px 0;
  letter-spacing: 1.2px;
  display: flex;
  flex-direction: row;
`;

const PageLink = styled(Link)`
  color: #000 !important;
  text-decoration: none;
  display: flex;
  margin-top: 30px;
  margin-left: 25px;
`;

const Image = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 2px;
  margin-top: 2px;
`;

const HyperLink = styled.a`
  text-decoration: none;
  color: #007bff;
  margin-left: 5px;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const IssueDate = styled.div``;

const ExpiryDate = styled.div``;

const ContactInput = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 324px;
  height: 20px;
  margin-right: 50px;
  font-size: 16px;
`;

const ContinueLink = styled.div`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Dropdown = styled.select`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 16px;
  margin-top: 10px;
  margin-right: 10px;
`;

const Dropdown1 = styled.select`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  width: 324px;
  font-size: 16px;
  margin-top: 10px;
  margin-right: 10px;
`;

const DropdownOption = styled.option`
  font-size: 16px;
  font-weight: 400 !important;
`;

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

export {
  Container,
  ImageWrapper,
  ContentWrapper,
  Form,
  InputHeading,
  Input,
  Button,
  MainHeading,
  Para,
  PageLink,
  Image,
  HyperLink,
  ContactInfo,
  IssueDate,
  ExpiryDate,
  ContactInput,
  ContinueLink,
  Dropdown,
  Dropdown1,
  DropdownOption,
  FileInputContainer,
  FileInput,
  FileInputLabel,
  UploadedFile,
}
