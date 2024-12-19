import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import fullRoute from "@/bLove/gRoute/bFullRoute";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import inspectionAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/hInspectionAPIEndpoints";

import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import DownloadIcon from "@/bLove/hAsset/icon/download.png";
import Filter from "@/bLove/hAsset/icon/filter.png";
import EditIcon from "@/bLove/hAsset/icon/pencil.png";
import PlusSign from "@/bLove/hAsset/icon/plus-circle.png";
import { ButtonLink } from "../../aOrganizationPage/aListPage/style";
import { ButtonLinkone, Form, Icon, Image, Input, MainContainer, PageHeading, Para, SearchButton, Table, TableBody, TableHeading, TableSection } from "./style";


const InspectionListPage = () => {
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
              placeholder="Search Your Inspection Reports"
              // value={searchInput}
              // onChange={handleSearchInputChange}
            />
            <SearchButton type="submit">
              <Icon src={Filter} alt="Filter" />
              <span>Filter</span>
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

            {APICall.listAPIResponse.isLoading ? null : 
              APICall.listAPIResponse.isError ? null :
                APICall.listAPIResponse.isSuccess ? (
                  APICall.listAPIResponse.data.success ? (
                    APICall.listAPIResponse.data.list.length > 0 ? (
                      <React.Fragment>
                        {
                          APICall.listAPIResponse.data.list?.filter((each: any) => each.cOrganization?.bCreatedBy === (ReduxCall.state.receivedObject as any)?.ProfileRetrieve?._id).map((each: any, index: any) => (
                            <TableSection key={index}>
                              <TableBody>{each.cOrganization.aTitle}</TableBody>
                              <TableBody>{each.dReportName}</TableBody>
                              <TableBody>{each.dUploadDate}</TableBody>              
                              <TableBody>
                                <Icon src={DownloadIcon} alt="Download" />
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
        </MainContainer>
      </>

    </React.Fragment>
  )
}

export default InspectionListPage;
