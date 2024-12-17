import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import fullRoute from "@/bLove/gRoute/bFullRoute";

import serviceAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/fServiceAPIEndpoints";

// import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import { ButtonLink2, Form, Heading, Image, Input2, LeftContainer, MainContainer, Para, RightContainer, SearchButton, ServiceSubContainer, Table, TableBody, TableHeading } from "./style";
import SidebarNavigation from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/outlet/bSidebarComponent/component/SidebarNavigation/SidebarNavigation";
import Filter from "@/bLove/hAsset/icon/filter.png";
import PlusSign from "@/bLove/hAsset/icon/plus-circle.png";
import TopNavBarTwoComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarTwoComponent";


const ServiceCompleteListPage = () => {
  // Variable
  const navigate = useNavigate();

  // Redux Call
  const ReduxCall = {
    state: useSelector((fullState: RootState) => fullState.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }

  // API Call
  const APICall = {
    listAPIResponse: serviceAPIEndpoint.useServiceListAPIQuery(null),
  }
  
  // Extra Render
  useEffect(() => {
    console.log(ReduxCall.state)
  }, [ReduxCall.state])
  
  // JSX
  return (
    <React.Fragment>
      {/* ServiceCompleteListPage */}

      <>
        <TopNavBarTwoComponent />
        <MainContainer>
          <LeftContainer>
            <SidebarNavigation />
          </LeftContainer>
          <RightContainer>
            <ServiceSubContainer>
            <>
              <Heading>Service Management</Heading>
              <Form>
                <Input2
                  type="text"
                  placeholder="Search Your Services"
                  name="search"
                  // value={searchInput}
                  // onChange={handleSearchInputChange}
                />
                <SearchButton type="button" onClick={() => "handleSearch"}>
                  <Image src={Filter} alt="Filter" />
                  <Para>Filter</Para>
                </SearchButton>

                <ButtonLink2 onClick={() => navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.cServiceRoute.gCompleteCreateRoute)} >
                  <Image src={PlusSign} alt="PlusSign" />
                  <Para>Add</Para>
                </ButtonLink2>
              </Form>
              <Table>
                <thead>
                  <tr>
                    <TableHeading>Form Number</TableHeading>
                    <TableHeading>Type of Firm</TableHeading>
                    <TableHeading>Category</TableHeading>
                    <TableHeading>Own/Loan</TableHeading>
                    <TableHeading>Govt Fee (₹)</TableHeading>
                    <TableHeading>Our Fee (₹)</TableHeading>
                    <TableHeading>Date Added</TableHeading>
                    <TableHeading>Service Validity</TableHeading>
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
                                    <TableBody>{each.dFormNumber}</TableBody>
                                    <TableBody>{each.dFormType}</TableBody>
                                    <TableBody>{each.dCategory}</TableBody>
                                    <TableBody>{each.dOwnLoan}</TableBody>
                                    <TableBody>{each.dGovtFees}</TableBody>
                                    <TableBody>{each.dOurFees}</TableBody>
                                    <TableBody>{each.dAddedDate}</TableBody>
                                    <TableBody>{each.dServiceValidity}</TableBody>
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

export default ServiceCompleteListPage;
