import React, { useState } from "react"
import { BackButton, ButtonTag, Heading, LeftContainer, MainContainer, RightContainer } from "./style";
import TopNavBarTwoComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarTwoComponent";
import SidebarNavigation from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/outlet/bSidebarComponent/component/SidebarNavigation/SidebarNavigation";
import SubNavBar2 from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/outlet/bSidebarComponent/component/SubNavBar2/SubNavBar2";
import { useNavigate, useParams } from "react-router-dom";
import fullRoute from "@/bLove/gRoute/bFullRoute";
import { useDispatch, useSelector } from "react-redux";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import { RootState } from "@/aConnection/dReduxConnection";
import licenseAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/eLicenseAPIEndpoints";
import documentAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/gDocumentAPIEndpoints";
import serviceAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/fServiceAPIEndpoints";
import organizationAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/dOrganizationAPIEndpoints";
import LoaderComponent from "@/bLove/cComponent/aGlobalComponent/component/aLoaderComponent";
import enrolledServiceAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/iEnrolledServiceAPIEndpoints";
import ErrorComponent from "@/bLove/cComponent/aGlobalComponent/component/bErrorComponent";

const CompanyTabComponent = React.lazy(() => import("./component/aCompanyTabComponent"));

const LicenseTabListComponent = React.lazy(() => import("./component/bLicenseTabListComponent"));
const LicenseTabCreateComponent = React.lazy(() => import("./component/cLicenseTabCreateComponent"));
const LicenseTabUpdateComponent = React.lazy(() => import("./component/dLicenseTabUpdateComponent"));

const DocumentTabListComponent = React.lazy(() => import("./component/hDocumentTabListComponent"));
const DocumentTabCreateComponent = React.lazy(() => import("./component/iDocumentTabCreateComponent"));
const DocumentTabUpdateComponent = React.lazy(() => import("./component/jDocumentTabUpdateComponent"));

const ServiceTabListComponent = React.lazy(() => import("./component/kServiceTabListComponent"));
const ServiceTabCreateComponent = React.lazy(() => import("./component/lServiceTabCreateComponent"));
const ServiceTabUpdateComponent = React.lazy(() => import("./component/mServiceTabUpdateComponent"));


const PaidCustomerRetrievePage = () => {
  // Variables
  const navigate = useNavigate();
  const { id } = useParams()

  // State Variable
  const [companyTab, setCompanyTab] = useState(true);
  const [licenseTab, setLicenseTab] = useState(false);
  const [documentTab, setDocumentTab] = useState(false);
  const [serviceTab, setServiceTab] = useState(false)
  const [paymentTab, setPaymentTab] = useState(false);

  const [licenseTabList, setLicenseTabList] = useState(false)
  const [licenseTabCreate, setLicenseTabCreate] = useState(false)
  const [licenseTabUpdate, setLicenseTabUpdate] = useState(false)

  const [documentTabList, setDocumentTabList] = useState(false)
  const [documentTabCreate, setDocumentTabCreate] = useState(false)
  const [documentTabUpdate, setDocumentTabUpdate] = useState(false)

  const [serviceTabList, setServiceTabList] = useState(false)
  const [serviceTabCreate, setServiceTabCreate] = useState(false)
  const [serviceTabUpdate, setServiceTabUpdate] = useState(false)
  
  // Redux Call
  const ReduxCall = {
    state: useSelector((fullState: RootState) => fullState.globalSlice),
    dispatch: useDispatch(),
    action: globalSlice.actions
  }

  // API Call
  const [lazyLicenseListAPITrigger, lazyLicenseListAPIResponse] = licenseAPIEndpoint.useLazyLicenseListAPIQuery()
  const [lazyLicenseRetrieveAPITrigger, lazyLicenseRetrieveAPIResponse] = licenseAPIEndpoint.useLazyLicenseRetrievePIQuery()
    
  const [lazyDocumentListAPITrigger, lazyDocumentListAPIResponse] = documentAPIEndpoint.useLazyDocumentListAPIQuery()
  const [lazyDocumentRetrieveAPITrigger, lazyDocumentRetrieveAPIResponse] = documentAPIEndpoint.useLazyDocumentRetrievePIQuery()
  
  const [lazyServiceListAPITrigger, lazyServiceListAPIResponse] = serviceAPIEndpoint.useLazyServiceListAPIQuery()
  
  const [lazyEnrolledServiceListAPITrigger, lazyEnrolledServiceListAPIResponse] = enrolledServiceAPIEndpoint.useLazyEnrolledServiceListAPIQuery()

  const APICall = {
    retrieveAPIResponse: organizationAPIEndpoint.useOrganizationRetrievePIQuery({ params: { _id: id } }),
    
    // Requirements... Muaaah...
    // License
    licenseListAPITrigger: lazyLicenseListAPITrigger,
    licenseListAPIResponse: lazyLicenseListAPIResponse,

    licenseCreateAPITrigger: licenseAPIEndpoint.useLicenseCreateAPIMutation()[0],
    licenseCreateAPIResponse: licenseAPIEndpoint.useLicenseCreateAPIMutation()[1],

    licenseRetrieveAPITrigger: lazyLicenseRetrieveAPITrigger,
    licenseRetrieveAPIResponse: lazyLicenseRetrieveAPIResponse,

    licenseUpdateAPITrigger: licenseAPIEndpoint.useLicenseUpdateAPIMutation()[0],
    licenseUpdateAPIResponse: licenseAPIEndpoint.useLicenseUpdateAPIMutation()[1],

    // Document
    documentListAPITrigger: lazyDocumentListAPITrigger,
    documentListAPIResponse: lazyDocumentListAPIResponse,

    documentCreateAPITrigger: documentAPIEndpoint.useDocumentCreateAPIMutation()[0],
    documentCreateAPIResponse: documentAPIEndpoint.useDocumentCreateAPIMutation()[1],

    documentRetrieveAPITrigger: lazyDocumentRetrieveAPITrigger,
    documentRetrieveAPIResponse: lazyDocumentRetrieveAPIResponse,    

    documentUpdateAPITrigger: documentAPIEndpoint.useDocumentUpdateAPIMutation()[0],
    documentUpdateAPIResponse: documentAPIEndpoint.useDocumentUpdateAPIMutation()[1],

    // Service
    serviceListAPITrigger: lazyServiceListAPITrigger,
    serviceListAPIResponse: lazyServiceListAPIResponse,

    // Enrolled Servcie
    enrolledServiceListAPITrigger: lazyEnrolledServiceListAPITrigger,
    enrolledServiceListAPIResponse: lazyEnrolledServiceListAPIResponse,   
    
    enrolledServiceUpdateAPITrigger: enrolledServiceAPIEndpoint.useEnrolledServiceUpdateAPIMutation()[0],
    enrolledServiceUpdateAPIResponse: enrolledServiceAPIEndpoint.useEnrolledServiceUpdateAPIMutation()[1],    
  }  
  
  // JSX
  return (
    <React.Fragment>
      {/* PaidCustomerRetrievePage */}

      <>
        <TopNavBarTwoComponent />
        <MainContainer>
          <LeftContainer>
            <SidebarNavigation />
          </LeftContainer>
          <RightContainer>
            <ButtonTag>
              <BackButton onClick={() => navigate(fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.iCustomerRoute.aPaidCustomerRoute.aPaidCustomerListRoute)}>&lt; Back</BackButton>
            </ButtonTag>

            {
              APICall.retrieveAPIResponse.isLoading ? <LoaderComponent /> : 
              APICall.retrieveAPIResponse.isError ? <ErrorComponent message="Error..." /> :
              APICall.retrieveAPIResponse.isSuccess ? (
                <React.Fragment>
                  {
                    APICall.retrieveAPIResponse.data.success ? (
                      <React.Fragment>
                        <Heading>{APICall.retrieveAPIResponse.data.retrieve?.dName || "XXXX XXXXX XXXX XXXXX"}</Heading>
                        <SubNavBar2
                          companyTab={companyTab} setCompanyTab={setCompanyTab}
                          licenseTab={licenseTab} setLicenseTab={setLicenseTab} licenseListAPITrigger={APICall.licenseListAPITrigger} 
                          documentTab={documentTab} setDocumentTab={setDocumentTab} documentListAPITrigger={APICall.documentListAPITrigger} 
                          serviceTab={serviceTab} setServiceTab={setServiceTab} enrolledServiceListAPITrigger={APICall.enrolledServiceListAPITrigger} 
                          paymentTab={paymentTab} setPaymentTab={setPaymentTab}
                          
                          licenseTabList={licenseTabList} setLicenseTabList={setLicenseTabList}
                          licenseTabCreate={licenseTabCreate} setLicenseTabCreate={setLicenseTabCreate}
                          licenseTabUpdate={licenseTabUpdate} setLicenseTabUpdate={setLicenseTabUpdate}
                          
                          documentTabList={documentTabList} setDocumentTabList={setDocumentTabList}
                          documentTabCreate={documentTabCreate} setDocumentTabCreate={setDocumentTabCreate}
                          documentTabUpdate={documentTabUpdate} setDocumentTabUpdate={setDocumentTabUpdate}
                          
                          serviceTabList={serviceTabList} setServiceTabList={setServiceTabList}
                          serviceTabCreate={serviceTabCreate} setServiceTabCreate={setServiceTabCreate}
                          serviceTabUpdate={serviceTabUpdate} setServiceTabUpdate={setServiceTabUpdate}
                        />

                        {companyTab && (
                          <React.Fragment>
                            {/* Company */}
                            <CompanyTabComponent 
                              APICall={APICall} 
                            />
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
                                  setLicenseTabUpdate={setLicenseTabUpdate}
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
                                  setLicenseTabUpdate={setLicenseTabUpdate} 
                                  APICall={APICall}
                                  // ReduxCall={ReduxCall}
                                  organizationID={id}                               
                                />
                              </React.Fragment>
                            )}

                            {licenseTabUpdate && (
                              <React.Fragment>
                                {/* LicenseTabUpdate */}
                                <LicenseTabUpdateComponent 
                                  setLicenseTabList={setLicenseTabList}
                                  setLicenseTabCreate={setLicenseTabCreate}
                                  setLicenseTabUpdate={setLicenseTabUpdate} 
                                  APICall={APICall}
                                  // ReduxCall={ReduxCall}
                                  organizationID={id}                                                              
                                />
                              </React.Fragment>
                            )}
                          </React.Fragment>
                        )}
                        
                        {documentTab && (
                          <React.Fragment>
                            {/* Document */}

                            {documentTabList && (
                              <React.Fragment>
                                {/* DocumentTabList */}
                                <DocumentTabListComponent 
                                  setDocumentTabList={setDocumentTabList}
                                  setDocumentTabCreate={setDocumentTabCreate}
                                  setDocumentTabUpdate={setDocumentTabUpdate}
                                  APICall={APICall}
                                  ReduxCall={ReduxCall}
                                  organizationID={id}
                                />
                              </React.Fragment>
                            )}

                            {documentTabCreate && (
                              <React.Fragment>
                                {/* DocumentTabCreate */}
                                <DocumentTabCreateComponent 
                                  setDocumentTabList={setDocumentTabList}
                                  setDocumentTabCreate={setDocumentTabCreate}
                                  setDocumentTabUpdate={setDocumentTabUpdate} 
                                  APICall={APICall}
                                  // ReduxCall={ReduxCall}
                                  organizationID={id}                               
                                />
                              </React.Fragment>
                            )}

                            {documentTabUpdate && (
                              <React.Fragment>
                                {/* DocumentTabUpdate */}
                                <DocumentTabUpdateComponent 
                                  setDocumentTabList={setDocumentTabList}
                                  setDocumentTabCreate={setDocumentTabCreate}
                                  setDocumentTabUpdate={setDocumentTabUpdate} 
                                  APICall={APICall}
                                  // ReduxCall={ReduxCall}
                                  organizationID={id}                                                              
                                />
                              </React.Fragment>
                            )}
                          </React.Fragment>
                        )}
                        
                        {serviceTab && (
                          <React.Fragment>
                            {/* Service */}

                            {serviceTabList && (
                              <React.Fragment>
                                {/* ServiceTabList */}
                                <ServiceTabListComponent 
                                  setServiceTabList={setServiceTabList}
                                  setServiceTabCreate={setServiceTabCreate}
                                  setServiceTabUpdate={setServiceTabUpdate}
                                  APICall={APICall}
                                  ReduxCall={ReduxCall}
                                  organizationID={id}
                                />
                              </React.Fragment>
                            )}

                            {serviceTabCreate && (
                              <React.Fragment>
                                {/* ServiceTabCreate */}
                                <ServiceTabCreateComponent 
                                  setServiceTabList={setServiceTabList}
                                  setServiceTabCreate={setServiceTabCreate}
                                  setServiceTabUpdate={setServiceTabUpdate} 
                                  APICall={APICall}
                                  // ReduxCall={ReduxCall}
                                  organizationID={id}                               
                                />
                              </React.Fragment>
                            )}

                            {serviceTabUpdate && (
                              <React.Fragment>
                                {/* ServiceTabUpdate */}
                                <ServiceTabUpdateComponent 
                                  setServiceTabList={setServiceTabList}
                                  setServiceTabCreate={setServiceTabCreate}
                                  setServiceTabUpdate={setServiceTabUpdate} 
                                  APICall={APICall}
                                  // ReduxCall={ReduxCall}
                                  // organizationID={id}                                                              
                                />
                              </React.Fragment>
                            )}
                          </React.Fragment>
                        )}

                        {paymentTab && (
                          <React.Fragment>
                            Payment
                          </React.Fragment>
                        )}

                      </React.Fragment>
                    ) : <ErrorComponent message="Backend Error..." />
                  }
                </React.Fragment>
              ) :
              <ErrorComponent message="Let me understand first..." />
            }
          </RightContainer>
        </MainContainer>
      </>

    </React.Fragment>
  )
}

export default PaidCustomerRetrievePage;
