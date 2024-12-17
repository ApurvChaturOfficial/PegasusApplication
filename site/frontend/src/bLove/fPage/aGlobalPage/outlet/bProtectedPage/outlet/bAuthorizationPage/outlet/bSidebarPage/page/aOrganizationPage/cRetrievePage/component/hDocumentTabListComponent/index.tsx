import React from 'react'
import LoaderComponent from '@/bLove/cComponent/aGlobalComponent/component/aLoaderComponent';
import ErrorComponent from '@/bLove/cComponent/aGlobalComponent/component/bErrorComponent';

import { ButtonLink2, ButtonLink3, Form, Image, Image2, Image3, Input, TypicalTable, Para, SearchButton, TableBody, TableHeading, TableSection, Icon } from '../../style';
import DownloadIcon from "@/bLove/hAsset/icon/download.png";
import ViewIcon from "@/bLove/hAsset/icon/viewButton.png";
import Filter from "@/bLove/hAsset/icon/filter.png";
import PlusSign from "@/bLove/hAsset/icon/plus-circle.png";
import EditIcon from "@/bLove/hAsset/icon/pencil.png";


const DocumentTabListComponent = (props: any) => {
  // Destructure Props
  const { 
    setDocumentTabList,
    setDocumentTabCreate,
    setDocumentTabUpdate,
    APICall,
    ReduxCall,
    organizationID
  } = props

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
                      placeholder="Search Your Document"
                      name="search"
                      // value={searchInput}
                      // onChange={handleSearchInputChange}
                    />
                    <SearchButton type="submit">
                      <Image src={Filter} alt="Filter" />
                      <Para>Filter</Para>
                    </SearchButton>

                    <ButtonLink2 onClick={() => activateDocumentCreate()}>
                      <Image src={PlusSign} alt="PlusSign" />
                      <Para>Add</Para>
                    </ButtonLink2>
                  </Form>
                  <TypicalTable>
                    <TableSection>
                      <TableHeading style={{  width: "150px" }}>Document Name</TableHeading>
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
                              filter((each: any) => each.cOrganization?.bCreatedBy === (ReduxCall.state.receivedObject as any)?.ProfileRetrieve?._id).
                              filter((each: any) => each.cOrganization?._id === organizationID).
                              map((each: any, index: any) => (
                                <TableSection key={index}>
                                  <TableBody>{each.dDocumentName}</TableBody>
                                  <TableBody>{each.dUploadDate}</TableBody>
                                  <TableBody>{each.dComment}</TableBody>
                                  <TableBody>
                                    <ButtonLink3>
                                      <Image2 src={DownloadIcon} alt="Download" />
                                    </ButtonLink3>
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
