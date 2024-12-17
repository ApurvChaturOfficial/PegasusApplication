import React from 'react'
import { BaseHeader, ButtonBack, ButtonLink4, Buttontag3, DownloadButton, FirstRow, LastRow, LastRowInfo, LicenseFormNumber, LicenseInfoTag, LicenseInfoTag2, UploadButton } from '../../style';
import getAlertSymbolLetter from '@/bLove/dUtility/eGetAlertSymbolLetter';


const ServiceTabUpdateComponent = (props: any) => {
  // Destructure Props
  const { 
    setServiceTabList,
    setServiceTabCreate,
    setServiceTabUpdate,
    APICall,
    // ReduxCall,
    // organizationID                                                             
  } = props

  // Event Handlers
  const activateServiceList = () => {
    setServiceTabList(true)
    setServiceTabCreate(false)
    setServiceTabUpdate(false)
  }
  
  // JSX
  return (
    <React.Fragment>
      {/* ServiceTabUpdateComponent */}

      {
        APICall.serviceRetrieveAPIResponse.isLoading ? "Loading..." : 
        APICall.serviceRetrieveAPIResponse.isError ? "Error..." :
        APICall.serviceRetrieveAPIResponse.isSuccess ? (
          <React.Fragment>
            {
              APICall.serviceRetrieveAPIResponse.data.success ? (
                <React.Fragment>
                  <FirstRow>
                    <ButtonBack onClick={() => activateServiceList()}>&lt; Back</ButtonBack>
                  </FirstRow>
                  <FirstRow>
                    <LicenseFormNumber>
                      <LicenseInfoTag>{APICall.serviceRetrieveAPIResponse.data.retrieve.dLicenseNumber}</LicenseInfoTag>
                      <BaseHeader>License Form Number</BaseHeader>
                    </LicenseFormNumber>
                    <LicenseFormNumber>
                      <LicenseInfoTag2>
                        {getAlertSymbolLetter(APICall.serviceRetrieveAPIResponse.data.retrieve.dExpiryDate)}
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
                        {APICall.serviceRetrieveAPIResponse.data.retrieve.dLicenseNumber}
                      </LicenseInfoTag>
                      <BaseHeader>License Number</BaseHeader>
                    </LicenseFormNumber>
                  </FirstRow>

                  <LastRow>
                    <LastRowInfo>
                      <LicenseInfoTag>
                        {APICall.serviceRetrieveAPIResponse.data.retrieve.dIssueDate}
                      </LicenseInfoTag>
                      <BaseHeader>Date of Issue</BaseHeader>
                    </LastRowInfo>
                    <LastRowInfo>
                      <LicenseInfoTag>
                        {APICall.serviceRetrieveAPIResponse.data.retrieve.dExpiryDate}
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

export default ServiceTabUpdateComponent;
