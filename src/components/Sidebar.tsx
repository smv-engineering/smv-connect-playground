import {Layout, Menu} from "antd";
import {Link, useLocation} from "react-router-dom";
import {ROUTES} from "../constants";

const {Sider} = Layout;

// Define the interface for Sidebar props
interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({collapsed, setCollapsed}) => {
  const location = useLocation();

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      className="shadow-md"
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 10,
      }}
    >
      <div className="h-16 flex items-center justify-center text-xl font-bold text-white uppercase tracking-wide">
        {collapsed ? "SMV" : "SMV Connect"}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[
          ROUTES.find((route) => route.path === location.pathname)?.key ||
            "home",
        ]}
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
