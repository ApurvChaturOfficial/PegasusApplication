import apiConnection from "@/aConnection/cAPIConnection";


const userAPIEndpoint = apiConnection.injectEndpoints({
  endpoints: (builder) => ({
    
    userListAPI: builder.query({
      query: () => ({
        url: `user/list/`,
        method: "GET"
      }),
      providesTags: ["UserList"]
    }),

    userCreateAPI: builder.mutation({
      query: (data) => ({
        url: `user/create/`,
        method: "POST",
        body: data.body
      }),
      invalidatesTags: ["UserList"]
    }),

    userRetrievePI: builder.query({
      query: (data) => ({
        url: `user/retrieve/${data.params._id}`,
        method: "GET",
      }),
      providesTags: (_result: any, _error: any, data: any) => [{ type: "UserRetrieve", id: data.params._id }],
    }),

    userUpdateAPI: builder.mutation({
      query: (data) => ({
        url: `user/update/${data.params._id}`,
        method: "PUT",
        body: data.body
      }),
      invalidatesTags: (_result: any, _error: any, data: any) => [
        { type: "UserList" },
        { type: "UserRetrieve", id: data.params._id },
      ],
    }),

    userDeleteAPI: builder.mutation({
      query: (data) => (
        console.log("first"), {
        url: `user/delete/${data.params._id}`,
        method: "DELETE"
      }),
      invalidatesTags: (_result: any, _error: any, data: any) => [
        { type: "UserList" },
        { type: "UserRetrieve", id: data.params._id },
      ],
    }),

    userSignInAPI: builder.mutation({
      query: (data) => ({
        url: `user/auth/login/`,
        method: "POST",
        body: data.body
      }),
    }),

    userSignUpAPI: builder.mutation({
      query: (data) => ({
        url: `user/auth/register/`,
        method: "POST",
        body: data.body
      }),
    }),

    userForgotPasswordAPI: builder.mutation({
      query: (data) => ({
        url: `user/auth/forgot-password/`,
        method: "POST",
        body: data.body
      }),
    }),

    userResetPasswordAPI: builder.mutation({
      query: (data) => ({
        url: `user/auth/reset-password/${data.params.token}`,
        method: "POST",
        body: data.body
      }),
    }),

    userLogoutAPI: builder.query({
      query: () => ({
        url: `user/auth/logout/`,
        method: "GET",
      }),
    }),

    userProfileRetrieveAPI: builder.query({
      query: () => ({
        url: `user/profile/retrieve/`,
        method: "GET",
      })
    }),

    userProfileUpdateAPI: builder.mutation({
      query: (data) => ({
        url: `user/profile/update/`,
        method: "PUT",
        body: data.body
      })
    }),

    userProfilePasswordUpdateAPI: builder.mutation({
      query: (data) => ({
        url: `user/profile/password-update/`,
        method: "POST",
        body: data.body
      })
    }),

  })
})

export default userAPIEndpoint;
