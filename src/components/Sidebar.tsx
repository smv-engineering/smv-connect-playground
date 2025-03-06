import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../constants";
import { useState } from "react";

const { Sider } = Layout;

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      className="h-screen bg-[#001529] shadow-md text-white"
    >
      <div className="h-16 flex items-center justify-center text-xl font-bold text-white uppercase tracking-wide">
        {collapsed ? "SMV" : "SMV Connect"}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[ROUTES.find((route) => route.path === location.pathname)?.key || "home"]}
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