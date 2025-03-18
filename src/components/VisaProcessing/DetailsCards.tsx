import React from "react";

import {Card, Row, Col, Divider, Descriptions, Typography} from "antd";
import {
  GlobalOutlined,
  CalendarOutlined,
  FieldTimeOutlined,
  UserOutlined,
  DollarOutlined,
  TagOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import {formatCurrency} from "../../utils/format-currency";
import {VisaRequirement} from "../../types";

const {Title, Paragraph} = Typography;

interface DetailsCardsProps {
  visaRequirements: VisaRequirement;
}

const DetailsCards: React.FC<DetailsCardsProps> = ({visaRequirements}) => {
  return (
    <Card className="visa-header-card rounded-xl shadow-md border-2 border-gray-200 overflow-hidden bg-gradient-to-br from-white to-[#f9fbff]">
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <div className="mb-6">
            <Title level={2} className="flex items-center">
              <span className="font-mono flex items-center gap-2">
                <div className="rounded-full p-3 bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  {visaRequirements.country_symbol}
                </div>
                {visaRequirements.visa_type}{" "}
                {visaRequirements.purpose.length > 0 && (
                  <span className="text-blue-500 text-lg ml-2 px-3 py-1 bg-blue-50 rounded-full">
                    ({visaRequirements.purpose.join(", ")})
                  </span>
                )}
              </span>
            </Title>
            <div className="flex items-center gap-2">
              <ClockCircleOutlined />
              <p className="font-semibold mb-0 text-gray-500">
                Last updated:{" "}
                <span className="text-blue-500">
                  {new Date(visaRequirements.updated_at).toLocaleDateString()}
                </span>
              </p>
            </div>
          </div>

          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Card
                size="small"
                className="rounded-lg border border-blue-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-300 bg-gradient-to-r from-[#e6f7ff] via-[#e6f7ff] to-[#bae7ff]"
              >
                <Paragraph className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <CalendarOutlined className="text-blue-600" />
                  </div>
                  <span className="font-bold text-gray-600">Apply before:</span>
                  <strong className="text-gray-800">
                    {visaRequirements.apply_before} days
                  </strong>
                </Paragraph>
                <Paragraph className="flex items-center gap-2 mb-0">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <FieldTimeOutlined className="text-blue-600" />
                  </div>
                  <span className="font-bold text-gray-600">
                    Processing time:
                  </span>
                  <strong className="text-gray-800">
                    {visaRequirements.processing_time} days
                  </strong>
                </Paragraph>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                size="small"
                className="rounded-lg border border-green-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-green-300 bg-gradient-to-br from-[#f6ffed] via-[#f6ffed] to-[#d9f7be]"
              >
                <Paragraph className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <GlobalOutlined className="text-green-600" />
                  </div>
                  <span className="font-bold text-gray-600">
                    Duration permitted:
                  </span>
                  <strong className="text-gray-800">
                    {visaRequirements.duration_permitted} days
                  </strong>
                </Paragraph>
                <Paragraph className="flex items-center gap-2 mb-0">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <UserOutlined className="text-green-600" />
                  </div>
                  <span className="font-bold text-gray-600">
                    Entries permitted:
                  </span>
                  <strong className="text-gray-800">
                    {visaRequirements.entries_permitted}
                  </strong>
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </Col>

        <Col xs={24} md={24}>
          <Card
            title={
              <div className="flex items-center gap-2">
                <DollarOutlined className="text-purple-600" />
                <span>Visa Pricing</span>
              </div>
            }
            className="font-semibold rounded-lg border border-purple-100 shadow-sm bg-gradient-to-br from-[#f9f0ff] via-[#f9f0ff] to-[#efdbff]"
          >
            <Descriptions column={1} className="pricing-descriptions">
              <Descriptions.Item
                label={
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                      <TagOutlined className="text-purple-600 text-xs" />
                    </div>
                    <span className="font-bold text-gray-600">Visa Fee</span>
                  </div>
                }
              >
                <span className="text-gray-800">
                  {formatCurrency(
                    visaRequirements.pricing.visa_fee.amount,
                    visaRequirements.pricing.visa_fee.currency
                  )}
                </span>
              </Descriptions.Item>

              <Descriptions.Item
                label={
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                      <TagOutlined className="text-purple-600 text-xs" />
                    </div>
                    <span className="font-bold text-gray-600">VFS Fee</span>
                  </div>
                }
              >
                <span className="text-gray-800">
                  {formatCurrency(
                    visaRequirements.pricing.vfs_fee.amount,
                    visaRequirements.pricing.vfs_fee.currency
                  )}
                </span>
              </Descriptions.Item>

              <Descriptions.Item
                label={
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                      <TagOutlined className="text-purple-600 text-xs" />
                    </div>
                    <span className="font-bold text-gray-600">Service Fee</span>
                  </div>
                }
              >
                <span className="text-gray-800">
                  {formatCurrency(
                    visaRequirements.pricing.service_fee.amount,
                    visaRequirements.pricing.service_fee.currency
                  )}
                </span>
              </Descriptions.Item>

              <Descriptions.Item
                label={
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                      <TagOutlined className="text-purple-600 text-xs" />
                    </div>
                    <span className="font-bold text-gray-600">
                      Child Visa Fee
                    </span>
                  </div>
                }
              >
                <span className="text-gray-800">
                  {formatCurrency(
                    visaRequirements.pricing.child_visa_fee.amount,
                    visaRequirements.pricing.child_visa_fee.currency
                  )}
                </span>
              </Descriptions.Item>

              <Divider className="my-3" />

              <Descriptions.Item
                label={
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <DollarOutlined className="text-blue-600 text-xs" />
                    </div>
                    <span className="font-bold text-gray-600">Total</span>
                  </div>
                }
              >
                <p className="text-blue-600 text-lg font-bold">
                  {formatCurrency(
                    visaRequirements.pricing.visa_fee.amount +
                      (visaRequirements.pricing.vfs_fee.amount !== -1
                        ? visaRequirements.pricing.vfs_fee.amount
                        : 0) +
                      visaRequirements.pricing.service_fee.amount,
                    visaRequirements.pricing.visa_fee.currency
                  )}
                </p>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default DetailsCards;
