import React from 'react'
import LoaderComponent from '@/bLove/cComponent/aGlobalComponent/component/aLoaderComponent';
import ErrorComponent from '@/bLove/cComponent/aGlobalComponent/component/bErrorComponent';

import { ButtonLink2, ButtonLink3, Form, Image, Image2, Image3, Input, TypicalTable, Para, SearchButton, TableBody, TableHeading, TableSection, Icon, ButtonLinkone } from '../../style';
import UploadIcon from "@/bLove/hAsset/icon/upload-cloud.png";
import DownloadIcon from "@/bLove/hAsset/icon/download.png";
import ViewIcon from "@/bLove/hAsset/icon/viewButton.png";
import Filter from "@/bLove/hAsset/icon/filter.png";
import PlusSign from "@/bLove/hAsset/icon/plus-circle.png";
import getAlertSymbolLetter2 from '@/bLove/dUtility/fGetAlertSymbolLetter2';
import fullRoute from '@/bLove/gRoute/bFullRoute';
import EditIcon from "@/bLove/hAsset/icon/pencil.png";


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
                      placeholder="Search Your License"
                      name="search"
                      // value={searchInput}
                      // onChange={handleSearchInputChange}
                    />
                    <SearchButton type="submit">
                      <Image src={Filter} alt="Filter" />
                      <Para>Filter</Para>
                    </SearchButton>

                    <ButtonLink2 onClick={() => activateLicenseCreate()}>
                      <Image src={PlusSign} alt="PlusSign" />
                      <Para>Add</Para>
                    </ButtonLink2>
                  </Form>
                  <TypicalTable>
                    <TableSection>
                      <TableHeading style={{  width: "150px" }}>License</TableHeading>
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
                              // filter((each: any) => each.bCreatedBy?._id === (ReduxCall.state.receivedObject as any)?.ProfileRetrieve?._id).
                              filter((each: any) => each.cOrganization?._id === organizationID).
                              map((each: any, index: any) => (
                                <TableSection key={index}>
                                  <TableBody style={{  width: "150px" }} >{each.dSelectedLicense}</TableBody>
                                  <TableBody>{each.dLicenseNumber}</TableBody>
                                  <TableBody>
                                    {each.dIssueDate}
                                  </TableBody>
                                  <TableBody>
                                    {each.dExpiryDate}
                                  </TableBody>
                                  <TableBody>
                                    {getAlertSymbolLetter2(each.dExpiryDate)}
                                  </TableBody>
                                  <TableBody>
                                    <ButtonLink3>
                                      <Image2 src={DownloadIcon} alt="Download" />
                                    </ButtonLink3>
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
