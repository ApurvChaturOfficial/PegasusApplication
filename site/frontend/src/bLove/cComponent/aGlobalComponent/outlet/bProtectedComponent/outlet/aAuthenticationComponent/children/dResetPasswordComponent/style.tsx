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
  width: 410px;
`;

const InputHeading = styled.div`
  margin-top: 20px;
  font-weight: 500;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 390px;
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
  width: 100%;
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

// const Page = styled.a`
//   color: #0080ff !important;

//   &:hover {
//     color: #0056b3 !important;
//   }
// `;

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

const Star = styled.span`
  margin-left: 5px;
  color: red;
`;

const SubHeading = styled.h2`
  margin-top: 30px;
  font-weight: 400;
  letter-spacing: 1.2px;
  margin-bottom: 40px;
  width: 50%;
  text-align: center;
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
  // Page,
  PageLink,
  Image,
  Star,
  SubHeading,
}
