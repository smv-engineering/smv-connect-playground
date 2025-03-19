import {useEffect, useState} from "react";
import {useAuthContext} from "../../../../Context";
import CountrySelect from "../../../../components/VisaProcessing/SelectCountry";
import VisaSelection from "../../../../components/VisaProcessing/FetchVisaTypes";
import {
  Card,
  Divider,
  Empty,
  Space,
  Spin,
  Typography,
  Modal,
  Button,
} from "antd";
import VisaRequirementsPage from "../../../../components/VisaProcessing/VisaRequirements";
import {VisaTypeData} from "../../../../types";

const {Title, Text} = Typography;

const VisaProcessing = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
    undefined
  );

  const [selectedVisaType, setSelectedVisaType] = useState<VisaTypeData>();
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {authData} = useAuthContext();

  useEffect(() => {
    if (selectedVisaType) {
      setIsModalVisible(true);
    }
  }, [selectedVisaType]);

  const handleCountryChange = (value: string) => {
    setLoading(true);
    setSelectedCountry(value);
    setTimeout(() => setLoading(false), 100);
  };

  const handleVisaTypeChange = (value: VisaTypeData) => {
    setSelectedVisaType(value);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Card className="shadow-md rounded-lg overflow-hidden">
        <div className="grid grid-cols-2">
          <div className="p-6">
            <Space direction="vertical" className="w-full">
              <Title level={4} className="flex items-center ">
                <span className="font-bold">Select Country</span>
              </Title>
              <Text className="mb-4">
                <span className="font-semibold">
                  Choose a country to view available visa options
                </span>
              </Text>
              <CountrySelect
                value={selectedCountry}
                onChange={handleCountryChange}
                placeholder="Please select a country"
              />
            </Space>
          </div>

          <div className="flex relative">
            <Divider type="vertical" className="h-full absolute left-0" />

            <div className="flex-1 p-6 pl-8">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <Spin size="large" />
                </div>
              ) : selectedCountry ? (
                <div>
                  <VisaSelection
                    onChange={handleVisaTypeChange}
                    countrySymbol={selectedCountry}
                  />
                </div>
              ) : (
                <Empty
                  className="flex flex-col justify-center items-center h-full"
                  description={
                    <Text strong>
                      Please select a country to view visa options
                    </Text>
                  }
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
            </div>
          </div>
        </div>
      </Card>

      <Modal
        title={<Title level={4}>Visa Requirements</Title>}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
        width={800}
      >
        {selectedVisaType && authData && (
          <VisaRequirementsPage data={selectedVisaType} />
        )}
      </Modal>
    </>
  );
};

export default VisaProcessing;
