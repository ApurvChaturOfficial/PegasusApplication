const isAllowedUtility = (
  ReduxUltimate: any,
  model: string,
  route: "list" | "create" | "retrieve" | "update" | "delete"
): boolean => {
  return (ReduxUltimate.state.receivedObject as any)?.ProfileRetrieve?.cRole?.cMenu
    ?.filter((each: any) => each?.menu?.aTitle === model)[0]?.access?.[route] 
    ? true 
    : false;
};

const menuListUtility = {
  baseManyToOne: "Base Many To One",
  baseManyToMany: "Base Many To Many",
  base: "Base",
  baseOneToOne: "Base One To One",
  baseOneToMany: "Base One To Many",

  user: "User",
  role: "Role",
  menu: "Menu",

  product: "Product",
  category: "Category",
  tag: "Tag",
}

const NoAccessMessageUtility = () => (
  <div className="flex items-center justify-center text-center h-full text-red-300">
    You are not allowed to access this route! <br />
    Please contact Admin.
  </div>

)

export default isAllowedUtility;
export { menuListUtility, NoAccessMessageUtility };
