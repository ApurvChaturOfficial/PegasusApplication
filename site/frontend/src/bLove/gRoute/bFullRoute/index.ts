import endpointRoute from "../aEndpointRoute";

const fullRoute = {
  aGlobalRoute: {
    aUnprotectedRoute: {
      aHomeRoute: `/${endpointRoute.aGlobalRoute.aUnprotectedRoute.aHomeRoute}`
    },
    bProtectedRoute: {
      aAuthenticationRoute: {
        aPegasusSignInRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.aAuthenticatedRoute.aPegasusSignInRoute}`,
        aSignInRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.aAuthenticatedRoute.aSignInRoute}`,
        
        bSignUpRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.aAuthenticatedRoute.bSignUpRoute}`,
        bSignUpARoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.aAuthenticatedRoute.bSignUpARoute}`,
        bSignUpBRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.aAuthenticatedRoute.bSignUpBRoute}`,
        bSignUpCRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.aAuthenticatedRoute.bSignUpCRoute}`,

        cForgotPasswordRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.aAuthenticatedRoute.cForgotPasswordRoute}`,
        dResetPasswordRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.aAuthenticatedRoute.dResetPasswordRoute}`,
      },
      bAuthorizationRoute: {
        aTopbarRoute: {
          aProfileRetrieveRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.aTopbarRoute.aProfileRetrieveRoute}`,
          bProfileUpdateRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.aTopbarRoute.bProfileUpdateRoute}`,
          cProfilePasswordUpdateRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.aTopbarRoute.cProfilePasswordUpdateRoute}`,
          dProfileDeleteRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.aTopbarRoute.dProfileDeleteRoute}`,
        },
        bSidebarRoute: {
          aOrganizationRoute: {
            aListRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.aOrganizationRoute.aListRoute}`,
            bCreateRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.aOrganizationRoute.bCreateRoute}`,
            cRetrieveRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.aOrganizationRoute.cRetrieveRoute}`,
            dUpdateRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.aOrganizationRoute.dUpdateRoute}`,
            eDeleteRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.aOrganizationRoute.eDeleteRoute}`,
          },

          bLicenseRoute: {
            aListRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.bLicenseRoute.aListRoute}`,
            bCreateRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.bLicenseRoute.bCreateRoute}`,
            cRetrieveRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.bLicenseRoute.cRetrieveRoute}`,
            dUpdateRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.bLicenseRoute.dUpdateRoute}`,
            eDeleteRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.bLicenseRoute.eDeleteRoute}`,
            fCompleteListRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.bLicenseRoute.fCompleteListRoute}`,
          },

          cServiceRoute: {
            aListRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.cServiceRoute.aListRoute}`,
            bCreateRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.cServiceRoute.bCreateRoute}`,
            cRetrieveRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.cServiceRoute.cRetrieveRoute}`,
            dUpdateRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.cServiceRoute.dUpdateRoute}`,
            eDeleteRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.cServiceRoute.eDeleteRoute}`,
            fCompleteListRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.cServiceRoute.fCompleteListRoute}`,
            gCompleteCreateRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.cServiceRoute.gCompleteCreateRoute}`,
          },

          dDocumentRoute: {
            aListRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.dDocumentRoute.aListRoute}`,
            bCreateRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.dDocumentRoute.bCreateRoute}`,
            cRetrieveRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.dDocumentRoute.cRetrieveRoute}`,
            dUpdateRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.dDocumentRoute.dUpdateRoute}`,
            eDeleteRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.dDocumentRoute.eDeleteRoute}`,
            fCompleteListRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.dDocumentRoute.fCompleteListRoute}`,
          },

          eInspectionRoute: {
            aListRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.eInspectionRoute.aListRoute}`,
            bCreateRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.eInspectionRoute.bCreateRoute}`,
            cRetrieveRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.eInspectionRoute.cRetrieveRoute}`,
            dUpdateRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.eInspectionRoute.dUpdateRoute}`,
            eDeleteRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.eInspectionRoute.eDeleteRoute}`,
          },

          fUserRoute: {
            aListRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.fUserRoute.aListRoute}`,
            bCreateRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.fUserRoute.bCreateRoute}`,
            cRetrieveRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.fUserRoute.cRetrieveRoute}`,
            dUpdateRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.fUserRoute.dUpdateRoute}`,
            eDeleteRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.fUserRoute.eDeleteRoute}`,
          },

          gRoleRoute: {
            aListRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.gRoleRoute.aListRoute}`,
            bCreateRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.gRoleRoute.bCreateRoute}`,
            cRetrieveRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.gRoleRoute.cRetrieveRoute}`,
            dUpdateRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.gRoleRoute.dUpdateRoute}`,
            eDeleteRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.gRoleRoute.eDeleteRoute}`,
          },

          hDashboardRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.hDashboardRoute}`,

          iCustomerRoute: {
            aPaidCustomerRoute: {
              aPaidCustomerListRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.iCustomerRoute.aPaidCustomerRoute.aPaidCustomerListRoute}`,
              bPaidCustomerRetrieveRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.iCustomerRoute.aPaidCustomerRoute.bPaidCustomerRetrieveRoute}`
            },
            bUnpaidCustomerRoute: {
              aUnpaidCustomerListRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.iCustomerRoute.bUnpaidCustomerRoute.aUnpaidCustomerListRoute}`,
              bUnpaidCustomerRetrieveRoute: `/${endpointRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.iCustomerRoute.bUnpaidCustomerRoute.bUnpaidCustomerRetrieveRoute}`,
            }
          }

        }
      }
    }
  }
}

export default fullRoute;
