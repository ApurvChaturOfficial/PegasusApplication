import styled from "styled-components";


const userData = {
  fullname: "John Doe",
  email: "23.digvijaypatil@gmail.com",
  phone: "+91-9354786321",
  joinDate: "25 July, 2024",
  
}

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
margin-top: 40px;
margin-left: 50px;
`;

const Heading = styled.h1`
font-weight: 300;
letter-spacing: 0.1rem;
font-size: 2.5rem;
font-family: Segoe UI, sans-serif;
margin: 0;
margin-bottom: 60px;
display: flex;
flex-direction: row;
`;

const Edit = styled.img`
width: 20px;
height: 20px;
margin-left: 10px;
`;

const ContentTag = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
margin-left: 20px;
margin-bottom: 40px;
margin-right: 200px;
`;

const Title = styled.h2`
font-weight: 300;
font-size: 1.5rem;
font-family: Segoe UI, sans-serif;
margin: 0;
padding: 0;
margin-bottom: 8px;
`;

const SubHeading = styled.h3`
font-weight: 300;
font-size: 1rem;
font-family: Segoe UI, sans-serif;
margin: 0;
padding: 0;
`;

const SideTags = styled.div`
display: flex;
flex-direction: row;
`;

const ProfileImg = styled.img`
width: 90px;
height: 90px;
border-radius: 50%;
border: 1px solid #242424;
border-radius: 50px;
padding: 5px;
`;

const EditButton = styled.div`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export {
  userData,
  Container,
  Heading,
  Edit,
  ContentTag,
  Title,
  SubHeading,
  SideTags,
  ProfileImg,
  EditButton,
}
