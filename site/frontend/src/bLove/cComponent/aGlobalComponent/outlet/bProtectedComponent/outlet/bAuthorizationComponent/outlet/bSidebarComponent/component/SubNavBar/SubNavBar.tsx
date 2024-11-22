// import React from 'react';
import styled from 'styled-components';
import { useParams, NavLink } from 'react-router-dom';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 10px 0 0 0;
  margin: 10px 0 10px 0;
  font-weight: 400;
`;

interface NavItemProps {
  active?: boolean;
}

// const NavItem = styled(Link)<NavItemProps>`

const Navigation = styled(NavLink)<NavItemProps>`
  text-decoration: none;
  color: ${props => props.active ? '#0080FF' : '#242424'};
  padding: 10px 0px 0px 10px;
  margin: 0;
  margin-left: 40px;
  margin-right: 12px;
  font-size: 1rem;
  font-weight: ${props => props.active ? '600' : '400'};

  &:hover {
    color: #007bff;
  }
`;

const HorizontalLine = styled.hr`
  width: 100%;
  margin: 0;
  padding: 0;
`;

const SubNavBar = () => {
  const { companyName } = useParams();
  // const location = useLocation();
  const BaseURL = `/organizations/${companyName}`;

  return (
    <MainContainer>
      <NavLinks>
        <Navigation to={`${BaseURL}`} >Company</Navigation>
        <Navigation to={`${BaseURL}/licenses`} >Licenses</Navigation>
        <Navigation to={`${BaseURL}/reminders`} >Reminders</Navigation>
        <Navigation to={`${BaseURL}/inspection-reports`} >Inspection Reports</Navigation>
        <Navigation to={`${BaseURL}/document`} >Documents</Navigation>
        <Navigation to={`${BaseURL}/service`} >Services</Navigation>
      </NavLinks>
      <HorizontalLine />
    </MainContainer>
  );
};

export default SubNavBar;
