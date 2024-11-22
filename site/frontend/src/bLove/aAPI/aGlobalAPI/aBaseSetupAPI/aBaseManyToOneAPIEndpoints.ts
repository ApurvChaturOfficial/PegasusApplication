import apiConnection from "@/aConnection/cAPIConnection";


const baseManyToOneAPIEndpoint = apiConnection.injectEndpoints({
  endpoints: (builder) => ({
    
    baseManyToOneListAPI: builder.query({
      query: () => ({
        url: `base-many-to-one/list/`,
        method: "GET"
      }),
      providesTags: ["baseManyToOneList"]
    }),

    baseManyToOneCreateAPI: builder.mutation({
      query: (data) => ({
        url: `base-many-to-one/create/`,
        method: "POST",
        body: data.body
      }),
      invalidatesTags: ["baseManyToOneList"]
    }),

    baseManyToOneRetrievePI: builder.query({
      query: (data) => ({
        url: `base-many-to-one/retrieve/${data.params._id}`,
        method: "GET",
      })
    }),

    baseManyToOneUpdateAPI: builder.mutation({
      query: (data) => ({
        url: `base-many-to-one/update/${data.params._id}`,
        method: "PUT",
        body: data.body
      }),
      invalidatesTags: ["baseManyToOneList"]
    }),

    baseManyToOneDeleteAPI: builder.mutation({
      query: (data) => ({
        url: `base-many-to-one/delete/${data.params._id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["baseManyToOneList"]
    }),

  })
})

export default baseManyToOneAPIEndpoint;
