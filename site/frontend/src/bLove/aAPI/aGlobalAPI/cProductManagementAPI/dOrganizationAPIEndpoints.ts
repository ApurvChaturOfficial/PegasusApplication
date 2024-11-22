import apiConnection from "@/aConnection/cAPIConnection";


const organizationAPIEndpoint = apiConnection.injectEndpoints({
  endpoints: (builder) => ({
    
    organizationListAPI: builder.query({
      query: () => ({
        url: `organization/list/`,
        method: "GET"
      }),
      providesTags: ["organizationList"]
    }),

    organizationCreateAPI: builder.mutation({
      query: (data) => ({
        url: `organization/create/`,
        method: "POST",
        body: data.body
      }),
      invalidatesTags: ["organizationList"]
    }),

    organizationRetrievePI: builder.query({
      query: (data) => ({
        url: `organization/retrieve/${data.params._id}`,
        method: "GET",
      }),
      providesTags: (_result: any, _error: any, data: any) => [{ type: "organizationRetrieve", id: data.params._id }],
    }),

    organizationUpdateAPI: builder.mutation({
      query: (data) => ({
        url: `organization/update/${data.params._id}`,
        method: "PUT",
        body: data.body
      }),
      invalidatesTags: (_result: any, _error: any, data: any) => [
        { type: "organizationList" },
        { type: "organizationRetrieve", id: data.params._id },
      ],
    }),

    organizationDeleteAPI: builder.mutation({
      query: (data) => (
        console.log("first"), {
        url: `organization/delete/${data.params._id}`,
        method: "DELETE"
      }),
      invalidatesTags: (_result: any, _error: any, data: any) => [
        { type: "organizationList" },
        { type: "organizationRetrieve", id: data.params._id },
      ],
    }),

  })
})

export default organizationAPIEndpoint;
