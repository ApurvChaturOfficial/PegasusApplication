import React from "react"
import TopNavBarComponent from "../../../../../component/aTopNavBarComponent"
import { ButtonLink, Container, Form, Image, Input, MainContainer, PageHeading, Para, SearchButton } from "./style"
import Filter from "@/bLove/hAsset/icon/filter.png";
import PlusSign from "@/bLove/hAsset/icon/plus-circle.png";
import organizationAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/dOrganizationAPIEndpoints";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import CompanyCard from "./component/CompanyCardComponent";

// import TypicalListComponent from "../../../../component/aTypicalListComponent"


// type OrganizationListComponentType = {
//   ReduxCall?: any
//   APICall?: {
//     listAPIResponse: any
//   }
//   extras?: {
//     apiResponseHandler: {
//       listAPIResponseHandler: any
//     },
//     data: any,
//     listSchema: any,
//     listColumn: any,
//   }
// }

const OrganizationListComponent = () => {
  // Destructure Props
  // const { ReduxCall, APICall, extras } = props;

  // All Render
  // Next Render
  // useEffect(() => {
  //   extras.apiResponseHandler.listAPIResponseHandler(APICall.listAPIResponse)
  // }, [APICall.listAPIResponse])

  // Redux Call
  const ReduxCall = {
    state: useSelector((fullState: RootState) => fullState.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }

  // API Call
  const APICall = {
    listAPIResponse: organizationAPIEndpoint.useOrganizationListAPIQuery(null),
  }

  
  // JSX
  return (
    <React.Fragment>
      {/* OrganizationListComponent */}

      <TopNavBarComponent />
      <MainContainer>
        <br />
        <PageHeading>Your Organization</PageHeading>
        <br />
        <Form>
          <Input
            type="text"
            placeholder="Search Your Organizations"
            name="search"
            // value={searchInput}
            // onChange={handleSearchInputChange}
          />
          <SearchButton type="submit">
            <Image src={Filter} alt="Filter" />
            <Para>Filter</Para>
          </SearchButton>
          <ButtonLink to="/organizations/addcompany">
            <Image src={PlusSign} alt="PlusSign" />
            <Para>Add</Para>
          </ButtonLink>
        </Form>

        <Container>
          {/* {filteredCompanyData.length > 0 ? (
            filteredCompanyData.map((company, index) => (
              <CompanyCard 
                key={index}
                companyName={company.company_name}
                firmType={company.firm_type}
                contactInfo={{
                  id: company.company_id,
                  phone: company.company_phone_number,
                  email: company.company_email_id,
                }}
                address={company.company_address}
              />
            ))
          ) : (
            <p>No companies found.</p> // Display a message if no companies are found
          )} */}

          {APICall.listAPIResponse.isLoading ? null : 
            APICall.listAPIResponse.isError ? null :
              APICall.listAPIResponse.isSuccess ? (
                APICall.listAPIResponse.data.success ? (
                  APICall.listAPIResponse.data.list.length > 0 ? (
                    <React.Fragment>
                      {
                        APICall.listAPIResponse.data.list?.filter((each: any) => each.bCreatedBy?._id === (ReduxCall.state.receivedObject as any)?.ProfileRetrieve?._id).map((each: any, index: any) => (
                          <CompanyCard 
                            key={index}
                            companyName={each.dName}
                            firmType={each.dType}
                            contactInfo={{
                              id: each._id,
                              phone: each.dPhoneNumber,
                              email: each.dCompanyEmail,
                            }}
                            address={each.dAddress}
                          />
                        ))
                      }
                    </React.Fragment>
                  ) : []
                ) : []
              ) : []
          }
        </Container>
      </MainContainer>


      {/* <TypicalListComponent
        ReduxCall={ReduxCall}
        APICall={{
          listAPIResponse: APICall.listAPIResponse
        }}
        extras={{
          apiResponseHandler: {
            listAPIResponseHandler: extras.apiResponseHandler.listAPIResponseHandler
          },
          data: extras.data,
          listSchema: extras.listSchema,
          listColumn: extras.listColumn,
        }}      
      /> */}
    </React.Fragment>
  )
}

export default OrganizationListComponent;
