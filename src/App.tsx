import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider, Layout } from "antd";
import { AuthWrapper } from "./Context";
import { ROUTES } from "./constants";
import Sidebar from "./components/Sidebar";

const { Content } = Layout;

const App = () => {
  return (
    <AuthWrapper>
      <ConfigProvider>
        <Router>
          <Layout style={{ minHeight: "100vh", display: "flex" }}>
            <Sidebar />
            <Layout>
              <Content style={{ padding: "24px", background: "#f4f4f4" }}>
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