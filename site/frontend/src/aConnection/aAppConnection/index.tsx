import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import endpointRoute from '@/bLove/gRoute/aEndpointRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import isAllowedUtility, { menuListUtility, NoAccessMessageUtility } from '@/bLove/dUtility/dIsAllowedUtility';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../dReduxConnection';
// import globalSlice from '@/bLove/bRedux/aGlobalSlice';

// Layout
const GlobalLayout = React.lazy(() => import('@/bLove/eLayout/aGlobalLayout'));
const UnprotectedLayout = React.lazy(() => import('@/bLove/eLayout/aGlobalLayout/outlet/aUnprotectedLayout'));
const ProtectedLayout = React.lazy(() => import('@/bLove/eLayout/aGlobalLayout/outlet/bProtectedLayout'));
const AuthenticationLayout = React.lazy(() => import('@/bLove/eLayout/aGlobalLayout/outlet/bProtectedLayout/outlet/aAuthenticationLayout'));
const AuthorizationLayout = React.lazy(() => import('@/bLove/eLayout/aGlobalLayout/outlet/bProtectedLayout/outlet/bAuthorizationLayout'));
const TopbarLayout = React.lazy(() => import('@/bLove/eLayout/aGlobalLayout/outlet/bProtectedLayout/outlet/bAuthorizationLayout/outlet/aTopbarLayout'));
const SidebarLayout = React.lazy(() => import('@/bLove/eLayout/aGlobalLayout/outlet/bProtectedLayout/outlet/bAuthorizationLayout/outlet/bSidebarLayout'));

// Page
const HomePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/aUnprotectedPage/page/aHomePage'));

const PegasusSignInPage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/aAuthenticationPage/page/aPegasusSignInPage'));
const SignInPage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/aAuthenticationPage/page/aSignInPage'));
const SignUpPage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/aAuthenticationPage/page/bSignUpPage'));
const SignUpAPage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/aAuthenticationPage/page/bSignUpAPage'));
const SignUpBPage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/aAuthenticationPage/page/bSignUpBPage'));
const SignUpCPage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/aAuthenticationPage/page/bSignUpCPage'));
const ForgotPasswordPage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/aAuthenticationPage/page/cForgotPasswordPage'));
const ResetPasswordPage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/aAuthenticationPage/page/dResetPasswordPage'));

const ProfileRetrievePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/aTopbarPage/page/aProfileRetrievePage'));
const ProfileUpdatePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/aTopbarPage/page/bProfileUpdatePage'));
const ProfilePasswordUpdatePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/aTopbarPage/page/cProfilePasswordUpdatePage'));
const ProfileDeletePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/aTopbarPage/page/dProfileDeletePage'));

const OrganizationListPage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/aOrganizationPage/aListPage'));
const OrganizationCreatePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/aOrganizationPage/bCreatePage'));
const OrganizationRetrievePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/aOrganizationPage/cRetrievePage'));
// const OrganizationUpdatePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/aOrganizationPage/dUpdatePage'));
// const OrganizationDeletePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/aOrganizationPage/eDeletePage'));

const LicenseListPage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/bLicensePage/aListPage'));
const LicenseCreatePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/bLicensePage/bCreatePage'));
// const LicenseRetrievePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/bLicensePage/cRetrievePage'));
const LicenseUpdatePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/bLicensePage/dUpdatePage'));
// const LicenseDeletePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/bLicensePage/eDeletePage'));
const LicenseCompleteListPage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/bLicensePage/fCompleteListPage'));

const ServiceListPage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/cServicePage/aListPage'));
const ServiceCreatePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/cServicePage/bCreatePage'));
// const ServiceRetrievePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/cServicePage/cRetrievePage'));
// const ServiceUpdatePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/cServicePage/dUpdatePage'));
// const ServiceDeletePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/cServicePage/eDeletePage'));
const ServiceCompleteListPage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/cServicePage/fCompleteListPage'));
const ServiceCompleteCreatePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/cServicePage/gCompleteCreatePage'));

const DocumentListPage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/dDocumentPage/aListPage'));
const DocumentCreatePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/dDocumentPage/bCreatePage'));
// const DocumentRetrievePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/dDocumentPage/cRetrievePage'));
const DocumentUpdatePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/dDocumentPage/dUpdatePage'));
// const DocumentDeletePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/dDocumentPage/eDeletePage'));
const DocumentCompleteListPage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/dDocumentPage/fCompleteListPage'));

const InspectionListPage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/eInspectionPage/aListPage'));
const InspectionCreatePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/eInspectionPage/bCreatePage'));
// const InspectionRetrievePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/eInspectionPage/cRetrievePage'));
const InspectionUpdatePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/eInspectionPage/dUpdatePage'));
// const InspectionDeletePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/eInspectionPage/eDeletePage'));

const UserListPage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/fUserPage/aListPage'));
const UserCreatePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/fUserPage/bCreatePage'));
// const UserRetrievePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/fUserPage/cRetrievePage'));
const UserUpdatePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/fUserPage/dUpdatePage'));
// const UserDeletePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/fUserPage/eDeletePage'));

// const RoleListPage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/gRolePage/aListPage'));
const RoleCreatePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/gRolePage/bCreatePage'));
// const RoleRetrievePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/gRolePage/cRetrievePage'));
const RoleUpdatePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/gRolePage/dUpdatePage'));
// const RoleDeletePage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/gRolePage/eDeletePage'));

const DashboardPage = React.lazy(() => import('@/bLove/fPage/aGlobalPage/outlet/bProtectedPage/outlet/bAuthorizationPage/outlet/bSidebarPage/page/hDashboardPage'));


const AppConnection = () => {
  // Redux Call
  // const ReduxCall = {
  //   state: useSelector((fullState: RootState) => fullState.globalSlice),
  //   dispatch: useDispatch(),
  //   action: globalSlice.actions
  // }
  
  // JSX
  return (
    <React.Fragment>
      {/* AppConnection */}
      <Helmet><title>Pegasus</title></Helmet>
      <ToastContainer />

      <Suspense fallback={<div className='min-h-screen flex justify-center items-center' >Suspence Loading...</div>} >
        <Routes>

          {/* Global */}
          <Route element={<GlobalLayout />} >

            {/* Unprotected */}
            <Route element={<UnprotectedLayout />} >
              <Route path={`${endpointRoute.aGlobalRoute.aUnprotectedRoute.aHomeRoute}`} element={<HomePage />} />
            </Route>
            
            {/* Protected */}
            <Route element={<ProtectedLayout />} >

              {/* Authentication */}
              <Route element={<AuthenticationLayout />} >
                <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.aAuthenticatedRoute.aSignInRoute}`} element={<SignInPage />} />
                <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.aAuthenticatedRoute.aPegasusSignInRoute}`} element={<PegasusSignInPage />} />

                <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.aAuthenticatedRoute.bSignUpRoute}`} element={<SignUpPage />} />
                <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.aAuthenticatedRoute.bSignUpARoute}`} element={<SignUpAPage />} />
                <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.aAuthenticatedRoute.bSignUpBRoute}`} element={<SignUpBPage />} />
                <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.aAuthenticatedRoute.bSignUpCRoute}`} element={<SignUpCPage />} />

                <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.aAuthenticatedRoute.cForgotPasswordRoute}`} element={<ForgotPasswordPage />} />
                <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.aAuthenticatedRoute.dResetPasswordRoute}/:token`} element={<ResetPasswordPage />} />
              </Route>

              {/* Authorization */}
              <Route element={<AuthorizationLayout />}  >

                {/* Topbar */}
                <Route element={<TopbarLayout />} >
                  <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.aTopbarRoute.aProfileRetrieveRoute}`} element={<ProfileRetrievePage />} />
                  <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.aTopbarRoute.bProfileUpdateRoute}`} element={<ProfileUpdatePage />} />
                  <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.aTopbarRoute.cProfilePasswordUpdateRoute}`} element={<ProfilePasswordUpdatePage />} />
                  <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.aTopbarRoute.dProfileDeleteRoute}`} element={<ProfileDeletePage />} />
                </Route>

                {/* Sidebar */}
                <Route element={<SidebarLayout />} >
                  {/* Normal User */}
                  <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.aOrganizationRoute.aListRoute}`} element={ <OrganizationListPage />} />
                  <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.aOrganizationRoute.bCreateRoute}`} element={ <OrganizationCreatePage />} />
                  <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.aOrganizationRoute.cRetrieveRoute}/:id`} element={ <OrganizationRetrievePage />} />
                  {/* <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.aOrganizationRoute.dUpdateRoute}/:id`} element={ <OrganizationUpdatePage />} /> */}
                  {/* <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.aOrganizationRoute.eDeleteRoute}/:id`} element={ <OrganizationDeletePage />} /> */}
                  
                  <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.bLicenseRoute.aListRoute}`} element={ <LicenseListPage />} />
                  <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.bLicenseRoute.bCreateRoute}`} element={ <LicenseCreatePage />} />
                  {/* <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.bLicenseRoute.cRetrieveRoute}/:id`} element={ <LicenseRetrievePage />} /> */}
                  <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.bLicenseRoute.dUpdateRoute}/:id`} element={ <LicenseUpdatePage />} />
                  {/* <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.bLicenseRoute.eDeleteRoute}/:id`} element={ <LicenseDeletePage />} /> */}
                  <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.bLicenseRoute.fCompleteListRoute}`} element={ <LicenseCompleteListPage />} />
                  
                  <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.cServiceRoute.aListRoute}`} element={ <ServiceListPage />} />
                  <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.cServiceRoute.bCreateRoute}`} element={ <ServiceCreatePage />} />
                  {/* <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.cServiceRoute.cRetrieveRoute}/:id`} element={ <ServiceRetrievePage />} /> */}
                  {/* <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.cServiceRoute.dUpdateRoute}/:id`} element={ <ServiceUpdatePage />} /> */}
                  {/* <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.cServiceRoute.eDeleteRoute}/:id`} element={ <ServiceDeletePage />} /> */}
                  <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.cServiceRoute.fCompleteListRoute}`} element={ <ServiceCompleteListPage />} />
                  <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.cServiceRoute.gCompleteCreateRoute}`} element={ <ServiceCompleteCreatePage />} />
                  
                  <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.dDocumentRoute.aListRoute}`} element={ <DocumentListPage />} />
                  <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.dDocumentRoute.bCreateRoute}`} element={ <DocumentCreatePage />} />
                  {/* <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.dDocumentRoute.cRetrieveRoute}/:id`} element={ <DocumentRetrievePage />} /> */}
                  <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.dDocumentRoute.dUpdateRoute}/:id`} element={ <DocumentUpdatePage />} />
                  {/* <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.dDocumentRoute.eDeleteRoute}/:id`} element={ <DocumentDeletePage />} /> */}
                  <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.dDocumentRoute.fCompleteListRoute}`} element={ <DocumentCompleteListPage />} />
                  
                  <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.eInspectionRoute.aListRoute}`} element={ <InspectionListPage />} />
                  <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.eInspectionRoute.bCreateRoute}`} element={ <InspectionCreatePage />} />
                  {/* <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.eInspectionRoute.cRetrieveRoute}/:id`} element={ <InspectionRetrievePage />} /> */}
                  <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.eInspectionRoute.dUpdateRoute}/:id`} element={ <InspectionUpdatePage />} />
                  {/* <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.eInspectionRoute.eDeleteRoute}/:id`} element={ <InspectionDeletePage />} /> */}
                                    
                  <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.fUserRoute.aListRoute}`} element={ <UserListPage />} />
                  <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.fUserRoute.bCreateRoute}`} element={ <UserCreatePage />} />
                  {/* <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.fUserRoute.cRetrieveRoute}/:id`} element={ <UserRetrievePage />} /> */}
                  <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.fUserRoute.dUpdateRoute}/:id`} element={ <UserUpdatePage />} />
                  {/* <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.fUserRoute.eDeleteRoute}/:id`} element={ <UserDeletePage />} /> */}
                                    
                  {/* <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.gRoleRoute.aListRoute}`} element={ <RoleListPage />} /> */}
                  <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.gRoleRoute.bCreateRoute}`} element={ <RoleCreatePage />} />
                  {/* <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.gRoleRoute.cRetrieveRoute}/:id`} element={ <RoleRetrievePage />} /> */}
                  <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.gRoleRoute.dUpdateRoute}/:id`} element={ <RoleUpdatePage />} />
                  {/* <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.gRoleRoute.eDeleteRoute}/:id`} element={ <RoleDeletePage />} /> */}

                  <Route path={`${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.hDashboardRoute}`} element={ <DashboardPage />} />

                </Route>
              </Route>
            </Route>
          </Route>

          {/* 404 Page */}
           <Route path="*" element={<h1>404 - Not Found</h1>} />
        </Routes>
      </Suspense>
    </React.Fragment>
  )
}

export default AppConnection;
