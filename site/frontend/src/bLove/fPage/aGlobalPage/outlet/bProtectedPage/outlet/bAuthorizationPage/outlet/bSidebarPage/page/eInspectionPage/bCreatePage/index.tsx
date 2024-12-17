import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
// import fullRoute from "@/bLove/gRoute/bFullRoute";

import inspectionAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/hInspectionAPIEndpoints";
import organizationAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/dOrganizationAPIEndpoints";
import apiResponseHandler from "./extras/aAPIResponseHandler";
import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import { ButtonContainer, CancelButton, Container, Dropdown, DropdownOption, FileInput, FileInputContainer, Form, Input, InputHeading, IssueDate, MainHeading, RowContainer, RowInput, SubmitButton } from "./style";


const InspectionCreatePage = () => {
  // Variable
  const navigate = useNavigate();

  // State Variable
  const [formData, setFormData] = useState({
    cOrganization: "",

    dReportName: "",
    dUploadDate: "",
  })
  
  // Redux Call
  const ReduxCall = {
    state: useSelector((fullState: RootState) => fullState.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }

  // API Call
  const APICall = {
    createAPITrigger: inspectionAPIEndpoint.useInspectionCreateAPIMutation()[0],
    createAPIResponse: inspectionAPIEndpoint.useInspectionCreateAPIMutation()[1],

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
      {/* InspectionCreatePage */}

      <>
        <TopNavBarComponent />
        <Container>
          <MainHeading>Add New Inspection Report</MainHeading>
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

              
              <InputHeading>Report Name</InputHeading>
              <Input
                type="text"
                placeholder="Enter Report Name"
                name="dReportName"
                value={formData.dReportName}
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
                  onChange={() => "handleFileChange(e, index)"}
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

export default InspectionCreatePage;
