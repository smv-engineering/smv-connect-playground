import { Question } from "../../utils/interfaces";

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
      className="border rounded-lg p-2 cursor-pointer"
      onClick={() => showModal(question)}
    >
      <p className="font-medium text-blue-600">{question?.short_description}</p>
      <p className="text-gray-500 text-xs mt-1">Click to view examples</p>
    </div>
  );
};
