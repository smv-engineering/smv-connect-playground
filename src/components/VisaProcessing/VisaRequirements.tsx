import React, {useState} from "react";
import {
  Card,
  Typography,
  Collapse,
  Row,
  Col,
  Divider,
  Image,
  Steps,
  Alert,
  Button,
  Modal,
  Empty,
} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import {useVisaRequirements} from "../../hooks/useVisaRequirements";
import {TAuthData} from "../../Context";
import {VisaTypeData} from "../../types";
import VisaDetailsCard from "./VisaDetailsCards";

const {Title} = Typography;
const {Panel} = Collapse;
const {Step} = Steps;

interface VisaRequirementsPageProps {
  authData: TAuthData;
  data: VisaTypeData;
}

const VisaRequirementsPage: React.FC<VisaRequirementsPageProps> = ({
  authData,
  data,
}) => {
  const {visaRequirements} = useVisaRequirements(authData, data);
  const [activeImageModal, setActiveImageModal] = useState<{
    visible: boolean;
    imageUrl: string;
    isCorrect: boolean;
  }>({
    visible: false,
    imageUrl: "",
    isCorrect: false,
  });

  const showImageModal = (imageUrl: string, isCorrect: boolean) => {
    setActiveImageModal({
      visible: true,
      imageUrl,
      isCorrect,
    });
  };

  const closeImageModal = () => {
    setActiveImageModal({
      visible: false,
      imageUrl: "",
      isCorrect: false,
    });
  };

  const renderVisaHeader = () => {
    if (!visaRequirements) {
      return null;
    }

    return <VisaDetailsCard visaRequirements={visaRequirements} />;
  };

  const renderRequirements = () => {
    console.log("visaRequirements", visaRequirements);
    if (!visaRequirements || !visaRequirements.visa_info?.length) {
      return (
        <Empty description="No Specific Requirement mentioned. Please contact us for more info!" />
      );
    }

    return visaRequirements ? (
      <Card
        title={<Title level={3}>Required Documents</Title>}
        className="visa-requirements-card"
      >
        <Steps direction="vertical" current={-1}>
          {visaRequirements?.visa_info?.map((section, sectionIndex) => (
            <Step
              key={sectionIndex}
              title={<Title level={4}>{section.title}</Title>}
              description={
                <Collapse>
                  <Panel
                    key="0"
                    header={
                      <span className="font-semibold">
                        <InfoCircleOutlined /> Click to view requirements
                      </span>
                    }
                  >
                    {section?.questions &&
                    section.questions.filter(Boolean).length > 0 ? (
                      section.questions.filter(Boolean).map((question) => (
                        <Card
                          key={question?._id}
                          title={
                            <span className="text-lg">
                              {question?.question}
                            </span>
                          }
                          className="mb-16"
                        >
                          <div className="text-base font-semibold mb-4">
                            {question?.short_description}
                          </div>
                          {question?.long_description?.trim() && (
                            <Alert
                              message="Important Instructions"
                              description={question?.long_description
                                .split("\n")
                                .map((line, index) => (
                                  <p key={index}>{line}</p>
                                ))}
                              showIcon
                              style={{marginBottom: 16}}
                              className="font-semibold italic"
                            />
                          )}

                          {(question?.correct_way?.s3_path ||
                            question?.wrong_way?.s3_path) && (
                            <Row gutter={[16, 16]} className="visa-example-row">
                              {question?.correct_way?.s3_path && (
                                <Col
                                  xs={24}
                                  md={question?.wrong_way?.s3_path ? 12 : 24}
                                >
                                  <Card
                                    title={
                                      <span style={{color: "#52c41a"}}>
                                        <CheckCircleOutlined /> Correct Way
                                      </span>
                                    }
                                    hoverable
                                    onClick={() =>
                                      showImageModal(
                                        question?.correct_way?.s3_path || "",
                                        true
                                      )
                                    }
                                  >
                                    <div className="max-h-[145px] overflow-x-hidden">
                                      <Image
                                        src={question.correct_way.s3_path}
                                        alt="Correct way"
                                        preview={false}
                                      />
                                    </div>
                                  </Card>
                                </Col>
                              )}
                              {question?.wrong_way?.s3_path && (
                                <Col xs={24} md={12}>
                                  <Card
                                    title={
                                      <span style={{color: "#ff4d4f"}}>
                                        <CloseCircleOutlined /> Wrong Way
                                      </span>
                                    }
                                    hoverable
                                    onClick={() =>
                                      showImageModal(
                                        question?.wrong_way?.s3_path || "",
                                        false
                                      )
                                    }
                                  >
                                    <div className="max-h-[145px] overflow-x-hidden">
                                      <Image
                                        src={question.wrong_way.s3_path}
                                        alt="Wrong way"
                                        preview={false}
                                      />
                                    </div>
                                  </Card>
                                </Col>
                              )}
                            </Row>
                          )}
                        </Card>
                      ))
                    ) : (
                      <p className="font-semibold">
                        Requirements are not mentioned. Contact us!
                      </p>
                    )}
                  </Panel>
                </Collapse>
              }
            />
          ))}
        </Steps>
      </Card>
    ) : null;
  };

  const renderImageModal = () => {
    return (
      <Modal
        open={activeImageModal.visible}
        title={
          activeImageModal.isCorrect ? "Correct Example" : "Incorrect Example"
        }
        onCancel={closeImageModal}
        footer={[
          <Button key="close" onClick={closeImageModal}>
            Close
          </Button>,
        ]}
        width={800}
      >
        <div className="flex justify-center">
          <Image
            src={activeImageModal.imageUrl}
            alt={
              activeImageModal.isCorrect
                ? "Correct example"
                : "Incorrect example"
            }
            style={{maxWidth: "100%"}}
          />
        </div>
      </Modal>
    );
  };

  return (
    <div className="visa-requirements-container">
      {renderVisaHeader()}
      <Divider />
      {renderRequirements()}
      {renderImageModal()}
    </div>
  );
};

export default VisaRequirementsPage;
