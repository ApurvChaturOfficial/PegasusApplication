import { Link } from "react-router-dom";
import styled from "styled-components";


const CompanyContainer = styled.div`
  padding: 20px 0 0 0;
  margin: 0px;
  overflow: hidden;
`;

const CompanyHeading = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  font-weight: 400;
  letter-spacing: 1.2px;
  margin: 20px 20px 0px 50px;
`;

const CompanyDetail = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  letter-spacing: 1.2px;
  margin-bottom: 0px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 56%;
  padding: 20px;
  margin-left: 30px;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 40%;
  padding: 20px;
  border-left: 1px solid #b5b5b5;
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

const RightHeading = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: 400;
  letter-spacing: 1.2px;
`;

const LineOne = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

const ButtonTag1 = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 20%;
  margin-right: 100px;
`;

const ButtonTag2 = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 30%;
`;

const ButtonHeading = styled.h3`
  font-size: 1rem;
  margin-bottom: 10px;
  font-weight: 400;
  letter-spacing: 1.2px;
`;

const Button = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  border: 1px solid #f0f7ff;
  border-radius: 15px;
  background-color: #f0f7ff;
  color: #000000;
  font-size: 1rem;
  font-weight: 400;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    background-color: #e9ecef;
  }
`;

const Image = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const Image2 = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const Image3 = styled.img`
  width: 60px;
  height: 30px;
  margin-right: 10px;
  padding-right: 10px;
`;

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

const Form = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 0 50px;
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
  padding: 8px 20px;
  margin: 8px 0;
  flex-basis: 80%;
  border: 1px solid #f0f7ff;
  border-radius: 10px;
  background-color: #f0f7ff;
  font-size: 0.9rem;
  letter-spacing: 0.1rem;
`;

const FormReport = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 25px 50px;
  height: 60px;
`;

const SearchButtonReport = styled.button`
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

const ParaReport = styled.span`
  margin: 0;
  padding: 0;
`;

const InputReport = styled.input`
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

const ButtonLinkReport2 = styled.button`
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

const LicenseContainer = styled.div``;

const ButtonLink3 = styled.button`
  margin: 0px;
  padding: 0px;
  border: none;
  text-decoration: none;
  width: 50px;
  background-color: transparent;

  &:hover {
    cursor: pointer;
  }
`;

const LicenseSubContainer = styled.div`
  margin: 15px 0px;
`;

const ReportTable = styled.table`
  margin: 15px 50px;
  width: 60%;
  border-collapse: collapse;
  border: 1px solid #b5b5b5;
  border-radius: 10px;
  overflow: hidden;

  th,
  td {
    padding: 8px;
    text-align: left;
  }

  th {
    font-weight: 600;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:first-child {
    background-color: #f0f7ff;
  }
`;

const TypicalTable = styled.table`
  margin: 15px 50px;
  width: calc(100% - 100px);
  border-collapse: collapse;
  border: 1px solid #b5b5b5;
  border-radius: 15px;
  overflow: hidden;

  th,
  td {
    padding: 10px;
    text-align: left;
  }

  th {
    font-weight: 600;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:first-child {
    background-color: #f0f7ff;
  }
`;

const TableSection = styled.tr`
  border-bottom: 1px solid #b5b5b5;
`;

const TableSection2 = styled.tr`
  border-bottom: 1px solid #b5b5b5;

  &:nth-child(odd) {  // Targeting odd rows
    background-color: #FFF9E6;
  }
  &:nth-child(even) { // Targeting even rows
    background-color: #ffffff;
  }
`;


const TableHeading = styled.th`
  padding: 10px;
  background-color: #f0f7ff;
  text-align: center;
  vertical-align: middle;
`;

const TableBody = styled.td`
  padding: 10px;
  text-align: center;
  vertical-align: middle;
`;

const AddLicense = styled.div`
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

const AddLicenseForm = styled.form`
  width: 60%;
  margin: 0px 100px;
`;

const AddButton = styled.button`
  margin: 10px 20px 10px 0px;
  padding: 15px 30px;
  border: 1px solid #00cf07;
  border-radius: 15px;
  font-size: 1.1rem;
  background-color: #00cf07;
  color: #fff;
  transition: all 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    color: #00cf07;
    background-color: #fff;
  }
`;

const CancelButton = styled.button`
  margin: 10px 20px;
  padding: 15px 30px;
  border: 1px solid #ff0000;
  border-radius: 15px;
  font-size: 1.1rem;
  background-color: #fff;
  color: #ff0000;
  transition: all 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    color: white;
    background-color: #ff0000;
  }
`;

const ButtonTag = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
`;

const Dropdown = styled.select`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #b5b5b5;
  font-size: 16px;
  margin-top: 10px;
  margin-right: 10px;
  width: 100%;
`;

const Dropdown1 = styled.select`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #b5b5b5;
  font-size: 16px;
  margin-top: 10px;
  margin-right: 10px;
  width: 350px;
`;

const DropdownOption = styled.option`
  font-size: 1rem;
  font-weight: 300 !important;
`;

const FileInputContainer = styled.div`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #b5b5b5;
  border-radius: 10px;
  width: 785px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #007bff;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #f0f7ff;
  }
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

const ContactInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ContactInfo1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 840px;
`;

const IssueDate = styled.div``;

const ExpiryDate = styled.div``;

const ContactInput = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #b5b5b5;
  border-radius: 10px;
  width: 324px;
  height: 20px;
  margin-right: 120px;
  font-size: 1rem;
  text-decoration: none;
  font-weight: 400;
`;

const InputHeading = styled.div`
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0;
  margin-top: 8px;
`;

const Input2 = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #b5b5b5;
  border-radius: 10px;
  width: 97.5%;
  height: 20px;
  margin-right: 50px;
  font-size: 0.9rem;
  letter-spacing: 0.8px;
  color: #000;
`;

const FirstRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 50px;
`;

const LastRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 50px;
`;

const LastRowInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 22%;
`;

const LicenseFormNumber = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 22%;
`;

const LicenseInfoTag = styled.h2`
  margin: 0;
  margin-top: 4px;
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 1.2px;
`;

const LicenseInfoTag2 = styled.h2`
  margin: 0;
  margin-top: 4px;
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 1.2px;
`;

const BaseHeader = styled.h3`
  margin: 0;
  margin-top: 4px;
  font-size: 1rem;
  font-weight: 400;
`;

const Buttontag3 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  margin: 8px 0;
`;

const DownloadButton = styled.button`
  padding: 4px 25px;
  color: #fff;
  background-color: #005ab4;
  border: 1px solid #005ab4;
  border-radius: 15px;
  font-size: 1rem;
  cursor: pointer;
  margin-right: 20px;
`;

const UploadButton = styled.button`
  padding: 4px 30px;
  color: #005ab4;
  background-color: #fff;
  border: 1px solid #005ab4;
  border-radius: 15px;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 20px;
`;

const ButtonLink4 = styled.button`
  flex-basis: 30%;
  margin: 30px 5px;
  padding: 10px 20px;
  border: 1px solid #1fb400;
  border-radius: 15px;
  font-size: 1.1rem;
  background-color: #1fb400;
  text-decoration: none;
  color: #fff;
  &:hover {
    cursor: pointer;
    background-color: #1fb400;
  }
`;

const ButtonBack = styled.button`
  margin: 0;
  padding: 10px 20px 10px 0px;
  border: none;
  background-color: #fff;
  color: #0080ff;
  text-decoration: none;
  font-size: 1rem;

  &:hover {
    cursor: pointer;
  }
`;

const ButtonLinkone = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  //margin: 10px 5px;
  //padding: 8px 20px;
  flex-basis: 6.5%;

  font-size: 1.1rem;
  background-color: #fff;
  text-decoration: none;
  color: inherit;

  &:hover {
    cursor: pointer;
    background-color: #f0f7ff;
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin: auto;
  display: block;
`;


const RemainderContainer = styled.div``;

const InspectionContainer = styled.div``;

const ReportSubContainer = styled.div``;

export {
  CompanyContainer,
  CompanyHeading,
  CompanyDetail,
  MainContainer,
  LeftContainer,
  RightContainer,
  FirmName,
  FirmType,
  ContactInfoTag,
  Companyphone,
  CompanyEmail,
  AddressTag,
  PANCardTag,
  RightHeading,
  LineOne,
  ButtonTag1,
  ButtonTag2,
  ButtonHeading,
  Button,
  Image,
  Image2,
  Image3,
  CompName,
  NameHeading,
  FirmDetail,
  ContactNum,
  AddressDetail,
  PANDetail,
  Form,
  SearchButton,
  Para,
  Input,
  FormReport,
  SearchButtonReport,
  ParaReport,
  InputReport,
  ButtonLink2,
  ButtonLinkReport2,
  LicenseContainer,
  ButtonLink3,
  LicenseSubContainer,
  ReportTable,
  TypicalTable,
  TableSection,
  TableSection2,
  TableHeading,
  TableBody,
  AddLicense,
  AddHeading,
  AddLicenseForm,
  AddButton,
  CancelButton,
  ButtonTag,
  Dropdown,
  Dropdown1,
  DropdownOption,
  FileInputContainer,
  FileInput,
  FileInputLabel,
  UploadedFile,
  ContactInfo,
  ContactInfo1,
  IssueDate,
  ExpiryDate,
  ContactInput,
  InputHeading,
  Input2,
  FirstRow,
  LastRow,
  LastRowInfo,
  LicenseFormNumber,
  LicenseInfoTag,
  LicenseInfoTag2,
  BaseHeader,
  Buttontag3,
  DownloadButton,
  UploadButton,
  ButtonLink4,
  ButtonBack,
  RemainderContainer,
  InspectionContainer,
  ReportSubContainer,  
  ButtonLinkone,
  Icon,
}
