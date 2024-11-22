import React, { useEffect } from "react";
// import { Link } from "react-router-dom";

// import fullRoute from "@/bLove/gRoute/bFullRoute";
// import Image1 from '@/bLove/hAsset/png1.png'


type HomeComponentType = {
  ReduxCall: any
}

const HomeComponent = (props: HomeComponentType) => {
  // Destructure Props
  const { ReduxCall } = props;

  useEffect(() => {
    console.log(ReduxCall.state)
  }, [ReduxCall.state])
  
  // JSX
  return (
    <React.Fragment>
        HomeComponent
    </React.Fragment>
  )
}

export default HomeComponent;


{/* <section className="pt-24 bg-inherit">
<div className="px-12 mx-auto max-w-7xl">
    <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
        <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-current md:text-4xl md:tracking-tight">
            <span >Effortlessly</span> <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-[#1A0F4E] to-[#1A0F4E] dark:from-[#D3CEFE] dark:to-[#D3CEFE] lg:inline">Manage Your Application</span> <span> for Maximum Success</span>
        </h1>
        <p className="px-0 mb-8 text-lg text-current md:text-lg lg:px-24">
            Your journey to efficient eCommerce management starts here. Our user-friendly admin panel offers robust features for tracking sales, managing products, and engaging customers, ensuring you stay ahead in a competitive landscape.                </p>
        <div className="mb-4 space-x-0 sm:space-x-2 md:mb-8">
            <Link to={fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.aDashboardRoute} className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-[#1A0F4E] bg-[#D3CEFE] rounded-2xl sm:w-auto sm:mb-0">
                Get Started
                <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </Link>
            <Link to={fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.aDashboardRoute} className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg bg-[#1A0F4E] text-[#D3CEFE] rounded-2xl sm:w-auto sm:mb-0">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                Learn More
            </Link>
            {(ReduxCall.state.receivedObject as any)?.ProfileRetrieve?._id ? (
                <Link to={fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.aDashboardRoute} className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg bg-[#1A0F4E] text-[#D3CEFE] rounded-2xl sm:w-auto sm:mb-0">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                    Visit Dashboard
                </Link> 
              ) : (
                <Link to={fullRoute.aGlobalRoute.bProtectedRoute.aAuthenticationRoute.aSignInRoute} className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg bg-[#1A0F4E] text-[#D3CEFE] rounded-2xl sm:w-auto sm:mb-0">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                    Sign In
                </Link>
              )
            }
        </div>
    </div>
    <div className="w-full mx-auto mt-20 text-center md:w-10/12">
        <div className="relative z-0 w-full mt-8">
            <div className="relative overflow-hidden shadow-2xl">
                <div className="flex items-center flex-none px-4 bg-[#1A0F4E] dark:bg-[#D3CEFE] rounded-b-none h-11 rounded-xl">
                    <div className="flex space-x-1.5">
                        <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                        <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                        <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                    </div>
                </div>
                <img src={Image1} />
            </div>
        </div>
    </div>
</div>
</section>   */}
