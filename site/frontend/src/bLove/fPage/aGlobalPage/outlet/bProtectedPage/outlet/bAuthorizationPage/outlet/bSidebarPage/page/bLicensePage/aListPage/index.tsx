import React, { useEffect } from "react"
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import fullRoute from "@/bLove/gRoute/bFullRoute";

import licenseAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/eLicenseAPIEndpoints";
import apiResponseHandler from "./extras/aAPIResponseHandler";
import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";

import { ButtonLink, ButtonLinkone, Form, Icon, Image, Input, MainContainer, PageHeading, Para, SearchButton, Table, TableBody, TableHeading, TableSection } from "./style";
import Filter from "@/bLove/hAsset/icon/filter.png";
import PlusSign from "@/bLove/hAsset/icon/plus-circle.png";
import DownloadIcon from "@/bLove/hAsset/icon/download.png";
import EditIcon from "@/bLove/hAsset/icon/pencil.png";
import UploadIcon from "@/bLove/hAsset/icon/upload-cloud.png";


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

      {/* <Link to={fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.bLicenseRoute.bCreateRoute} >Create</Link>

      {APICall.listAPIResponse.isLoading ? null : 
        APICall.listAPIResponse.isError ? null :
          APICall.listAPIResponse.isSuccess ? (
            APICall.listAPIResponse.data.success ? (
              APICall.listAPIResponse.data.list.length > 0 ? (
                <React.Fragment>
                  {
                    APICall.listAPIResponse.data.list?.filter((each: any) => each.bCreatedBy?._id === (ReduxCall.state.receivedObject as any)?.ProfileRetrieve?._id).map((each: any, index: any) => (
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
      }

      <div>
        ---------------------------------------------------------------------------------------
      </div> */}

      <>
        <TopNavBarComponent />
        {APICall.listAPIResponse.isLoading ? null : 
          APICall.listAPIResponse.isError ? null :
            APICall.listAPIResponse.isSuccess ? (
              APICall.listAPIResponse.data.success ? (
                APICall.listAPIResponse.data.list.length > 0 ? (
                  <React.Fragment>
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
                            <TableHeading>Category</TableHeading>
                            <TableHeading>Own/Loan</TableHeading>
                            <TableHeading>License Number</TableHeading>
                            <TableHeading>Date of Issue</TableHeading>
                            <TableHeading>Date of Expiry</TableHeading>
                            <TableHeading>Upload</TableHeading>
                            <TableHeading>Download</TableHeading>
                            <TableHeading>Edit</TableHeading>
                          </TableSection>
                        
                          {/* {filteredLicenseData.map((license: any) => ( */}
                          {
                            APICall.listAPIResponse.data.list?.filter((each: any) => each.bCreatedBy?._id === (ReduxCall.state.receivedObject as any)?.ProfileRetrieve?._id).map((each: any, index: any) => (
                              <TableSection key={index}>
                                <TableBody>{each.cOrganization.aTitle}</TableBody>
                                <TableBody>{each.dSelectedLicense}</TableBody>
                                <TableBody>{each.type}</TableBody>
                                <TableBody>{each.owner}</TableBody>
                                <TableBody>{each.dLicenseNumber}</TableBody>
                                <TableBody>{each.dIssueDate}</TableBody>
                                <TableBody>{each.dExpiryDate}</TableBody>
                                <TableBody><Icon src={UploadIcon} alt="Upload" /></TableBody>
                                <TableBody><Icon src={DownloadIcon} alt="Download" /></TableBody>
                                <TableBody><ButtonLinkone to={`${fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.bLicenseRoute.dUpdateRoute}/${each._id}`}><Icon src={EditIcon} alt="Edit" /></ButtonLinkone></TableBody>
                              </TableSection>
                            ))
                          }
                      </Table>
                    </MainContainer>
                  </React.Fragment>
                ) : []
              ) : []
            ) : []
        }
      </>

    </React.Fragment>
  )
}

export default LicenseListPage;
