import React from "react"
// import HeaderComponent from "./component/aHeaderComponent";


const UnprotectedComponent = ({ children }: { children: React.ReactNode }) => {
  // JSX
  return (
    <React.Fragment>
      UnprotectedComponent
      {/* <HeaderComponent /> */}
      { children }
    </React.Fragment>
  )
}

export default UnprotectedComponent;
