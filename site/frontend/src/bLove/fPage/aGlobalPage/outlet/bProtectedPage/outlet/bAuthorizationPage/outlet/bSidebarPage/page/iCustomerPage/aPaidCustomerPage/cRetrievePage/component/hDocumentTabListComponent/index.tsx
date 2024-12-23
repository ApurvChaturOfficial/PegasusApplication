import LoaderComponent from '@/bLove/cComponent/aGlobalComponent/component/aLoaderComponent';
import ErrorComponent from '@/bLove/cComponent/aGlobalComponent/component/bErrorComponent';
import React, { useState } from 'react';

import DownloadIcon from "@/bLove/hAsset/icon/download.png";
import EditIcon from "@/bLove/hAsset/icon/pencil.png";
import PlusSign from "@/bLove/hAsset/icon/plus-circle.png";
import { RefreshCwIcon } from 'lucide-react';
import { ButtonLink2, ButtonLink3, Form, Icon, Image, Input, Para, SearchButton, TableBody, TableHeading, TableSection, TypicalTable } from '../../style';
import downloadFileUtility from '@/bLove/dUtility/gDownloadFileUtility';


const DocumentTabListComponent = (props: any) => {
  // Destructure Props
  const { 
    setDocumentTabList,
    setDocumentTabCreate,
    setDocumentTabUpdate,
    APICall,
    // ReduxCall,
    organizationID
  } = props

  // State Variable
  const [searchInput, setSearchInput] = useState("")

  // Event Handlers
  const activateDocumentCreate = () => {
    setDocumentTabList(false)
    setDocumentTabCreate(true)
    setDocumentTabUpdate(false)
  }

  const activateDocumentUpdate = (documentID: string) => {
    setDocumentTabList(false)
    setDocumentTabCreate(false)
    setDocumentTabUpdate(true)

    APICall.documentRetrieveAPITrigger({ params: { _id: documentID } })
  }
  
  // JSX
  return (
    <React.Fragment>
      {/* DocumentTabListComponent */}
      {
        APICall.documentListAPIResponse.isLoading ? <LoaderComponent /> : 
        APICall.documentListAPIResponse.isError ? <ErrorComponent message="Error..." /> :
        APICall.documentListAPIResponse.isSuccess ? (
          <React.Fragment>
            {
              APICall.documentListAPIResponse.data.success ? (
                <React.Fragment>
                  <Form>
                    <Input
                      type="text"
                      placeholder="Search Documents by Document Name"
                      value={searchInput}
                      onChange={(event) => setSearchInput(event.target.value)}
                    />
                    <SearchButton type="button" onClick={() => APICall.documentListAPITrigger()} >
                      <RefreshCwIcon style={{ width: "20px", height: "20px", marginRight: "10px" }}  />
                      <Para>Refresh</Para>
                    </SearchButton>

                    <ButtonLink2 onClick={() => activateDocumentCreate()}>
                      <Image src={PlusSign} alt="PlusSign" />
                      <Para>Add</Para>
                    </ButtonLink2>
                  </Form>
                  <TypicalTable>
                    <TableSection>
                      <TableHeading style={{  width: "300px" }}>Document Name</TableHeading>
                      <TableHeading>Uploaded On</TableHeading>
                      <TableHeading>Comment</TableHeading>
                      <TableHeading>Download</TableHeading>
                      <TableHeading>Actions</TableHeading>
                    </TableSection>
                    {
                      APICall.documentListAPIResponse.data.list.length > 0 ? (
                        <React.Fragment>
                          {
                            APICall.documentListAPIResponse.data.list?.
                              // filter((each: any) => each.bCreatedBy?._id === (ReduxCall.state.receivedObject as any)?.ProfileRetrieve?._id).
                              filter((each: any) => each.cOrganization?._id === organizationID).
                              filter((each: any) => each.dDocumentName?.toLowerCase().includes(searchInput?.toLowerCase())).
                              map((each: any, index: any) => (
                                <TableSection key={index}>
                                  <TableBody>{each.dDocumentName}</TableBody>
                                  <TableBody>{each.dUploadDate}</TableBody>
                                  <TableBody>{each.dComment}</TableBody>
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
                                    <ButtonLink3 onClick={() => activateDocumentUpdate(each._id)}>
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

export default DocumentTabListComponent;
