import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import NotificationBell from "@/bLove/hAsset/assets/notificationbell.png";
import DownArrow from "@/bLove/hAsset/icon/arrowdown.png";
import Profile from "@/bLove/hAsset/assets/profileimg.png";
import Settings from "@/bLove/hAsset/icon/settings.png";
import Logout from "@/bLove/hAsset/icon/log-out.png";
import Payment from "@/bLove/hAsset/icon/payment.png";
import About from "@/bLove/hAsset/icon/about.png";
import Person from "@/bLove/hAsset/icon/customer.png";
import fullRoute from "@/bLove/gRoute/bFullRoute";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import userAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/bUserAdministration/aUserAPIEndpoints";
import apiResponseHandler from "./extras/aAPIResponseHandler";

const Container = styled.div`
  display: flex;
  height: 50px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  padding: 10px;
`;

const PageLogo = styled.div`
  display: flex;
  flex-basis: 20%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

const VerticalLine = styled.div`
  margin-left: 15px;
  border-right: 1px solid #b5b5b5;
  height: 90%;
`;

const PageNavigation = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px;
  padding: 10px;
  width: 100%;
  color: #242424;
`;

const LogoHeading = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
`;

const LogoSubHeading = styled.h2`
  font-size: 0.8rem;
  font-weight: 400;
  margin: 0;
`;

const DevLink = styled.a`
  font-size: 1.8rem;
  font-weight: 400;
  margin: 0;
  color: #007bff;
  text-decoration: none;
  cursor: pointer;
`;

const NavLinkStyled = styled(NavLink)`
  margin: 0 35px;
  text-decoration: none;
  color: #242424;
  font-weight: ${(props) => ((props as any).active ? "bold" : "normal")};

  &.active {
    color: #007bff;
    font-weight: bold;
  }

  &:hover {
    color: #007bff;
  }
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-basis: 20%;
`;

const NotificationImg = styled.img`
  height: 30px;
  width: 30px;
  margin: 0px 50px 0 10px;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-basis: 50%;
`;

const ProfileImg = styled.img`
  height: 40px;
  width: 40px;
  padding: 5px;
`;

const ProfileArrow = styled.img`
  height: 10px;
  width: 10px;
  padding: 5px;
`;

const MyCorp = styled.a`
  color: #0080ff;
`;

const DropDown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropButton = styled.button`
  background-color: #f8f9fa;
  color: #242424;
  border: none;
  cursor: pointer;
  padding: 10 px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const DropDownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  max-width: 250px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  right: 0; /* Align dropdown to the right edge */
  overflow: hidden;
  white-space: nowrap;

  ${DropDown}:hover & {
    display: block;
  }
`;

const ProfileContent = styled(NavLink)`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const ImageContent = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 10px;
`;

const TextContent = styled.p`
  margin: 0;
`;

const ColorStrip = styled.div`
  background-image: linear-gradient(to left, #F9F8FB 0%, #ECCEFD 46%, #FAAE87 100%);
  height: 15px;
  width: 100%;
  border-bottom: 1px solid #F9F8FB;
`;

const TopNavBarComponent = () => {
  // Varable
  const navigate = useNavigate();

  // Redux Call
  const ReduxCall = {
    state: useSelector((fullState: RootState) => fullState.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }

  // API Call
  const APICall = {
    logoutAPITrigger: userAPIEndpoint.useLazyUserLogoutAPIQuery()[0],
    logoutAPIResponse: userAPIEndpoint.useLazyUserLogoutAPIQuery()[1],
  }
  

  return (<><ColorStrip></ColorStrip>
    <Container>
      <PageLogo>
        <LogoHeading>
          <DevLink>In Time Alerts</DevLink>
        </LogoHeading>
        <LogoSubHeading>
          developed by{" "}
          <MyCorp href="https://www.inewtech.in/">
            Inew Technologies
          </MyCorp>
        </LogoSubHeading>
      </PageLogo>

      <VerticalLine />
      <PageNavigation>
        <NavLinkStyled
          to={fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.aOrganizationRoute.aListRoute}
          // active={location.pathname === "/organizations"}
        >
          Organizations
        </NavLinkStyled>
        <NavLinkStyled
          to={fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.bLicenseRoute.aListRoute}
          // active={location.pathname === "/licenses"}
        >
          Licenses
        </NavLinkStyled>
        <NavLinkStyled
          to={fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.cServiceRoute.aListRoute}
          // active={location.pathname === "/services"}
        >
          Services
        </NavLinkStyled>
        <NavLinkStyled
          to={fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.dDocumentRoute.aListRoute}
          // active={location.pathname === "/documents"}
        >
          Documents
        </NavLinkStyled>
        <NavLinkStyled
          to={fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.eInspectionRoute.aListRoute}
          // active={location.pathname === "/inspections"}
        >
          Inspections
        </NavLinkStyled>
      </PageNavigation>

      <RightSection>
        <NotificationImg src={NotificationBell} alt="Notification" />

        <div style={{ display: "flex", flexDirection: "column" }} >
          <span>{(ReduxCall.state.receivedObject as any)?.ProfileRetrieve?.eFirstname}</span>
          <small>{(ReduxCall.state.receivedObject as any)?.ProfileRetrieve?.eEmail}</small>
        </div>
        
        <DropDown>
          <DropButton>
            <ProfileContainer>
              <ProfileImg src={Profile} alt="Profile" />
              <ProfileArrow src={DownArrow} alt="Profile Arrow" />
            </ProfileContainer>
          </DropButton>
          <DropDownContent>
            <ProfileContent to={fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.aTopbarRoute.aProfileRetrieveRoute}>
              <ImageContent src={Person} alt="" />
              <TextContent>My Profile</TextContent>
            </ProfileContent>
            <ProfileContent to={fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.aTopbarRoute.cProfilePasswordUpdateRoute}>
              <ImageContent src={Settings} alt="" />
              <TextContent>Settings</TextContent>
            </ProfileContent>
            <ProfileContent to="">
              <ImageContent src={Payment} alt="" />
              <TextContent>Payments & Invoices</TextContent>
            </ProfileContent>
            <ProfileContent to="">
              <ImageContent src={About} alt="" />
              <TextContent>About</TextContent>
            </ProfileContent>
            <ProfileContent to={""} onClick={() => apiResponseHandler.logoutAPIResponseHandler(APICall.logoutAPITrigger, navigate, ReduxCall)}>
              <ImageContent src={Logout} alt="" />
              <TextContent>Logout</TextContent>
            </ProfileContent>
          </DropDownContent>
        </DropDown>
      </RightSection>
    </Container>
    </>
  );
};

export default TopNavBarComponent;
