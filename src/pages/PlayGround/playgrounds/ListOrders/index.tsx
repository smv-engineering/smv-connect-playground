import { useCallback, useEffect, useState } from "react";
import { Table, Tag, Spin } from "antd";
import dayjs from "dayjs";
import { useAuthContext } from "../../../../Context";
import { searchOrders } from "../../../../utils/api";
import { formatDateToDisplay } from "../../../../utils/date-utils";

interface PricingDetails {
  amount: number;
  currency: string;
}

interface VisaType {
  _id: string;
  visa_type: string;
  country_symbol: string;
  processing_time: number;
  tags: string[];
  pricing: {
    visa_fee: PricingDetails;
    vfs_fee: PricingDetails;
    service_fee: PricingDetails;
    child_visa_fee: PricingDetails;
  };
}

interface Order {
  _id: string;
  order_id: string;
  no_of_travelers: number;
  travel_start_date: string;
  travel_end_date: string;
  status: string;
  created_at: string;
  updated_at: string;
  expected_delivery_date: string;
  last_activity_at: string;
  pricing: {
    visa_fee: PricingDetails;
    vfs_fee: PricingDetails;
    service_fee: PricingDetails;
    child_visa_fee: PricingDetails;
  };
  visaType: VisaType;
}

interface ApiResponse {
  statusCode: number;
  success: boolean;
  data: {
    data: Order[];
    metaData: {
      pageNo: number;
      pageSize: number;
      total: number;
    };
  };
}

const statusColors: Record<string, string> = {
  PENDING: "blue",
  TO_BE_STARTED: "yellow",
  PROCESSING: "green",
  APPROVAL_FOR_SUBMISSION: "purple",
  READY_FOR_SUBMISSION: "cyan",
  SUBMITTED: "black",
  COMPLETED: "green",
  CANCELLED: "red",
};

const ListOrders = () => {
  const { authData } = useAuthContext();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const data = (await searchOrders(authData, {pageNo: page, pageSize})) as ApiResponse;
      setOrders(data.data.data);
      setTotal(data.data.metaData.total);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  }, [authData,page, pageSize]);

  useEffect(() => {
    fetchOrders();
  }, [page, pageSize, fetchOrders]);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title: "Travel Start Date",
      dataIndex: "travel_start_date",
      key: "travel_start_date",
      render: formatDateToDisplay,
    },
    {
      title: "Travel End Date",
      dataIndex: "travel_end_date",
      key: "travel_end_date",
      render: formatDateToDisplay,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={statusColors[status] || "default"}>
          {status.replace(/_/g, " ")}
        </Tag>
      ),
    },
    {
      title: "Last Activity",
      dataIndex: "last_activity_at",
      key: "last_activity_at",
      render: (date: string) => dayjs(date).format("DD MMM YYYY HH:mm"),
    },
  ];

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">List Orders</h2>
      {loading ? (
        <Spin size="large" className="flex justify-center items-center h-40" />
      ) : (
        <Table
          dataSource={orders}
          columns={columns}
          rowKey="_id"
          pagination={{
            current: page,
            pageSize: pageSize,
            total: total,
            onChange: (newPage, newPageSize) => {
              setPage(newPage);
              setPageSize(newPageSize || 10);
            },
          }}
        />
      )}
    </div>
  );
};

export default ListOrders;
