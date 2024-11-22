// import React from 'react';
// import styled from 'styled-components';
// import { useLocation, NavLink } from 'react-router-dom';

// const MainContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   padding: 0;
// `;

// const NavLinks = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   width: 100%;
//   padding: 10px 0 0 0;
//   margin: 10px 0 10px 0;
//   font-weight: 400;
// `;

// const Navigation = styled(NavLink)`
//   text-decoration: none;
//   color: ${props => props.active ? '#0080FF' : '#242424'};
//   padding: 10px 0px 0px 10px;
//   margin: 0;
//   margin-left: 40px;
//   margin-right: 12px;
//   font-size: 1rem;
//   font-weight: ${props => props.active ? '600' : '400'};

//   &:hover {
//     color: #007bff;
//   }
// `;

// const HorizontalLine = styled.hr`
//   width: 100%;
//   margin: 0;
//   padding: 0;
// `;

// const SettingNavBarComponent = () => {
//   const location = useLocation();
//   const BaseURL = `/settings`;

//   return (
//     <MainContainer>
//       <NavLinks>
//         <Navigation to={`${BaseURL}`} active={location.pathname === `${BaseURL}`}>Password</Navigation>
//         <Navigation to={`${BaseURL}/twofactor-authentication`} active={location.pathname === `${BaseURL}/twofactor-authentication`}>Two Factor Authentication</Navigation>
//         <Navigation to={`${BaseURL}/privary-security`} active={location.pathname === `${BaseURL}/privary-security`}>Privacy & Security</Navigation>
//         <Navigation to={`${BaseURL}/delete-account`} active={location.pathname === `${BaseURL}/delete-account`}>Delete Account</Navigation>
//       </NavLinks>
//       <HorizontalLine />
//     </MainContainer>
//   );
// };

// export default SettingNavBarComponent;


import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

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

const Navigation = styled(NavLink)`
  text-decoration: none;
  color: #242424;
  padding: 10px 0px 0px 10px;
  margin: 0;
  margin-left: 40px;
  margin-right: 12px;
  font-size: 1rem;
  font-weight: 400;

  &.active {
    color: #0080ff;
    font-weight: 600;
  }

  &:hover {
    color: #007bff;
  }
`;

const HorizontalLine = styled.hr`
  width: 100%;
  margin: 0;
  padding: 0;
`;

const SettingNavBarComponent = () => {
  // const location = useLocation();
  const BaseURL = `/settings`;

  return (
    <MainContainer>
      <NavLinks>
        <Navigation to={`${BaseURL}`} end>Change Password</Navigation>
        <Navigation to={`${BaseURL}/twofactor-authentication`}>Two Factor Authentication</Navigation>
        <Navigation to={`${BaseURL}/privacy-security`}>Privacy & Security</Navigation>
        <Navigation to={`${BaseURL}/delete-account`}>Delete Account</Navigation>
      </NavLinks>
      <HorizontalLine />
    </MainContainer>
  );
};

export default SettingNavBarComponent;
