const getInitialsUtility = ( firstName: string, lastName: string ) => {

  // Extract the first character of the first name and last name
  const firstInitial = firstName.charAt(0).toUpperCase();
  const lastInitial = lastName.charAt(0).toUpperCase();
  
  // Return the initials
  return `${firstInitial}${lastInitial}`;
}

export default getInitialsUtility;
