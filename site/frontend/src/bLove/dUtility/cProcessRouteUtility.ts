export const processRouteUtility = (route: string): string => {
  // Step 1: Split the string by '-'
  let splitRoute = route.split('-');
  
  // Step 2: Remove the last element
  splitRoute.pop();
  
  // Step 3: Join the remaining elements back into a string
  return splitRoute.join('-');
};

// // Example usage:
// const route = "/base-many-to-one-list";
// const result = processRoute(route);
// console.log(result);  // Output: '/base-many-to-one'

export default processRouteUtility;
