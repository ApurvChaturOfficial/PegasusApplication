import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import fullRoute from "@/bLove/gRoute/bFullRoute";

import documentAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/gDocumentAPIEndpoints";

// import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import SidebarNavigation from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/outlet/bSidebarComponent/component/SidebarNavigation/SidebarNavigation";
import { Form, Heading, Input2, LeftContainer, MainContainer, Para, RightContainer, SearchButton, ServiceSubContainer, Table, TableBody, TableHeading } from "./style";
// import PlusSign from "@/bLove/hAsset/icon/plus-circle.png";
import LoaderComponent from "@/bLove/cComponent/aGlobalComponent/component/aLoaderComponent";
import ErrorComponent from "@/bLove/cComponent/aGlobalComponent/component/bErrorComponent";
import TopNavBarTwoComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarTwoComponent";
import downloadFileUtility from "@/bLove/dUtility/gDownloadFileUtility";
import DownloadIcon from "@/bLove/hAsset/icon/download.png";
import { RefreshCwIcon } from "lucide-react";
import { Icon } from "../aListPage/style";
import apiResponseHandler from "./extras/aAPIResponseHandler";


const DocumentCompleteListPage = () => {
  // State Variable
  const [searchInput, setSearchInput] = useState("")

  // API Call
  const APICall = {
    listAPIResponse: documentAPIEndpoint.useDocumentListAPIQuery(null),
  }

  // All Render
  // Success Render
  useEffect(() => {
    apiResponseHandler.listAPIResponseHandler(APICall.listAPIResponse)
  }, [APICall.listAPIResponse])
  
  // JSX
  return (
    <React.Fragment>
      {/* DocumentCompleteListPage */}

      <>
        <TopNavBarTwoComponent />
        <MainContainer>
          <LeftContainer>
            <SidebarNavigation />
          </LeftContainer>
          <RightContainer>
            <ServiceSubContainer>
            <>
              <Heading>All Documents</Heading>
              <Form>
                <Input2
                  type="text"
                  placeholder="Search Documents by Document Name"
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
                    <TableHeading>Document Name</TableHeading>
                    <TableHeading>Uploaded On</TableHeading>
                    <TableHeading>Comment</TableHeading>
                    <TableHeading>Download</TableHeading>
                  </tr>
                </thead>
                <tbody>
                  {(APICall.listAPIResponse.isLoading || APICall.listAPIResponse.isFetching) ? null : 
                    APICall.listAPIResponse.isError ? null :
                      APICall.listAPIResponse.isSuccess ? (
                        APICall.listAPIResponse.data.success ? (
                          APICall.listAPIResponse.data.list.length > 0 ? (
                            <React.Fragment>
                              {
                                APICall.listAPIResponse.data.list?.
                                  filter((each: any) => each.dDocumentName?.toLowerCase().includes(searchInput?.toLowerCase())).
                                  map((each: any, index: any) => (
                                  <tr key={index}>
                                    <TableBody>{each.cOrganization?.aTitle}</TableBody>
                                    <TableBody>{each.dDocumentName}</TableBody>
                                    <TableBody>{each.dUploadDate}</TableBody>
                                    <TableBody>{each.dComment}</TableBody>
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

              {(APICall.listAPIResponse.isLoading || APICall.listAPIResponse.isFetching) ? <LoaderComponent /> :
                APICall.listAPIResponse.isError ? <ErrorComponent message="Error..." /> :
                (APICall.listAPIResponse.data?.list?.
                  filter((each: any) => each.dDocumentName?.toLowerCase().includes(searchInput?.toLowerCase())).
                  length === 0) ? <ErrorComponent message="No items here..." /> : null
              }

            </>
            </ServiceSubContainer>
          </RightContainer>
        </MainContainer>
      </>

    </React.Fragment>
  )
}

export default DocumentCompleteListPage;
