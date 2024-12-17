// import React from "react";
// import styled from "styled-components";
// import { Link, useLocation } from "react-router-dom";
// import Home from "../../Pegasus Icon/Home.png";
// import Documents from "../../Pegasus Icon/Documents.png";
// import Customers from "../../Pegasus Icon/Customers.png";
// import Licenses from "../../Pegasus Icon/Licenses.png";
// import NameTag from "../../Pegasus Icon/name-tag.png";
// import Send from "../../Pegasus Icon/Send.png";
// import Services from "../../Pegasus Icon/Services.png";
// import AttractCustomers from "../../Pegasus Icon/Attract-Customers.png";
// import CreditCard from "../../Pegasus Icon/Credit-Card.png";

// const MainContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: start;
//   align-items: center;
//   width: 250px;
//   height: 100vh;
//   background-color: #fff;
//   padding: 20px 0;
//   box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
//   overflow: hidden; /* Ensures content doesn't spill out */
// `;

// const NavigationTag = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   padding: 0 10px; /* Add padding to prevent spilling */
//   margin-top: 20px;
// `;

// const NavItem = styled(Link)`
//   display: flex;
//   align-items: center;
//   padding: 10px 15px; /* Adjust padding for better appearance */
//   width: 100%;
//   text-decoration: none;
//   font-size: 0.9rem;
//   color: ${(props) => (props.active ? "#0080ff" : "#333")};
//   font-family: "Segoe UI";
//   font-weight: ${(props) => (props.active ? "500" : "400")};
//   letter-spacing: 0.05rem;
//   background-color: ${(props) => (props.active ? "#e0e7ff" : "transparent")}; 
//   border-radius: 5px; 
//   transition: background-color 0.3s, color 0.3s;

//   &:hover {
//     background-color: #f0f4fc;
//   }
// `;

// const Icon = styled.span`
//   margin-right: 10px;
//   font-size: 1.5rem;
// `;

// const Image = styled.img`
//   width: 24px;
//   height: 24px;
//   margin: 0;
// `;

// const SidebarNavigation = () => {
//   const location = useLocation();
//   const checkActive = (path) => location.pathname === path;

//   return (
//     <MainContainer>
//       <NavigationTag>
//         <NavItem to="/pegasus/dashboard" active={checkActive("/pegasus/dashboard")}>
//           <Icon>
//             <Image src={Home} alt="Home" />
//           </Icon>
//           Home
//         </NavItem>
//         <NavItem to="/pegasus/service-management" active={checkActive("/pegasus/service-management")}>
//           <Icon>
//             <Image src={Services} alt="Services" />
//           </Icon>
//           Service Management
//         </NavItem>
//         <NavItem to="/pegasus/subscribed-customers" active={checkActive("/pegasus/subscribed-customers")}>
//           <Icon>
//             <Image src={Customers} alt="Customers" />
//           </Icon>
//           Subscribed Customers
//         </NavItem>
//         <NavItem to="/pegasus/unpaid-customers" active={checkActive("/pegasus/unpaid-customers")}>
//           <Icon>
//             <Image src={AttractCustomers} alt="AttractCustomers" />
//           </Icon>
//           Unpaid Customers
//         </NavItem>
//         <NavItem to="/pegasus/all-licenses" active={checkActive("/pegasus/all-licenses")}>
//           <Icon>
//             <Image src={Licenses} alt="Licenses" />
//           </Icon>
//           All Licenses
//         </NavItem>
//         <NavItem to="/pegasus/all-documents" active={checkActive("/pegasus/all-documents")}>
//           <Icon>
//             <Image src={Documents} alt="Documents" />
//           </Icon>
//           All Documents
//         </NavItem>
//         <NavItem to="/pegasus/payment-management/*" active={checkActive("/pegasus/payment-management")}>
//           <Icon>
//             <Image src={CreditCard} alt="CreditCard" />
//           </Icon>
//           Payment Management
//         </NavItem>
//         <NavItem to="/pegasus/custom-notifications" active={checkActive("/pegasus/custom-notifications")}>
//           <Icon>
//             <Image src={Send} alt="Send" />
//           </Icon>
//           Custom Notifications
//         </NavItem>
//         <NavItem to="/pegasus/employee-management" active={checkActive("/pegasus/employee-management")}>
//           <Icon>
//             <Image src={NameTag} alt="NameTag" />
//           </Icon>
//           Employee Management
//         </NavItem>
//       </NavigationTag>
//     </MainContainer>
//   );
// };

// export default SidebarNavigation;


//ishaan code 


// import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import Home from "@/bLove/hAsset/Pegasus Icon/Home.png";
import Documents from "@/bLove/hAsset/Pegasus Icon/Documents.png";
import Customers from "@/bLove/hAsset/Pegasus Icon/Customers.png";
import Licenses from "@/bLove/hAsset/Pegasus Icon/Licenses.png";
import NameTag from "@/bLove/hAsset/Pegasus Icon/name-tag.png";
import Send from "@/bLove/hAsset/Pegasus Icon/Send.png";
import Services from "@/bLove/hAsset/Pegasus Icon/Services.png";
import AttractCustomers from "@/bLove/hAsset/Pegasus Icon/Attract-Customers.png";
import CreditCard from "@/bLove/hAsset/Pegasus Icon/Credit-Card.png";
import fullRoute from "@/bLove/gRoute/bFullRoute";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";

// Styles
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 250px;
  height: 100vh;
  background-color: #fff;
  padding: 20px 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const NavigationTag = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 10px;
  margin-top: 20px;
`;

interface NavItemProps {
  active?: boolean;
}

const NavItem = styled(Link)<NavItemProps>`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  width: 100%;
  text-decoration: none;
  font-size: 0.9rem;
  color: ${(props) => (props.active ? "#0080ff" : "#333")};
  font-family: "Segoe UI";
  font-weight: ${(props) => (props.active ? "500" : "400")};
  letter-spacing: 0.05rem;
  background-color: ${(props) => (props.active ? "#e0e7ff" : "transparent")};
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #f0f4fc;
  }
`;

const Icon = styled.span`
  margin-right: 10px;
  font-size: 1.5rem;
`;

const Image = styled.img`
  width: 24px;
  height: 24px;
  margin: 0;
`;

// SidebarNavigation Component
const SidebarNavigation = () => {
  // Variable
  const location = useLocation();
  const checkActive = (path: any) => location.pathname === path;

  const ReduxCall = {
    state: useSelector((fullState: RootState) => fullState.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }

  // Dummy data for isAdmin. Change this to "True" or "False" to test
  // const isAdmin = "True";  // Change to "False" to hide Employee Management

  return (
    <MainContainer>
      <NavigationTag>
        <NavItem 
          to={fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.hDashboardRoute} 
          active={checkActive(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.hDashboardRoute)}
        >
          <Icon>
            <Image src={Home} alt="Home" />
          </Icon>
          Home
        </NavItem>
        <NavItem 
          to={fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.cServiceRoute.fCompleteListRoute} 
          active={checkActive(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.cServiceRoute.fCompleteListRoute)}
        >
          <Icon>
            <Image src={Services} alt="Services" />
          </Icon>
          Service Management
        </NavItem>
        <NavItem 
          to={fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.iCustomerRoute.aPaidCustomerRoute.aPaidCustomerListRoute} 
          active={checkActive(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.iCustomerRoute.aPaidCustomerRoute.aPaidCustomerListRoute)}
        >
          <Icon>
            <Image src={Customers} alt="Customers" />
          </Icon>
          Subscribed Customers
        </NavItem>
        <NavItem 
          to={fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.iCustomerRoute.bUnpaidCustomerRoute.aUnpaidCustomerListRoute} 
          active={checkActive(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.iCustomerRoute.bUnpaidCustomerRoute.aUnpaidCustomerListRoute)}
        >
          <Icon>
            <Image src={AttractCustomers} alt="AttractCustomers" />
          </Icon>
          Unpaid Customers
        </NavItem>
        <NavItem 
          to={fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.bLicenseRoute.fCompleteListRoute} 
          active={checkActive(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.bLicenseRoute.fCompleteListRoute)}
        >
          <Icon>
            <Image src={Licenses} alt="Licenses" />
          </Icon>
          All Licenses
        </NavItem>
        <NavItem 
          to={fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.dDocumentRoute.fCompleteListRoute} 
          active={checkActive(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.dDocumentRoute.fCompleteListRoute)}
        >
          <Icon>
            <Image src={Documents} alt="Documents" />
          </Icon>
          All Documents
        </NavItem>
        <NavItem 
          to="" 
          active={checkActive("")}
        >
          <Icon>
            <Image src={CreditCard} alt="CreditCard" />
          </Icon>
          Payment Management
        </NavItem>
        <NavItem 
          to="" 
          active={checkActive("")}
        >
          <Icon>
            <Image src={Send} alt="Send" />
          </Icon>
          Custom Notifications
        </NavItem>

        {(ReduxCall.state.receivedObject as any)?.ProfileRetrieve?.cRole?.aTitle === "Pegasus Super Admin" && (<NavItem 
          to={fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.fUserRoute.aListRoute} 
          active={checkActive(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.fUserRoute.aListRoute)}
        >
          <Icon>
            <Image src={NameTag} alt="NameTag" />
          </Icon>
          Employee Management
        </NavItem>)}
        
      </NavigationTag>
    </MainContainer>
  );
};

export default SidebarNavigation;

