import { Link } from "react-router-dom";
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

const Table = styled.table`
  margin: 15px 30px;
  width: calc(100% - 60px);
  border-collapse: collapse;
  border: 1px solid #b5b5b5;
  border-radius: 10px;
  overflow: hidden;
`;

const TableHeading = styled.th`
  padding: 15px;
  font-weight: 600;
  background-color: #f0f7ff;
  text-align: left;
  border-bottom: 1px solid #b5b5b5;
  width: 16.66%;
`;

const TableBody = styled.td`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #b5b5b5;
  width: 16.66%;
  white-space: nowrap; /* Prevent wrapping */
`;

const SubmitButtonNew = styled.button`
  padding: 5px 10px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  background-color: #0080ff;
  color: white;

  &:hover {
    background-color: #005bb5;
    cursor: pointer;
  }
`;

const Form = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 0 30px;
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

const ButtonLink2 = styled(Link)`
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

const ButtonLink3 = styled.button`
  margin: 0;
  padding: 5px 15px; /* Increased padding */
  border: 1px solid #242424;
  border-radius: 15px;
  background-color: transparent;
  font-size: 0.9rem;
  color: #242424;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #f0f7ff;
  }

  &:active {
    background-color: #e0e7ff;
  }
`;

const NavLinks = styled.div`
  display: flex;
  margin: 20px 30px;
`;

interface NavItemProps {
  active?: boolean;
}

const Navigation = styled.div<NavItemProps>`
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: ${props => (props.active ? '600' : '400')};
  color: ${props => (props.active ? '#007bff' : '#000')};
  border-bottom: ${props => (props.active ? '2px solid #007bff' : 'none')};

  &:hover {
    color: #007bff;
  }
`;

// Roles table components
const RoleTable = styled.table`
  margin: 15px 30px;
  width: calc(100% - 60px);
  border-collapse: collapse;
  border: 1px solid #b5b5b5;
  border-radius: 10px;
  overflow: hidden;
`;

const RoleTableHeading = styled.th`
  padding: 15px;
  font-weight: 600;
  background-color: #f0f7ff;
  text-align: left;
  border-bottom: 1px solid #b5b5b5;
  width: 25%;
`;

const RoleTableBody = styled.td`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #b5b5b5;
  width: 25%;
`;

const EditRoleButton = styled(ButtonLink3)`
  padding: 5px 15px;
  border: 1px solid #242424;
  border-radius: 15px;
  background-color: transparent;
  font-size: 0.9rem;
  color: #242424;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #f0f7ff;
  }

  &:active {
    background-color: #e0e7ff;
  }
`;

const Image3 = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const EmployeeDropdown = styled.select`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #fff;
`;


export {
  MainContainer,
  LeftContainer,
  RightContainer,
  Heading,
  Table,
  TableHeading,
  TableBody,
  Form,
  SearchButton,
  Input,
  ButtonLink2,
  ButtonLink3,
  NavLinks,
  Navigation,
  RoleTable,
  RoleTableHeading,
  RoleTableBody,
  EditRoleButton,
  Image3,
  EmployeeDropdown,
  SubmitButtonNew,
}
