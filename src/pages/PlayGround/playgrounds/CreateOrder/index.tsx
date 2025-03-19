import { useState } from "react";
import { useAuthContext } from "../../../../Context";
import { Card, Form, Input, Button, DatePicker, Select, message, Typography, Spin } from "antd";
import { Order, VisaTypeData } from "../../../../types";
import dayjs from "dayjs";
import { useCountries } from "../../../../hooks/useCountries";
import { useVisaTypes } from "../../../../hooks/useVisaTypes";
import { createOrder } from "../../../../utils/api";

const { TextArea } = Input;
const { Title, Text } = Typography;

type TFormValues = {
    country: string;
    visaType: string;
    passengers: number;
    note: string;
    travelStartDate: string;
    travelEndDate: string;
}

const CreateOrder = () => {
  const { authData } = useAuthContext();
  const { countries, loading: countriesLoading } = useCountries();
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>();
  const { visaTypes, loading: visaTypesLoading, fetchVisaTypes } = useVisaTypes('IN');
  const [selectedVisaType, setSelectedVisaType] = useState<VisaTypeData | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);
  const [form] = Form.useForm<TFormValues>();

  const handleSubmit = async (values: TFormValues) => {
    if (!selectedVisaType) {
      message.error("Please select a visa type.");
      return;
    }

    const orderData = {
      visa_type_id: selectedVisaType._id,
      travel_start_date: dayjs(values.travelStartDate).format("MM/DD/YYYY"),
      travel_end_date: dayjs(values.travelEndDate).format("MM/DD/YYYY"),
      no_of_travelers: +values.passengers,
    };

    try {
      setSubmitting(true);
      const response = (await createOrder(authData, orderData) as Order);
      if (response) {
        message.success("Order created successfully!");
        setOrderDetails(response);
        form.resetFields();
        setSelectedCountry(undefined);
        setSelectedVisaType(undefined);
      }
    } catch (error) {
       console.error("Error creating order:", error);
       message.error("Failed to create order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="shadow-md rounded-lg overflow-hidden p-6 max-w-2xl mx-auto">
      <Title level={4}>Create Order</Title>
      <Text className="block mb-4">Fill in the details to create a new order.</Text>

      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        {/* Country Selection */}
        <Form.Item label="Select Country" name="country" rules={[{ required: true, message: "Please select a country" }]}>
          <Select
            placeholder="Select a country"
            loading={countriesLoading}
            value={selectedCountry}
            onChange={(value)=> {
                setSelectedCountry(value);
                form.setFieldsValue({visaType: undefined});
                fetchVisaTypes(value);
            }}
          >
            {countries.map((country) => (
              <Select.Option key={country.symbol} value={country.symbol}>
                {country.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Visa Type Selection */}
        <Form.Item label="Visa Type" name="visaType" rules={[{ required: true, message: "Please select a visa type" }]}>
          <Select
            placeholder="Select visa type"
            loading={visaTypesLoading}
            disabled={!selectedCountry}
            value={selectedVisaType?._id}
            onChange={(value) => setSelectedVisaType(visaTypes.find((visa) => visa._id === value))}
          >
            {visaTypes.map((visa) => (
              <Select.Option key={visa._id} value={visa._id}>
                {visa.visa_type}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Number of Travelers */}
        <Form.Item label="Number of Travelers" name="passengers" rules={[{ required: true, message: "Enter number of travelers" }]}>
          <Input type="number" min={1} placeholder="Enter number of travelers" />
        </Form.Item>

        {/* Note for Visa Expert */}
        <Form.Item label="Note for Visa Expert" name="note">
          <TextArea rows={3} placeholder="Enter any additional information (optional)" />
        </Form.Item>

        {/* Travel Start Date */}
        <Form.Item label="Travel Start Date" name="travelStartDate" rules={[{ required: true, message: "Select start date" }]}>
          <DatePicker className="w-full" format="MM/DD/YYYY" />
        </Form.Item>

        {/* Travel End Date */}
        <Form.Item label="Travel End Date" name="travelEndDate" rules={[{ required: true, message: "Select end date" }]}>
          <DatePicker className="w-full" format="MM/DD/YYYY" />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full" loading={submitting}>
            {submitting ? <Spin /> : "Create Order"}
          </Button>
        </Form.Item>
      </Form>

      {/* Show Order Details After Submission */}
      {orderDetails && (
        <Card className="mt-6 p-4 bg-gray-50 border border-gray-200">
          <Title level={5}>Order Created Successfully 🎉</Title>
          <Text><strong>Order ID:</strong> {orderDetails.order_id}</Text> <br />
          <Text><strong>Status:</strong> {orderDetails.status}</Text> <br />
          <Text><strong>Travel Start Date:</strong> {dayjs(orderDetails.travel_start_date).format("MMM DD, YYYY")}</Text> <br />
          <Text><strong>Travel End Date:</strong> {dayjs(orderDetails.travel_end_date).format("MMM DD, YYYY")}</Text> <br />
          <Text><strong>No. of Travelers:</strong> {orderDetails.no_of_travelers}</Text> <br />
          <Text><strong>Expected Delivery:</strong> {dayjs(orderDetails.expected_delivery_date).format("MMM DD, YYYY")}</Text> <br />
        </Card>
      )}
    </Card>
  );
};

export default CreateOrder;