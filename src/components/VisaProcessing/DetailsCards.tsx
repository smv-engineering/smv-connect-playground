import React from 'react'

import {Card, Row, Col, Divider, Descriptions, Typography} from "antd";
import {
  GlobalOutlined,
  CalendarOutlined,
  FieldTimeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {formatCurrency} from "../../utils/format-currency";
import { VisaRequirement } from '../../types';

const {Title, Text, Paragraph} = Typography;

interface DetailsCardsProps {
  visaRequirements: VisaRequirement;
}

const DetailsCards:React.FC<DetailsCardsProps> = ({
    visaRequirements,
}) => {
  return (
    <Card className="visa-header-card">
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <div>
            <Title level={2}>
              <span className="font-mono">
                {visaRequirements.country_symbol} - {visaRequirements.visa_type}{" "}
                {visaRequirements.purpose.length > 0 && (
                  <span className="text-blue-500 text-lg">
                    ({visaRequirements.purpose.join(", ")})
                  </span>
                )}
              </span>
            </Title>
            <Text type="secondary">
              <p className="font-semibold">
                Last updated:{" "}
                {new Date(visaRequirements.updated_at).toLocaleDateString()}
              </p>
            </Text>
          </div>

          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Card size="small" className="flex w-full items-center">
                <Paragraph className="flex items-center gap-2">
                  <CalendarOutlined />
                  <span className="font-semibold">Apply before:</span>
                  <strong>{visaRequirements.apply_before} days</strong>
                </Paragraph>
                <Paragraph className="flex items-center gap-2">
                  <FieldTimeOutlined />
                  <span className="font-semibold">Processing time:</span>
                  <strong>{visaRequirements.processing_time} days</strong>
                </Paragraph>
              </Card>
            </Col>
            <Col span={12}>
              <Card size="small" className="flex w-full items-center">
                <Paragraph className="flex items-center gap-2">
                  <GlobalOutlined />
                  <span className="font-semibold">Duration permitted:</span>
                  <strong>{visaRequirements.duration_permitted} days</strong>
                </Paragraph>
                <Paragraph className="flex items-center gap-2">
                  <UserOutlined />
                  <span className="font-semibold">Entries permitted:</span>
                  <strong>{visaRequirements.entries_permitted}</strong>
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </Col>

        <Col xs={24} md={24}>
          <Card title="Visa Pricing" className="font-semibold">
            <Descriptions column={1}>
              <Descriptions.Item
                label={<span className="font-bold">Visa Fee</span>}
              >
                {formatCurrency(
                  visaRequirements.pricing.visa_fee.amount,
                  visaRequirements.pricing.visa_fee.currency
                )}
              </Descriptions.Item>

              <Descriptions.Item
                label={<span className="font-bold">VFS Fee</span>}
              >
                {formatCurrency(
                  visaRequirements.pricing.vfs_fee.amount,
                  visaRequirements.pricing.vfs_fee.currency
                )}
              </Descriptions.Item>

              <Descriptions.Item
                label={<span className="font-bold">Service Fee</span>}
              >
                {formatCurrency(
                  visaRequirements.pricing.service_fee.amount,
                  visaRequirements.pricing.service_fee.currency
                )}
              </Descriptions.Item>

              <Descriptions.Item
                label={<span className="font-bold">Child Visa Fee</span>}
              >
                {formatCurrency(
                  visaRequirements.pricing.child_visa_fee.amount,
                  visaRequirements.pricing.child_visa_fee.currency
                )}
              </Descriptions.Item>

              <Divider style={{margin: "12px 0"}} />

              <Descriptions.Item
                label={<span className="font-bold">Total</span>}
              >
                <strong className="font-semibold">
                  {formatCurrency(
                    visaRequirements.pricing.visa_fee.amount +
                      (visaRequirements.pricing.vfs_fee.amount !== -1
                        ? visaRequirements.pricing.vfs_fee.amount
                        : 0) +
                      visaRequirements.pricing.service_fee.amount,
                    visaRequirements.pricing.visa_fee.currency
                  )}
                </strong>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </Card>
  );
}

export default DetailsCards