import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ConfigProvider, Layout} from "antd";
import {AuthWrapper} from "./Context";
import {ROUTES} from "./constants";
import Sidebar from "./components/Sidebar";
import {useState} from "react";

const {Content} = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AuthWrapper>
      <ConfigProvider>
        <Router>
          <Layout>
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <Layout>
              <Content>
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
