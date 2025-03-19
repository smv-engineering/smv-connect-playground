import React from "react";
import { API_NAME } from "../types";

const tagColors: Record<API_NAME, string> = {
  GENERATE_TOKEN: "bg-blue-500 text-white",
  CREATE_ORDER: "bg-green-500 text-white",
  UPLOAD_BULK_DOCS: "bg-yellow-500 text-black",
  SEARCH_ORDERS: "bg-purple-500 text-white",
};

const tagName: Record<API_NAME, string> = {
  GENERATE_TOKEN: "Generate Token",
  CREATE_ORDER: "Create Order",
  UPLOAD_BULK_DOCS: "Upload Bulk Docs",
  SEARCH_ORDERS: "Search Orders",
};


interface PlaygroundTagProps {
  tag: API_NAME;
}

const APITag: React.FC<PlaygroundTagProps> = ({ tag }) => {
  return (
    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${tagColors[tag]}`}
    >
      {tagName[tag]}
    </span>
  );
};

export default APITag;
