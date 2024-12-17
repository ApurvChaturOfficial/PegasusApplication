const endpointRoute = {
  aGlobalRoute: {
    aUnprotectedRoute: {
      aHomeRoute: "asdasdsa"
    },
    bProtectedRoute: {
      aAuthenticatedRoute: {
        aPegasusSignInRoute: "pegasus-sign-in",
        aSignInRoute: "sign-in",
        bSignUpRoute: "",
        bSignUpARoute: "sign-up-a",
        bSignUpBRoute: "sign-up-b",
        bSignUpCRoute: "sign-up-c",
        cForgotPasswordRoute: "forgot-password",
        dResetPasswordRoute: "reset-password",
      },
      bAuthorizationRoute: {
        aTopbarRoute: {
          aProfileRetrieveRoute: "profile-retrieve",
          bProfileUpdateRoute: "profile-update",
          cProfilePasswordUpdateRoute: "profile-password-update",
          dProfileDeleteRoute: "profile-delete",
        },
        bSidebarRoute: {
          aOrganizationRoute: {
            aListRoute: "organization-list",
            bCreateRoute: "organization-create",
            cRetrieveRoute: "organization-retrieve",
            dUpdateRoute: "organization-update",
            eDeleteRoute: "organization-delete",
          },

          bLicenseRoute: {
            aListRoute: "license-list",
            bCreateRoute: "license-create",
            cRetrieveRoute: "license-retrieve",
            dUpdateRoute: "license-update",
            eDeleteRoute: "license-delete",
            fCompleteListRoute: "license-complete-list",
          },

          cServiceRoute: {
            aListRoute: "service-list",
            bCreateRoute: "service-create",
            cRetrieveRoute: "service-retrieve",
            dUpdateRoute: "service-update",
            eDeleteRoute: "service-delete",
            fCompleteListRoute: "service-complete-list",
            gCompleteCreateRoute: "service-complete-create",
          },

          dDocumentRoute: {
            aListRoute: "document-list",
            bCreateRoute: "document-create",
            cRetrieveRoute: "document-retrieve",
            dUpdateRoute: "document-update",
            eDeleteRoute: "document-delete",
            fCompleteListRoute: "document-complete-list",
          },

          eInspectionRoute: {
            aListRoute: "inpection-list",
            bCreateRoute: "inpection-create",
            cRetrieveRoute: "inpection-retrieve",
            dUpdateRoute: "inpection-update",
            eDeleteRoute: "inpection-delete",
          },

          fUserRoute: {
            aListRoute: "user-list",
            bCreateRoute: "user-create",
            cRetrieveRoute: "user-retrieve",
            dUpdateRoute: "user-update",
            eDeleteRoute: "user-delete",
          },

          gRoleRoute: {
            aListRoute: "role-list",
            bCreateRoute: "role-create",
            cRetrieveRoute: "role-retrieve",
            dUpdateRoute: "role-update",
            eDeleteRoute: "role-delete",
          },

          hDashboardRoute: "dashboard",

          iCustomerRoute: {
            aPaidCustomerRoute: {
              aPaidCustomerListRoute: "paid-customer-list",
              bPaidCustomerRetrieveRoute: "paid-customer-retrieve"
            },
            bUnpaidCustomerRoute: {
              aUnpaidCustomerListRoute: "unpaid-customer-list",
              bUnpaidCustomerRetrieveRoute: "unpaid-customer-retireve",
            }
          }

        }
      }
    }
  }
}

export default endpointRoute;
