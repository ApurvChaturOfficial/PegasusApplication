import React, { useEffect } from "react"
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import fullRoute from "@/bLove/gRoute/bFullRoute";

import documentAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/gDocumentAPIEndpoints";
import apiResponseHandler from "./extras/aAPIResponseHandler";

import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import { ButtonLinkone, Form, Icon, Image, Input, MainContainer, PageHeading, Para, SearchButton, Table, TableBody, TableHeading, TableSection } from "./style";
import { ButtonLink } from "../../aOrganizationPage/aListPage/style";
import DownloadIcon from "@/bLove/hAsset/icon/download.png";
import EditIcon from "@/bLove/hAsset/icon/pencil.png";
import Filter from "@/bLove/hAsset/icon/filter.png";
import PlusSign from "@/bLove/hAsset/icon/plus-circle.png";


const DocumentListPage = () => {
  // Redux Call
  const ReduxCall = {
    state: useSelector((fullState: RootState) => fullState.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }

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
      {/* DocumentListPage */}

      {/* <Link to={fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.dDocumentRoute.bCreateRoute} >Create</Link> */}

      {/* {APICall.listAPIResponse.isLoading ? null : 
        APICall.listAPIResponse.isError ? null :
          APICall.listAPIResponse.isSuccess ? (
            APICall.listAPIResponse.data.success ? (
              APICall.listAPIResponse.data.list.length > 0 ? (
                <React.Fragment>
                  {
                    APICall.listAPIResponse.data.list?.filter((each: any) => each.bCreatedBy?._id === (ReduxCall.state.receivedObject as any)?.ProfileRetrieve?._id).map((each: any, index: any) => (
                      <div key={index} >
                        {each.aTitle}
                        <Link to={`${fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.dDocumentRoute.dUpdateRoute}/${each._id}`} >Update</Link>
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
        <TopNavBarComponent />
        <MainContainer>
          <PageHeading>Your Documents</PageHeading>
          <Form>
            <Input
              type="text"
              placeholder="Search Your Documents"
              // value={searchInput}
              // onChange={handleSearchInputChange}
            />
            <SearchButton type="submit">
              <Icon src={Filter} alt="Filter" />
              <span>Filter</span>
            </SearchButton>
            <ButtonLink to={fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.dDocumentRoute.bCreateRoute}>
              <Image src={PlusSign} alt="PlusSign" />
              <Para>Add</Para>
            </ButtonLink>
          </Form>

          <Table>
            <TableSection>
              <TableHeading>Organization</TableHeading>
              <TableHeading>Document Name</TableHeading>
              <TableHeading>Uploaded On</TableHeading>
              <TableHeading>Comment</TableHeading>
              <TableHeading>Download</TableHeading>
              <TableHeading>Edit</TableHeading>
            </TableSection>

            {APICall.listAPIResponse.isLoading ? null : 
              APICall.listAPIResponse.isError ? null :
                APICall.listAPIResponse.isSuccess ? (
                  APICall.listAPIResponse.data.success ? (
                    APICall.listAPIResponse.data.list.length > 0 ? (
                      <React.Fragment>
                        {
                          APICall.listAPIResponse.data.list?.filter((each: any) => each.bCreatedBy?._id === (ReduxCall.state.receivedObject as any)?.ProfileRetrieve?._id).map((each: any, index: any) => (
                            <TableSection key={index}>
                              <TableBody>{each.cOrganization.aTitle}</TableBody>
                              <TableBody>{each.dDocumentName}</TableBody>
              
                              <TableBody>{each.dUploadDate}</TableBody>
                              <TableBody>{each.dComment}</TableBody>
              
                              <TableBody>
                                <Icon src={DownloadIcon} alt="Download" />
                              </TableBody>
                              <TableBody>
                                <ButtonLinkone to={`${fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.dDocumentRoute.dUpdateRoute}/${each._id}`}>
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

export default DocumentListPage;
