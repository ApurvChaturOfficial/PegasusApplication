import { Link } from "react-router-dom";
import styled from "styled-components";


const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: left;
  flex-direction: row;
  padding: 25px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const PageHeading = styled.h1`
  margin: 0 50px;
  font-weight: 300;
  letter-spacing: 0.1rem;
  font-size: 3rem;
  font-family: Segoe UI, sans-serif;
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

const Image = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const Para = styled.span`
  margin: 0;
  padding: 0;
`;

const ButtonLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 5px;
  padding: 8px 20px;
  flex-basis:6.5%;
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

export {
  MainContainer,
  Container,
  PageHeading,
  Input,
  Form,
  SearchButton,
  Image,
  Para,
  ButtonLink,
}
