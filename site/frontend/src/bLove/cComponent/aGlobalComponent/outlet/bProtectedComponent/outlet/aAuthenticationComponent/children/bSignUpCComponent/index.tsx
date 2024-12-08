import React, { useEffect, useState } from "react"
import { Button, ContactInfo, ContactInput, Container, ContentWrapper, ContinueLink, Dropdown, DropdownOption, ExpiryDate, FileInput, FileInputContainer, FileInputLabel, Form, HyperLink, Image, ImageWrapper, Input, InputHeading, IssueDate, MainHeading, PageLink, Para } from "./style";
import LessThanSign from '@/bLove/hAsset/icon/LessThanSign.png'
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import userAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/bUserAdministration/aUserAPIEndpoints";
import fullRoute from "@/bLove/gRoute/bFullRoute";
import { Bounce, toast } from "react-toastify";
import organizationAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/dOrganizationAPIEndpoints";
import licenseAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/eLicenseAPIEndpoints";


const SignUpCComponent = () => {
  // Redux
  const Redux = {
    state: useSelector((state: RootState) => state.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }
  
  // API Call
  const APICall = {
    submitAPITrigger: userAPIEndpoint.useUserSignUpAPIMutation()[0],
    submitAPIResponse: userAPIEndpoint.useUserSignUpAPIMutation()[1],

    organizationSubmitAPITrigger: organizationAPIEndpoint.useOrganizationCreateAPIMutation()[0],
    organizationSubmitAPIResponse: organizationAPIEndpoint.useOrganizationCreateAPIMutation()[1],

    licenseSubmitAPITrigger: licenseAPIEndpoint.useLicenseCreateAPIMutation()[0],
    licenseSubmitAPIResponse: licenseAPIEndpoint.useLicenseCreateAPIMutation()[1],
  }
  
  // Variable
  const location = useLocation();

  const [formData, setFormData] = useState({
    licenseNumber: "",
    issueDate: "",
    expiryDate: "",
    selectedLicense: "",
    file: null,
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

      console.log(serverResponse)

      if (serverResponse.error && (serverResponse.error as any).originalStatus === 404) {
        return toast.error(("There was a problem with server connection."), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });

        // return toast({
        //   variant: "destructive",
        //   title: "Uh oh! Cannot connect with server.",
        //   description: "There was a problem with server connection.",
        // })  
      } 
      
      if (serverResponse.error && (serverResponse.error as any)?.data?.success === false) {
        return toast.error(((serverResponse.error as any).data.message || "There was an error occured."), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });

        // return toast({
        //   variant: "destructive",
        //   title: "Uh oh! Something went wrong.",
        //   description: serverResponse.error.data.message || "There was an error occured.",
        // })  
      }

      if (serverResponse.data && serverResponse.data?.success === true) {
        toast.success((serverResponse.data.message), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });

        // toast({
        //   variant: "default",
        //   title: "Yayy! Congratulations...",
        //   description: serverResponse.data.message,
        // })
        // form.reset();

        Redux.dispatch(
          Redux.action.receivedObjectAction({
            ProfileRetrieve: {
              _id: serverResponse.data.user_register
            }
          })
        )

        await organizationAPIHandler(finalFormData)
        // return navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.aDashboardRoute)
      }

      return;

    } catch (error: any) {
      return toast.error(("There was a problem with try block code"), {
        position: "bottom-right",
        autoClose: 5000,
        transition: Bounce,
      });

      // return toast({
      //   variant: "destructive",
      //   title: "Uh oh! Bad code... Bad code.",
      //   description: "There was a problem with try block code",
      // })
    }    

  }

  const organizationAPIHandler = async (finalFormData: any) => {
    try {
      const serverResponse = await APICall.organizationSubmitAPITrigger({ body: {
        // eFirstname: finalFormData.username,
        // eLastname: finalFormData.username,
        // eMobile: finalFormData.phone_number,
        // eEmail: finalFormData.email,
        // ePassword: finalFormData.password,

        // dRole: "user"

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

      console.log(serverResponse)

      if (serverResponse.error && (serverResponse.error as any).originalStatus === 404) {
        return toast.error(("There was a problem with server connection."), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });

        // return toast({
        //   variant: "destructive",
        //   title: "Uh oh! Cannot connect with server.",
        //   description: "There was a problem with server connection.",
        // })  
      } 
      
      if (serverResponse.error && (serverResponse.error as any)?.data?.success === false) {
        return toast.error(((serverResponse.error as any).data.message || "There was an error occured."), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });

        // return toast({
        //   variant: "destructive",
        //   title: "Uh oh! Something went wrong.",
        //   description: serverResponse.error.data.message || "There was an error occured.",
        // })  
      }

      if (serverResponse.data && serverResponse.data?.success === true) {
        toast.success((serverResponse.data.message), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });

        // toast({
        //   variant: "default",
        //   title: "Yayy! Congratulations...",
        //   description: serverResponse.data.message,
        // })
        // form.reset();

        // Redux.dispatch(
        //   Redux.action.extraObjectAction({
        //     ProfileRetrieve: {
        //       _id: serverResponse.data.user_register._id
        //     }
        //   })
        // )

        await licenseAPIHandler(finalFormData, (serverResponse.data as any)?.create?._id)
        // return navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.aOrganizationRoute.aListRoute);
      }

      return;

    } catch (error: any) {
      return toast.error(("There was a problem with try block code"), {
        position: "bottom-right",
        autoClose: 5000,
        transition: Bounce,
      });

      // return toast({
      //   variant: "destructive",
      //   title: "Uh oh! Bad code... Bad code.",
      //   description: "There was a problem with try block code",
      // })
    }    

  }

  const licenseAPIHandler = async (finalFormData: any, id: string) => {
    try {
      const serverResponse = await APICall.licenseSubmitAPITrigger({ body: {
        // eFirstname: finalFormData.username,
        // eLastname: finalFormData.username,
        // eMobile: finalFormData.phone_number,
        // eEmail: finalFormData.email,
        // ePassword: finalFormData.password,

        // dRole: "user"

        // dName: finalFormData.name_of_firm,
        // dType: finalFormData.type_of_firm,
        // dCompanyEmail: finalFormData.company_email,
        // dPhoneNumber: finalFormData.phone_number,
        // dAddress: finalFormData.address,
        // dSelectedState: finalFormData.selectedState,
        // dSelectedCity: finalFormData.selectedCity,
        // dCountry: finalFormData.country,
        // dPin: finalFormData.pin,
        // dPanNumber: finalFormData.pan_number,
        
        aTitle: finalFormData.licenseNumber,
        cOrganization: id,
        dLicenseNumber: finalFormData.licenseNumber,
        dIssueDate: finalFormData.issueDate,
        dExpiryDate: finalFormData.expiryDate,
        dSelectedLicense: finalFormData.selectedLicense,
      } });

      console.log(serverResponse)

      if (serverResponse.error && (serverResponse.error as any).originalStatus === 404) {
        return toast.error(("There was a problem with server connection."), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });

        // return toast({
        //   variant: "destructive",
        //   title: "Uh oh! Cannot connect with server.",
        //   description: "There was a problem with server connection.",
        // })  
      } 
      
      if (serverResponse.error && (serverResponse.error as any)?.data?.success === false) {
        return toast.error(((serverResponse.error as any).data.message || "There was an error occured."), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });

        // return toast({
        //   variant: "destructive",
        //   title: "Uh oh! Something went wrong.",
        //   description: serverResponse.error.data.message || "There was an error occured.",
        // })  
      }

      if (serverResponse.data && serverResponse.data?.success === true) {
        toast.success((serverResponse.data.message), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });

        // toast({
        //   variant: "default",
        //   title: "Yayy! Congratulations...",
        //   description: serverResponse.data.message,
        // })
        // form.reset();

        // Redux.dispatch(
        //   Redux.action.extraObjectAction({
        //     ProfileRetrieve: {
        //       _id: serverResponse.data.user_register._id
        //     }
        //   })
        // )

        return navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.aOrganizationRoute.aListRoute);
      }

      return;

    } catch (error: any) {
      return toast.error(("There was a problem with try block code"), {
        position: "bottom-right",
        autoClose: 5000,
        transition: Bounce,
      });

      // return toast({
      //   variant: "destructive",
      //   title: "Uh oh! Bad code... Bad code.",
      //   description: "There was a problem with try block code",
      // })
    }    

  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const finalFormData = {
      ...formData,
      ...location.state.formData
    }

    console.log("Form submitted:", finalFormData);

    registerAPIHandler(finalFormData)

  };

  // Extra Render
  useEffect(() => {
    console.log(formData)
  }, [formData])
  

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
              {/* {licenses.map((state) => ( */}
              {["License 1", "License 2", "License 3", "License 4", "License 5", "License 6","License 7"].map((state) => (
                <DropdownOption
                  key={state}
                  value={state}
                >
                  {state}
                </DropdownOption>
              ))}
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
            <InputHeading>Upload Scan Copy License</InputHeading>
            <FileInputContainer>
              <FileInputLabel htmlFor="fileInput">Choose File</FileInputLabel>
              <FileInput
                type="file"
                id="fileInput"
                // onChange={handleFileChange}
                name="file"
              />
            </FileInputContainer>
            {/* {formData.file && (
              <UploadedFile>Uploaded File: {formData.file.name}</UploadedFile>
            )} */}
            <ContinueLink>
              <Button type="submit">Continue</Button>
            </ContinueLink>
          </Form>
        </ContentWrapper>
      </Container>
      
      {/* <AuthFormComponent Redux={props.Redux} APICall={props.APICall} extras={props.extras} /> */}
    </React.Fragment>
  )
}

export default SignUpCComponent;
