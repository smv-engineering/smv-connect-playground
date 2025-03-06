import { IPlaygroundConfig } from "../../types";

export const PLAYGROUNDS: IPlaygroundConfig[] = [
  {
    name: "List Orders",
    id: "list-orders",
    description: "Use search API to list active orders in a tabular form.",
    photo: "/assets/playgrounds/list-orders.png",
    tags: ["SEARCH_ORDERS"],
    component: <div>Component for List Orders</div>,
  },
  {
    name: "Create Order",
    id: "create-order",
    description: "Create a new order using API.",
    photo: "/assets/playgrounds/create-order.png",
    tags: ["CREATE_ORDER", "UPLOAD_BULK_DOCS"],
    component: <div>Component for List Orders</div>,
  },
];
