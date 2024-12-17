import apiConnection from "@/aConnection/cAPIConnection";


const enrolledServiceAPIEndpoint = apiConnection.injectEndpoints({
  endpoints: (builder) => ({
    
    enrolledServiceListAPI: builder.query({
      query: () => ({
        url: `enrolled-service/list/`,
        method: "GET"
      }),
      providesTags: ["enrolledServiceList"]
    }),

    enrolledServiceCreateAPI: builder.mutation({
      query: (data) => ({
        url: `enrolled-service/create/`,
        method: "POST",
        body: data.body
      }),
      invalidatesTags: ["enrolledServiceList"]
    }),

    enrolledServiceRetrievePI: builder.query({
      query: (data) => ({
        url: `enrolled-service/retrieve/${data.params._id}`,
        method: "GET",
      }),
      providesTags: (_result: any, _error: any, data: any) => [{ type: "enrolledServiceRetrieve", id: data.params._id }],
    }),

    enrolledServiceUpdateAPI: builder.mutation({
      query: (data) => ({
        url: `enrolled-service/update/${data.params._id}`,
        method: "PUT",
        body: data.body
      }),
      invalidatesTags: (_result: any, _error: any, data: any) => [
        { type: "enrolledServiceList" },
        { type: "enrolledServiceRetrieve", id: data.params._id },
      ],
    }),

    enrolledServiceDeleteAPI: builder.mutation({
      query: (data) => (
        console.log("first"), {
        url: `enrolled-service/delete/${data.params._id}`,
        method: "DELETE"
      }),
      invalidatesTags: (_result: any, _error: any, data: any) => [
        { type: "enrolledServiceList" },
        { type: "enrolledServiceRetrieve", id: data.params._id },
      ],
    }),

  })
})

export default enrolledServiceAPIEndpoint;
