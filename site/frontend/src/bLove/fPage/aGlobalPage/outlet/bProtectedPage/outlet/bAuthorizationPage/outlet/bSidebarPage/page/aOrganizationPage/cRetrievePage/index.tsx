import React, { useEffect, useState } from "react"
import { Route, Routes, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
// import fullRoute from "@/bLove/gRoute/bFullRoute";

import organizationAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/dOrganizationAPIEndpoints";
import licenseAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/eLicenseAPIEndpoints";

import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import { AddButton, AddHeading, AddLicense, AddLicenseForm, AddressDetail, AddressTag, AlertTag, AlertTag2, BaseHeader, Button, ButtonBack, ButtonHeading, ButtonLink2, ButtonLink3, ButtonLink4, ButtonLinkReport2, ButtonTag, ButtonTag1, ButtonTag2, Buttontag3, CancelButton, CompanyContainer, CompanyEmail, CompanyHeading, Companyphone, CompName, ContactInfo, ContactInfoTag, ContactInput, ContactNum, DownloadButton, Dropdown, DropdownOption, ExpiryDate, FileInput, FileInputContainer, FileInputLabel, FirmDetail, FirmName, FirmType, FirstRow, Form, FormReport, Image, Image2, Image3, Input, Input2, InputHeading, InputReport, InspectionContainer, IssueDate, LastRow, LastRowInfo, LeftContainer, LicenseContainer, LicenseFormNumber, LicenseInfoTag, LicenseInfoTag2, LicenseSubContainer, LicenseTable, LineOne, MainContainer, NameHeading, PANCardTag, PANDetail, Para, ParaReport, RemainderContainer, ReportSubContainer, ReportTable, RightContainer, RightHeading, SearchButton, SearchButtonReport, TableBody, TableHeading, TableSection, UploadButton } from "./style";
import SubNavBar from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/outlet/bSidebarComponent/component/SubNavBar/SubNavBar";

import licenseicon from "@/bLove/hAsset/icon/file-badge.png";
import inspectionicon from "@/bLove/hAsset/icon/layers.png";
import documentsicon from "@/bLove/hAsset/icon/file-input.png";
import remaindersicon from "@/bLove/hAsset/icon/bell-ring.png";
import Filter from "@/bLove/hAsset/icon/filter.png";
import PlusSign from "@/bLove/hAsset/icon/plus-circle.png";
import EditIcon from "@/bLove/hAsset/icon/pencil.png";
import UploadIcon from "@/bLove/hAsset/icon/upload-cloud.png";
import DownloadIcon from "@/bLove/hAsset/icon/download.png";
import ViewIcon from "@/bLove/hAsset/icon/viewButton.png";
import Symbol1 from "@/bLove/hAsset/icon/greenTickMark.png";
import Symbol2 from "@/bLove/hAsset/icon/alert-triangle.png";
import Symbol3 from "@/bLove/hAsset/icon/red-alert-triangle.png";
import OrganizationRemainder from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/outlet/bSidebarComponent/component/OrganizationRemainder/OrganizationRemainder";

import CompanyTabComponent from "./component/aCompanyTabComponent";

import LicenseTabListComponent from "./component/bLicenseTabListComponent";
import LicenseTabCreateComponent from "./component/cLicenseTabCreateComponent";
import LicenseTabRetrieveComponent from "./component/dLicenseTabRetrieveComponent";

import LoaderComponent from "@/bLove/cComponent/aGlobalComponent/component/aLoaderComponent";
import ErrorComponent from "@/bLove/cComponent/aGlobalComponent/component/bErrorComponent";


export function formatDateToCustomString(date: any) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const day = date.getDate();
  const month = date.toLocaleString("en-GB", { month: "short" });
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
}

export const allLicenseType = [
  "License - 10",
  "License - 10A",
  "License - 11",
  "License - 11-A",
  "License - 12-B",
  "License - 25",
  "License - 25B",
  "License - 28",
  "License - 28-B",
  "License - 28-D",
  "License - 25-F",
  "License - 25-A",
  "License - 28-A",
  "License - 28-DA",
  "License - 25-D",
  "License - 25-E",
  "License - 25-C",
  "License - COS-2",
  "License - COS-3",
  "License - COS-4A",
  "License - COS-8",
  "License - COS-9",
  "License - Form 29",
  "License - Form 28-C",
  "License - Form 28-E",
  "License - Form 28-F",
  "License - Annexure C",
  "License - Form 37",
  "License - Form 48",
  "License - COS-23",
  "License - MD-2",
  "License - MD-5",
  "License - MD-6",
  "License - MD-9",
  "License - MD-10",
  "License - MD-13",
  "License - MD-15",
  "License - MD-17",
  "License - MD-19",
  "License - MD-21",
  "License - MD-23",
  "License - MD-25",
  "License - MD-27",
  "License - MD-29",
  "License - 20",
  "License - 20A",
  "License - 20B",
  "License - 20BB",
  "License - 20C",
  "License - 20D",
  "License - 20F",
  "License - 20G",
  "License - 21",
  "License - 21A",
  "License - 21B",
  "License - 21BB",
];

export const getAlertSymbolLetter = (dateOfExpiry: any) => {
  const currentDate = new Date();
  const expiryDate = new Date(dateOfExpiry);
  const differenceInDays = Math.floor(
    ((expiryDate as any) - (currentDate as any)) / (1000 * 60 * 60 * 24)
  );

  if (differenceInDays > 180) {
    return <AlertTag>Expiring in more than 6 months</AlertTag>;
  } else if (differenceInDays > 60) {
    return <AlertTag>Expiring in {differenceInDays} days</AlertTag>;
  } else if (differenceInDays < 0) {
    return <AlertTag>License Expired</AlertTag>;
  } else {
    return <AlertTag>Expiring in {differenceInDays} days</AlertTag>;
  }
};

export const getAlertSymbolLetter2 = (dateOfExpiry: any) => {
  const currentDate = new Date();
  const expiryDate = new Date(dateOfExpiry);
  const differenceInDays = Math.floor(
    ((expiryDate as any) - (currentDate as any)) / (1000 * 60 * 60 * 24)
  );

  if (differenceInDays > 180) {
    return <AlertTag2>Expiring in more than 6 months</AlertTag2>;
  } else if (differenceInDays > 60) {
    return <AlertTag2>Expiring in {differenceInDays} days</AlertTag2>;
  } else if (differenceInDays < 0) {
    return <AlertTag2>License Expired</AlertTag2>;
  } else {
    return <AlertTag2>Expiring in {differenceInDays} days</AlertTag2>;
  }
};


function NewLicenses({ newLicense, toggleNewLicense, licensesData }: any) {
  const [searchInput, setSearchInput] = useState("");

  const [selectedLicense, setSelectedLicense] = useState(null);

  const handleViewClick = (license: any) => {
    setSelectedLicense(license);
  };

  const handleBackToTable = () => {
    setSelectedLicense(null);
  };

  const [formData, setFormData] = useState({
    licenseNumber: "",
    issueDate: "",
    expiryDate: "",
    selectedLicense: "",
    file: null,
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Reset form data
    setFormData({
      licenseNumber: "",
      issueDate: "",
      expiryDate: "",
      selectedLicense: "",
      file: null,
    });
  };

  const handleSearchInputChange = (event: any) => {
    setSearchInput(event.target.value);
  };

  const license = [
    "License - 10",
    "License - 10A",
    "License - 11",
    "License - 11-A",
    "License - 12-B",
    "License - 25",
    "License - 25B",
    "License - 28",
    "License - 28-B",
    "License - 28-D",
    "License - 25-F",
    "License - 25-A",
    "License - 28-A",
    "License - 28-DA",
    "License - 25-D",
    "License - 25-E",
    "License - 25-C",
    "License - COS-2",
    "License - COS-3",
    "License - COS-4A",
    "License - COS-8",
    "License - COS-9",
    "License - Form 29",
    "License - Form 28-C",
    "License - Form 28-E",
    "License - Form 28-F",
    "License - Annexure C",
    "License - Form 37",
    "License - Form 48",
    "License - COS-23",
    "License - MD-2",
    "License - MD-5",
    "License - MD-6",
    "License - MD-9",
    "License - MD-10",
    "License - MD-13",
    "License - MD-15",
    "License - MD-17",
    "License - MD-19",
    "License - MD-21",
    "License - MD-23",
    "License - MD-25",
    "License - MD-27",
    "License - MD-29",
    "License - 20",
    "License - 20A",
    "License - 20B",
    "License - 20BB",
    "License - 20C",
    "License - 20D",
    "License - 20F",
    "License - 20G",
    "License - 21",
    "License - 21A",
    "License - 21B",
    "License - 21BB",
  ];

  const getAlertSymbol = (dateOfExpiry: any) => {
    const currentDate = new Date();
    const expiryDate = new Date(dateOfExpiry);
    const differenceInMonths =
      ((expiryDate as any) - (currentDate as any)) / (1000 * 60 * 60 * 24 * 30);

    if (differenceInMonths > 6) {
      return <Image2 src={Symbol1} alt="Symbol1" />;
    } else if (differenceInMonths > 2) {
      return <Image2 src={Symbol2} alt="Symbol2" />;
    } else {
      return <Image2 src={Symbol3} alt="Symbol3" />;
    }
  };

  const getAlertSymbolLetter = (dateOfExpiry: any) => {
    const currentDate = new Date();
    const expiryDate = new Date(dateOfExpiry);
    const differenceInDays = Math.floor(
      ((expiryDate as any) - (currentDate as any)) / (1000 * 60 * 60 * 24)
    );

    if (differenceInDays > 180) {
      return <AlertTag>Expiring in more than 6 months</AlertTag>;
    } else if (differenceInDays > 60) {
      return <AlertTag>Expiring in {differenceInDays} days</AlertTag>;
    } else if (differenceInDays < 0) {
      return <AlertTag>License Expired</AlertTag>;
    } else {
      return <AlertTag>Expiring in {differenceInDays} days</AlertTag>;
    }
  };

  if (newLicense) {
    return (
      <>
        <LicenseSubContainer>
          {!selectedLicense ? (
            <>
              <Form>
                <Input
                  type="text"
                  placeholder="Search Your License"
                  name="search"
                  value={searchInput}
                  onChange={handleSearchInputChange}
                />
                <SearchButton type="submit">
                  <Image src={Filter} alt="Filter" />
                  <Para>Filter</Para>
                </SearchButton>

                <ButtonLink2 onClick={toggleNewLicense}>
                  <Image src={PlusSign} alt="PlusSign" />
                  <Para>Add</Para>
                </ButtonLink2>
              </Form>
              <LicenseTable>
                <TableSection>
                  <TableHeading>License</TableHeading>
                  <TableHeading>Category</TableHeading>
                  <TableHeading>Own/Loan</TableHeading>
                  <TableHeading>License Number</TableHeading>
                  <TableHeading>Date of Issue</TableHeading>
                  <TableHeading>Date of Expiry</TableHeading>
                  <TableHeading>Alerts</TableHeading>
                  <TableHeading>Upload</TableHeading>
                  <TableHeading>Download</TableHeading>
                  <TableHeading>Actions</TableHeading>
                </TableSection>
                {licensesData.map((license: any, index: any) => (
                  <TableSection key={index}>
                    <TableBody>{license.license}</TableBody>
                    <TableBody>{license.category}</TableBody>
                    <TableBody>{license.ownLoan}</TableBody>
                    <TableBody>{license.licenseNumber}</TableBody>
                    <TableBody>
                      {formatDateToCustomString(license.dateOfIssue)}
                    </TableBody>
                    <TableBody>
                      {formatDateToCustomString(license.dateOfExpiry)}
                    </TableBody>
                    <TableBody>
                      {getAlertSymbol(license.dateOfExpiry)}
                    </TableBody>
                    <TableBody>
                      <ButtonLink3>
                        <Image2 src={UploadIcon} alt="Upload" />
                      </ButtonLink3>
                    </TableBody>
                    <TableBody>
                      <ButtonLink3>
                        <Image2 src={DownloadIcon} alt="Download" />
                      </ButtonLink3>
                    </TableBody>
                    <TableBody>
                      <ButtonLink3 onClick={() => handleViewClick(license)}>
                        <Image3 src={ViewIcon} alt="View" />
                      </ButtonLink3>
                    </TableBody>
                  </TableSection>
                ))}
              </LicenseTable>
            </>
          ) : (
            <>
              <FirstRow>
                <ButtonBack onClick={handleBackToTable}>&lt; Back</ButtonBack>
              </FirstRow>
              <FirstRow>
                <LicenseFormNumber>
                  <LicenseInfoTag>{(selectedLicense as any).license}</LicenseInfoTag>
                  <BaseHeader>License Form Number</BaseHeader>
                </LicenseFormNumber>
                <LicenseFormNumber>
                  <LicenseInfoTag2>
                    {getAlertSymbolLetter((selectedLicense as any).dateOfExpiry)}
                  </LicenseInfoTag2>
                  <BaseHeader>Alert Status</BaseHeader>
                </LicenseFormNumber>
              </FirstRow>

              <FirstRow>
                <LicenseFormNumber>
                  <LicenseInfoTag>{(selectedLicense as any).category}</LicenseInfoTag>
                  <BaseHeader>Category</BaseHeader>
                </LicenseFormNumber>
                <LicenseFormNumber>
                  <LicenseInfoTag>{(selectedLicense as any).ownLoan}</LicenseInfoTag>
                  <BaseHeader>Own/Loan</BaseHeader>
                </LicenseFormNumber>
              </FirstRow>

              <FirstRow>
                <LicenseFormNumber>
                  <LicenseInfoTag>
                    {(selectedLicense as any).licenseNumber}
                  </LicenseInfoTag>
                  <BaseHeader>License Number</BaseHeader>
                </LicenseFormNumber>
              </FirstRow>

              <LastRow>
                <LastRowInfo>
                  <LicenseInfoTag>
                    {formatDateToCustomString((selectedLicense as any).dateOfIssue)}
                  </LicenseInfoTag>
                  <BaseHeader>Date of Issue</BaseHeader>
                </LastRowInfo>
                <LastRowInfo>
                  <LicenseInfoTag>
                    {formatDateToCustomString((selectedLicense as any).dateOfExpiry)}
                  </LicenseInfoTag>
                  <BaseHeader>Date of Expiry</BaseHeader>
                </LastRowInfo>
                <Buttontag3>
                  <DownloadButton onClick={handleBackToTable}>
                    Download
                  </DownloadButton>
                  <UploadButton onClick={handleBackToTable}>
                    Upload
                  </UploadButton>
                </Buttontag3>
              </LastRow>
              <FirstRow>
                <ButtonLink4 onClick={handleBackToTable}>
                  Renew License
                </ButtonLink4>
              </FirstRow>
            </>
          )}
        </LicenseSubContainer>
      </>
    );
  } else {
    return (
      <>
        <AddLicense>
          <AddHeading>Add License</AddHeading>
          <AddLicenseForm onSubmit={handleSubmit}>
            <InputHeading>Select License</InputHeading>
            <Dropdown
              name="selectedLicense"
              value={formData.selectedLicense}
              onChange={handleInputChange}
            >
              <DropdownOption value="" disabled>
                Select License
              </DropdownOption>
              {license.map((state) => (
                <DropdownOption
                  key={state}
                  value={state.toLowerCase().replace(/\s+/g, "-")}
                >
                  {state}
                </DropdownOption>
              ))}
            </Dropdown>
            <InputHeading>Enter License Number</InputHeading>
            <Input2
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
                onChange={handleFileChange}
              />
            </FileInputContainer>
            {/* {formData.file && (
              <UploadedFile>Uploaded File: {formData.file.name}</UploadedFile>
            )} */}

            <ButtonTag>
              <AddButton type="submit" onClick={toggleNewLicense}>
                <Para>Add New</Para>
              </AddButton>
              <CancelButton onClick={toggleNewLicense}>
                <Para>Cancel</Para>
              </CancelButton>
            </ButtonTag>
          </AddLicenseForm>
        </AddLicense>
      </>
    );
  }
}

function NewReports({ newReport, toggleNewReport, reportData = [] }: any) {
  const [report, _setReport] = useState(reportData);

  const [searchInput, setSearchInput] = useState("");

  const [_selectedReport, _setSelectedReport] = useState(null);

  // const handleBackToTable = () => {
  //   setSelectedReport(null);
  // };

  const [formData, setFormData] = useState({
    reportName: "",
    uploadDate: "",
    file: null,
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Reset form data
    setFormData({
      reportName: "",
      uploadDate: "",
      file: null,
    });
  };

  const handleSearchInputChange = (event: any) => {
    setSearchInput(event.target.value);
  };

  if (newReport) {
    return (
      <>
        <ReportSubContainer>
          <FormReport>
            <InputReport
              type="text"
              placeholder="Search Your Report"
              name="search"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
            <SearchButtonReport type="submit">
              <Image src={Filter} alt="Filter" />
              <ParaReport>Filter</ParaReport>
            </SearchButtonReport>

            <ButtonLinkReport2 onClick={toggleNewReport}>
              <Image src={PlusSign} alt="PlusSign" />
              <Para>Add</Para>
            </ButtonLinkReport2>
          </FormReport>
          <ReportTable>
            <TableSection>
              <TableHeading>Report Name</TableHeading>
              <TableHeading>Date Uploaded</TableHeading>
              <TableHeading>Download</TableHeading>
              <TableHeading>Edit</TableHeading>
            </TableSection>
            {report.length > 0 ? (
              report.map((report: any, index: any) => (
                <TableSection key={index}>
                  <TableBody>{report.reportName}</TableBody>
                  <TableBody>
                    {formatDateToCustomString(report.uploadDate)}
                  </TableBody>
                  <TableBody>
                    <ButtonLink3>
                      <Image2 src={DownloadIcon} alt="Download" />
                    </ButtonLink3>
                  </TableBody>
                  <TableBody>
                    <ButtonLink3>
                      <Image2 src={EditIcon} alt="Edit" />
                    </ButtonLink3>
                  </TableBody>
                </TableSection>
              ))
            ) : (
              <></>
            )}
          </ReportTable>
        </ReportSubContainer>
      </>
    );
  } else {
    return (
      <>
        <AddLicense>
          <AddHeading>Add Inspection Reports</AddHeading>
          <AddLicenseForm onSubmit={handleSubmit}>
            <InputHeading>Report Name</InputHeading>
            <Input2
              type="text"
              name="reportName"
              placeholder="Enter Report Name"
              value={formData.reportName}
              onChange={handleInputChange}
            />
            <ContactInfo>
              <IssueDate>
                <InputHeading>Date of Upload</InputHeading>
                <ContactInput
                  type="date"
                  name="uploadDate"
                  value={formData.uploadDate}
                  onChange={handleInputChange}
                />
              </IssueDate>
            </ContactInfo>
            <InputHeading>Upload Scan Copy</InputHeading>
            <FileInputContainer>
              <FileInputLabel htmlFor="fileInput">Choose File</FileInputLabel>
              <FileInput
                type="file"
                id="fileInput"
                onChange={handleFileChange}
              />
            </FileInputContainer>
            {/* {formData.file && (
              <UploadedFile>Uploaded File: {formData.file.name}</UploadedFile>
            )} */}

            <ButtonTag>
              <AddButton type="submit" onClick={toggleNewReport}>
                <Para>Add New</Para>
              </AddButton>
              <CancelButton onClick={toggleNewReport}>
                <Para>Cancel</Para>
              </CancelButton>
            </ButtonTag>
          </AddLicenseForm>
        </AddLicense>
      </>
    );
  }
}

const OrganizationRetrievePage = () => {
  // Variable
  const { id } = useParams()

  // State Variable
  const [newLicense, setNewLicense] = useState(true);
  const [newReport, setNewReport] = useState(true);

  const [companyTab, setCompanyTab] = useState(true);
  const [licenseTab, setLicenseTab] = useState(false);
  const [reminderTab, setReminderTab] = useState(false);
  const [inspectionTab, setInspectionTab] = useState(false);
  const [documentTab, setDocumentTab] = useState(false);
  const [serviceTab, setServiceTab] = useState(false)

  const [licenseTabList, setLicenseTabList] = useState(false)
  const [licenseTabCreate, setLicenseTabCreate] = useState(false)
  const [licenseTabRetrieve, setLicenseTabRetrieve] = useState(false)

  const toggleNewLicense = () => {
    setNewLicense(!newLicense);
  };

  const toggleNewReport = () => {
    setNewReport(!newReport);
  };

  // Redux Call
  const ReduxCall = {
    state: useSelector((fullState: RootState) => fullState.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }

  // API Call
  const [lazyLicenseListAPITrigger, lazyLicenseListAPIResponse] = licenseAPIEndpoint.useLazyLicenseListAPIQuery()
  const [lazyLicenseRetrieveAPITrigger, lazyLicenseRetrieveAPIResponse] = licenseAPIEndpoint.useLazyLicenseRetrievePIQuery()
  
  const APICall = {
    retrieveAPIResponse: organizationAPIEndpoint.useOrganizationRetrievePIQuery({ params: { _id: id } }),
    
    // Requirements... Muaaah...
    licenseListAPITrigger: lazyLicenseListAPITrigger,
    licenseListAPIResponse: lazyLicenseListAPIResponse,

    licenseCreateAPITrigger: licenseAPIEndpoint.useLicenseCreateAPIMutation()[0],
    licenseCreateAPIResponse: licenseAPIEndpoint.useLicenseCreateAPIMutation()[1],

    licenseRetrieveAPITrigger: lazyLicenseRetrieveAPITrigger,
    licenseRetrieveAPIResponse: lazyLicenseRetrieveAPIResponse,

  }  

  // Extra Render
  useEffect(() => {
    console.log(APICall.licenseListAPIResponse)
  }, [APICall.licenseListAPIResponse])

  // JSX
  return (
    <React.Fragment>
      {/* OrganizationRetrievePage */}

      {/* {
        APICall.retrieveAPIResponse.isLoading ? "Loading..." : 
        APICall.retrieveAPIResponse.isError ? "Error..." :
        APICall.retrieveAPIResponse.isSuccess ? (
          <React.Fragment>
            {
              APICall.retrieveAPIResponse.data.success ? (
                <React.Fragment>
                  <div>
                    <p>{APICall.retrieveAPIResponse.data.retrieve?.aTitle}</p>
                    <p>{APICall.retrieveAPIResponse.data.retrieve?.dLicenseNumber}</p>
                  </div>
                </React.Fragment>
              ) : "Backend Error"
            }
          </React.Fragment>
        ) :
        "Let me understand first"
      } */}

      <>
        <TopNavBarComponent />
        {
            APICall.retrieveAPIResponse.isLoading ? <LoaderComponent /> : 
            APICall.retrieveAPIResponse.isError ? <ErrorComponent message="Error..." /> :
            APICall.retrieveAPIResponse.isSuccess ? (
              <React.Fragment>
                {
                  APICall.retrieveAPIResponse.data.success ? (
                    <React.Fragment>
                      <CompanyContainer>
                        <CompanyHeading>{APICall.retrieveAPIResponse.data.retrieve.dName || "XXXX XXXXX XXXX XXXXX"}</CompanyHeading>
                        <SubNavBar 
                          companyTab={companyTab} setCompanyTab={setCompanyTab}
                          licenseTab={licenseTab} setLicenseTab={setLicenseTab} licenseListAPITrigger={APICall.licenseListAPITrigger} licenseRetrieveAPITrigger={APICall.licenseRetrieveAPITrigger}
                          reminderTab={reminderTab} setReminderTab={setReminderTab}
                          inspectionTab={inspectionTab} setInspectionTab={setInspectionTab}
                          documentTab={documentTab} setDocumentTab={setDocumentTab}
                          serviceTab={serviceTab} setServiceTab={setServiceTab}
                          licenseTabList={licenseTabList} setLicenseTabList={setLicenseTabList}
                          licenseTabCreate={licenseTabCreate} setLicenseTabCreate={setLicenseTabCreate}
                          licenseTabRetrieve={licenseTabRetrieve} setLicenseTabRetrieve={setLicenseTabRetrieve}
                        />

                        {companyTab && (
                          <React.Fragment>
                            {/* Company */}
                            <CompanyTabComponent APICall={APICall} />
                          </React.Fragment>
                        )}

                        
                        {licenseTab && (
                          <React.Fragment>
                            {/* License */}

                            {licenseTabList && (
                              <React.Fragment>
                                {/* LicenseTabList */}
                                <LicenseTabListComponent 
                                  setLicenseTabList={setLicenseTabList}
                                  setLicenseTabCreate={setLicenseTabCreate}
                                  setLicenseTabRetrieve={setLicenseTabRetrieve}
                                  APICall={APICall}
                                  ReduxCall={ReduxCall}
                                  organizationID={id}
                                />
                              </React.Fragment>
                            )}

                            {licenseTabCreate && (
                              <React.Fragment>
                                {/* LicenseTabCreate */}
                                <LicenseTabCreateComponent 
                                  setLicenseTabList={setLicenseTabList}
                                  setLicenseTabCreate={setLicenseTabCreate}
                                  setLicenseTabRetrieve={setLicenseTabRetrieve} 
                                  APICall={APICall}
                                  // ReduxCall={ReduxCall}
                                  organizationID={id}                               
                                />
                              </React.Fragment>
                            )}

                            {licenseTabRetrieve && (
                              <React.Fragment>
                                {/* LicenseTabRetrieve */}
                                <LicenseTabRetrieveComponent 
                                  setLicenseTabList={setLicenseTabList}
                                  setLicenseTabCreate={setLicenseTabCreate}
                                  setLicenseTabRetrieve={setLicenseTabRetrieve} 
                                  APICall={APICall}
                                  // ReduxCall={ReduxCall}
                                  // organizationID={id}                                                              
                                />
                              </React.Fragment>
                            )}

                            {/* <>
                              <FirstRow>
                                <ButtonBack onClick={() => "handleBackToTable"}>&lt; Back</ButtonBack>
                              </FirstRow>
                              <FirstRow>
                                <LicenseFormNumber>
                                  <LicenseInfoTag>{"(selectedLicense as any).license"}</LicenseInfoTag>
                                  <BaseHeader>License Form Number</BaseHeader>
                                </LicenseFormNumber>
                                <LicenseFormNumber>
                                  <LicenseInfoTag2>
                                    {"getAlertSymbolLetter((selectedLicense as any).dateOfExpiry)"}
                                  </LicenseInfoTag2>
                                  <BaseHeader>Alert Status</BaseHeader>
                                </LicenseFormNumber>
                              </FirstRow>

                              <FirstRow>
                                <LicenseFormNumber>
                                  <LicenseInfoTag>{"(selectedLicense as any).category"}</LicenseInfoTag>
                                  <BaseHeader>Category</BaseHeader>
                                </LicenseFormNumber>
                                <LicenseFormNumber>
                                  <LicenseInfoTag>{"(selectedLicense as any).ownLoan"}</LicenseInfoTag>
                                  <BaseHeader>Own/Loan</BaseHeader>
                                </LicenseFormNumber>
                              </FirstRow>

                              <FirstRow>
                                <LicenseFormNumber>
                                  <LicenseInfoTag>
                                    {"(selectedLicense as any).licenseNumber"}
                                  </LicenseInfoTag>
                                  <BaseHeader>License Number</BaseHeader>
                                </LicenseFormNumber>
                              </FirstRow>

                              <LastRow>
                                <LastRowInfo>
                                  <LicenseInfoTag>
                                    {"formatDateToCustomString((selectedLicense as any).dateOfIssue)"}
                                  </LicenseInfoTag>
                                  <BaseHeader>Date of Issue</BaseHeader>
                                </LastRowInfo>
                                <LastRowInfo>
                                  <LicenseInfoTag>
                                    {"formatDateToCustomString((selectedLicense as any).dateOfExpiry)"}
                                  </LicenseInfoTag>
                                  <BaseHeader>Date of Expiry</BaseHeader>
                                </LastRowInfo>
                                <Buttontag3>
                                  <DownloadButton onClick={() => "handleBackToTable"}>
                                    Download
                                  </DownloadButton>
                                  <UploadButton onClick={() => "handleBackToTable"}>
                                    Upload
                                  </UploadButton>
                                </Buttontag3>
                              </LastRow>
                              <FirstRow>
                                <ButtonLink4 onClick={() => 'handleBackToTable'}>
                                  Renew License
                                </ButtonLink4>
                              </FirstRow>
                            </> */}

                            {/* <>
                              <AddLicense>
                                <AddHeading>Add License</AddHeading>
                                <AddLicenseForm onSubmit={() => "handleSubmit"}>
                                  <InputHeading>Select License</InputHeading>
                                  <Dropdown
                                    name="selectedLicense"
                                    // value={formData.selectedLicense}
                                    // onChange={handleInputChange}
                                  >
                                    <DropdownOption value="" disabled>
                                      Select License
                                    </DropdownOption>
                                    {[1, 2, 3].map((state) => (
                                      <DropdownOption
                                        key={state}
                                        // value={state.toLowerCase().replace(/\s+/g, "-")}
                                      >
                                        {state}
                                      </DropdownOption>
                                    ))}
                                  </Dropdown>
                                  <InputHeading>Enter License Number</InputHeading>
                                  <Input2
                                    type="text"
                                    name="licenseNumber"
                                    placeholder="Enter License ID Number"
                                    // value={formData.licenseNumber}
                                    // onChange={handleInputChange}
                                  />
                                  <ContactInfo>
                                    <IssueDate>
                                      <InputHeading>Date of Issue</InputHeading>
                                      <ContactInput
                                        type="date"
                                        name="issueDate"
                                        // value={formData.issueDate}
                                        // onChange={handleInputChange}
                                      />
                                    </IssueDate>
                                    <ExpiryDate>
                                      <InputHeading>Date of Expiry</InputHeading>
                                      <ContactInput
                                        type="date"
                                        name="expiryDate"
                                        // value={formData.expiryDate}
                                        // onChange={handleInputChange}
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
                                    />
                                  </FileInputContainer>
                                  {formData.file && (
                                    <UploadedFile>Uploaded File: {formData.file.name}</UploadedFile>
                                  )}

                                  <ButtonTag>
                                    <AddButton type="submit" onClick={toggleNewLicense}>
                                      <Para>Add New</Para>
                                    </AddButton>
                                    <CancelButton onClick={toggleNewLicense}>
                                      <Para>Cancel</Para>
                                    </CancelButton>
                                  </ButtonTag>
                                </AddLicenseForm>
                              </AddLicense>
                            </> */}

                            {/* <>
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

                                <ButtonLink2 onClick={toggleNewLicense}>
                                  <Image src={PlusSign} alt="PlusSign" />
                                  <Para>Add</Para>
                                </ButtonLink2>
                              </Form>
                              <LicenseTable>
                                <TableSection>
                                  <TableHeading>License</TableHeading>
                                  <TableHeading>Category</TableHeading>
                                  <TableHeading>Own/Loan</TableHeading>
                                  <TableHeading>License Number</TableHeading>
                                  <TableHeading>Date of Issue</TableHeading>
                                  <TableHeading>Date of Expiry</TableHeading>
                                  <TableHeading>Alerts</TableHeading>
                                  <TableHeading>Upload</TableHeading>
                                  <TableHeading>Download</TableHeading>
                                  <TableHeading>Actions</TableHeading>
                                </TableSection>
                                {[1, 2, 3].map((license: any, index: any) => (
                                  <TableSection key={index}>
                                    <TableBody>{license.license}</TableBody>
                                    <TableBody>{license.category}</TableBody>
                                    <TableBody>{license.ownLoan}</TableBody>
                                    <TableBody>{license.licenseNumber}</TableBody>
                                    <TableBody>
                                      {formatDateToCustomString(license.dateOfIssue)}
                                    </TableBody>
                                    <TableBody>
                                      {formatDateToCustomString(license.dateOfExpiry)}
                                    </TableBody>
                                    <TableBody>
                                      {"getAlertSymbol(license.dateOfExpiry)"}
                                    </TableBody>
                                    <TableBody>
                                      <ButtonLink3>
                                        <Image2 src={UploadIcon} alt="Upload" />
                                      </ButtonLink3>
                                    </TableBody>
                                    <TableBody>
                                      <ButtonLink3>
                                        <Image2 src={DownloadIcon} alt="Download" />
                                      </ButtonLink3>
                                    </TableBody>
                                    <TableBody>
                                      <ButtonLink3 onClick={() => "handleViewClick(license)"}>
                                        <Image3 src={ViewIcon} alt="View" />
                                      </ButtonLink3>
                                    </TableBody>
                                  </TableSection>
                                ))}
                              </LicenseTable>
                            </> */}

                          </React.Fragment>
                        )}
                        
                        {reminderTab && (
                          <React.Fragment>
                            {/* Reminder */}
                          </React.Fragment>
                        )}
                        
                        {inspectionTab && (
                          <React.Fragment>
                            Inspection
                          </React.Fragment>
                        )}
                        
                        {documentTab && (
                          <React.Fragment>
                            Document
                          </React.Fragment>
                        )}
                        
                        {serviceTab && (
                          <React.Fragment>
                            Service
                          </React.Fragment>
                        )}
                        
                        <Routes>
                          <Route
                            path="/"
                            element={
                              <>
                                {/* <MainContainer>
                                  <LeftContainer>
                                    <FirmName>
                                      <CompName>{APICall.retrieveAPIResponse.data.retrieve.dName}</CompName>
                                      <NameHeading>Firm Name</NameHeading>
                                    </FirmName>
                                    <FirmType>
                                      <FirmDetail>{APICall.retrieveAPIResponse.data.retrieve.dType}</FirmDetail>
                                      <NameHeading>Firm Type</NameHeading>
                                    </FirmType>
                                    <ContactInfoTag>
                                      <Companyphone>
                                        <ContactNum>{APICall.retrieveAPIResponse.data.retrieve.dPhoneNumber}</ContactNum>
                                        <NameHeading>Phone Number</NameHeading>
                                      </Companyphone>
                                      <CompanyEmail>
                                        <ContactNum>{APICall.retrieveAPIResponse.data.retrieve.dCompanyEmail}</ContactNum>
                                        <NameHeading>Email</NameHeading>
                                      </CompanyEmail>
                                    </ContactInfoTag>
                                    <AddressTag>
                                      <AddressDetail>{APICall.retrieveAPIResponse.data.retrieve.dAddress}</AddressDetail>
                                      <NameHeading>Address</NameHeading>
                                    </AddressTag>
                                    <PANCardTag>
                                      <PANDetail>{APICall.retrieveAPIResponse.data.retrieve.dPanNumber}</PANDetail>
                                      <NameHeading>PAN Card</NameHeading>
                                    </PANCardTag>
                                  </LeftContainer>
                                  <RightContainer>
                                    <RightHeading>Documents</RightHeading>
                                    <LineOne>
                                      <ButtonTag1>
                                        <ButtonHeading>Licenses</ButtonHeading>
                                        <Button to="licenses">
                                          <Image src={licenseicon} />
                                          Licenses
                                        </Button>
                                      </ButtonTag1>
                                      <ButtonTag2>
                                        <ButtonHeading>Inspections</ButtonHeading>
                                        <Button to="inspections">
                                          <Image src={inspectionicon} />
                                          Inspections
                                        </Button>
                                      </ButtonTag2>
                                    </LineOne>
                                    <LineOne>
                                      <ButtonTag1>
                                        <ButtonHeading>Documents</ButtonHeading>
                                        <Button to="documents">
                                          <Image src={documentsicon} />
                                          Documents
                                        </Button>
                                      </ButtonTag1>
                                      <ButtonTag2>
                                        <ButtonHeading>Remainders</ButtonHeading>
                                        <Button to="remainders">
                                          <Image src={remaindersicon} />
                                          Remainders
                                        </Button>
                                      </ButtonTag2>
                                    </LineOne>
                                  </RightContainer>
                                </MainContainer> */}
                              </>
                            }
                          />
                          <Route
                            path="licenses"
                            element={
                              <>
                                <LicenseContainer>
                                  <NewLicenses
                                    newLicense={newLicense}
                                    toggleNewLicense={toggleNewLicense}
                                    licensesData={"company.licenses"}
                                  />
                                </LicenseContainer>
                              </>
                            }
                          />
                          <Route
                            path="inspection-reports"
                            element={
                              <>
                                <InspectionContainer>
                                  <NewReports
                                    newReport={newReport}
                                    toggleNewReport={toggleNewReport}
                                    reportData={"company.report"}
                                  />
                                </InspectionContainer>
                              </>
                            }
                          />
                          <Route path="documents" element={<h2>Documents Page</h2>} />
                          <Route
                            path="reminders"
                            element={
                              <>
                                <RemainderContainer>
                                  <OrganizationRemainder  />
                                </RemainderContainer>
                              </>
                            }
                          />
                        </Routes>
                      </CompanyContainer>
                    </React.Fragment>
                  ) : <ErrorComponent message="Backend Error..." />
                }
              </React.Fragment>
            ) :
            <ErrorComponent message="Let me understand first..." />
          }
      </>
    </React.Fragment>
  )
}

export default OrganizationRetrievePage;
