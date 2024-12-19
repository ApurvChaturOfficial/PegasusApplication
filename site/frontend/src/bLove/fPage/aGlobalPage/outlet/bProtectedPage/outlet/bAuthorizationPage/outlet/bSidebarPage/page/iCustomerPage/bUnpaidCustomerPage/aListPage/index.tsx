import { RootState } from "@/aConnection/dReduxConnection";
import organizationAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/dOrganizationAPIEndpoints";
import enrolledServiceAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/iEnrolledServiceAPIEndpoints";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import TopNavBarTwoComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarTwoComponent";
import SidebarNavigation from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/outlet/bSidebarComponent/component/SidebarNavigation/SidebarNavigation";
import fullRoute from "@/bLove/gRoute/bFullRoute";
import Filter from "@/bLove/hAsset/icon/filter.png";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SubmitButtonNew } from "../../aPaidCustomerPage/aListPage/style";
import apiResponseHandler from "./extras/aAPIResponseHandler";
import { ButtonLink3, Form, Heading, Image, Input2, LeftContainer, MainContainer, Para, RightContainer, SearchButton, ServiceSubContainer, Table, TableBody, TableHeading } from "./style";


const UnpaidCustomerListPage = () => {
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
    organizationListAPIResponse: organizationAPIEndpoint.useOrganizationListAPIQuery(null),
    
    // Requirements... Muaaah...
    organizationUpdateAPITrigger: organizationAPIEndpoint.useOrganizationUpdateAPIMutation()[0],
    organizationUpdateAPIResponse: organizationAPIEndpoint.useOrganizationUpdateAPIMutation()[1],    
    
    enrolledServiceUpdateAPITrigger: enrolledServiceAPIEndpoint.useEnrolledServiceUpdateAPIMutation()[0],
    enrolledServiceUpdateAPIResponse: enrolledServiceAPIEndpoint.useEnrolledServiceUpdateAPIMutation()[1],    
  }

  // Event Handlers
  // Handle Confirm Payment
  const handleConfirmPayment = (organizationRetrieve: any) => {
    // console.log(organizationRetrieve)

    apiResponseHandler.updateAPIResponseHandler({}, APICall.organizationUpdateAPITrigger, APICall.enrolledServiceUpdateAPITrigger, organizationRetrieve)
  }
  
  // Extra Render
  useEffect(() => {
    console.log(ReduxCall.state)
  }, [ReduxCall.state])
  
  // JSX
  return (
    <React.Fragment>
      {/* UnpaidCustomerListPage */}

      <>
        <TopNavBarTwoComponent />
        <MainContainer>
          <LeftContainer>
            <SidebarNavigation />
          </LeftContainer>
          <RightContainer>
            <ServiceSubContainer>
            <>
              <Heading>Unpaid Customers</Heading>
              <Form>
                <Input2
                  type="text"
                  placeholder="Search Your Customers"
                  name="search"
                  // value={searchInput}
                  // onChange={handleSearchInputChange}
                />
                <SearchButton type="button" onClick={() => "handleSearch"}>
                  <Image src={Filter} alt="Filter" />
                  <Para>Filter</Para>
                </SearchButton>
              </Form>
              <Table>
                <thead>
                  <tr>
                    <TableHeading>Organization</TableHeading>
                    <TableHeading>Type of Firm</TableHeading>
                    <TableHeading>Contact Person</TableHeading>
                    <TableHeading>Contact</TableHeading>
                    <TableHeading>Email</TableHeading>
                    <TableHeading>Payment Pending</TableHeading>
                    <TableHeading>Action</TableHeading>
                  </tr>
                </thead>
                <tbody>

                  {APICall.organizationListAPIResponse.isLoading ? null : 
                    APICall.organizationListAPIResponse.isError ? null :
                      APICall.organizationListAPIResponse.isSuccess ? (
                        APICall.organizationListAPIResponse.data.success ? (
                          APICall.organizationListAPIResponse.data.list.length > 0 ? (
                            <React.Fragment>
                              {
                                APICall.organizationListAPIResponse.data.list
                                  ?.filter((each: any) => !each.dEnrolledServicePaymentStatus)
                                  ?.map((each: any, index: any) => (
                                  <tr key={index}>
                                    <TableBody>{each.aTitle}</TableBody>
                                    <TableBody>{each.dType}</TableBody>
                                    <TableBody>{each.bCreatedBy?.eFirstname}</TableBody>
                                    <TableBody>{each.dPhoneNumber}</TableBody>
                                    <TableBody>{each.dCompanyEmail}</TableBody>
                                    <TableBody>
                                      {each.cEnrolledService?.filter((each1: any) => !each1.dPaymentStatus)?.length}
                                      {each.cEnrolledService?.filter((each1: any) => !each1.dPaymentStatus)?.length > 0 && (
                                        <SubmitButtonNew onClick={() => handleConfirmPayment(each)} >
                                          Confirm Payment
                                        </SubmitButtonNew>
                                      )}
                                    </TableBody>
                                    <TableBody>
                                      <ButtonLink3
                                        onClick={() => navigate(`${fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.iCustomerRoute.bUnpaidCustomerRoute.bUnpaidCustomerRetrieveRoute}/${each._id}`)}
                                      >View
                                      </ButtonLink3>
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
            </>
            </ServiceSubContainer>
          </RightContainer>
        </MainContainer>
      </>

    </React.Fragment>
  )
}

export default UnpaidCustomerListPage;
