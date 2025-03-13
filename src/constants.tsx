import AuthPage from "./pages/Auth";
import Playgrounds from "./pages/PlayGrounds";
import Playground from "./pages/PlayGround";

import {
  HomeOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { JSX } from "react";
import { IPlaygroundConfig } from "./types";
import HomePage from "./pages/HomePage";
import ListOrders from "./pages/PlayGround/playgrounds/ListOrders";
import VisaProcesssing from "./pages/PlayGround/playgrounds/VisaProcessing";

export const PLAYGROUNDS: IPlaygroundConfig[] = [
  {
    name: "List Orders",
    id: "list-orders",
    description: "Use search API to list active orders in a tabular form.",
    photo: "src/assets/list-orders.png",
    tags: ["SEARCH_ORDERS"],
    component: <ListOrders />,
  },
  {
    name: "Create Order",
    id: "create-order",
    description: "Create a new order using API.",
    photo: "/assets/playgrounds/create-order.png",
    tags: ["CREATE_ORDER", "UPLOAD_BULK_DOCS"],
    component: <div>Component for List Orders</div>,
  },
  {
    name: "Visa Processing",
    id: "visa-processing",
    description: "Implement Visa Processing API Flow.",
    photo: "/assets/playgrounds/visa-processing.png",
    tags: ["COUNTRIES", "VISA_TYPES", "VISA_TYPES_REQUIREMENTS"],
    component: <VisaProcesssing />,
  },
];

type TRoutes = {
  key: string;
  label: string;
  path: string;
  icon: JSX.Element;
  page: JSX.Element;
};
export const ROUTES: TRoutes[] = [
  {
    key: "home",
    label: "Home",
    path: "/",
    icon: <HomeOutlined />,
    page: <HomePage />,
  },
  {
    key: "playgrounds",
    label: "Playgrounds",
    path: "/playgrounds",
    icon: <AppstoreOutlined />,
    page: <Playgrounds />,
  },
  {
    key: "auth",
    label: "Authentication",
    path: "/auth",
    icon: <SettingOutlined />,
    page: <AuthPage />,
  },
  {
    key: "playground",
    label: "Current Playground",
    path: "/playground",
    icon: <LoginOutlined />,
    page: <Playground />,
  },
];
