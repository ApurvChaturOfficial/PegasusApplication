import React, { useEffect } from "react"
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
// import fullRoute from "@/bLove/gRoute/bFullRoute";

import licenseAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/eLicenseAPIEndpoints";

// import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import { Form, Heading, Image, Input2, LeftContainer, MainContainer, Para, RightContainer, SearchButton, ServiceSubContainer, Table, TableBody, TableHeading } from "./style";
import SidebarNavigation from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/outlet/bSidebarComponent/component/SidebarNavigation/SidebarNavigation";
import Filter from "@/bLove/hAsset/icon/filter.png";
// import PlusSign from "@/bLove/hAsset/icon/plus-circle.png";
import TopNavBarTwoComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarTwoComponent";


const LicenseCompleteListPage = () => {
  // Redux Call
  const ReduxCall = {
    state: useSelector((fullState: RootState) => fullState.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }

  // API Call
  const APICall = {
    listAPIResponse: licenseAPIEndpoint.useLicenseListAPIQuery(null),
  }
    // Extra Render
    useEffect(() => {
      console.log(ReduxCall.state)
    }, [ReduxCall.state])
  
  // JSX
  return (
    <React.Fragment>
      {/* LicenseCompleteListPage */}

      {/* <Link to={fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.bLicenseRoute.bCreateRoute} >Create</Link> */}

      {/* {APICall.listAPIResponse.isLoading ? null : 
        APICall.listAPIResponse.isError ? null :
          APICall.listAPIResponse.isSuccess ? (
            APICall.listAPIResponse.data.success ? (
              APICall.listAPIResponse.data.list.length > 0 ? (
                <React.Fragment>
                  {
                    APICall.listAPIResponse.data.list?.map((each: any, index: any) => (
                      <div key={index} >
                        {each.aTitle}
                        <Link to={`${fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.bLicenseRoute.dUpdateRoute}/${each._id}`} >Update</Link>
                      </div> 
                    ))
                  }
                </React.Fragment>
              ) : []
            ) : []
          ) : []
      } */}

      {/* <div>
        ---------------------------------------------------------------------------------------
      </div> */}

      <>
        <TopNavBarTwoComponent />
        <MainContainer>
          <LeftContainer>
            <SidebarNavigation />
          </LeftContainer>
          <RightContainer>
            <ServiceSubContainer>
            <>
              <Heading>All License</Heading>
              <Form>
                <Input2
                  type="text"
                  placeholder="Search Your License"
                  name="search"
                  // value={searchInput}
                  // onChange={handleSearchInputChange}
                />
                <SearchButton type="button" onClick={() => "handleSearch"}>
                  <Image src={Filter} alt="Filter" />
                  <Para>Filter</Para>
                </SearchButton>

                {/* <ButtonLink2 onClick={() => navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.cServiceRoute.gCompleteCreateRoute)} >
                  <Image src={PlusSign} alt="PlusSign" />
                  <Para>Add</Para>
                </ButtonLink2> */}
              </Form>
              <Table>
                <thead>
                  <tr>
                    <TableHeading>Organization</TableHeading>
                    <TableHeading>License</TableHeading>
                    <TableHeading>License Number</TableHeading>
                    <TableHeading>Issued Date</TableHeading>
                    <TableHeading>Expiry Date</TableHeading>
                  </tr>
                </thead>
                <tbody>
                  {APICall.listAPIResponse.isLoading ? null : 
                    APICall.listAPIResponse.isError ? null :
                      APICall.listAPIResponse.isSuccess ? (
                        APICall.listAPIResponse.data.success ? (
                          APICall.listAPIResponse.data.list.length > 0 ? (
                            <React.Fragment>
                              {
                                APICall.listAPIResponse.data.list?.map((each: any, index: any) => (
                                  <tr key={index}>
                                    <TableBody>{each.cOrganization?.aTitle}</TableBody>
                                    <TableBody>{each.dSelectedLicense}</TableBody>
                                    <TableBody>{each.dLicenseNumber}</TableBody>
                                    <TableBody>{each.dIssueDate}</TableBody>
                                    <TableBody>{each.dExpiryDate}</TableBody>
                                  </tr>
                                ))
                              }
                            </React.Fragment>
                          ) : []
                        ) : []
                      ) : []
                  }
                </tbody>
              </Table>
            </>
            </ServiceSubContainer>
          </RightContainer>
        </MainContainer>
      </>

    </React.Fragment>
  )
}

export default LicenseCompleteListPage;
