import LoaderComponent from '@/bLove/cComponent/aGlobalComponent/component/aLoaderComponent';
import ErrorComponent from '@/bLove/cComponent/aGlobalComponent/component/bErrorComponent';
import React, { useState } from 'react';

import { RefreshCwIcon } from 'lucide-react';
import { TableSection2 } from '../../../../../aOrganizationPage/cRetrievePage/style';
import { ViewButton } from '../../../../../cServicePage/aListPage/style';
import { Form, Input, Para, SearchButton, TableBody, TableHeading, TableSection, TypicalTable } from '../../style';


const ServiceTabListComponent = (props: any) => {
  // Destructure Props
  const { 
    // setServiceTabList,
    // setServiceTabCreate,
    // setServiceTabUpdate,
    APICall,
    // ReduxCall,
    organizationID
  } = props

  // State Variable
  const [visibleAddresses, setVisibleAddresses] = useState(new Set());
  const [searchInput, setSearchInput] = useState("")

  // Event Handlers
  // const activateServiceCreate = () => {
  //   setServiceTabList(false)
  //   setServiceTabCreate(true)
  //   setServiceTabUpdate(false)
  // }

  const activateServiceRetrieve = (serviceID: string) => {
    setVisibleAddresses((prev: any) => {
      const newVisibility = new Set(prev);
      if (newVisibility.has(serviceID)) {
        newVisibility.delete(serviceID);
      } else {
        newVisibility.add(serviceID);
      }
      return newVisibility;
    });
  }
  
  // JSX
  return (
    <React.Fragment>
      {/* ServiceTabListComponent */}
      {
        APICall.enrolledServiceListAPIResponse.isLoading ? <LoaderComponent /> : 
        APICall.enrolledServiceListAPIResponse.isError ? <ErrorComponent message="Error..." /> :
        APICall.enrolledServiceListAPIResponse.isSuccess ? (
          <React.Fragment>
            {
              APICall.enrolledServiceListAPIResponse.data.success ? (
                <React.Fragment>
                  <Form>
                    <Input
                      type="text"
                      placeholder="Search Enrolled Services"
                      value={searchInput}
                      onChange={(event) => setSearchInput(event.target.value)}
                    />
                    <SearchButton type="button" onClick={() => APICall.enrolledServiceListAPITrigger()} >
                      <RefreshCwIcon style={{ width: "20px", height: "20px", marginRight: "10px" }}  />
                      <Para>Refresh</Para>
                    </SearchButton>

                    {/* <ButtonLink2 onClick={() => activateServiceCreate()}>
                      <Image src={PlusSign} alt="PlusSign" />
                      <Para>Add</Para>
                    </ButtonLink2> */}
                  </Form>
                  <TypicalTable>
                    <TableSection>
                      <TableHeading>Action Taken</TableHeading>
                      <TableHeading style={{  width: "200px" }}>Name of Firm</TableHeading>
                      <TableHeading>Category</TableHeading>
                      <TableHeading>Own/Loan</TableHeading>
                      <TableHeading>Form License</TableHeading>
                      <TableHeading>Govt. Fee (Rs)</TableHeading>
                      <TableHeading>Our Fee (Rs)</TableHeading>
                      <TableHeading>Date Added</TableHeading>
                      <TableHeading>Validity</TableHeading>
                      <TableHeading>Actions</TableHeading>
                    </TableSection>
                    {
                      APICall.enrolledServiceListAPIResponse.data.list.length > 0 ? (
                        <React.Fragment>
                          {
                            APICall.enrolledServiceListAPIResponse.data.list?.
                              // filter((each: any) => each.bCreatedBy?._id === (ReduxCall.state.receivedObject as any)?.ProfileRetrieve?._id).
                              filter((each: any) => each.cOrganization?._id === organizationID).
                              filter((each: any) => each.cOrganization?.aTitle?.toLowerCase().includes(searchInput?.toLowerCase())).
                              map((each: any, index: any) => (
                                <TableSection2 key={index}>
                                  <TableBody>{each.dActionStatus ? "Yes" : "No"}</TableBody>
                                  <TableBody>
                                    <div style={{ display: 'flex', flexDirection: 'column', width: "200px" }}>
                                      {each.cOrganization?.aTitle}
                                      {visibleAddresses.has(each._id) && (
                                        <div style={{ marginTop: '4px', fontSize: '0.9rem', color: '#666' }}>
                                          {each.cOrganization?.dAddress}
                                        </div>
                                      )}
                                    </div>
                                  </TableBody>
                                  <TableBody>{each.cService.dCategory}</TableBody>
                                  <TableBody>{each.cService.dOwnLoan}</TableBody>
                                  <TableBody>{each.cService.dFormType}</TableBody>
                                  <TableBody>{each.cService.dGovtFees}</TableBody>
                                  <TableBody>{each.cService.dOurFees}</TableBody>
                                  <TableBody>{each.cService.dAddedDate}</TableBody>
                                  <TableBody>{each.cService.dServiceValidity}</TableBody>
                                  <TableBody>
                                    <ViewButton onClick={() => activateServiceRetrieve(each._id)}>
                                      {visibleAddresses.has(each._id) ? "Hide" : "View"}
                                    </ViewButton>
                                  </TableBody>
                                </TableSection2>
                              ))
                          }
                        </React.Fragment>
                      ) : [] 
                    }
                  </TypicalTable>
                </React.Fragment>
              ) : <ErrorComponent message="Backend Error..." />
            }
          </React.Fragment>
        ) :
        <ErrorComponent message="Let me understandasdsad first..." />
      }

    </React.Fragment>
  )
}

export default ServiceTabListComponent;
