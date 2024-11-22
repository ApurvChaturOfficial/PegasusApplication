import { Link } from "react-router-dom";
import styled from "styled-components";


const clientData = {
  Client: {
    phone: "+91-987653210",
    email: "alphabeta22@gmail.com",
  },
};

const SettingsContiners = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px;
  padding: 0px;
  margin-top: 40px;
  overflow-x: hidden;
`;

const Heading = styled.h1`
  font-weight: 300;
  letter-spacing: 0.05rem;
  font-size: 2.5rem;
  font-family: Segoe UI, sans-serif;
  margin: 0;
  margin-left: 50px;
`;

const PasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px;
`;

const SubHeading = styled.h2`
  font-weight: 300;
  letter-spacing: 0.05rem;
  font-size: 1.5rem;
  font-family: Segoe UI, sans-serif;
  margin: 25px 50px 10px 50px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputHeading = styled.h3`
  font-weight: 300;
  letter-spacing: 0.05rem;
  font-size: 1rem;
  font-family: Segoe UI, sans-serif;
  margin: 15px 0 5px 100px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 2px 0 15px 100px;
  position: relative;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #b5b5b5;
  color: #242424;
  border-radius: 10px;
  width: 50%;
  height: 20px;
`;

const Input2 = styled.input`
  padding: 10px;
  border: 1px solid #b5b5b5;
  color: #ff0000;
  border-radius: 10px;
  width: 50%;
  height: 20px;
`;

const ToggleVisibilityButton = styled.button`
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  margin-right: 700px;

  &:hover {
    color: #0056b3;
  }
`;

const ForgetTag = styled(Link)`
  font-weight: 400;
  letter-spacing: 0.05rem;
  font-size: 0.8rem;
  font-family: Segoe UI, sans-serif;
  margin: 0 0 15px 100px;
  color: #ff5151;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    color: #ff0000;
    font-weight: 600;
  }
`;

const ButtonTags = styled.div`
  display: flex;
  flex-direction: row;
`;

const Button1 = styled.button`
  background-color: #00cf07;
  color: #fff;
  border: none;
  padding: 15px 30px;
  border-radius: 10px;
  font-size: 1rem;
  font-family: Segoe UI, sans-serif;
  margin: 15px 0 15px 100px;
  transition: all 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: #007b00;
  }
`;

const Button2 = styled.button`
  background-color: #fff;
  color: #ff0000;
  border: 1px solid #ff0000;
  padding: 15px 30px;
  border-radius: 10px;
  font-size: 1rem;
  font-family: Segoe UI, sans-serif;
  margin: 15px 0 15px 10px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #ff0000;
    color: #fff;
    border: 1px solid #ff0000;
  }
`;

const Button3 = styled.button`
  background-color: #ff5151;
  color: #fff;
  border: 1px solid #ff0000;
  padding: 15px 30px;
  border-radius: 10px;
  font-size: 1rem;
  font-family: Segoe UI, sans-serif;
  margin: 15px 10px 15px 100px;
  transition: all 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: #ff0000;
    color: #fff;
    border: 1px solid #ff0000;
  }

  &:disabled {
    background-color: #ffcccc;
    cursor: not-allowed;
  }
`;

const Button4 = styled.button`
  background-color: #fff;
  color: #00cf07;
  border: none;
  padding: 15px 30px;
  border: 1px solid #00cf07;
  border-radius: 10px;
  font-size: 1rem;
  font-family: Segoe UI, sans-serif;
  margin: 15px 0 15px 10px;
  transition: all 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    color: #fff;
    background-color: #00cf07;
  }
`;

const ShowImg = styled.img`
  width: 30px;
  height: 20px;
  padding-top: 4px;
`;

const HideImg = styled.img`
  width: 25px;
  height: 15px;
  padding-top: 4px;
  padding-right: 2px;
`;

const DeleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px;
`;

const DeleteTag = styled.p`
  font-weight: 400;
  font-size: 1rem;
  font-family: Segoe UI, sans-serif;
  margin: 25px 50px 10px 50px;
  color: #ff0000;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  width: 50%;
  margin-left: 100px;
`;

const ImpTag = styled.span`
  color: #ff0000;
`;

const TwoFactorContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px;
`;

const CurrentEmail = styled.div`
  font-weight: 400;
  font-size: 1rem;
  font-family: Segoe UI, sans-serif;
  margin: 5px 50px 25px 100px;
  color: #007bff;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  flex-basis: 20%;
`;

const CurrentContact = styled.div`
  font-weight: 400;
  font-size: 1rem;
  font-family: Segoe UI, sans-serif;
  margin: 5px 50px 25px 100px;
  color: #007bff;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  flex-basis: 20%;
`;

const TwoFactorButton = styled.button`
  background-color: #fff;
  border: none;
  margin: 0;
  padding: 0;
  border-radius: 10px;
  font-size: 1rem;
  font-family: Segoe UI, sans-serif;
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
  }
`;

const SingleLine = styled.div`
  display: flex;
  flex-direction: row;
`;

const ChangeMeButton = styled.button`
  background-color: #005ab4;
  color: #fff;
  border: 1px solid #005ab4;
  margin: 0;
  padding: 15px 30px;
  border-radius: 10px;
  font-size: 1rem;
  font-family: Segoe UI, sans-serif;
  transition: all 0.3s ease-in-out;
  margin: 25px 50px 25px 100px;

  &:hover {
    cursor: pointer;
  }
`;

const ContentTag = styled.p`
  font-weight: 300;
  font-size: 1rem;
  font-family: Segoe UI, sans-serif;
  margin: 15px 0 5px 100px;
`;

const BtnDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  flex-basis: 20%;
`;

const PrivacyContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px;
  padding-bottom: 50px;

`;

const MainTag = styled.div`
  padding: 0px 30px;
  width: 90%;
`;

const MicroHeading = styled.h3`
  font-weight: 500;
  letter-spacing: 0.05rem;
  font-size: 1.2rem;
  font-family: Segoe UI, sans-serif;
  margin: 25px 0 15px 50px;
`;

const MiniHeading = styled.h4`
  font-weight: 300;
  letter-spacing: 0.05rem;
  font-size: 1rem;
  font-family: Segoe UI, sans-serif;
  margin: 0;
  margin-left: 100px;
`;

export {
  clientData,
  SettingsContiners,
  Heading,
  PasswordContainer,
  SubHeading,
  Form,
  InputHeading,
  InputWrapper,
  Input,
  Input2,
  ToggleVisibilityButton,
  ForgetTag,
  ButtonTags,
  Button1,
  Button2,
  Button3,
  Button4,
  ShowImg,
  HideImg,
  DeleteContainer,
  DeleteTag,
  ImpTag,
  TwoFactorContainer,
  CurrentEmail,
  CurrentContact,
  TwoFactorButton,
  SingleLine,
  ChangeMeButton,
  ContentTag,
  BtnDiv,
  PrivacyContainer,
  MainTag,
  MicroHeading,
  MiniHeading,
}
