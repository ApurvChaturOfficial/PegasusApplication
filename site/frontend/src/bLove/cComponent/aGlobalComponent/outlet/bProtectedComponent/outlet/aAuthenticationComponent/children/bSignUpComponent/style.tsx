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
  font-weight: 400;
  letter-spacing: 1.2px;
  font-family: "Inter", sans-serif;
    font-style: normal;
    font-variation-settings: "slnt" 0;
`;

const SubHeading = styled.h1`
  margin-top: 30px;
  font-weight: 400;
  letter-spacing: 1.2px;
  margin-bottom: 0px;
`;

const Para = styled.p`
  margin: 5px 0;
  letter-spacing: 1.2px;
  display: flex;
  flex-direction: row;
`;

const Image = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const PageLink = styled(Link)`
  margin-left: 25px;
  margin-top: 30px;
  text-decoration: none;
  color: #007bff;
  display: flex;
`;

const PageLinkButton = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  width: 300px;
  margin-bottom: 20px;
  height: 60px;
`;

const LinkButton = styled(Link)`
  text-decoration: none;
  color: #007bff;
  margin-left: 5px;
`;

const HyperLink = styled.a`
  text-decoration: none;
  color: #007bff;
  margin-left: 5px;
`;

export {
  Container,
  ImageWrapper,
  ContentWrapper,
  Button,
  MainHeading,
  SubHeading,
  Para,
  Image,
  PageLink,
  PageLinkButton,
  LinkButton,
  HyperLink,
}
