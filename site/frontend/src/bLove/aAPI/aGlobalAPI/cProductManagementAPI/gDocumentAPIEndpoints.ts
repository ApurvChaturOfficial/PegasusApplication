import apiConnection from "@/aConnection/cAPIConnection";


const documentAPIEndpoint = apiConnection.injectEndpoints({
  endpoints: (builder) => ({
    
    documentListAPI: builder.query({
      query: () => ({
        url: `document/list/`,
        method: "GET"
      }),
      providesTags: ["documentList"]
    }),

    documentCreateAPI: builder.mutation({
      query: (data) => ({
        url: `document/create/`,
        method: "POST",
        body: data.body
      }),
      invalidatesTags: ["documentList"]
    }),

    documentRetrievePI: builder.query({
      query: (data) => ({
        url: `document/retrieve/${data.params._id}`,
        method: "GET",
      }),
      providesTags: (_result: any, _error: any, data: any) => [{ type: "documentRetrieve", id: data.params._id }],
    }),

    documentUpdateAPI: builder.mutation({
      query: (data) => ({
        url: `document/update/${data.params._id}`,
        method: "PUT",
        body: data.body
      }),
      invalidatesTags: (_result: any, _error: any, data: any) => [
        { type: "documentList" },
        { type: "documentRetrieve", id: data.params._id },
      ],
    }),

    documentDeleteAPI: builder.mutation({
      query: (data) => (
        console.log("first"), {
        url: `document/delete/${data.params._id}`,
        method: "DELETE"
      }),
      invalidatesTags: (_result: any, _error: any, data: any) => [
        { type: "documentList" },
        { type: "documentRetrieve", id: data.params._id },
      ],
    }),

  })
})

export default documentAPIEndpoint;
