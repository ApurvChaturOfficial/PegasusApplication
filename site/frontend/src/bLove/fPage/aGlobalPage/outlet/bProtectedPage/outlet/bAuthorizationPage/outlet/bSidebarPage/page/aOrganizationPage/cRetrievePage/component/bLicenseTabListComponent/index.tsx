import LoaderComponent from '@/bLove/cComponent/aGlobalComponent/component/aLoaderComponent';
import ErrorComponent from '@/bLove/cComponent/aGlobalComponent/component/bErrorComponent';
import React, { useState } from 'react';

import getAlertSymbolLetter2 from '@/bLove/dUtility/fGetAlertSymbolLetter2';
import downloadFileUtility from '@/bLove/dUtility/gDownloadFileUtility';
import DownloadIcon from "@/bLove/hAsset/icon/download.png";
import EditIcon from "@/bLove/hAsset/icon/pencil.png";
import PlusSign from "@/bLove/hAsset/icon/plus-circle.png";
import { RefreshCwIcon } from 'lucide-react';
import { ButtonLink2, ButtonLink3, Form, Icon, Image, Input, Para, SearchButton, TableBody, TableHeading, TableSection, TypicalTable } from '../../style';


const LicenseTabListComponent = (props: any) => {
  // Destructure Props
  const { 
    setLicenseTabList,
    setLicenseTabCreate,
    setLicenseTabUpdate,
    APICall,
    ReduxCall,
    organizationID
  } = props

  // State Variable
  const [searchInput, setSearchInput] = useState("")

  // Event Handlers
  const activateLicenseCreate = () => {
    setLicenseTabList(false)
    setLicenseTabCreate(true)
    setLicenseTabUpdate(false)
  }

  const activateLicenseUpdate = (licenseID: string) => {
    setLicenseTabList(false)
    setLicenseTabCreate(false)
    setLicenseTabUpdate(true)

    APICall.licenseRetrieveAPITrigger({ params: { _id: licenseID } })
  }
  
  // JSX
  return (
    <React.Fragment>
      {/* LicenseTabListComponent */}
      {
        APICall.licenseListAPIResponse.isLoading ? <LoaderComponent /> : 
        APICall.licenseListAPIResponse.isError ? <ErrorComponent message="Error..." /> :
        APICall.licenseListAPIResponse.isSuccess ? (
          <React.Fragment>
            {
              APICall.licenseListAPIResponse.data.success ? (
                <React.Fragment>
                  <Form>
                    <Input
                      type="text"
                      placeholder="Search Your License by License Name"
                      value={searchInput}
                      onChange={(event) => setSearchInput(event.target.value)}
                    />
                    <SearchButton type="button" onClick={() => APICall.licenseListAPITrigger()} >
                      <RefreshCwIcon style={{ width: "20px", height: "20px", marginRight: "10px" }}  />
                      <Para>Refresh</Para>
                    </SearchButton>

                    <ButtonLink2 onClick={() => activateLicenseCreate()}>
                      <Image src={PlusSign} alt="PlusSign" />
                      <Para>Add</Para>
                    </ButtonLink2>
                  </Form>
                  <TypicalTable>
                    <TableSection>
                      <TableHeading style={{  width: "200px" }}>License</TableHeading>
                      <TableHeading>License Number</TableHeading>
                      <TableHeading>Date of Issue</TableHeading>
                      <TableHeading>Date of Expiry</TableHeading>
                      <TableHeading>Alerts</TableHeading>
                      <TableHeading>Download</TableHeading>
                      <TableHeading>Edit</TableHeading>
                    </TableSection>
                    {
                      APICall.licenseListAPIResponse.data.list.length > 0 ? (
                        <React.Fragment>
                          {
                            APICall.licenseListAPIResponse.data.list?.
                              filter((each: any) => each.cOrganization?.bCreatedBy === (ReduxCall.state.receivedObject as any)?.ProfileRetrieve?._id).
                              filter((each: any) => each.cOrganization?._id === organizationID).
                              filter((each: any) => each.dSelectedLicense?.toLowerCase().includes(searchInput.toLowerCase()) || each.cEnrolledService?.cService?.aTitle?.toLowerCase().includes(searchInput.toLowerCase())).
                              map((each: any, index: any) => (
                                <TableSection key={index}>
                                  <TableBody style={{  width: "200px" }} >
                                    {each.dSelectedLicense || each.cEnrolledService?.cService?.aTitle} 
                                    {each.cEnrolledService?.cService?.aTitle && <em style={{ marginLeft: "2px", color: "tomato" }} >(Enrolled)</em>}
                                  </TableBody>
                                  <TableBody>
                                    {each.dLicenseNumber}</TableBody>
                                  <TableBody>
                                    {each.dIssueDate}
                                  </TableBody>
                                  <TableBody>
                                    {each.dExpiryDate}
                                  </TableBody>
                                  <TableBody>
                                    <em>{getAlertSymbolLetter2(each.dExpiryDate)}</em>
                                  </TableBody>
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
                                    <ButtonLink3 onClick={() => activateLicenseUpdate(each._id)}>
                                      <Icon src={EditIcon} alt="Edit" />
                                    </ButtonLink3>
                                  </TableBody>
                                </TableSection>
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

export default LicenseTabListComponent;
