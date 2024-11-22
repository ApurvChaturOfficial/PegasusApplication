import _React, { useState, useEffect } from "react";
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
import apiResponseHandler from "./extras/aAPIResponseHandler";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import userAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/bUserAdministration/aUserAPIEndpoints";
import fullRoute from "@/bLove/gRoute/bFullRoute";

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
  align-items: flex-start;
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

const RightSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-basis: 50%; /* Adjust this based on your layout */
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
  padding: 10px;
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

const PageTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 20px;
  padding: 10px;
  color: #242424;
`;

const DateContainer = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
`;

const TimeContainer = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
`;

const ColorStrip = styled.div`
  background-image: linear-gradient(to left, #F9F8FB 0%, #ECCEFD 46%, #FAAE87 100%);
  height: 15px;
  width: 100%;
  border-bottom: 1px solid #F9F8FB;
`;

const TopNavBarTwoComponent = () => {
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

  // const location = useLocation();
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
      const formattedDate = now.toLocaleDateString('en-US', (options as any));
      setCurrentDate(formattedDate);
    };

    updateDate(); // Set the initial date
    const intervalId = setInterval(updateDate, 1000 * 60 * 60 * 24); // Update every day

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString('en-US', { hour12: true });
      setCurrentTime(formattedTime);
    };

    updateTime(); // Set the initial time
    const intervalId = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (<> <ColorStrip></ColorStrip>
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
      <RightSection>
        <PageTime>
          <DateContainer>{currentDate}</DateContainer>
          <TimeContainer>{currentTime}</TimeContainer>
        </PageTime>
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
            <ProfileContent to={fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.aTopbarRoute.aProfileRetrieveRoute}>
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

export default TopNavBarTwoComponent;
