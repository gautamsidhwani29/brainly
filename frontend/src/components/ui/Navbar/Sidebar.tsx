import { navLinks } from "./navLink";
import NavItem from "./NavItem";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  collapsedValue: boolean;
}
const Sidebar = (props: SidebarProps) => {
  const navigate = useNavigate();
  return (
    <div className={`flex flex-col gap-4 h-full w- min-h-full`}>
      {navLinks.map((nav, index) => (
        <NavItem
          handler={() => navigate(nav.route)}
          collapsed={props.collapsedValue}
          key={index}
          icon={nav.icon}
          title={nav.title}
        />
      ))}
    </div>
  );
};

export default Sidebar;
