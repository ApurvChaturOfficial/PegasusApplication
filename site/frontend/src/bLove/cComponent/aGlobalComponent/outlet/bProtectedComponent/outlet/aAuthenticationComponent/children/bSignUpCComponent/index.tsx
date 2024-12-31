import { RootState } from "@/aConnection/dReduxConnection";
import userAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/bUserAdministration/aUserAPIEndpoints";
import organizationAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/dOrganizationAPIEndpoints";
import licenseAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/eLicenseAPIEndpoints";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import handleImageCreateForObject from "@/bLove/dUtility/aImageForObject/aHandleImageCreateForObject";
import handleImageUpdateForObject from "@/bLove/dUtility/aImageForObject/bHandleImageUpdateForObject";
import handleImageDeleteForObject from "@/bLove/dUtility/aImageForObject/cHandleImageDeleteForObject";
import fullRoute from "@/bLove/gRoute/bFullRoute";
import firmBasedLicenseType from "@/bLove/hAsset/data/firmBasedLicenseType";
import LessThanSign from '@/bLove/hAsset/icon/LessThanSign.png';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { Button, ContactInfo, ContactInput, Container, ContentWrapper, ContinueLink, Dropdown, Dropdown1, DropdownOption, ExpiryDate, FileInput, FileInputContainer, FileInputLabel, Form, HyperLink, Image, ImageWrapper, Input, InputHeading, IssueDate, MainHeading, PageLink, Para, UploadedFile } from "./style";
import { FileIcon } from "lucide-react";
import allCategoryType from "@/bLove/hAsset/data/allCategoryType";


const SignUpCComponent = () => {
  // Redux
  const Redux = {
    state: useSelector((state: RootState) => state.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }
  
  // API Call
  const userSignUp = userAPIEndpoint.useUserSignUpAPIMutation()
  const organizationCreate = organizationAPIEndpoint.useOrganizationCreateAPIMutation()
  const licenseCreate = licenseAPIEndpoint.useLicenseCreateAPIMutation()

  const APICall = {
    submitAPITrigger: userSignUp[0],
    submitAPIResponse: userSignUp[1],

    organizationSubmitAPITrigger: organizationCreate[0],
    organizationSubmitAPIResponse: organizationCreate[1],

    licenseSubmitAPITrigger: licenseCreate[0],
    licenseSubmitAPIResponse: licenseCreate[1],
  }
  
  // Variable
  const location = useLocation();

  // State Variable
  const [fileLoading, setFileLoading] = useState(false)
  const [formData, setFormData] = useState({
    licenseNumber: "",
    issueDate: "",
    expiryDate: "",
    selectedLicense: "",
    selectedCategory: "",
    selectedOwnLoan: "",
    file: null,
    fileID: null,
  });

  const navigate = useNavigate();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const registerAPIHandler = async (finalFormData: any) => {
    try {
      const serverResponse = await APICall.submitAPITrigger({ body: {
        eFirstname: finalFormData.username,
        eLastname: finalFormData.username,
        eMobile: finalFormData.phone_number,
        eEmail: finalFormData.email,
        ePassword: finalFormData.password,

        cRole: "673f22a5fbdc2bbc7e2dbe57"
      } });

      if (serverResponse.error && (serverResponse.error as any).originalStatus === 404) {
        return toast.error(("There was a problem with server connection."), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });
      } 
      
      if (serverResponse.error && (serverResponse.error as any)?.data?.success === false) {
        return toast.error(((serverResponse.error as any).data.message || "There was an error occured."), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });
      }

      if (serverResponse.data && serverResponse.data?.success === true) {
        toast.success((serverResponse.data.message), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });

        Redux.dispatch(
          Redux.action.receivedObjectAction({
            ProfileRetrieve: {
              _id: serverResponse.data.user_register
            }
          })
        )

        await organizationAPIHandler(finalFormData)
      }

      return;

    } catch (error: any) {
      return toast.error(("There was a problem with try block code"), {
        position: "bottom-right",
        autoClose: 5000,
        transition: Bounce,
      });
    }    

  }

  const organizationAPIHandler = async (finalFormData: any) => {
    try {
      const serverResponse = await APICall.organizationSubmitAPITrigger({ body: {
        aTitle: finalFormData.name_of_firm,
        dName: finalFormData.name_of_firm,
        dType: finalFormData.type_of_firm,
        dCompanyEmail: finalFormData.company_email,
        dPhoneNumber: finalFormData.phone_number,
        dAddress: finalFormData.address,
        dSelectedState: finalFormData.selectedState,
        dSelectedCity: finalFormData.selectedCity,
        dCountry: finalFormData.country,
        dPin: finalFormData.pin,
        dPanNumber: finalFormData.pan_number,

        dLicenseNumber: finalFormData.licenseNumber,
        dIssueDate: finalFormData.issueDate,
        dExpiryDate: finalFormData.expiryDate,
        dSelectedLicense: finalFormData.selectedLicense,
      } });

      if (serverResponse.error && (serverResponse.error as any).originalStatus === 404) {
        return toast.error(("There was a problem with server connection."), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });
      } 
      
      if (serverResponse.error && (serverResponse.error as any)?.data?.success === false) {
        return toast.error(((serverResponse.error as any).data.message || "There was an error occured."), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });
      }

      if (serverResponse.data && serverResponse.data?.success === true) {
        toast.success((serverResponse.data.message), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });

        await licenseAPIHandler(finalFormData, (serverResponse.data as any)?.create?._id)
      }

      return;

    } catch (error: any) {
      return toast.error(("There was a problem with try block code"), {
        position: "bottom-right",
        autoClose: 5000,
        transition: Bounce,
      });
    }    

  }

  const licenseAPIHandler = async (finalFormData: any, id: string) => {
    try {
      const serverResponse = await APICall.licenseSubmitAPITrigger({ body: {        
        aTitle: finalFormData.licenseNumber,
        cOrganization: id,
        dLicenseNumber: finalFormData.licenseNumber,
        dIssueDate: finalFormData.issueDate,
        dExpiryDate: finalFormData.expiryDate,
        dSelectedLicense: finalFormData.selectedLicense,
        dCategory: finalFormData.selectedCategory,
        dOwnLoan: finalFormData.selectedOwnLoan,
        dFileUploaded: finalFormData.file,
        dFileUploadedID: finalFormData.fileID
      } });

      if (serverResponse.error && (serverResponse.error as any).originalStatus === 404) {
        return toast.error(("There was a problem with server connection."), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });
      } 
      
      if (serverResponse.error && (serverResponse.error as any)?.data?.success === false) {
        return toast.error(((serverResponse.error as any).data.message || "There was an error occured."), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });
      }

      if (serverResponse.data && serverResponse.data?.success === true) {
        toast.success((serverResponse.data.message), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });

        return navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.aOrganizationRoute.aListRoute);
      }

      return;

    } catch (error: any) {
      return toast.error(("There was a problem with try block code"), {
        position: "bottom-right",
        autoClose: 5000,
        transition: Bounce,
      });
    }    

  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const finalFormData = {
      ...formData,
      ...location.state.formData
    }
    await registerAPIHandler(finalFormData)
  };

  // JSX
  return (
    <React.Fragment>
      {/* SignUpCComponent */}
      <Container>
        <ImageWrapper />
        <PageLink to={fullRoute.aGlobalRoute.bProtectedRoute.aAuthenticationRoute.bSignUpBRoute}>
          <Para>
            <Image src={LessThanSign} alt="LessThanSign" /> Back
          </Para>
        </PageLink>

        <ContentWrapper>
          <MainHeading>Welcome to In Time Alerts</MainHeading>
          <Para>
            by<HyperLink href="#">Pegasus Clinicare</HyperLink>
          </Para>
          <Form onSubmit={handleSubmit}>
            <InputHeading>Select License</InputHeading>
            <Dropdown
              name="selectedLicense"
              value={formData.selectedLicense}
              onChange={handleInputChange}
            >
              <DropdownOption value="" disabled>
                Select License
              </DropdownOption>
              {
                firmBasedLicenseType?.
                  filter(each => each.firm === location.state.formData?.type_of_firm)[0]?.
                  license?.
                  map(each => (
                    <DropdownOption
                      key={each}
                      value={each}
                    >
                      {each}
                    </DropdownOption>
                  ))
              }
            </Dropdown>
            <InputHeading>Enter License Number</InputHeading>
            <Input
              type="text"
              name="licenseNumber"
              placeholder="Enter License ID Number"
              value={formData.licenseNumber}
              onChange={handleInputChange}
            />
            <ContactInfo>
              <IssueDate>
                <InputHeading>Category</InputHeading>
                <Dropdown1
                  name="selectedCategory"
                  value={formData.selectedCategory}
                  onChange={handleInputChange}
                >
                  <DropdownOption value="" disabled>
                    Select Category
                  </DropdownOption>
                  {
                    allCategoryType.map(each => (
                      <DropdownOption
                        key={each}
                        value={each}
                      >
                        {each}
                      </DropdownOption>
                    ))
                  }
                </Dropdown1>

              </IssueDate>
              <ExpiryDate>
                <InputHeading>Own / Loan</InputHeading>
                <Dropdown1
                  name="selectedOwnLoan"
                  value={formData.selectedOwnLoan}
                  onChange={handleInputChange}
                >
                  <DropdownOption value="" disabled>
                    Select
                  </DropdownOption>
                  <DropdownOption value="Own" >Own</DropdownOption>
                  <DropdownOption value="Loan" >Loan</DropdownOption>
                </Dropdown1>
              </ExpiryDate>
            </ContactInfo>
            
            <ContactInfo>
              <IssueDate>
                <InputHeading>Date of Issue</InputHeading>
                <ContactInput
                  type="date"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleInputChange}
                />
              </IssueDate>
              <ExpiryDate>
                <InputHeading>Date of Expiry</InputHeading>
                <ContactInput
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                />
              </ExpiryDate>
            </ContactInfo>
            
            <InputHeading>Upload Scan Copy License <em style={{ color: "tomato" }} >(.pdf, .doc, .docx, .jpg, .jpeg, .png)</em></InputHeading> 

            {/* --------------------------------------------------------------- */}
            <FileInputContainer>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
                {formData.file && !fileLoading && (
                  <>
                    {(formData.file as any).match(/\.(jpeg|jpg|png)$/i) ? (
                      <img
                        style={{
                          height: "70px",
                          objectFit: "cover",
                        }}
                        src={formData.file}
                        alt="Preview"
                      />
                    ) : <FileIcon size={"50px"} />}
                  </>                    
                )}
                {formData.file && <FileInputLabel htmlFor="fileUpdate">{fileLoading ? "Loading..." : "Change File"}</FileInputLabel>}
                {formData.file && (
                  <FileInputLabel 
                    style={{ color: "tomato" }}
                    onClick={() => handleImageDeleteForObject("file", "fileID", setFormData, setFileLoading, formData.fileID)} 
                  >{fileLoading ? "Loading..." : "Remove File"}</FileInputLabel>
                )}
              </div>
              {!formData.file && <FileInputLabel htmlFor="fileInput">{fileLoading ? "Loading..." : "Choose File"}</FileInputLabel>}
              <FileInput
                type="file"
                id="fileInput"
                disabled={fileLoading}
                onChange={(event: any) => handleImageCreateForObject(event, "file", "fileID", setFormData, setFileLoading)}
                name="file"
              />
              <FileInput
                type="file"
                id="fileUpdate"
                disabled={fileLoading}
                onChange={(event: any) => handleImageUpdateForObject(event, "file", "fileID", setFormData, setFileLoading, formData.fileID)}
                name="file"
              />
            </FileInputContainer>
            {formData.file && <UploadedFile>Uploaded File: {(
              <a
                href={formData.file || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {formData.file}
              </a> 
            )}</UploadedFile>}
            {/* --------------------------------------------------------------- */}
            
            <ContinueLink>
              <Button
                type="submit"
                disabled={
                  fileLoading ||
                  APICall.submitAPIResponse.isLoading ||
                  APICall.organizationSubmitAPIResponse.isLoading ||
                  APICall.licenseSubmitAPIResponse.isLoading
                }
              >{
                (
                  fileLoading ||
                    APICall.submitAPIResponse.isLoading ||
                    APICall.organizationSubmitAPIResponse.isLoading ||
                    APICall.licenseSubmitAPIResponse.isLoading
                ) ? "Loading..." : "Continue"
              }</Button>
            </ContinueLink>
          </Form>
        </ContentWrapper>
      </Container>
    </React.Fragment>
  )
}

export default SignUpCComponent;
