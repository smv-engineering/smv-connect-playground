import { useState } from "react";
import { DEFAULT_CREDENTIALS, TAuthData, useAuthContext } from "../../Context";
import { Modal, Input, Button, Form, Card, Select, Checkbox, Descriptions, CheckboxChangeEvent } from "antd";

const AuthPage = () => {
  const { authData, setAuthData, generateAuthToken } = useAuthContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [useDefault, setUseDefault] = useState(false);
  const [form] = Form.useForm<TAuthData>();

  const handleUseDefaultChange = (e: CheckboxChangeEvent) => {
    const checked = e.target.checked;
    setUseDefault(checked);

    if (checked) {
      // Populate form with default staging credentials
      form.setFieldsValue(DEFAULT_CREDENTIALS);
    } else {
      // Clear fields for manual entry
      form.setFieldsValue({
        environment: "staging",
        clientId: "",
        clientSecret: "",
        server: "",
        token: "",
      });
    }
  };

  const handleEnvironmentChange = () => {
    if (useDefault) {
      form.setFieldsValue(DEFAULT_CREDENTIALS);
    }
  };

  const handleSubmit = async (values: TAuthData) => {
    const authValues = useDefault ? DEFAULT_CREDENTIALS : values;
    setAuthData(authValues);
    await generateAuthToken(authValues);
    setIsModalVisible(true);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-white text-gray-900 p-6">
      <Card className="w-full max-w-md shadow-md p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Authentication</h2>
        
        <Form<TAuthData> 
          form={form} 
          initialValues={authData} 
          onFinish={handleSubmit} 
          layout="vertical"
        >
          <Form.Item>
            <Checkbox onChange={handleUseDefaultChange}>
              Use Default Credentials (Staging)
            </Checkbox>
          </Form.Item>

          <Form.Item 
            label="Environment" 
            name="environment" 
            rules={[{ required: true }]}
          >
            <Select
              disabled={useDefault}
              placeholder="Select Environment"
              onChange={handleEnvironmentChange}
            >
              <Select.Option value="staging">Staging</Select.Option>
              <Select.Option value="production">Production</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item 
            label="Client ID" 
            name="clientId" 
            rules={[{ required: true }]}
          >
            <Input placeholder="Client ID" disabled={useDefault} />
          </Form.Item>

          <Form.Item 
            label="Client Secret" 
            name="clientSecret" 
            rules={[{ required: true }]}
          >
            <Input.Password placeholder="Client Secret" disabled={useDefault} />
          </Form.Item>

          <Form.Item 
            label="Server" 
            name="server" 
            rules={[{ required: true }]}
          >
            <Input placeholder="Server" disabled={useDefault} />
          </Form.Item>
          
          <Button type="primary" htmlType="submit" block className="mt-4">
            Generate Token
          </Button>
        </Form>
      </Card>

      <Modal
        title="Authentication Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Environment">{authData.environment}</Descriptions.Item>
          <Descriptions.Item label="Client ID">{authData.clientId}</Descriptions.Item>
          <Descriptions.Item label="Client Secret">{authData.clientSecret}</Descriptions.Item>
          <Descriptions.Item label="Token">{authData.token}</Descriptions.Item>
        </Descriptions>
      </Modal>
    </div>
  );
};

export default AuthPage;