import apiConnection from "@/aConnection/cAPIConnection";


const roleAPIEndpoint = apiConnection.injectEndpoints({
  endpoints: (builder) => ({
    
    roleListAPI: builder.query({
      query: () => ({
        url: `role/list/`,
        method: "GET"
      }),
      providesTags: ["RoleList"]
    }),

    roleCreateAPI: builder.mutation({
      query: (data) => ({
        url: `role/create/`,
        method: "POST",
        body: data.body
      }),
      invalidatesTags: ["RoleList"]
    }),

    roleRetrievePI: builder.query({
      query: (data) => ({
        url: `role/retrieve/${data.params._id}`,
        method: "GET",
      }),
      providesTags: (_result: any, _error: any, data: any) => [{ type: "RoleRetrieve", id: data.params._id }],
    }),

    roleUpdateAPI: builder.mutation({
      query: (data) => ({
        url: `role/update/${data.params._id}`,
        method: "PUT",
        body: data.body
      }),
      invalidatesTags: (_result: any, _error: any, data: any) => [
        { type: "RoleList" },
        { type: "RoleRetrieve", id: data.params._id },
      ],
    }),

    roleDeleteAPI: builder.mutation({
      query: (data) => (
        console.log("first"), {
        url: `role/delete/${data.params._id}`,
        method: "DELETE"
      }),
      invalidatesTags: (_result: any, _error: any, data: any) => [
        { type: "RoleList" },
        { type: "RoleRetrieve", id: data.params._id },
      ],
    }),

  })
})

export default roleAPIEndpoint;
