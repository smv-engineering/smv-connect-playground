import AuthPage from "./pages/Auth";
import Playgrounds from "./pages/PlayGrounds";
import Playground from "./pages/PlayGround";

import {
  HomeOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import {JSX} from "react";
import {IPlaygroundConfig} from "./types";
import HomePage from "./pages/HomePage";
import ListOrders from "./pages/PlayGround/playgrounds/ListOrders";
import VisaProcessing from "./pages/PlayGround/playgrounds/VisaProcessing";
import CreateOrder from "./pages/PlayGround/playgrounds/CreateOrder";

export const PLAYGROUNDS: IPlaygroundConfig[] = [
  {
    name: "List Orders",
    id: "list-orders",
    description: "Use search API to list active orders in a tabular form.",
    photo: "https://d1ds5rzn7liqmq.cloudfront.net/playground/list-orders.png",
    tags: ["SEARCH_ORDERS"],
    component: <ListOrders />,
  },
  {
    name: "Create Order",
    id: "create-order",
    description: "Create a new order using API.",
    photo: "https://d1ds5rzn7liqmq.cloudfront.net/playground/create-order.png",
    tags: ["CREATE_ORDER", "COUNTRY", "VISA_TYPE"],
    component: <CreateOrder />,
  },
  {
    name: "Visa Processing",
    id: "visa-processing",
    description: "Complete Visa Processing flow.",
    photo: "https://d1ds5rzn7liqmq.cloudfront.net/playground/visa-processing.png",
    tags: ["COUNTRY", "VISA_TYPE", "VISA_REQUIREMENTS"],
    component: <VisaProcessing />,
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
