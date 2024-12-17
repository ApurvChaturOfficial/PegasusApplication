import React, { useEffect } from "react"
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import fullRoute from "@/bLove/gRoute/bFullRoute";

import licenseAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/eLicenseAPIEndpoints";
import apiResponseHandler from "./extras/aAPIResponseHandler";
import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";

import { ButtonLink, ButtonLink3, ButtonLinkone, Form, Icon, Image, Image3, Input, MainContainer, PageHeading, Para, SearchButton, Table, TableBody, TableHeading, TableSection } from "./style";
import Filter from "@/bLove/hAsset/icon/filter.png";
import PlusSign from "@/bLove/hAsset/icon/plus-circle.png";
import DownloadIcon from "@/bLove/hAsset/icon/download.png";
import EditIcon from "@/bLove/hAsset/icon/pencil.png";
import UploadIcon from "@/bLove/hAsset/icon/upload-cloud.png";
import ViewIcon from "@/bLove/hAsset/icon/viewButton.png";
import { useNavigate } from "react-router-dom";
import getAlertSymbolLetter2 from "@/bLove/dUtility/fGetAlertSymbolLetter2";


const LicenseListPage = () => {
  // Variable
  const navigate = useNavigate()

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
                {/* <TableHeading>View</TableHeading> */}
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
                                <TableBody>{each.dSelectedLicense}</TableBody>
                                <TableBody>{each.dLicenseNumber}</TableBody>
                                <TableBody>{each.dIssueDate}</TableBody>
                                <TableBody>{each.dExpiryDate}</TableBody>
                                <TableBody>
                                    {getAlertSymbolLetter2(each.dExpiryDate)}
                                  </TableBody>
                                <TableBody><Icon src={DownloadIcon} alt="Download" /></TableBody>
                                {/* <TableBody>
                                  <ButtonLink3 onClick={() => navigate(`${fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.bLicenseRoute.dUpdateRoute}/${each._id}`)}>
                                    <Image3 src={ViewIcon} alt="View" />
                                  </ButtonLink3>
                                </TableBody> */}
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
