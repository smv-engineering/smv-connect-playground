import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ConfigProvider, Layout} from "antd";
import {AuthWrapper} from "./Context";
import {ROUTES} from "./constants";
import Sidebar from "./components/Sidebar";
import {useState} from "react";

const {Content} = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  // Calculate the margin based on sidebar collapsed state
  const sidebarWidth = collapsed ? 80 : 200; // Default Ant Design sidebar widths

  return (
    <AuthWrapper>
      <ConfigProvider>
        <Router>
          <Layout style={{minHeight: "100vh"}}>
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <Layout style={{marginLeft: sidebarWidth}}>
              <Content
                style={{
                  padding: "24px",
                  background: "#f4f4f4",
                  minHeight: "100vh",
                }}
              >
                <Routes>
                  {ROUTES.map((r) => (
                    <Route key={r.key} path={r.path} element={r.page} />
                  ))}
                </Routes>
              </Content>
            </Layout>
          </Layout>
        </Router>
      </ConfigProvider>
    </AuthWrapper>
  );
};

export default App;
