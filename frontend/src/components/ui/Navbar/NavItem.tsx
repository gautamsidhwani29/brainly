import { type ReactNode } from "react";
interface NavItemProps {
  icon: ReactNode;
  title?: string;
  classes?: string;
  collapsed: boolean;
  handler?: () => void | Promise<void>;
}
const NavItem = (props: NavItemProps) => {
  const { icon, title, classes, collapsed, handler } = props;
  return (
    <div
      onClick={handler}
      className={` flex  pl-10 max-w-sm hover:scale-105 hover:bg-gray-100  rounded-xl font-bold text-2xl p-4 gap-3 cursor-pointer ${classes} ${
        collapsed ? "w-fit" : "w-full"
      }`}
    >
      <span>{icon}</span>
      <span className="flex-shrink-0">{!collapsed ? title : undefined}</span>
    </div>
  );
};

export default NavItem;
