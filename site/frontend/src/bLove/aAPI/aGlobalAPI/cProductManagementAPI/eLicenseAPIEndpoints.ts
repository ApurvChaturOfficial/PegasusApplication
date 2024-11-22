import apiConnection from "@/aConnection/cAPIConnection";


const licenseAPIEndpoint = apiConnection.injectEndpoints({
  endpoints: (builder) => ({
    
    licenseListAPI: builder.query({
      query: () => ({
        url: `license/list/`,
        method: "GET"
      }),
      providesTags: ["licenseList"]
    }),

    licenseCreateAPI: builder.mutation({
      query: (data) => ({
        url: `license/create/`,
        method: "POST",
        body: data.body
      }),
      invalidatesTags: ["licenseList"]
    }),

    licenseRetrievePI: builder.query({
      query: (data) => ({
        url: `license/retrieve/${data.params._id}`,
        method: "GET",
      }),
      providesTags: (_result: any, _error: any, data: any) => [{ type: "licenseRetrieve", id: data.params._id }],
    }),

    licenseUpdateAPI: builder.mutation({
      query: (data) => ({
        url: `license/update/${data.params._id}`,
        method: "PUT",
        body: data.body
      }),
      invalidatesTags: (_result: any, _error: any, data: any) => [
        { type: "licenseList" },
        { type: "licenseRetrieve", id: data.params._id },
      ],
    }),

    licenseDeleteAPI: builder.mutation({
      query: (data) => (
        console.log("first"), {
        url: `license/delete/${data.params._id}`,
        method: "DELETE"
      }),
      invalidatesTags: (_result: any, _error: any, data: any) => [
        { type: "licenseList" },
        { type: "licenseRetrieve", id: data.params._id },
      ],
    }),

  })
})

export default licenseAPIEndpoint;
