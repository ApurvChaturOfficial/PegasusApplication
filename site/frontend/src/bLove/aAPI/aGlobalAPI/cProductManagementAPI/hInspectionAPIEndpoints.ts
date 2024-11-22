import apiConnection from "@/aConnection/cAPIConnection";


const inspectionAPIEndpoint = apiConnection.injectEndpoints({
  endpoints: (builder) => ({
    
    inspectionListAPI: builder.query({
      query: () => ({
        url: `inspection/list/`,
        method: "GET"
      }),
      providesTags: ["inspectionList"]
    }),

    inspectionCreateAPI: builder.mutation({
      query: (data) => ({
        url: `inspection/create/`,
        method: "POST",
        body: data.body
      }),
      invalidatesTags: ["inspectionList"]
    }),

    inspectionRetrievePI: builder.query({
      query: (data) => ({
        url: `inspection/retrieve/${data.params._id}`,
        method: "GET",
      }),
      providesTags: (_result: any, _error: any, data: any) => [{ type: "inspectionRetrieve", id: data.params._id }],
    }),

    inspectionUpdateAPI: builder.mutation({
      query: (data) => ({
        url: `inspection/update/${data.params._id}`,
        method: "PUT",
        body: data.body
      }),
      invalidatesTags: (_result: any, _error: any, data: any) => [
        { type: "inspectionList" },
        { type: "inspectionRetrieve", id: data.params._id },
      ],
    }),

    inspectionDeleteAPI: builder.mutation({
      query: (data) => (
        console.log("first"), {
        url: `inspection/delete/${data.params._id}`,
        method: "DELETE"
      }),
      invalidatesTags: (_result: any, _error: any, data: any) => [
        { type: "inspectionList" },
        { type: "inspectionRetrieve", id: data.params._id },
      ],
    }),

  })
})

export default inspectionAPIEndpoint;
