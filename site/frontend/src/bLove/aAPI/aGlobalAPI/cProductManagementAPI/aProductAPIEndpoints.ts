import apiConnection from "@/aConnection/cAPIConnection";


const productAPIEndpoint = apiConnection.injectEndpoints({
  endpoints: (builder) => ({
    
    productListAPI: builder.query({
      query: () => ({
        url: `product/list/`,
        method: "GET"
      }),
      providesTags: ["productList"]
    }),

    productCreateAPI: builder.mutation({
      query: (data) => ({
        url: `product/create/`,
        method: "POST",
        body: data.body
      }),
      invalidatesTags: ["productList"]
    }),

    productRetrievePI: builder.query({
      query: (data) => ({
        url: `product/retrieve/${data.params._id}`,
        method: "GET",
      })
    }),

    productUpdateAPI: builder.mutation({
      query: (data) => ({
        url: `product/update/${data.params._id}`,
        method: "PUT",
        body: data.body
      }),
      invalidatesTags: ["productList"]
    }),

    productDeleteAPI: builder.mutation({
      query: (data) => (
        console.log("first"), {
        url: `product/delete/${data.params._id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["productList"]
    }),

  })
})

export default productAPIEndpoint;
