import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import { RootState } from "@/aConnection/dReduxConnection";

import AuthorizationComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent";
import fullRoute from "@/bLove/gRoute/bFullRoute";


const AuthorizationLayout = () => {
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
		(ReduxCall.state.receivedObject as any)?.ProfileRetrieve?._id ?
      null
      :
      navigate(fullRoute.aGlobalRoute.bProtectedRoute.aAuthenticationRoute.aSignInRoute)
	}, [ReduxCall.state])

  // JSX
  return (
    <React.Fragment>
      {/* AuthorizationLayout */}
      <AuthorizationComponent>
        <Outlet />
      </AuthorizationComponent>
    </React.Fragment>
  )
}

export default AuthorizationLayout; 
