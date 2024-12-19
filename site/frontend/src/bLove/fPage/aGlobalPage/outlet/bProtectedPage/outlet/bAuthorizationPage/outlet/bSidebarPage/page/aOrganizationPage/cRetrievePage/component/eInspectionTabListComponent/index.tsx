import LoaderComponent from '@/bLove/cComponent/aGlobalComponent/component/aLoaderComponent';
import ErrorComponent from '@/bLove/cComponent/aGlobalComponent/component/bErrorComponent';
import React from 'react';

import DownloadIcon from "@/bLove/hAsset/icon/download.png";
import Filter from "@/bLove/hAsset/icon/filter.png";
import EditIcon from "@/bLove/hAsset/icon/pencil.png";
import PlusSign from "@/bLove/hAsset/icon/plus-circle.png";
import { ButtonLink2, ButtonLink3, Form, Icon, Image, Image2, Input, Para, SearchButton, TableBody, TableHeading, TableSection, TypicalTable } from '../../style';


const InspectionTabListComponent = (props: any) => {
  // Destructure Props
  const { 
    setInspectionTabList,
    setInspectionTabCreate,
    setInspectionTabUpdate,
    APICall,
    ReduxCall,
    organizationID
  } = props

  // Event Handlers
  const activateInspectionCreate = () => {
    setInspectionTabList(false)
    setInspectionTabCreate(true)
    setInspectionTabUpdate(false)
  }

  const activateInspectionUpdate = (inspectionID: string) => {
    setInspectionTabList(false)
    setInspectionTabCreate(false)
    setInspectionTabUpdate(true)

    APICall.inspectionRetrieveAPITrigger({ params: { _id: inspectionID } })
  }
  
  // JSX
  return (
    <React.Fragment>
      {/* InspectionTabListComponent */}
      {
        APICall.inspectionListAPIResponse.isLoading ? <LoaderComponent /> : 
        APICall.inspectionListAPIResponse.isError ? <ErrorComponent message="Error..." /> :
        APICall.inspectionListAPIResponse.isSuccess ? (
          <React.Fragment>
            {
              APICall.inspectionListAPIResponse.data.success ? (
                <React.Fragment>
                  <Form>
                    <Input
                      type="text"
                      placeholder="Search Your Inspection"
                      name="search"
                      // value={searchInput}
                      // onChange={handleSearchInputChange}
                    />
                    <SearchButton type="submit">
                      <Image src={Filter} alt="Filter" />
                      <Para>Filter</Para>
                    </SearchButton>

                    <ButtonLink2 onClick={() => activateInspectionCreate()}>
                      <Image src={PlusSign} alt="PlusSign" />
                      <Para>Add</Para>
                    </ButtonLink2>
                  </Form>
                  <TypicalTable>
                    <TableSection>
                      <TableHeading style={{  width: "150px" }}>Report Name</TableHeading>
                      <TableHeading>Date Uploaded</TableHeading>
                      <TableHeading>Download</TableHeading>
                      <TableHeading>Actions</TableHeading>
                    </TableSection>
                    {
                      APICall.inspectionListAPIResponse.data.list.length > 0 ? (
                        <React.Fragment>
                          {
                            APICall.inspectionListAPIResponse.data.list?.
                              filter((each: any) => each.cOrganization?.bCreatedBy === (ReduxCall.state.receivedObject as any)?.ProfileRetrieve?._id).
                              filter((each: any) => each.cOrganization?._id === organizationID).
                              map((each: any, index: any) => (
                                <TableSection key={index}>
                                  <TableBody style={{  width: "500px" }} >{each.dReportName}</TableBody>
                                  <TableBody>{each.dUploadDate}</TableBody>
                                  <TableBody>
                                    <ButtonLink3>
                                      <Image2 src={DownloadIcon} alt="Download" />
                                    </ButtonLink3>
                                  </TableBody>
                                  <TableBody>
                                    <ButtonLink3 onClick={() => activateInspectionUpdate(each._id)}>
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

export default InspectionTabListComponent;
