import apiConnection from "@/aConnection/cAPIConnection";


const baseAPIEndpoint = apiConnection.injectEndpoints({
  endpoints: (builder) => ({
    
    baseListAPI: builder.query({
      query: () => ({
        url: `base/list/`,
        method: "GET"
      }),
      providesTags: ["baseList"]
    }),

    baseCreateAPI: builder.mutation({
      query: (data) => ({
        url: `base/create/`,
        method: "POST",
        body: data.body
      }),
      invalidatesTags: ["baseList"]
    }),

    baseRetrievePI: builder.query({
      query: (data) => ({
        url: `base/retrieve/${data.params._id}`,
        method: "GET",
      }),
      providesTags: (_result: any, _error: any, data: any) => [{ type: "baseRetrieve", id: data.params._id }],
    }),

    baseUpdateAPI: builder.mutation({
      query: (data) => ({
        url: `base/update/${data.params._id}`,
        method: "PUT",
        body: data.body
      }),
      invalidatesTags: (_result: any, _error: any, data: any) => [
        { type: "baseList" },
        { type: "baseRetrieve", id: data.params._id },
      ],
    }),

    baseDeleteAPI: builder.mutation({
      query: (data) => (
        console.log("first"), {
        url: `base/delete/${data.params._id}`,
        method: "DELETE"
      }),
      invalidatesTags: (_result: any, _error: any, data: any) => [
        { type: "baseList" },
        { type: "baseRetrieve", id: data.params._id },
      ],
    }),

  })
})

export default baseAPIEndpoint;
