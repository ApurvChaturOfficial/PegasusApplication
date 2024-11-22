const data = (APICall: any) => {
  return ({
    header: {
      title: "Profile Retrieve",
      subtitle: "Here's a list of your tasks for this month!",
      buttons: []
    },
    content: {
      sections: (
        APICall.retrieveAPIResponse.isLoading ? null : 
          APICall.retrieveAPIResponse.isError ? null :
            APICall.retrieveAPIResponse.isSuccess ? (
              APICall.retrieveAPIResponse.data.success ? ([
                // Basic Information
                {
                  display: true,
                  title: "Basic Information",
                  subtitle: "In this section, please enter title, subtitle, description, etc.",
                  values: [
                    { label: "ID", value: APICall.retrieveAPIResponse.data.user_profile_retrieve._id, type: "normal" },
                    { label: "Title", value: APICall.retrieveAPIResponse.data.user_profile_retrieve.aTitle, type: "normal" },
                    { label: "Subtitle", value: APICall.retrieveAPIResponse.data.user_profile_retrieve.aSubtitle, type: "normal" },
                    { label: "Description", value: APICall.retrieveAPIResponse.data.user_profile_retrieve.aDescription, type: "textarea" },
                    { label: "Detail", value: APICall.retrieveAPIResponse.data.user_profile_retrieve.aDetail, type: "textarea" },
                    { label: "Status", value: APICall.retrieveAPIResponse.data.user_profile_retrieve.aStatus ? "Active" : "Inactive", type: "badge" },
                    { label: "Slug", value: APICall.retrieveAPIResponse.data.user_profile_retrieve.aSlug, type: "normal" },
                  ],  
                },
        
                // Personal Information
                {
                  display: true,
                  title: "Personal Information",
                  subtitle: "In this section, you will see created and updated details.",
                  values: [
                    { label: "Created By", value: APICall.retrieveAPIResponse.data.user_profile_retrieve.bCreatedBy, type: "userBlock" },
                    { label: "Created At", value: APICall.retrieveAPIResponse.data.user_profile_retrieve.bCreatedAt, type: "date" },
                    { label: "Updated By", value: APICall.retrieveAPIResponse.data.user_profile_retrieve.bUpdatedBy, type: "userBlock" },
                    { label: "Updated At", value: APICall.retrieveAPIResponse.data.user_profile_retrieve.bUpdatedAt, type: "date" },
                  ],  
                },
        
                // Relation Information
                {
                  display: true,
                  title: "Relation Information",
                  subtitle: "In this section, you will see relation details, you will see relation details.",
                  values: [
                    { label: "Role", value: APICall.retrieveAPIResponse.data.user_profile_retrieve?.cRole?.aTitle, type: "normal" }, 
                    { label: "Menu Permissions", value: APICall.retrieveAPIResponse.data.user_profile_retrieve?.cRole?.cMenu, type: "special-checkbox", 
                      columns: ['Menu Items', 'List', 'Create', 'Retrieve', 'Update', 'Delete' ],
                    },
                  ],  
                },
        
                // More Information
                {
                  display: false,
                  title: "More Information",
                  subtitle: "In this section, you will see created and updated details.",
                  values: [],  
                },
        
                // Critical Information
                {
                  display: true,
                  title: "Critical Information",
                  subtitle: "In this section, you will see created and updated details.",
                  values: [
                    { label: "Firstname", value: APICall.retrieveAPIResponse.data.user_profile_retrieve.eFirstname, type: "normal" },
                    { label: "Lastname", value: APICall.retrieveAPIResponse.data.user_profile_retrieve.eLastname, type: "normal" },
                    { label: "Email", value: APICall.retrieveAPIResponse.data.user_profile_retrieve.eEmail, type: "normal" },
                    { label: "Mobile", value: APICall.retrieveAPIResponse.data.user_profile_retrieve.eMobile, type: "normal" },
                  ],  
                },
                
              ]) : []
            ) : []
      )
    }
  })
}

export default data