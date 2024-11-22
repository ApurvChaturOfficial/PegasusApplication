import apiConnection from "@/aConnection/cAPIConnection";


const categoryAPIEndpoint = apiConnection.injectEndpoints({
  endpoints: (builder) => ({
    
    categoryListAPI: builder.query({
      query: () => ({
        url: `category/list/`,
        method: "GET"
      }),
      providesTags: ["categoryList"]
    }),

    categoryCreateAPI: builder.mutation({
      query: (data) => ({
        url: `category/create/`,
        method: "POST",
        body: data.body
      }),
      invalidatesTags: ["categoryList"]
    }),

    categoryRetrievePI: builder.query({
      query: (data) => ({
        url: `category/retrieve/${data.params._id}`,
        method: "GET",
      })
    }),

    categoryUpdateAPI: builder.mutation({
      query: (data) => ({
        url: `category/update/${data.params._id}`,
        method: "PUT",
        body: data.body
      }),
      invalidatesTags: ["categoryList"]
    }),

    categoryDeleteAPI: builder.mutation({
      query: (data) => (
        console.log("first"), {
        url: `category/delete/${data.params._id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["categoryList"]
    }),

  })
})

export default categoryAPIEndpoint;
