import { useState } from "react";
import { Card, Spin } from "antd";
import { Question, VisaRequirement } from "../../utils/interfaces";
import { VisaTags } from "./VisaTags";
import { QuestionTemplate } from "./VisaQuestionTemplate";
import { VisaImagesModal } from "./VisaImagesModal";

interface VisaDetailsProps {
  loading: boolean;
  selectedVisaRequirementDetails: VisaRequirement | null;
}

export const VisaDetails = ({
  loading,
  selectedVisaRequirementDetails: reqData,
}: VisaDetailsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );

  const showModal = (question: Question) => {
    setSelectedQuestion(question);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (!reqData)
    return (
      <div className="w-2/3 max-h-100 p-6 flex items-center justify-center">
        <div className="bg-gray-50 rounded-lg text-center border-2 border-gray-300 p-6 flex items-center justify-center">
          <p className="text-gray-500 text-lg">
            Select a visa type to see details
          </p>
        </div>
      </div>
    );

  return (
    <div className="w-2/3 max-h-100 p-6">
      {loading ? (
        <div className="flex justify-center items-center h-[100%]">
          <Spin size="large" />
        </div>
      ) : (
        <Card className="rounded-lg h-[100%] overflow-y-auto">
          <div className="mb-4">
            <p className="text-2xl font-bold text-blue-600">
              {reqData.visa_type}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <VisaTags tags={reqData.tags} />
            </div>
          </div>

          <div className="mb-6">
            <p className="text-lg font-semibold text-gray-700 mb-3 border-b pb-1">
              Pricing Details
            </p>
            <ul className="grid grid-cols-2 gap-2">
              {Object.entries(reqData.pricing).map(([key, value]) => {
                if (value.amount === -1) return null;
                return (
                  <li
                    key={key}
                    className="flex justify-between py-2 px-3 rounded bg-gray-50"
                  >
                    <span className="text-gray-600">
                      {key.replace("_", " ").toUpperCase()}:
                    </span>
                    <span className="font-semibold">
                      {value.currency} {value.amount}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {reqData?.visa_info && reqData.visa_info.length > 0 && (
            <div className="mt-6">
              <p className="text-lg font-semibold text-gray-700 mb-3 border-b pb-1">
                Visa Information
              </p>

              {reqData.visa_info.map((visaInfoItem, infoIndex) => (
                <div key={infoIndex} className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-blue-700 text-white flex items-center justify-center text-sm font-semibold">
                      {infoIndex + 1}
                    </div>
                    <p className="font-semibold text-lg">
                      {visaInfoItem.title}
                    </p>
                  </div>

                  {visaInfoItem?.questions &&
                    visaInfoItem?.questions?.length > 0 && (
                      <div className="flex gap-4">
                        {visaInfoItem?.questions.map((question, qIndex) => (
                          <QuestionTemplate
                            key={qIndex}
                            question={question}
                            qIndex={qIndex}
                            showModal={showModal}
                          />
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      <VisaImagesModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        selectedQuestion={selectedQuestion}
      />
    </div>
  );
};
