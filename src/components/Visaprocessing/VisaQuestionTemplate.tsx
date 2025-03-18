import { Question } from "../../utils/interfaces";
import { InfoCircleOutlined } from "@ant-design/icons";
interface QuestionTemplateProps {
  question: Question;
  qIndex: number;
  showModal: (question: Question) => void;
}

export const QuestionTemplate = ({
  question,
  qIndex,
  showModal,
}: QuestionTemplateProps) => {
  return (
    <div
      key={qIndex}
      className="border rounded-lg p-2 cursor-pointer 
      transition duration-300 ease-in-out
      break-words
      w-[30%]
    border-gray-200
    hover:bg-gray-100
      flex
      flex-col
      gap-3
  "
      onClick={() => showModal(question)}
    >
      <InfoCircleOutlined className="text-3xl" />
      <p className="font-medium text-black">{question?.short_description}</p>
    </div>
  );
};
