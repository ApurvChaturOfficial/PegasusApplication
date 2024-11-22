import React from "react"

// import KisnaMediumGoldLogo from "@/bLove/hAsset/KisnaLogo/KisnaMediumGoldLogo.png";
// import KisnaMediumBlueLogo from "@/bLove/hAsset/KisnaLogo/KisnaMediumBlueLogo.png";
// // import { cn } from "@/aConnection/bShadcnConnection/lib/utils";
// import { useNavigate } from "react-router-dom";
// import fullRoute from "@/bLove/gRoute/bFullRoute";


const AuthenticationComponent = ({ children }: { children: React.ReactNode }) => {
  // Variable
  // const navigate = useNavigate();

  // JSX
  return (
    <React.Fragment>
      {/* AuthenticationComponent */}
      {children}
    </React.Fragment>
  )
}

export default AuthenticationComponent;

{/* <div className="container relative h-[100vh] flex-col items-center justify-center md:grid lg:max-w-full lg:grid-cols-2 lg:px-0">
<div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
  <div className="absolute inset-0 bg-[#d5a26a] dark:bg-[#262761]" />
  <div className="relative z-20 flex items-center text-lg font-medium">
    <div onClick={() => navigate(fullRoute.aGlobalRoute.aUnprotectedRoute.aHomeRoute)} >
      <img
        src={KisnaMediumGoldLogo}
        alt={"KisnaMediumGoldLogo"}
        className={cn(
          "h-[40px] object-fit transition-all hover:scale-105 w-auto hidden dark:block",
          "portrait"
        )}
      />
      <img
        src={KisnaMediumBlueLogo}
        alt={"KisnaMediumBlueLogo"}
        className={cn(
          "h-[40px] object-fit transition-all hover:scale-105 w-auto block dark:hidden",
          "portrait"
        )}
      />
    </div>

    Important Comment
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mr-2 h-6 w-6"
    >
      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
    </svg>
    {brandConnection.brandName}
  </div>
</div>
<div className="flex justify-center align-middle h-full p-8">
  { children }
</div>
</div> */}

