import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";

import HomeComponent from "@/bLove/cComponent/aGlobalComponent/outlet/aUnprotectedComponent/children/aHomeComponent";


const HomePage = () => {
  // Redux Call
  const ReduxCall = {
    state: useSelector((fullState: RootState) => fullState.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }
  
  // JSX
  return (
    <React.Fragment>
      HomePage
      <HomeComponent 
        ReduxCall={ReduxCall}
      />
    </React.Fragment>
  )
}

export default HomePage;
