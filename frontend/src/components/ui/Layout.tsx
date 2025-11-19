import { useState, type ReactNode } from "react";
import TopNavbar from "./Navbar/TopNavbar";
import { Outlet } from "react-router-dom";
const Layout = ({ children }: { children?: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleMenu = () => {
    setCollapsed((x) => !x);
  };

  return (
    <div className="flex min-h-screen flex-col flex-1 ">
      <TopNavbar toggleMenu={toggleMenu} collapsed={collapsed} />
      <div className={`flex flex-1 pt-32 ${collapsed ? "pl-32" : " pl-80"}`}>
        <main className="p-4 w-full">{children ? children : <Outlet />}</main>
      </div>
    </div>
  );
};

export default Layout;
