import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const apiConnection = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: (
      import.meta.env.VITE_ENVIRONMENT === "Production" ? "16.16.60.12" :
      import.meta.env.VITE_ENVIRONMENT === "Practice" ? "https://pegasus-backend-f4bi.onrender.com/api/v1/" :
      "http://13.60.80.5:8080/api/v1/"
    ),
    credentials: "include"
  }),
  tagTypes: [
    "baseManyToOneList", "baseManyToManyList", 
    "baseList", "baseRetrieve", 
    "baseOneToOneList", "baseOneToManyList", 
    "MenuList", 
    "RoleList", "RoleRetrieve",
    "UserList", "UserRetrieve", 
    "productList", "categoryList", "tagList", 
    "organizationList", "organizationRetrieve",
    "licenseList", "licenseRetrieve",
    "serviceList", "serviceRetrieve",
    "documentList", "documentRetrieve",
    "inspectionList", "inspectionRetrieve",
    "enrolledServiceList", "enrolledServiceRetrieve",
  ],
  endpoints: () => ({})
})

export default apiConnection;
