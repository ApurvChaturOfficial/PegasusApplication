// import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import { LeftContainer, MainContainer, RightContainer } from "./style";
import SidebarNavigation from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/outlet/bSidebarComponent/component/SidebarNavigation/SidebarNavigation";
import TopNavBarTwoComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarTwoComponent";


const DashboardPage = () => {
  return (
    <>
      <TopNavBarTwoComponent />
      <MainContainer>
        <LeftContainer>
          <SidebarNavigation />
        </LeftContainer>
        <RightContainer>
          <p>Main Content Area</p>
        </RightContainer>
      </MainContainer>
    </>
  );
};

export default DashboardPage;
