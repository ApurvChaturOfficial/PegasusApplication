import apiConnection from "@/aConnection/cAPIConnection";


const baseOneToManyAPIEndpoint = apiConnection.injectEndpoints({
  endpoints: (builder) => ({
    
    baseOneToManyListAPI: builder.query({
      query: () => ({
        url: `base-one-to-many/list/`,
        method: "GET"
      }),
      providesTags: ["baseOneToManyList"]
    }),

    baseOneToManyCreateAPI: builder.mutation({
      query: (data) => ({
        url: `base-one-to-many/create/`,
        method: "POST",
        body: data.body
      }),
      invalidatesTags: ["baseOneToManyList"]
    }),

    baseOneToManyRetrievePI: builder.query({
      query: (data) => ({
        url: `base-one-to-many/retrieve/${data.params._id}`,
        method: "GET",
      })
    }),

    baseOneToManyUpdateAPI: builder.mutation({
      query: (data) => ({
        url: `base-one-to-many/update/${data.params._id}`,
        method: "PUT",
        body: data.body
      }),
      invalidatesTags: ["baseOneToManyList"]
    }),

    baseOneToManyDeleteAPI: builder.mutation({
      query: (data) => ({
        url: `base-one-to-many/delete/${data.params._id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["baseOneToManyList"]
    }),

  })
})

export default baseOneToManyAPIEndpoint;
