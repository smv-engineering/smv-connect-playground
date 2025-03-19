import { useState } from "react";
import { useAuthContext } from "../../../../Context";
import { Card, Form, Input, Button, DatePicker, Select, message, Typography, Spin, Tag, Row, Col } from "antd";
import { Order, VisaType, Country } from "../../../../types";
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
  const { visaTypes, loading: visaTypesLoading, fetchVisaTypes } = useVisaTypes(selectedCountry!);
  const [selectedVisaType, setSelectedVisaType] = useState<VisaType | undefined>();
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="shadow-lg rounded-lg bg-white p-8 w-full max-w-3xl">
        <Title level={3} className="text-center">Create Order</Title>
        <Text className="block text-center mb-6 text-gray-500">Fill in the details to create a new order.</Text>

        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          {/* Country & Visa Type in One Row */}
          <Row gutter={16}>
            {/* Country Selection */}
            <Col span={12}>
              <Form.Item label="Select Country" name="country" rules={[{ required: true, message: "Please select a country" }]}>
                <Select
                  showSearch
                  placeholder="Select a country"
                  loading={countriesLoading}
                  value={selectedCountry}
                  onChange={(value) => {
                    setSelectedCountry(value);
                    form.setFieldsValue({ visaType: undefined });
                    fetchVisaTypes(value);
                  }}
                  optionLabelProp="label"
                >
                  {countries.map((country: Country) => (
                    <Select.Option key={country.symbol} value={country.symbol} label={country.name}>
                      <div className="flex justify-between items-center">
                        <span>{country.name}</span>
                        <Tag color="blue">{country.symbol}</Tag>
                      </div>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {/* Visa Type Selection */}
            <Col span={12}>
              <Form.Item label="Visa Type" name="visaType" rules={[{ required: true, message: "Please select a visa type" }]}>
                <Select
                  placeholder="Select visa type"
                  loading={visaTypesLoading}
                  disabled={!selectedCountry}
                  value={selectedVisaType?._id}
                  onChange={(value) => setSelectedVisaType(visaTypes.find((visa) => visa._id === value))}
                  optionLabelProp="label"
                >
                  {visaTypes.map((visa: VisaType) => (
                    <Select.Option key={visa._id} value={visa._id} label={visa.visa_type}>
                      <div className="flex justify-between">
                        <span>{visa.visa_type}</span>
                        <Text className="text-gray-500 text-xs">Processing: {visa.processing_time} days</Text>
                      </div>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Number of Travelers, Travel Start Date, and Travel End Date in One Row */}
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="No. of Travelers" name="passengers" rules={[{ required: true, message: "Enter number of travelers" }]}>
                <Input type="number" min={1} placeholder="Travelers" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Travel Start Date" name="travelStartDate" rules={[{ required: true, message: "Select start date" }]}>
                <DatePicker className="w-full" format="MM/DD/YYYY" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Travel End Date" name="travelEndDate" rules={[{ required: true, message: "Select end date" }]}>
                <DatePicker className="w-full" format="MM/DD/YYYY" />
              </Form.Item>
            </Col>
          </Row>

          {/* Note for Visa Expert in One Row */}
          <Row>
            <Col span={24}>
              <Form.Item label="Note for Visa Expert" name="note">
                <TextArea rows={2} placeholder="Enter additional information (optional)" />
              </Form.Item>
            </Col>
          </Row>

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
            <Title level={5} className="text-center">Order Created Successfully 🎉</Title>
            <Text><strong>Order ID:</strong> {orderDetails.order_id}</Text> <br />
            <Text><strong>Status:</strong> {orderDetails.status}</Text> <br />
            <Text><strong>Travel Start Date:</strong> {dayjs(orderDetails.travel_start_date).format("MMM DD, YYYY")}</Text> <br />
            <Text><strong>Travel End Date:</strong> {dayjs(orderDetails.travel_end_date).format("MMM DD, YYYY")}</Text> <br />
            <Text><strong>No. of Travelers:</strong> {orderDetails.no_of_travelers}</Text> <br />
            <Text><strong>Expected Delivery:</strong> {dayjs(orderDetails.expected_delivery_date).format("MMM DD, YYYY")}</Text> <br />
          </Card>
        )}
      </Card>
    </div>
  );
};

export default CreateOrder;