import LoaderComponent from '@/bLove/cComponent/aGlobalComponent/component/aLoaderComponent';
import ErrorComponent from '@/bLove/cComponent/aGlobalComponent/component/bErrorComponent';
import React, { useState } from 'react';

import downloadFileUtility from '@/bLove/dUtility/gDownloadFileUtility';
import DownloadIcon from "@/bLove/hAsset/icon/download.png";
import EditIcon from "@/bLove/hAsset/icon/pencil.png";
import PlusSign from "@/bLove/hAsset/icon/plus-circle.png";
import { RefreshCwIcon } from 'lucide-react';
import { ButtonLink2, ButtonLink3, Form, Icon, Image, Input, Para, SearchButton, TableBody, TableHeading, TableSection, TypicalTable } from '../../style';


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

  // State Variable
  const [searchInput, setSearchInput] = useState("")

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

      <React.Fragment>
        <Form>
          <Input
            type="text"
            placeholder="Search Your Inspection Reports by Report Name"
            name="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <SearchButton type="button" onClick={() => APICall.inspectionListAPITrigger()} >
            <RefreshCwIcon style={{ width: "20px", height: "20px", marginRight: "10px" }}  />
            <Para>Refresh</Para>
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
            (APICall.inspectionListAPIResponse.isLoading || APICall.inspectionListAPIResponse.isFetching) ? null : 
            APICall.inspectionListAPIResponse.isError ? null :
            APICall.inspectionListAPIResponse.isSuccess ? (
              APICall.inspectionListAPIResponse.data.success ? (
                APICall.inspectionListAPIResponse.data.list.length > 0 ? (
                  <React.Fragment>
                    {
                      APICall.inspectionListAPIResponse.data.list?.
                        filter((each: any) => each.cOrganization?.bCreatedBy === (ReduxCall.state.receivedObject as any)?.ProfileRetrieve?._id).
                        filter((each: any) => each.cOrganization?._id === organizationID).
                        filter((each: any) => each.dReportName?.toLowerCase().includes(searchInput?.toLowerCase())).
                        map((each: any, index: any) => (
                          <TableSection key={index}>
                            <TableBody style={{  width: "500px" }} >{each.dReportName}</TableBody>
                            <TableBody>{each.dUploadDate}</TableBody>
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
                              <ButtonLink3 onClick={() => activateInspectionUpdate(each._id)}>
                                <Icon src={EditIcon} alt="Edit" />
                              </ButtonLink3>
                            </TableBody>
                          </TableSection>
                        ))
                    }
                  </React.Fragment>
                ) : [] 
              ) : []
            ) : []
          }

        </TypicalTable>
      </React.Fragment>

      {(APICall.inspectionListAPIResponse.isLoading || APICall.inspectionListAPIResponse.isFetching) ? <LoaderComponent /> :
        APICall.inspectionListAPIResponse.isError ? <ErrorComponent message="Error..." /> :
        (APICall.inspectionListAPIResponse.data?.list?.
          filter((each: any) => each.cOrganization?.bCreatedBy === (ReduxCall.state.receivedObject as any)?.ProfileRetrieve?._id).
          filter((each: any) => each.cOrganization?._id === organizationID).
          filter((each: any) => each.dReportName?.toLowerCase().includes(searchInput?.toLowerCase())).
          length === 0) ? <ErrorComponent message="No items here..." /> : null
      }

    </React.Fragment>
  )
}

export default InspectionTabListComponent;
