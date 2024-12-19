import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import fullRoute from "@/bLove/gRoute/bFullRoute";
import { useDispatch, useSelector } from "react-redux";

import licenseAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/eLicenseAPIEndpoints";
import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import apiResponseHandler from "./extras/aAPIResponseHandler";

import getAlertSymbolLetter2 from "@/bLove/dUtility/fGetAlertSymbolLetter2";
import downloadFileUtility from "@/bLove/dUtility/gDownloadFileUtility";
import DownloadIcon from "@/bLove/hAsset/icon/download.png";
import Filter from "@/bLove/hAsset/icon/filter.png";
import EditIcon from "@/bLove/hAsset/icon/pencil.png";
import PlusSign from "@/bLove/hAsset/icon/plus-circle.png";
import { ButtonLink, ButtonLinkone, Form, Icon, Image, Input, MainContainer, PageHeading, Para, SearchButton, Table, TableBody, TableHeading, TableSection } from "./style";


const LicenseListPage = () => {
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

  // All Render
  // Success Render
  useEffect(() => {
    apiResponseHandler.listAPIResponseHandler(APICall.listAPIResponse)
  }, [APICall.listAPIResponse])
  
  // JSX
  return (
    <React.Fragment>
      {/* LicenseListPage */}

      <>
        <TopNavBarComponent />
          <MainContainer>
            <PageHeading>Your Licenses</PageHeading>
            <Form>
              <Input
                type="text"
                placeholder="Search Your Licenses"
                // value={searchInput}
                // onChange={handleSearchInputChange}
              />
              <SearchButton type="submit">
                <Icon src={Filter} alt="Filter" />
                <span>Filter</span>
              </SearchButton>
              <ButtonLink to={fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.bLicenseRoute.bCreateRoute}>
                <Image src={PlusSign} alt="PlusSign" />
                <Para>Add</Para>
              </ButtonLink>
            </Form>
            <Table>
              <TableSection>
                <TableHeading>Organization</TableHeading>
                <TableHeading>License</TableHeading>
                <TableHeading>License Number</TableHeading>
                <TableHeading>Date of Issue</TableHeading>
                <TableHeading>Date of Expiry</TableHeading>
                <TableHeading>Alert</TableHeading>
                <TableHeading>Download</TableHeading>
                <TableHeading>Edit</TableHeading>
              </TableSection>
              {APICall.listAPIResponse.isLoading ? null : 
                APICall.listAPIResponse.isError ? null :
                  APICall.listAPIResponse.isSuccess ? (
                    APICall.listAPIResponse.data.success ? (
                      APICall.listAPIResponse.data.list.length > 0 ? (
                        <React.Fragment>
                            {APICall.listAPIResponse.data.list?.filter((each: any) => each.cOrganization?.bCreatedBy === (ReduxCall.state.receivedObject as any)?.ProfileRetrieve?._id).map((each: any, index: any) => (
                              <TableSection key={index}>
                                <TableBody>{each.cOrganization?.aTitle}</TableBody>
                                <TableBody>{each.dSelectedLicense || each.cEnrolledService?.cService?.aTitle}</TableBody>
                                <TableBody>{each.dLicenseNumber}</TableBody>
                                <TableBody>{each.dIssueDate}</TableBody>
                                <TableBody>{each.dExpiryDate}</TableBody>
                                <TableBody>
                                    {getAlertSymbolLetter2(each.dExpiryDate)}
                                  </TableBody>
                                <TableBody>
                                  <div>
                                    {each.dFileUploaded ? (
                                      <a href={each.dFileUploaded} download onClick={event => downloadFileUtility(event, each.dFileUploaded)}>
                                        <Icon src={DownloadIcon} alt="Download" />
                                      </a>
                                    ) : (
                                      <span>No file available</span>
                                    )}
                                  </div>                                
                                </TableBody>
                                <TableBody>
                                  <ButtonLinkone to={`${fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.bLicenseRoute.dUpdateRoute}/${each._id}`}>
                                    <Icon src={EditIcon} alt="Edit" />
                                  </ButtonLinkone>
                                </TableBody>
                              </TableSection>
                            ))
                          }
                        </React.Fragment>
                      ) : []
                    ) : []
                  ) : []
              }
            </Table>
        </MainContainer>
      </>

    </React.Fragment>
  )
}

export default LicenseListPage;
