import React from 'react'
import { BaseHeader, ButtonBack, ButtonLink4, Buttontag3, DownloadButton, FirstRow, LastRow, LastRowInfo, LicenseFormNumber, LicenseInfoTag, LicenseInfoTag2, UploadButton } from '../../style';
import { getAlertSymbolLetter } from '../..';


const LicenseTabRetrieveComponent = (props: any) => {
  // Destructure Props
  const { 
    setLicenseTabList,
    setLicenseTabCreate,
    setLicenseTabRetrieve,
    APICall,
    // ReduxCall,
    // organizationID                                                             
  } = props

  // Event Handlers
  const activateLicenseList = () => {
    setLicenseTabList(true)
    setLicenseTabCreate(false)
    setLicenseTabRetrieve(false)
  }
  
  // JSX
  return (
    <React.Fragment>
      {/* LicenseTabRetrieveComponent */}

      {
        APICall.licenseRetrieveAPIResponse.isLoading ? "Loading..." : 
        APICall.licenseRetrieveAPIResponse.isError ? "Error..." :
        APICall.licenseRetrieveAPIResponse.isSuccess ? (
          <React.Fragment>
            {
              APICall.licenseRetrieveAPIResponse.data.success ? (
                <React.Fragment>
                  <FirstRow>
                    <ButtonBack onClick={() => activateLicenseList()}>&lt; Back</ButtonBack>
                  </FirstRow>
                  <FirstRow>
                    <LicenseFormNumber>
                      <LicenseInfoTag>{APICall.licenseRetrieveAPIResponse.data.retrieve.dLicenseNumber}</LicenseInfoTag>
                      <BaseHeader>License Form Number</BaseHeader>
                    </LicenseFormNumber>
                    <LicenseFormNumber>
                      <LicenseInfoTag2>
                        {getAlertSymbolLetter(APICall.licenseRetrieveAPIResponse.data.retrieve.dExpiryDate)}
                      </LicenseInfoTag2>
                      <BaseHeader>Alert Status</BaseHeader>
                    </LicenseFormNumber>
                  </FirstRow>

                  <br />
                  <br />

                  {/* <FirstRow>
                    <LicenseFormNumber>
                      <LicenseInfoTag>{"(selectedLicense as any).category"}</LicenseInfoTag>
                      <BaseHeader>Category</BaseHeader>
                    </LicenseFormNumber>
                    <LicenseFormNumber>
                      <LicenseInfoTag>{"(selectedLicense as any).ownLoan"}</LicenseInfoTag>
                      <BaseHeader>Own/Loan</BaseHeader>
                    </LicenseFormNumber>
                  </FirstRow> */}

                  <FirstRow>
                    <LicenseFormNumber>
                      <LicenseInfoTag>
                        {APICall.licenseRetrieveAPIResponse.data.retrieve.dLicenseNumber}
                      </LicenseInfoTag>
                      <BaseHeader>License Number</BaseHeader>
                    </LicenseFormNumber>
                  </FirstRow>

                  <LastRow>
                    <LastRowInfo>
                      <LicenseInfoTag>
                        {APICall.licenseRetrieveAPIResponse.data.retrieve.dIssueDate}
                      </LicenseInfoTag>
                      <BaseHeader>Date of Issue</BaseHeader>
                    </LastRowInfo>
                    <LastRowInfo>
                      <LicenseInfoTag>
                        {APICall.licenseRetrieveAPIResponse.data.retrieve.dExpiryDate}
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
                </React.Fragment>
              ) : "Backend Error"
            }
          </React.Fragment>
        ) :
        "Let me understand first"
      } 

    </React.Fragment>
  )
}

export default LicenseTabRetrieveComponent;
