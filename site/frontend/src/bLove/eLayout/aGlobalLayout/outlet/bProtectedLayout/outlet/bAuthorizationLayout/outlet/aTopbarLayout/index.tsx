import React from "react"
import { Outlet } from "react-router-dom";

import TopbarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/outlet/aTopbarComponent";


const TopbarLayout = () => {
  // JSX
  return (
    <React.Fragment>
      {/* TopbarLayout */}
      <TopbarComponent>
        <Outlet />
      </TopbarComponent>
    </React.Fragment>
  )
}

export default TopbarLayout; 
