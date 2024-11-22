import apiConnection from "@/aConnection/cAPIConnection";


const baseManyToManyAPIEndpoint = apiConnection.injectEndpoints({
  endpoints: (builder) => ({
    
    baseManyToManyListAPI: builder.query({
      query: () => ({
        url: `base-many-to-many/list/`,
        method: "GET"
      }),
      providesTags: ["baseManyToManyList"]
    }),

    baseManyToManyCreateAPI: builder.mutation({
      query: (data) => ({
        url: `base-many-to-many/create/`,
        method: "POST",
        body: data.body
      }),
      invalidatesTags: ["baseManyToManyList"]
    }),

    baseManyToManyRetrievePI: builder.query({
      query: (data) => ({
        url: `base-many-to-many/retrieve/${data.params._id}`,
        method: "GET",
      })
    }),

    baseManyToManyUpdateAPI: builder.mutation({
      query: (data) => ({
        url: `base-many-to-many/update/${data.params._id}`,
        method: "PUT",
        body: data.body
      }),
      invalidatesTags: ["baseManyToManyList"]
    }),

    baseManyToManyDeleteAPI: builder.mutation({
      query: (data) => ({
        url: `base-many-to-many/delete/${data.params._id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["baseManyToManyList"]
    }),

  })
})

export default baseManyToManyAPIEndpoint;
