import { useState } from "react";
import { TAuthData, useAuthContext } from "../../Context";
import { Modal, Input, Button, Form, Card, Select, Checkbox } from "antd";

const defaultCredentials: Record<TAuthData['environment'], TAuthData> = {
  staging: { 
    clientId: "BJPuwh-D9j3EV-L9vgdW",
     clientSecret: "rFaQeB-06eJQb-H3eWK8", 
     environment: "staging", 
     token: "",
     server: "https://api.qa.stampmyvisa.com"
     },
  production: { 
    clientId: "prod-client-id", 
    clientSecret: "prod-secret", 
    environment: "production",
     token: "",
    server: "https://api.live.stampmyvisa.com"
  }
};

const AuthPage = () => {
  const { authData, setAuthData , generateAuthToken} = useAuthContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [useDefault, setUseDefault] = useState(false);
  const [form] = Form.useForm<TAuthData>();

  const handleEnvironmentChange = (env: string) => {
    if (useDefault) {
      form.setFieldsValue(defaultCredentials[env as TAuthData['environment']] );
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUseDefaultChange = (e: any) => {
    setUseDefault(e.target.checked);
    const env = form.getFieldValue("environment");
    if (e.target.checked && env) {
      form.setFieldsValue(defaultCredentials[env as TAuthData['environment']]);
    } else {
      form.setFieldsValue({
        clientId: "",
        clientSecret: "",
        environment: "staging",
        token: "",
      });
    }
  };

  const handleSubmit = async (values: TAuthData) => {
    setAuthData(values);
    await generateAuthToken();
    setIsModalVisible(true);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-white text-gray-900 p-6">
      <Card className="w-full max-w-md shadow-md p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Authentication</h2>
        <Form<TAuthData> form={form} initialValues={authData} onFinish={handleSubmit} layout="vertical">
          <Form.Item label="Environment" name="environment" rules={[{ required: true }]}> 
            <Select placeholder="Select Environment" onChange={handleEnvironmentChange}>
              <Select.Option value="staging">Staging</Select.Option>
              <Select.Option value="production">Production</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item>
            <Checkbox onChange={handleUseDefaultChange}>Use Default Credentials</Checkbox>
          </Form.Item>
          
          <Form.Item label="Client ID" name="clientId" rules={[{ required: true }]}> 
            <Input placeholder="Client ID" disabled={useDefault} />
          </Form.Item>
          
          <Form.Item label="Client Secret" name="clientSecret" rules={[{ required: true }]}> 
            <Input.Password placeholder="Client Secret" disabled={useDefault} />
          </Form.Item>

          <Form.Item label="Server" name="server" rules={[{ required: true }]}> 
            <Input placeholder="Server" disabled={useDefault} />
          </Form.Item>
          
          <Button type="primary" htmlType="submit" block className="mt-4">Generate Token</Button>
        </Form>
      </Card>
      
      <Modal
        title="Authentication Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <p><strong>Environment:</strong> {authData.environment}</p>
        <p><strong>Client ID:</strong> {authData.clientId}</p>
        <p><strong>Client Secret:</strong> {authData.clientSecret}</p>
        <p><strong>Token:</strong> {authData.token}</p>
      </Modal>
    </div>
  );
};

export default AuthPage;
