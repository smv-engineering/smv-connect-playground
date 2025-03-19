import React from "react";
import {Layout, Menu} from "antd";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../constants";

const {Sider} = Layout;

// Define the interface for Sidebar props
interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({collapsed, setCollapsed}) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const playgroundId = searchParams.get("id");

  let selectedKey = ROUTES.find((route) => route.path === location.pathname)?.key || "home";

  if (location.pathname === "/playground" && playgroundId) {
    selectedKey = "playground";
  }

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      className="shadow-md"
    >
      <div className="h-16 flex items-center justify-center text-xl font-bold text-white tracking-wide">
        {collapsed ? "SMV" : "SMV Konveyor"}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[ selectedKey]}
      >
        {ROUTES.map((route) => (
          <Menu.Item key={route.key} icon={route.icon}>
            <Link to={route.path}>{route.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
