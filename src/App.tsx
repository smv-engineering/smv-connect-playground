import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import HomePage from "./pages/HomePage";
// import Navbar from "./components/Navbar";
import {AuthWrapper } from "./Context";
import AuthPage from "./pages/Auth";
// import "tailwindcss/tailwind.css";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/auth", element: <AuthPage /> },
]);

const App = () => {
  return (
    <AuthWrapper>
      <ConfigProvider>
        <RouterProvider router={router} />
      </ConfigProvider>
    </AuthWrapper>
  );
};

export default App;