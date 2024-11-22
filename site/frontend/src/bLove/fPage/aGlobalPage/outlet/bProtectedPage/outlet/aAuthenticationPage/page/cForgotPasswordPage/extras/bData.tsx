import fullRoute from "@/bLove/gRoute/bFullRoute";

const data = {
  title: "Forgot Password",
  subtitle: "Enter your email to recover your account",
  inputs: [
    { name: "eEmail"          , label: "Email"           , type: "email"   , placeholder: "Please enter email..."             },
  ],
  button: {
    label: "Send Email",
  },
  links: [
    { linkMessage: "Remembered the password?", linkRoute: fullRoute.aGlobalRoute.bProtectedRoute.aAuthenticationRoute.aSignInRoute, linkText: "Sign In" },
    { linkMessage: "Want to create an account?", linkRoute: fullRoute.aGlobalRoute.bProtectedRoute.aAuthenticationRoute.bSignUpRoute, linkText: "Sign Up" },
  ]
}

export default data;
