import { RootState } from "@/aConnection/dReduxConnection";
import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import organizationAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/dOrganizationAPIEndpoints";
import licenseAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/eLicenseAPIEndpoints";
import serviceAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/fServiceAPIEndpoints";
import documentAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/gDocumentAPIEndpoints";
import inspectionAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/hInspectionAPIEndpoints";

import TopNavBarComponent from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/component/aTopNavBarComponent";
import SubNavBar from "@/bLove/cComponent/aGlobalComponent/outlet/bProtectedComponent/outlet/bAuthorizationComponent/outlet/bSidebarComponent/component/SubNavBar/SubNavBar";
import { CompanyContainer, CompanyHeading } from "./style";

const CompanyTabComponent = React.lazy(() => import("./component/aCompanyTabComponent"));

const LicenseTabListComponent = React.lazy(() => import("./component/bLicenseTabListComponent"));
const LicenseTabCreateComponent = React.lazy(() => import("./component/cLicenseTabCreateComponent"));
const LicenseTabUpdateComponent = React.lazy(() => import("./component/dLicenseTabUpdateComponent"));

const InspectionTabListComponent = React.lazy(() => import("./component/eInspectionTabListComponent"));
const InspectionTabCreateComponent = React.lazy(() => import("./component/fInspectionTabCreateComponent"));
const InspectionTabUpdateComponent = React.lazy(() => import("./component/gInspectionTabUpdateComponent"));

const DocumentTabListComponent = React.lazy(() => import("./component/hDocumentTabListComponent"));
const DocumentTabCreateComponent = React.lazy(() => import("./component/iDocumentTabCreateComponent"));
const DocumentTabUpdateComponent = React.lazy(() => import("./component/jDocumentTabUpdateComponent"));

const ServiceTabListComponent = React.lazy(() => import("./component/kServiceTabListComponent"));
const ServiceTabCreateComponent = React.lazy(() => import("./component/lServiceTabCreateComponent"));
const ServiceTabUpdateComponent = React.lazy(() => import("./component/mServiceTabUpdateComponent"));

import enrolledServiceAPIEndpoint from "@/bLove/aAPI/aGlobalAPI/cProductManagementAPI/iEnrolledServiceAPIEndpoints";
import LoaderComponent from "@/bLove/cComponent/aGlobalComponent/component/aLoaderComponent";
import ErrorComponent from "@/bLove/cComponent/aGlobalComponent/component/bErrorComponent";

const OrganizationRetrievePage = () => {
  // Variable
  const { id } = useParams()

  // State Variable
  const [companyTab, setCompanyTab] = useState(true);
  const [licenseTab, setLicenseTab] = useState(false);
  const [reminderTab, setReminderTab] = useState(false);
  const [inspectionTab, setInspectionTab] = useState(false);
  const [documentTab, setDocumentTab] = useState(false);
  const [serviceTab, setServiceTab] = useState(false)

  const [licenseTabList, setLicenseTabList] = useState(false)
  const [licenseTabCreate, setLicenseTabCreate] = useState(false)
  const [licenseTabUpdate, setLicenseTabUpdate] = useState(false)

  const [inspectionTabList, setInspectionTabList] = useState(false)
  const [inspectionTabCreate, setInspectionTabCreate] = useState(false)
  const [inspectionTabUpdate, setInspectionTabUpdate] = useState(false)

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
  
  const [lazyInspectionListAPITrigger, lazyInspectionListAPIResponse] = inspectionAPIEndpoint.useLazyInspectionListAPIQuery()
  const [lazyInspectionRetrieveAPITrigger, lazyInspectionRetrieveAPIResponse] = inspectionAPIEndpoint.useLazyInspectionRetrievePIQuery()
  
  const [lazyDocumentListAPITrigger, lazyDocumentListAPIResponse] = documentAPIEndpoint.useLazyDocumentListAPIQuery()
  const [lazyDocumentRetrieveAPITrigger, lazyDocumentRetrieveAPIResponse] = documentAPIEndpoint.useLazyDocumentRetrievePIQuery()
  
  const [lazyServiceListAPITrigger, lazyServiceListAPIResponse] = serviceAPIEndpoint.useLazyServiceListAPIQuery()

  const [lazyEnrolledServiceListAPITrigger, lazyEnrolledServiceListAPIResponse] = enrolledServiceAPIEndpoint.useLazyEnrolledServiceListAPIQuery()

  const organizationUpdateAPI = organizationAPIEndpoint.useOrganizationUpdateAPIMutation()

  const licenseCreateAPI = licenseAPIEndpoint.useLicenseCreateAPIMutation()
  const licenseUpdateAPI = licenseAPIEndpoint.useLicenseUpdateAPIMutation()
  
  const inspectionCreateAPI = inspectionAPIEndpoint.useInspectionCreateAPIMutation();
  const inspectionUpdateAPI = inspectionAPIEndpoint.useInspectionUpdateAPIMutation()

  const documentCreateAPI = documentAPIEndpoint.useDocumentCreateAPIMutation();
  const documentUpdateAPI = documentAPIEndpoint.useDocumentUpdateAPIMutation()

  const enrolledServiceCreateAPI = enrolledServiceAPIEndpoint.useEnrolledServiceCreateAPIMutation();

  const APICall = {
    retrieveAPIResponse: organizationAPIEndpoint.useOrganizationRetrievePIQuery({ params: { _id: id } }),
    
    updateAPITrigger: organizationUpdateAPI[0],
    updateAPIResponse: organizationUpdateAPI[1],

    // Requirements... Muaaah...
    // License
    licenseListAPITrigger: lazyLicenseListAPITrigger,
    licenseListAPIResponse: lazyLicenseListAPIResponse,

    licenseCreateAPITrigger: licenseCreateAPI[0],
    licenseCreateAPIResponse: licenseCreateAPI[1],

    licenseRetrieveAPITrigger: lazyLicenseRetrieveAPITrigger,
    licenseRetrieveAPIResponse: lazyLicenseRetrieveAPIResponse,

    licenseUpdateAPITrigger: licenseUpdateAPI[0],
    licenseUpdateAPIResponse: licenseUpdateAPI[1],

    // Inspection
    inspectionListAPITrigger: lazyInspectionListAPITrigger,
    inspectionListAPIResponse: lazyInspectionListAPIResponse,

    inspectionCreateAPITrigger: inspectionCreateAPI[0],
    inspectionCreateAPIResponse: inspectionCreateAPI[1],

    inspectionRetrieveAPITrigger: lazyInspectionRetrieveAPITrigger,
    inspectionRetrieveAPIResponse: lazyInspectionRetrieveAPIResponse,    

    inspectionUpdateAPITrigger: inspectionUpdateAPI[0],
    inspectionUpdateAPIResponse: inspectionUpdateAPI[1],

    // Document
    documentListAPITrigger: lazyDocumentListAPITrigger,
    documentListAPIResponse: lazyDocumentListAPIResponse,

    documentCreateAPITrigger: documentCreateAPI[0],
    documentCreateAPIResponse: documentCreateAPI[1],

    documentRetrieveAPITrigger: lazyDocumentRetrieveAPITrigger,
    documentRetrieveAPIResponse: lazyDocumentRetrieveAPIResponse,    

    documentUpdateAPITrigger: documentUpdateAPI[0],
    documentUpdateAPIResponse: documentUpdateAPI[1],

    // Service
    serviceListAPITrigger: lazyServiceListAPITrigger,
    serviceListAPIResponse: lazyServiceListAPIResponse,

    // Enrolled Servcie
    enrolledServiceListAPITrigger: lazyEnrolledServiceListAPITrigger,
    enrolledServiceListAPIResponse: lazyEnrolledServiceListAPIResponse,

    enrolledServiceCreateAPITrigger: enrolledServiceCreateAPI[0],
    enrolledServiceCreateAPIResponse: enrolledServiceCreateAPI[1],    
  }  

  // JSX
  return (
    <React.Fragment>
      {/* OrganizationRetrievePage */}
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
                          licenseTab={licenseTab} setLicenseTab={setLicenseTab} licenseListAPITrigger={APICall.licenseListAPITrigger} 
                          reminderTab={reminderTab} setReminderTab={setReminderTab}
                          inspectionTab={inspectionTab} setInspectionTab={setInspectionTab} inspectionListAPITrigger={APICall.inspectionListAPITrigger} 
                          documentTab={documentTab} setDocumentTab={setDocumentTab} documentListAPITrigger={APICall.documentListAPITrigger} 
                          serviceTab={serviceTab} setServiceTab={setServiceTab} enrolledServiceListAPITrigger={APICall.enrolledServiceListAPITrigger} 
                          
                          licenseTabList={licenseTabList} setLicenseTabList={setLicenseTabList}
                          licenseTabCreate={licenseTabCreate} setLicenseTabCreate={setLicenseTabCreate}
                          licenseTabUpdate={licenseTabUpdate} setLicenseTabUpdate={setLicenseTabUpdate}
                          
                          inspectionTabList={inspectionTabList} setInspectionTabList={setInspectionTabList}
                          inspectionTabCreate={inspectionTabCreate} setInspectionTabCreate={setInspectionTabCreate}
                          inspectionTabUpdate={inspectionTabUpdate} setInspectionTabUpdate={setInspectionTabUpdate}
                          
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
                              setCompanyTab={setCompanyTab}
                              setLicenseTab={setLicenseTab} licenseListAPITrigger={APICall.licenseListAPITrigger} 
                              setReminderTab={setReminderTab}
                              setInspectionTab={setInspectionTab} inspectionListAPITrigger={APICall.inspectionListAPITrigger} 
                              setDocumentTab={setDocumentTab} documentListAPITrigger={APICall.documentListAPITrigger} 
                              setServiceTab={setServiceTab} serviceListAPITrigger={APICall.serviceListAPITrigger} 
                              
                              setLicenseTabList={setLicenseTabList}
                              setLicenseTabCreate={setLicenseTabCreate}
                              setLicenseTabUpdate={setLicenseTabUpdate}
                              
                              setInspectionTabList={setInspectionTabList}
                              setInspectionTabCreate={setInspectionTabCreate}
                              setInspectionTabUpdate={setInspectionTabUpdate}
                              
                              setDocumentTabList={setDocumentTabList}
                              setDocumentTabCreate={setDocumentTabCreate}
                              setDocumentTabUpdate={setDocumentTabUpdate}
                              
                              setServiceTabList={setServiceTabList}
                              setServiceTabCreate={setServiceTabCreate}
                              setServiceTabUpdate={setServiceTabUpdate}    
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
                        
                        {reminderTab && (
                          <React.Fragment>
                            {/* Reminder */}
                          </React.Fragment>
                        )}
                        
                        {inspectionTab && (
                          <React.Fragment>
                            {/* Inspection */}

                            {inspectionTabList && (
                              <React.Fragment>
                                {/* InspectionTabList */}
                                <InspectionTabListComponent 
                                  setInspectionTabList={setInspectionTabList}
                                  setInspectionTabCreate={setInspectionTabCreate}
                                  setInspectionTabUpdate={setInspectionTabUpdate}
                                  APICall={APICall}
                                  ReduxCall={ReduxCall}
                                  organizationID={id}
                                />
                              </React.Fragment>
                            )}

                            {inspectionTabCreate && (
                              <React.Fragment>
                                {/* InspectionTabCreate */}
                                <InspectionTabCreateComponent 
                                  setInspectionTabList={setInspectionTabList}
                                  setInspectionTabCreate={setInspectionTabCreate}
                                  setInspectionTabUpdate={setInspectionTabUpdate} 
                                  APICall={APICall}
                                  // ReduxCall={ReduxCall}
                                  organizationID={id}                               
                                />
                              </React.Fragment>
                            )}

                            {inspectionTabUpdate && (
                              <React.Fragment>
                                {/* InspectionTabUpdate */}
                                <InspectionTabUpdateComponent 
                                  setInspectionTabList={setInspectionTabList}
                                  setInspectionTabCreate={setInspectionTabCreate}
                                  setInspectionTabUpdate={setInspectionTabUpdate} 
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
