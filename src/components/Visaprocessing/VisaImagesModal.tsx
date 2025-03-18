import { Button, Modal } from "antd";
import { Question } from "../../utils/interfaces";

interface VisaImagesModalProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  selectedQuestion: Question | null;
}

export const VisaImagesModal = ({
  isModalOpen,
  handleCancel,
  selectedQuestion,
}: VisaImagesModalProps) => {
  return (
    <Modal
      title={selectedQuestion?.short_description}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="close" onClick={handleCancel}>
          Close
        </Button>,
      ]}
      width={800}
    >
      {selectedQuestion && (
        <div className="flex flex-row gap-4">
          <div className="flex-1 border rounded-lg overflow-hidden">
            <div className="bg-red-100 px-4 py-2">
              <p className="text-red-700 font-medium">Incorrect Example</p>
            </div>
            <div className="p-4 flex justify-center items-center h-100">
              {selectedQuestion.wrong_way?.s3_path ? (
                <img
                  src={selectedQuestion.wrong_way.s3_path}
                  alt="Incorrect example"
                  className="max-w-full object-contain max-h-64"
                />
              ) : (
                <p className="text-gray-500">No example image available</p>
              )}
            </div>
          </div>
          <div className="flex-1 border rounded-lg overflow-hidden">
            <div className="bg-green-100 px-4 py-2">
              <p className="text-green-700 font-medium">Correct Example</p>
            </div>
            <div className="p-4 flex justify-center items-center h-100">
              {selectedQuestion.correct_way?.s3_path ? (
                <img
                  src={selectedQuestion.correct_way.s3_path}
                  alt="Correct example"
                  className="max-w-full object-contain max-h-64"
                />
              ) : (
                <p className="text-gray-500">No example image available</p>
              )}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};
