import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const apiConnection = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_ENVIRONMENT === "Production" ? "https://pegasus-backend-f4bi.onrender.com/api/v1/" : "http://localhost:8080/api/v1/",
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
