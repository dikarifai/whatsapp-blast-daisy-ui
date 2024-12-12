const useSidebar = () => {
  const sidebarItems = [
    { id: 1, name: "Dashboard", key: "dashboard", path: "/" },
    { id: 2, name: "Account", key: "account", path: "/account" },
    { id: 3, name: "User", key: "user", path: "/user" },
  ];

  return {
    sidebarItems,
  };
};

export default useSidebar;
