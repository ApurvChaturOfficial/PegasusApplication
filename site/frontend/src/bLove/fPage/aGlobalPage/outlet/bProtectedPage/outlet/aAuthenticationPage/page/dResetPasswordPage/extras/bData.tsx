import fullRoute from "@/bLove/gRoute/bFullRoute";

const data = {
  title: "Reset Password",
  subtitle: "Enter your new password to access your account",
  inputs: [
    { name: "ePassword"       , label: "Password"        , type: "password", placeholder: "Please enter password..."          },
    { name: "eConfirmPassword", label: "Confirm Password", type: "password", placeholder: "Please enter confirm password..."  },
  ],
  button: {
    label: "Reset Password",
  },
  links: [
    { linkMessage: "Remembered the password?", linkRoute: fullRoute.aGlobalRoute.bProtectedRoute.aAuthenticationRoute.aSignInRoute, linkText: "Sign In" },
    { linkMessage: "Want to create an account?", linkRoute: fullRoute.aGlobalRoute.bProtectedRoute.aAuthenticationRoute.bSignUpRoute, linkText: "Sign Up" },
  ]
}

export default data;
