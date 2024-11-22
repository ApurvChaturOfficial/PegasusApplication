import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import { RootState } from "@/aConnection/dReduxConnection";

import AuthenticationComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/aAuthenticationComponent";
import fullRoute from "@/bLove/gRoute/bFullRoute";


const AuthenticationLayout = () => {
  // Variable
  const navigate = useNavigate();

  // Redux Call
  const ReduxCall = {
    state: useSelector((state: RootState) => state.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }

  // All Renders
	// First Render
	useEffect(() => {
		(ReduxCall.state.receivedObject as any)?.ProfileRetrieve?._id ? (
			(ReduxCall.state.receivedObject as any)?.ProfileRetrieve?.cRole?.aTitle === "Pegasus Super Admin" ||
			(ReduxCall.state.receivedObject as any)?.ProfileRetrieve?.cRole?.aTitle === "Pegasus Employee"
    ) ? (
      navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.hDashboardRoute)
    ) : (
      (ReduxCall.state.receivedObject as any)?.ProfileRetrieve?.cRole?.aTitle === "Pegasus Customer" 
    ) ? (
      navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.aOrganizationRoute.aListRoute)
    ) : (
      navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.hDashboardRoute)
    ) : null
	}, [ReduxCall.state])
  
  // JSX
  return (
    <React.Fragment>
      {/* AuthenticationLayout */}
      <AuthenticationComponent>
        <Outlet />
      </AuthenticationComponent>
    </React.Fragment>
  )
}

export default AuthenticationLayout; 
