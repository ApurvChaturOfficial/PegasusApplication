import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import { useDispatch, useSelector } from "react-redux";
// import fullRoute from "@/bLove/gRoute/bFullRoute";

import licenseAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/eLicenseAPIEndpoints";

// import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import SidebarNavigation from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/outlet/bSidebarComponent/component/SidebarNavigation/SidebarNavigation";
import { Form, Heading, Input2, LeftContainer, MainContainer, Para, RightContainer, SearchButton, ServiceSubContainer, Table, TableBody, TableHeading } from "./style";
// import PlusSign from "@/bLove/hAsset/icon/plus-circle.png";
import LoaderComponent from "@/bLove/cComponent/aGlobalComponent/component/aLoaderComponent";
import ErrorComponent from "@/bLove/cComponent/aGlobalComponent/component/bErrorComponent";
import TopNavBarTwoComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarTwoComponent";
import getAlertSymbolLetter2 from "@/bLove/dUtility/fGetAlertSymbolLetter2";
import downloadFileUtility from "@/bLove/dUtility/gDownloadFileUtility";
import DownloadIcon from "@/bLove/hAsset/icon/download.png";
import { RefreshCwIcon } from "lucide-react";
import { Icon } from "../aListPage/style";


const LicenseCompleteListPage = () => {
  // State Variable
  const [searchInput, setSearchInput] = useState("")

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
                  placeholder="Search Licenses by License Name"
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                />
                <SearchButton type="button" onClick={() => APICall.listAPIResponse.refetch()} >
                  <RefreshCwIcon style={{ width: "20px", height: "20px", marginRight: "10px" }}  />
                  <Para>Refresh</Para>
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
                    <TableHeading>Alert</TableHeading>
                    <TableHeading>Download</TableHeading>
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
                                APICall.listAPIResponse.data.list?.
                                  filter((each: any) => each.dSelectedLicense?.toLowerCase().includes(searchInput.toLowerCase()) || each.cEnrolledService?.cService?.aTitle?.toLowerCase().includes(searchInput.toLowerCase())).
                                  map((each: any, index: any) => (
                                  <tr key={index}>
                                    <TableBody>{each.cOrganization?.aTitle}</TableBody>
                                    <TableBody>
                                      {each.dSelectedLicense || each.cEnrolledService?.cService?.aTitle} 
                                      {each.cEnrolledService?.cService?.aTitle && <em style={{ marginLeft: "2px", color: "tomato" }} >(Enrolled)</em>}
                                    </TableBody>
                                    <TableBody>{each.dLicenseNumber}</TableBody>
                                    <TableBody>{each.dIssueDate}</TableBody>
                                    <TableBody>{each.dExpiryDate}</TableBody>
                                    <TableBody>
                                      <em>{getAlertSymbolLetter2(each.dExpiryDate)}</em>
                                    </TableBody>
                                    <TableBody>
                                      <div style={{ display: "flex" }} >
                                        {each.dFileUploaded ? (
                                          <a href={each.dFileUploaded} download onClick={event => downloadFileUtility(event, each.dFileUploaded)}>
                                            <Icon src={DownloadIcon} alt="Download" />
                                          </a>
                                        ) : (
                                          <span>No file available</span>
                                        )}
                                      </div>                                
                                    </TableBody>
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

              {APICall.listAPIResponse.isLoading && <LoaderComponent />} 
              {APICall.listAPIResponse.isError && <ErrorComponent message="Error..." />}

            </>
            </ServiceSubContainer>
          </RightContainer>
        </MainContainer>
      </>

    </React.Fragment>
  )
}

export default LicenseCompleteListPage;
