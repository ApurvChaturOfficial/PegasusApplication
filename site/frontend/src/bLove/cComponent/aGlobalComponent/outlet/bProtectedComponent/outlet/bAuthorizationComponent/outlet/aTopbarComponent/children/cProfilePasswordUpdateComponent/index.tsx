import React, { useState } from "react"

// import { z } from "zod"
import { Route, Routes } from "react-router-dom"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
import TopNavBarComponent from "../../../../component/aTopNavBarComponent"
import { BtnDiv, Button1, Button2, Button3, Button4, ButtonTags, ChangeMeButton, clientData, ContentTag, CurrentContact, CurrentEmail, DeleteContainer, DeleteTag, ForgetTag, Form, Heading, HideImg, ImpTag, Input, Input2, InputHeading, InputWrapper, MainTag, MicroHeading, MiniHeading, PasswordContainer, PrivacyContainer, SettingsContiners, ShowImg, SingleLine, SubHeading, ToggleVisibilityButton, TwoFactorButton, TwoFactorContainer } from "./style"
import SettingNavBarComponent from "../../../../component/bSettingsNavbarComponent"
import Show from "@/bLove/hAsset/icon/Show.png";
import Hide from "@/bLove/hAsset/icon/DontShow.png";


// type ProfilePasswordUpdateComponentType = {
//   ReduxCall: any
//   APICall: {
//     updateAPITrigger: any,
//     updateAPIResponse: any,
//   }
//   extras: {
//     apiResponseHandler: {
//       updateAPIResponseHandler: any
//     },
//     data: any,
//     formSchema: any,
//     formDefaultValue: any,
//   }
// }

const ProfilePasswordUpdateComponent = () => {
  // Destructure Props
  // const { APICall, extras } = props;

  // Variable
  // const navigate = useNavigate()

  // State Variable
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [deleteAccountPassword, setDeleteAccountPassword] = useState("");
  const [deleteAccountText, setDeleteAccountText] = useState("");

  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [isChangingPhone, setIsChangingPhone] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const toggleEmail = () => setShowEmail((prevState) => !prevState);
  const togglePhone = () => setShowPhone((prevState) => !prevState);

  const { phone, email } = clientData.Client;

  const maskedPhone = showPhone ? phone : `${phone.slice(0, 3)}****`;
  const maskedEmail = showEmail ? email : `${email.slice(0, 3)}****@*****`;

  const handleChangeEmail = () => setIsChangingEmail(true);
  const handleChangePhone = () => setIsChangingPhone(true);

  const handleEmailSubmit = (e: any) => {
    e.preventDefault();
    setIsOtpVisible(true);
  };

  const handlePhoneSubmit = (e: any) => {
    e.preventDefault();
    setIsOtpVisible(true);
  };

  const handleOtpSubmit = (e: any) => {
    e.preventDefault();
    console.log("New Email/Phone:", newEmail || newPhone);
    console.log("OTP:", otp);
    console.log("Password:", password);
    setIsOtpVisible(false);
    setIsChangingEmail(false);
    setIsChangingPhone(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData.get("oldPassword"), formData.get("newPassword"));
  };

  const isDeleteAccountFormValid = () => {
    return (
      deleteAccountPassword !== "" && deleteAccountText === "Delete Account"
    );
  };

  // Form
  // const form = useForm<z.infer<typeof extras.formSchema>>({
  //   resolver: zodResolver(extras.formSchema),
  //   mode: "onChange",
  //   defaultValues: extras.formDefaultValue
  // })

  // Submit Handler
  // const onSubmit = async (data: z.infer<typeof extras.formSchema>) => {
  //   console.log(data)

  //   // toast({
  //   //   title: "You submitted the following values:",
  //   //   description: (
  //   //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //   //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
  //   //     </pre>
  //   //   ),
  //   // })

  //   extras.apiResponseHandler.updateAPIResponseHandler(data, APICall.updateAPITrigger, form, navigate)
  //   // extras.apiResponseHandler.updateAPIResponseHandler(data, ReduxCall, APICall.updateAPITrigger, form, navigate)
  // }  
  
  // JSX
  return (
    <React.Fragment>
      ProfilePasswordUpdateComponent

      <TopNavBarComponent />
      <SettingsContiners>
        <Heading>Settings</Heading>
        <SettingNavBarComponent />
        <Routes>
          <Route
            path="/"
            element={
              <PasswordContainer>
                <SubHeading>Change Password</SubHeading>
                <Form onSubmit={() => "handleSubmit"}>
                  <InputHeading>Enter Current Password</InputHeading>
                  <InputWrapper>
                    <Input
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Enter Password"
                      name="oldPassword"
                    />
                    <ToggleVisibilityButton
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? (
                        <HideImg src={Hide} />
                      ) : (
                        <ShowImg src={Show} />
                      )}
                    </ToggleVisibilityButton>
                  </InputWrapper>
                  <InputHeading>Enter New Password</InputHeading>
                  <InputWrapper>
                    <Input
                      type={newPasswordVisible ? "text" : "password"}
                      placeholder="Enter Password"
                      name="newPassword"
                    />
                    <ToggleVisibilityButton
                      type="button"
                      onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                    >
                      {newPasswordVisible ? (
                        <HideImg src={Hide} />
                      ) : (
                        <ShowImg src={Show} />
                      )}
                    </ToggleVisibilityButton>
                  </InputWrapper>
                  <InputHeading>Confirm New Password</InputHeading>
                  <InputWrapper>
                    <Input
                      type={confirmPasswordVisible ? "text" : "password"}
                      placeholder="Enter Password"
                      name="confirmPassword"
                    />
                    <ToggleVisibilityButton
                      type="button"
                      onClick={() =>
                        setConfirmPasswordVisible(!confirmPasswordVisible)
                      }
                    >
                      {confirmPasswordVisible ? (
                        <HideImg src={Hide} />
                      ) : (
                        <ShowImg src={Show} />
                      )}
                    </ToggleVisibilityButton>
                  </InputWrapper>
                  <ForgetTag to="/forget-password">
                    Forget Old Password?
                  </ForgetTag>
                  <ButtonTags>
                    <Button1 type="submit">Confirm</Button1>
                    <Button2
                      onClick={() => (window.location.href = "/organizations")}
                    >
                      Cancel
                    </Button2>
                  </ButtonTags>
                </Form>
              </PasswordContainer>
            }
          />
          <Route
            path="twofactor-authentication"
            element={
              <>
                <TwoFactorContainer>
                  <SubHeading>Two Factor Authentication</SubHeading>

                  {!isChangingEmail && !isChangingPhone && (
                    <>
                      <div>
                        <InputHeading>Current Email</InputHeading>
                        <SingleLine>
                          <CurrentEmail>{maskedEmail}</CurrentEmail>
                          <BtnDiv>
                            <TwoFactorButton onClick={toggleEmail}>
                              {showEmail ? (
                                <HideImg src={Hide} />
                              ) : (
                                <ShowImg src={Show} />
                              )}
                            </TwoFactorButton>
                          </BtnDiv>
                          <ChangeMeButton onClick={handleChangeEmail}>
                            Change Email
                          </ChangeMeButton>
                        </SingleLine>
                      </div>

                      <div>
                        <InputHeading>Current Contact</InputHeading>
                        <SingleLine>
                          <CurrentContact>{maskedPhone}</CurrentContact>
                          <BtnDiv>
                            <TwoFactorButton onClick={togglePhone}>
                              {showPhone ? (
                                <HideImg src={Hide} />
                              ) : (
                                <ShowImg src={Show} />
                              )}
                            </TwoFactorButton>
                          </BtnDiv>
                          <ChangeMeButton onClick={handleChangePhone}>
                            Change Phone
                          </ChangeMeButton>
                        </SingleLine>
                      </div>
                    </>
                  )}

                  {isChangingEmail && !isOtpVisible && (
                    <form onSubmit={handleEmailSubmit}>
                      <InputHeading>Enter New Email</InputHeading>
                      <InputWrapper>
                        <Input
                          type="email"
                          placeholder="Enter New Email"
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                        />
                      </InputWrapper>
                      <ButtonTags>
                        <Button1 type="submit">Submit</Button1>
                        <Button2
                          type="button"
                          onClick={() => setIsChangingEmail(false)}
                        >
                          Cancel
                        </Button2>
                      </ButtonTags>
                    </form>
                  )}

                  {isChangingPhone && !isOtpVisible && (
                    <form onSubmit={handlePhoneSubmit}>
                      <InputHeading>Enter New Phone</InputHeading>
                      <InputWrapper>
                        <Input
                          type="tel"
                          placeholder="Enter New Phone"
                          value={newPhone}
                          onChange={(e) => setNewPhone(e.target.value)}
                        />
                      </InputWrapper>
                      <ButtonTags>
                        <Button1 type="submit">Submit</Button1>
                        <Button2
                          type="button"
                          onClick={() => setIsChangingPhone(false)}
                        >
                          Cancel
                        </Button2>
                      </ButtonTags>
                    </form>
                  )}

                  {isOtpVisible && (
                    <form onSubmit={handleOtpSubmit}>
                      <InputHeading>Enter OTP</InputHeading>
                      <InputWrapper>
                        <Input
                          type="text"
                          placeholder="Enter OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                        />
                      </InputWrapper>
                      <InputHeading>Enter Password</InputHeading>
                      <InputWrapper>
                        <Input
                          type="password"
                          placeholder="Enter Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </InputWrapper>
                      <ButtonTags>
                        <Button1 type="submit">Submit</Button1>
                        <Button2
                          type="button"
                          onClick={() => setIsOtpVisible(false)}
                        >
                          Cancel
                        </Button2>
                      </ButtonTags>
                    </form>
                  )}
                </TwoFactorContainer>
              </>
            }
          />
          <Route
            path="privacy-security"
            element={
              <>
                <PrivacyContainer>
                  <SubHeading>Privacy & Security</SubHeading>
                  <MainTag>
                    <ContentTag>
                      At In Time Alert, we prioritize the privacy and security
                      of our users' information. This Privacy & Security Policy
                      outlines how we collect, use, and protect your personal
                      data. By accessing or using our services, you consent to
                      the practices described in this policy. We are committed
                      to transparency and aim to provide you with clear
                      information about our data handling practices.
                    </ContentTag>
                    <MicroHeading>1. Information Collection</MicroHeading>
                    <MiniHeading>
                    1.1. Personal Information</MiniHeading>
                    <ContentTag>
                      We collect personal information that you provide directly
                      to us. This includes, but is not limited to, your name,
                      email address, phone number, and other contact details.
                      Such information is collected when you register for an
                      account, make purchases, subscribe to newsletters, or
                      engage with our support team.
                    </ContentTag>
                    <MiniHeading>
                    1.2. Usage Data</MiniHeading>
                    <ContentTag>
                      We also gather data related to your use of our services,
                      such as IP addresses, browser types, operating systems,
                      and usage patterns. This information is collected through
                      cookies and similar tracking technologies to enhance your
                      experience and improve our services.
                    </ContentTag>
                    <MicroHeading>2. Use of Information</MicroHeading>
                    <MiniHeading>
                    2.1. Service Delivery</MiniHeading>
                    <ContentTag>
                      Your personal data is utilized to deliver and manage our
                      services effectively. This includes processing
                      transactions, providing customer support, and
                      personalizing content to suit your preferences.
                    </ContentTag>
                    <MiniHeading>
                    2.2. Communication</MiniHeading>
                    <ContentTag>
                      With your explicit consent, we may use your contact
                      information to send you updates, promotional offers, and
                      newsletters. You can opt out of these communications at
                      any time by following the unsubscribe instructions
                      provided in the emails or by contacting us directly.
                    </ContentTag>
                    <MicroHeading>3. Data Security</MicroHeading>
                    <MiniHeading>
                    3.1. Security Measures</MiniHeading>
                    <ContentTag>
                      We implement robust security measures to protect your
                      information from unauthorized access, alteration, or
                      disclosure. These measures include data encryption, secure
                      servers, and regular security audits to ensure the
                      integrity of our systems.
                    </ContentTag>
                    <MiniHeading>
                    3.2. Data Access and Management</MiniHeading>
                    <ContentTag>
                      Access to your personal information is restricted to
                      authorized personnel only. We require our employees and
                      third-party service providers to comply with stringent
                      confidentiality and security standards.
                    </ContentTag>
                    <MicroHeading>
                      4. Policy Changes and Contact Information
                    </MicroHeading>
                    <MiniHeading>
                    4.1. Policy Updates</MiniHeading>
                    <ContentTag>
                      We may periodically update this Privacy & Security Policy
                      to reflect changes in our practices or legal requirements.
                      Any significant changes will be communicated through
                      appropriate channels, and the updated policy will be
                      posted on our website with an updated effective date.
                    </ContentTag>
                    <MiniHeading>
                    4.2. Contact Us</MiniHeading>
                    <ContentTag>
                      For any questions or concerns regarding this policy or our
                      data handling practices, please contact us at [Contact
                      Information]. We are dedicated to addressing your
                      inquiries and resolving any issues you may have in a
                      timely and efficient manner.
                    </ContentTag>
                  </MainTag>
                </PrivacyContainer>
              </>
            }
          />
          <Route
            path="delete-account"
            element={
              <>
                <DeleteContainer>
                  <SubHeading>Delete Account</SubHeading>
                  <DeleteTag>
                    By deleting your account, you will lose access to all the
                    data, documents and files that have been linked or
                    associated with your profile, your organizations and your
                    firms.
                  </DeleteTag>
                  <DeleteTag>
                    Are you sure you want to delete your account?
                  </DeleteTag>
                  <Form onSubmit={handleSubmit}>
                    <InputHeading>Enter Account Password</InputHeading>
                    <InputWrapper>
                      <Input
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Enter Password"
                        name="oldPassword"
                        value={deleteAccountPassword}
                        onChange={(e) =>
                          setDeleteAccountPassword(e.target.value)
                        }
                      />
                      <ToggleVisibilityButton
                        type="button"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      >
                        {passwordVisible ? (
                          <HideImg src={Hide} />
                        ) : (
                          <ShowImg src={Show} />
                        )}
                      </ToggleVisibilityButton>
                    </InputWrapper>
                    <InputHeading>
                      Type <ImpTag>Delete Account</ImpTag> in the text box to
                      continue.
                    </InputHeading>
                    <InputWrapper>
                      <Input2
                        type="text"
                        placeholder="Delete Account"
                        name="deleteAccount"
                        value={deleteAccountText}
                        onChange={(e) => setDeleteAccountText(e.target.value)}
                      />
                    </InputWrapper>
                    <ButtonTags>
                      <Button3
                        type="submit"
                        disabled={!isDeleteAccountFormValid()}
                      >
                        Delete Account
                      </Button3>
                      <Button4
                        onClick={() =>
                          (window.location.href = "/organizations")
                        }
                      >
                        Cancel
                      </Button4>
                    </ButtonTags>
                  </Form>
                </DeleteContainer>
              </>
            }
          />
        </Routes>
      </SettingsContiners>

    </React.Fragment>      
  )
}  

export default ProfilePasswordUpdateComponent;

{/* <div className="flex-1 lg:max-w-2xl">
<div className="mb-8" >
  <h2 className="text-3xl font-bold tracking-tight">{extras.data.header.title}</h2>
  <p className="text-muted-foreground">
    {extras.data.header.subtitle}
  </p>
</div>

<div className="mx-auto grid flex-1 auto-rows-max gap-4">
  <React.Fragment>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        {extras.data.content.sections?.filter((eachSection: any) => eachSection.display).map((eachSection: any, indexSection: number) => eachSection.display && (
          <React.Fragment key={indexSection} >
            <div>
              <h3 className="text-lg font-medium">{indexSection+1}) {eachSection.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{eachSection.subtitle}</p>
              <Separator />
            </div>

            <div className="space-y-8">
              {eachSection.inputs.map((eachInput: any, indexInput: any) => (
                <React.Fragment>
                  For I/P Type: Text, Email, Number
                  {((eachInput.type === "text" || eachInput.type === "email" || eachInput.type === "number" || eachInput.type === "password") && 
                    <div className="grid gap-3" key={indexInput} >
                      <FormField
                        control={form.control}
                        name={eachInput.name}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{eachInput.label} :</FormLabel>
                            <FormControl>
                              <Input placeholder={eachInput.placeholder} type={eachInput.type} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  For I/P Type: Textarea
                  {((eachInput.type === "textarea") && 
                    <div className="grid gap-3" key={indexInput} >
                      <FormField
                        control={form.control}
                        name={eachInput.name}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{eachInput.label} :</FormLabel>
                            <FormControl>
                              <Textarea className="min-h-24" placeholder={eachInput.placeholder} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  For I/P Type: Select
                  {((eachInput.type === "select") && 
                    <div className="grid gap-3" key={indexInput} >
                      <FormField
                        control={form.control}
                        name={eachInput.name}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{eachInput.label} :</FormLabel>
                            <Select onValueChange={field.onChange} >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={eachInput.placeholder} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>{
                                eachInput.options?.map((eachOption: any, indexOption: number) => (
                                  <SelectItem key={indexOption} value={eachOption.value}>{eachOption.label}</SelectItem>
                                ))
                              }</SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  For I/P Type: Radio
                  {((eachInput.type === "radio") && 
                    <div className="grid gap-3" key={indexInput} >
                      <FormField
                        control={form.control}
                        name={eachInput.name}
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <div className="mb-4">
                              <FormLabel>{eachInput.label}:</FormLabel>
                              <FormDescription>
                                Select the items you want to.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                {eachInput.options?.map((each: any, index: number) => (
                                  <React.Fragment key={index} >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value={each.value} />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {each.label}
                                      </FormLabel>
                                    </FormItem>
                                  </React.Fragment>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>                            
                        )}
                      />
                    </div>
                  )}

                  For I/P Type: Checkbox
                  {((eachInput.type === "checkbox") &&
                    <div className="grid gap-3" key={indexInput} >
                      <FormField
                        control={form.control}
                        name={eachInput.name}
                        render={() => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel>{eachInput.label}:</FormLabel>
                              <FormDescription>
                                Select the items you want to.
                              </FormDescription>
                            </div>
                            {eachInput.options?.map((each: any, index: number) => (
                              <FormField
                                key={index}
                                control={form.control}
                                name={eachInput.name}
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={index}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(each.value)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, each.value])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value: any) => value !== each.value
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-sm font-normal">
                                        {each.label}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                  )}
                </React.Fragment>
              ))}
            </div>
          </React.Fragment>
        ))}

        <Button type="submit">Update</Button>
      </form>
    </Form>
  </React.Fragment>
</div>
</div> */}
