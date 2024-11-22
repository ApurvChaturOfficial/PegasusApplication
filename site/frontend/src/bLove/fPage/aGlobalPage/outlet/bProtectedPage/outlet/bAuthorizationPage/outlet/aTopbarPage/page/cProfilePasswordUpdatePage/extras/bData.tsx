const data = (APICall: any) => {
  console.log(APICall)
  return ({
    header: {
      title: "Profile Password Update",
      subtitle: "Here's a list of your tasks for this month!",
      buttons: []
    },
    content: {
      sections: [
        // Basic Information
        {
          display: false,
          title: "Basic Information",
          subtitle: "In this section, please enter title, subtitle, description, etc.",
          inputs: [],  
        },

        // Personal Information
        {
          display: false,
          title: "Personal Information",
          subtitle: "In this section, you will see created and updated details.",
          inputs: [],  
        },

        // Relation Information
        {
          display: false,
          title: "Relation Information",
          subtitle: "In this section, you will see relation details.",
          inputs: [],  
        },

        // More Information
        {
          display: false,
          title: "More Information",
          subtitle: "In this section, you will see created and updated details.",
          inputs: [],  
        },

        // Critical Information
        {
          display: true,
          title: "Critical Information",
          subtitle: "In this section, you will see created and updated details.",
          inputs: [
            { name: "eOldPassword", label: "Old Password", type: "password", placeholder: "Please enter old password..." },
            { name: "eNewPassword", label: "New Password", type: "password", placeholder: "Please enter new password..." },
            { name: "eConfirmPassword", label: "Confirm Password", type: "password", placeholder: "Please enter confirm password..." },        
          ],  
        },

      ]            
    }
  })
}

export default data