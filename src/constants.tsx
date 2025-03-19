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

export const PLAYGROUNDS: IPlaygroundConfig[] = [
  {
    name: "List Orders",
    id: "list-orders",
    description: "Use search API to list active orders in a tabular form.",
    photo: "https://stampmyvisa-public.s3.ap-south-1.amazonaws.com/playground/list-orders.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIASUWON5F6EMPUBLS3%2F20250319%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250319T174846Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCmFwLXNvdXRoLTEiRzBFAiBp8wPzKPTnAXDd8MKYqm%2FH2X5A1pi6Wxf5wCYCxVPDawIhAOdWfK1hCF%2BY4Ji4chwjpsZAF%2F5EQmAhv6VQLNntZTUVKtgDCHsQAhoMMTgxODk1MjkzMzA4IgxyIsPHXiR0rSAgoVQqtQNf8BDVOARAeSbbPgdECkz99BPfLFfNhp6ODUUUtb44wOJdtc5Ye%2FRMPnodKfrO7y6%2B28YKn3dnuLTDhlMYZkQnWDKtcgUt3keY6aeLxJ0EFbvHVTmPXylbnT6vOI4yAaLy2h79kkUT1oBreOA8CYz9tPdDzXKmHaMNWwIm8c7l36XXYRozCLPNoAtiWFkGvVFj7jQvA0tOb14lDd%2B%2B1gdyzdhL7VPm669iMSABmDTzqnvFeXjmlb3fZnpttrMy4hX1REshMaATAo2%2BxCOrQrysoaxjJSDT0blvajzinJN2ijVf45gRg5KO7LhyiMTDXLJpDopNichi4tnDrD4bsohhNiRtKCrDkZ0OwgfvjoboR7WNi5L36FwzlSCKaoB3S9IfPoRNT%2BgO7XleLFOJt3pvkQXgeG6hMEHto2kKbzKG5yBSQQeKPJqV0YILycxSPIFjby0qDX04vSFRr4x8V7WemlIgcdknR2%2Bw8VASwp%2FnCEh3zWzLFfqteon9X2NnEXkgtuOYmPImrsprvOQteJiatpaJLfPqZbLSEl5DqGoxWf3QBn5w2vDsYHEGfzNM25BSwkbPoTCohey%2BBjqUArJbcpWXZzK89zbnMSTAMccjzX3yVhhlyAMF1ZozjUefNJwfkYTz5DCsFY6KAIeppSYHir7GGrCtytKFE3hDJFEvI4ivbyRUihKhGUIo5j79b%2FeoVVs%2B7IF8AOtqbzCqJpBUHlmHLlXw5QAEAKMixQi%2FHeygWn2ZqTvbjVR3I89D4OVy2VeNcttVrWUk1wyJpdQvToqzNEJWQUtDkB0pWBLROWJYDHW1%2BLh%2Fq%2BbsX%2FfHabzBkfutDqUB9TFR%2FkLH1UX2z9fR%2BvX5zXPDtZx0yFEUuCYiWGTji%2FBVU4aLzGYep%2FgIsTMNFu6GzAfr029cRiReOJhhMk5PdPXpd6WpqphlwPFvr3IlT%2BlawhZU2IG%2BYCCJkg%3D%3D&X-Amz-Signature=a704b0b09de32928be9f6b3513ad9c6bd1663e2daae55b0d4ec38e99679dc6cc&X-Amz-SignedHeaders=host&response-content-disposition=inline",
    tags: ["SEARCH_ORDERS"],
    component: <ListOrders />,
  },
  // {
  //   name: "Create Order",
  //   id: "create-order",
  //   description: "Create a new order using API.",
  //   photo: "/assets/playgrounds/create-order.png",
  //   tags: ["CREATE_ORDER", "UPLOAD_BULK_DOCS"],
  //   component: <div>Component for List Orders</div>,
  // },
  {
    name: "Visa Processing",
    id: "visa-processing",
    description: "Complete Visa Processing flow.",
    photo: "https://stampmyvisa-public.s3.ap-south-1.amazonaws.com/playground/visa-processing.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIASUWON5F6EMPUBLS3%2F20250319%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250319T174749Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCmFwLXNvdXRoLTEiRzBFAiBp8wPzKPTnAXDd8MKYqm%2FH2X5A1pi6Wxf5wCYCxVPDawIhAOdWfK1hCF%2BY4Ji4chwjpsZAF%2F5EQmAhv6VQLNntZTUVKtgDCHsQAhoMMTgxODk1MjkzMzA4IgxyIsPHXiR0rSAgoVQqtQNf8BDVOARAeSbbPgdECkz99BPfLFfNhp6ODUUUtb44wOJdtc5Ye%2FRMPnodKfrO7y6%2B28YKn3dnuLTDhlMYZkQnWDKtcgUt3keY6aeLxJ0EFbvHVTmPXylbnT6vOI4yAaLy2h79kkUT1oBreOA8CYz9tPdDzXKmHaMNWwIm8c7l36XXYRozCLPNoAtiWFkGvVFj7jQvA0tOb14lDd%2B%2B1gdyzdhL7VPm669iMSABmDTzqnvFeXjmlb3fZnpttrMy4hX1REshMaATAo2%2BxCOrQrysoaxjJSDT0blvajzinJN2ijVf45gRg5KO7LhyiMTDXLJpDopNichi4tnDrD4bsohhNiRtKCrDkZ0OwgfvjoboR7WNi5L36FwzlSCKaoB3S9IfPoRNT%2BgO7XleLFOJt3pvkQXgeG6hMEHto2kKbzKG5yBSQQeKPJqV0YILycxSPIFjby0qDX04vSFRr4x8V7WemlIgcdknR2%2Bw8VASwp%2FnCEh3zWzLFfqteon9X2NnEXkgtuOYmPImrsprvOQteJiatpaJLfPqZbLSEl5DqGoxWf3QBn5w2vDsYHEGfzNM25BSwkbPoTCohey%2BBjqUArJbcpWXZzK89zbnMSTAMccjzX3yVhhlyAMF1ZozjUefNJwfkYTz5DCsFY6KAIeppSYHir7GGrCtytKFE3hDJFEvI4ivbyRUihKhGUIo5j79b%2FeoVVs%2B7IF8AOtqbzCqJpBUHlmHLlXw5QAEAKMixQi%2FHeygWn2ZqTvbjVR3I89D4OVy2VeNcttVrWUk1wyJpdQvToqzNEJWQUtDkB0pWBLROWJYDHW1%2BLh%2Fq%2BbsX%2FfHabzBkfutDqUB9TFR%2FkLH1UX2z9fR%2BvX5zXPDtZx0yFEUuCYiWGTji%2FBVU4aLzGYep%2FgIsTMNFu6GzAfr029cRiReOJhhMk5PdPXpd6WpqphlwPFvr3IlT%2BlawhZU2IG%2BYCCJkg%3D%3D&X-Amz-Signature=7081bc53b791b44ad72c609b71be872b3012be636903b5b00ca03881e7dfa3ad&X-Amz-SignedHeaders=host&response-content-disposition=inline",
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
