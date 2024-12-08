import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
// import fullRoute from "@/bLove/gRoute/bFullRoute";

import documentAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/gDocumentAPIEndpoints";
import organizationAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/dOrganizationAPIEndpoints";
import apiResponseHandler from "./extras/aAPIResponseHandler";
import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import { ButtonContainer, CancelButton, companyData, Container, Dropdown, DropdownOption, FileInput, FileInputContainer, FileInputLabel, Form, Input, InputHeading, IssueDate, MainHeading, RowContainer, RowInput, SubmitButton } from "./style";


const DocumentCreatePage = () => {
  // Variable
  const navigate = useNavigate();

  // State Variable
  const [formData, setFormData] = useState({
    cOrganization: "",

    dDocumentName: "",
    dUploadDate: "",
    dComment: "",
  })
  
  // Redux Call
  const ReduxCall = {
    state: useSelector((fullState: RootState) => fullState.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }

  // API Call
  const APICall = {
    createAPITrigger: documentAPIEndpoint.useDocumentCreateAPIMutation()[0],
    createAPIResponse: documentAPIEndpoint.useDocumentCreateAPIMutation()[1],

    // Requirements... Muaaah...
    organizationListAPIResponse: organizationAPIEndpoint.useOrganizationListAPIQuery(null),

  }
  
  // Event Handlers
  // Handle Input Change
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };
  
  // Submit handler
  const handleSubmit = (event: any) => {
    event.preventDefault();

    console.log("formDataObj", formData);
    apiResponseHandler.createAPIResponseHandler(formData, APICall.createAPITrigger, navigate)
  };

  // All Render
  // Extra Render
  useEffect(() => {
    console.log(formData)
  }, [formData])

  // JSX
  return (
    <React.Fragment>
      {/* DocumentCreatePage */}

      {/* <form onSubmit={handleSubmit} noValidate >
        <div>
          License Detail
          <div>
            <label>Select Organization</label>
            <select name="cOrganization" onChange={(event => handleInputChange(event))} >
              <option disabled selected >--Select--</option>
              {APICall.organizationListAPIResponse.isLoading ? null : 
                APICall.organizationListAPIResponse.isError ? null :
                  APICall.organizationListAPIResponse.isSuccess ? (
                    APICall.organizationListAPIResponse.data.success ? (
                      APICall.organizationListAPIResponse.data.list.length > 0 ? (
                        <React.Fragment>
                          {
                            APICall.organizationListAPIResponse.data.list?.filter((each: any) => each.bCreatedBy?._id === (ReduxCall.state.receivedObject as any)?.ProfileRetrieve?._id).map((each: any, index: any) => (
                              <option key={index} value={each._id}>{each.dName}</option>
                            ))
                          }
                        </React.Fragment>
                      ) : []
                    ) : []
                  ) : []
              }
            </select>
          </div>

          <div>
            <label>Document Name</label>
            <input name="dDocumentName" onChange={(event => handleInputChange(event))} />
          </div>

          <div>
            <label>Upload Date</label>
            <input name="dUploadDate" onChange={(event => handleInputChange(event))} />
          </div>

          <div>
            <label>Comment</label>
            <input name="dComment" onChange={(event => handleInputChange(event))} />
          </div>

        </div>

        <button type="submit" >Submit</button>
      </form> */}


      {/* <>
        -----------------------------------------------------------------------------------------------------------
      </> */}

      <>
        <TopNavBarComponent />
        <Container>
          <MainHeading>Add New Document</MainHeading>
          <Form onSubmit={handleSubmit}>
            <div>
              <InputHeading>Select Organization</InputHeading>
              <Dropdown
                value={formData.cOrganization}
                onChange={handleInputChange}
                name="cOrganization"
              >
                <DropdownOption value="" disabled>
                  Select Organization
                </DropdownOption>
                {APICall.organizationListAPIResponse.isLoading ? null : 
                  APICall.organizationListAPIResponse.isError ? null :
                    APICall.organizationListAPIResponse.isSuccess ? (
                      APICall.organizationListAPIResponse.data.success ? (
                        APICall.organizationListAPIResponse.data.list.length > 0 ? (
                          <React.Fragment>
                            {
                              APICall.organizationListAPIResponse.data.list?.filter((each: any) => each.bCreatedBy?._id === (ReduxCall.state.receivedObject as any)?.ProfileRetrieve?._id).map((each: any, index: any) => (
                                <DropdownOption
                                  key={index}
                                  value={each._id}
                                >
                                  {each.dName}
                                </DropdownOption>                                
                              ))
                            }
                          </React.Fragment>
                        ) : []
                      ) : []
                    ) : []
                }
              </Dropdown>

              
              <InputHeading>Document Name</InputHeading>
              <Input
                type="text"
                placeholder="Enter Document Name"
                name="dDocumentName"
                value={formData.dDocumentName}
                onChange={handleInputChange}
              />
              <RowContainer>
                <IssueDate>
                  <InputHeading>Date of Upload</InputHeading>
                  <RowInput
                    type="date"
                    name="dUploadDate"
                    value={formData.dUploadDate}
                    onChange={handleInputChange}
                  />
                </IssueDate>

                <div>
                  <InputHeading>Comment</InputHeading>
                  <RowInput
                    type="text"
                    placeholder="Enter Comment"
                    name="dComment"
                    value={formData.dComment}
                    onChange={handleInputChange}
                  />
                </div>
              </RowContainer> 
            
              <InputHeading>Upload Scan Copy</InputHeading>
              <FileInputContainer>
                {/* <FileInputLabel htmlFor={`file-upload-${index}`}>
                  {Documents.file ? Documents.file.name : "Choose File"}
                </FileInputLabel> */}
                <FileInput
                  type="file"
                  id={`file-upload-${"index"}`}
                  name="file"
                  onChange={(e) => "handleFileChange(e, index)"}
                />
              </FileInputContainer>
              
            </div>

            <>
              <ButtonContainer>
                <SubmitButton type="submit" onClick={handleSubmit}>Submit</SubmitButton>
                <CancelButton type="button" onClick={() => "handleCancel"}>Cancel</CancelButton>
              </ButtonContainer>
            </>
          </Form>
        </Container>
      </>


    </React.Fragment>
  )
}

export default DocumentCreatePage;
