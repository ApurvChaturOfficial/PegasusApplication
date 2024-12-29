import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import fullRoute from "@/bLove/gRoute/bFullRoute";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import inspectionAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/hInspectionAPIEndpoints";

import LoaderComponent from "@/bLove/cComponent/aGlobalComponent/component/aLoaderComponent";
import ErrorComponent from "@/bLove/cComponent/aGlobalComponent/component/bErrorComponent";
import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import DownloadIcon from "@/bLove/hAsset/icon/download.png";
import EditIcon from "@/bLove/hAsset/icon/pencil.png";
import PlusSign from "@/bLove/hAsset/icon/plus-circle.png";
import { RefreshCwIcon } from "lucide-react";
import { ButtonLink } from "../../aOrganizationPage/aListPage/style";
import apiResponseHandler from "./extras/aAPIResponseHandler";
import { ButtonLinkone, Form, Icon, Image, Input, MainContainer, PageHeading, Para, SearchButton, Table, TableBody, TableHeading, TableSection } from "./style";
import downloadFileUtility from "@/bLove/dUtility/gDownloadFileUtility";


const InspectionListPage = () => {
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
    listAPIResponse: inspectionAPIEndpoint.useInspectionListAPIQuery(null),
  }

  // All Render
  // Success Render
  useEffect(() => {
    apiResponseHandler.listAPIResponseHandler(APICall.listAPIResponse)
  }, [APICall.listAPIResponse])
  
  // JSX
  return (
    <React.Fragment>
      {/* InspectionListPage */}

      <>
        <TopNavBarComponent />
        <MainContainer>
          <PageHeading>Your Inspection Reports</PageHeading>
          <Form>
            <Input
              type="text"
              placeholder="Search Your Inspection Reports by Report Name"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
            <SearchButton type="button" onClick={() => APICall.listAPIResponse.refetch()} >
              <RefreshCwIcon style={{ width: "20px", height: "20px", marginRight: "10px" }}  />
              <Para>Refresh</Para>
            </SearchButton>
            <ButtonLink to={fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.eInspectionRoute.bCreateRoute}>
              <Image src={PlusSign} alt="PlusSign" />
              <Para>Add</Para>
            </ButtonLink>
          </Form>

          <Table>
            <TableSection>
              <TableHeading>Organization</TableHeading>
              <TableHeading>Report Name</TableHeading>
              <TableHeading>Uploaded On</TableHeading>
              <TableHeading>Download</TableHeading>
              <TableHeading>Edit</TableHeading>
            </TableSection>

            {(APICall.listAPIResponse.isLoading || APICall.listAPIResponse.isFetching) ? null : 
              APICall.listAPIResponse.isError ? null :
                APICall.listAPIResponse.isSuccess ? (
                  APICall.listAPIResponse.data.success ? (
                    APICall.listAPIResponse.data.list.length > 0 ? (
                      <React.Fragment>
                        {
                          APICall.listAPIResponse.data.list?.
                            filter((each: any) => each.cOrganization?.bCreatedBy === (ReduxCall.state.receivedObject as any)?.ProfileRetrieve?._id).
                            filter((each: any) => each.dReportName?.toLowerCase().includes(searchInput?.toLowerCase())).
                            map((each: any, index: any) => (
                            <TableSection key={index}>
                              <TableBody>{each.cOrganization.aTitle}</TableBody>
                              <TableBody>{each.dReportName}</TableBody>
                              <TableBody>{each.dUploadDate}</TableBody>              
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
                              <TableBody>
                                <ButtonLinkone to={`${fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.eInspectionRoute.dUpdateRoute}/${each._id}`}>
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

          {(APICall.listAPIResponse.isLoading || APICall.listAPIResponse.isFetching) ? <LoaderComponent /> :
            APICall.listAPIResponse.isError ? <ErrorComponent message="Error..." /> :
            (APICall.listAPIResponse.data?.list?.
              filter((each: any) => each.cOrganization?.bCreatedBy === (ReduxCall.state.receivedObject as any)?.ProfileRetrieve?._id).
              filter((each: any) => each.dReportName?.toLowerCase().includes(searchInput?.toLowerCase())).
              length === 0) ? <ErrorComponent message="No items here..." /> : null
          }

        </MainContainer>
      </>

    </React.Fragment>
  )
}

export default InspectionListPage;
