import {Card, Tag, Tooltip, Progress} from "antd";
import {
  InfoCircleOutlined,
  TagOutlined,
  DollarOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import {useState} from "react";
import {VisaType} from "../../types";

interface VisaCardProps {
  visa: VisaType;
  isSelected: boolean;
  handleVisaSelection: (e: React.MouseEvent<HTMLSpanElement>) => void;
  totalPrice: number;
}

const VisaCard: React.FC<VisaCardProps> = ({
  visa,
  isSelected,
  handleVisaSelection,
  totalPrice,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Both the below functions are to show some interactive elements such as progress bar based on the visa processing time and visa value based on duration vs cost

  // This function calculates the visa processing efficiency as a percentage.
  // It assumes that a processing time of 30 days corresponds to 0% efficiency,
  // while 0 days corresponds to 100% efficiency.
  const processingEfficiency = Math.min(
    100,
    Math.max(0, 100 - (visa.processing_time / 30) * 100)
  );

  // Calculate the value score based on the ratio of permitted duration to total cost.
  // The score is scaled to a maximum of 50 and then capped between 0 and 100.
  const valueScore = Math.min(
    100,
    Math.max(0, (visa.duration_permitted / totalPrice) * 50)
  );

  return (
    <Card
      key={visa._id}
      className={`border-2 rounded-xl shadow-sm transform transition-all duration-300  ${
        isSelected
          ? "border-blue-500 bg-blue-50 scale-102"
          : isHovered
          ? "border-blue-300 shadow-md translate-y-1"
          : "border-gray-200 "
      } hover:shadow-lg`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={
        <div className="flex justify-between items-center">
          <div className="flex items-center ">
            <span className="font-bold text-lg font-mono text-gray-800 transition-colors duration-200">
              {visa.visa_type}
            </span>
            {isSelected && (
              <CheckCircleOutlined className="ml-2 text-blue-500 animate-pulse" />
            )}
          </div>
          {visa.tags.includes("POPULAR") && (
            <Tag
              color="green"
              className="rounded-full px-3 py-1 text-xs font-semibold "
            >
              <TagOutlined className="mr-1" />{" "}
              <span className="font-mono tracking-widest">POPULAR</span>
            </Tag>
          )}
        </div>
      }
      extra={
        <div className="flex gap-2">
          {visa.tags
            .filter((tag) => tag !== "POPULAR")
            .map((tag) => (
              <Tag
                key={tag}
                color="blue"
                className="rounded-full px-2 py-0.5 text-xs"
              >
                {tag}
              </Tag>
            ))}
        </div>
      }
    >
      <div className="mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div
            className="bg-blue-50 rounded-lg p-3 flex items-center transform transition-all duration-300 hover:scale-102 hover:shadow-md"
            style={{
              background: `linear-gradient(135deg, #e6f7ff 0%, #e6f7ff 80%, #bae7ff 100%)`,
            }}
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
              <CalendarOutlined className="text-blue-600 text-lg" />
            </div>
            <div>
              <div className="text-xs text-blue-600 font-bold">
                Stay Duration
              </div>
              <Tooltip title="How long you can stay">
                <div className="font-bold text-gray-800">
                  {visa.duration_permitted} days
                </div>
              </Tooltip>
            </div>
          </div>

          <div
            className="bg-green-50 rounded-lg p-3 flex items-center transform transition-all duration-300 hover:scale-102 hover:shadow-md"
            style={{
              background: `linear-gradient(135deg, #f6ffed 0%, #f6ffed 80%, #d9f7be 100%)`,
            }}
          >
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
              <ClockCircleOutlined className="text-green-600 text-lg" />
            </div>
            <div>
              <div className="text-xs text-green-600 font-bold">Processing</div>
              <Tooltip title="Time needed to process your visa">
                <div className="font-bold text-gray-800">
                  {visa.processing_time} days
                </div>
              </Tooltip>
            </div>
          </div>

          <div
            className="bg-purple-50 rounded-lg p-3 flex items-center transform transition-all duration-300 hover:scale-102 hover:shadow-md"
            style={{
              background: `linear-gradient(135deg, #f9f0ff 0%, #f9f0ff 80%, #efdbff 100%)`,
            }}
          >
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
              <InfoCircleOutlined className="text-purple-600 text-lg" />
            </div>
            <div>
              <div className="text-xs text-purple-600 font-bold">Validity</div>
              <Tooltip title="Period during which you can enter the country">
                <div className="font-bold text-gray-800">
                  {visa.validity_period} days
                </div>
              </Tooltip>
            </div>
          </div>

          <div
            className="bg-red-50 rounded-lg p-3 flex items-center transform transition-all duration-300 hover:scale-102 hover:shadow-md"
            style={{
              background: `linear-gradient(135deg, #fff2f0 0%, #fff2f0 80%, #ffccc7 100%)`,
            }}
          >
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-2">
              <DollarOutlined className="text-red-600 text-lg" />
            </div>
            <div>
              <div className="text-xs text-red-600 font-bold">Total Cost</div>
              <Tooltip title="Total cost including all fees">
                <div className="font-bold text-gray-800">
                  {totalPrice} {visa.pricing.visa_fee.currency}
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      {/* Visa insights section */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex flex-col gap-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-gray-600 flex items-center">
                <RocketOutlined className="mr-1" /> Processing Speed
              </span>
              <span className="text-xs font-bold text-gray-500">
                {processingEfficiency >= 70
                  ? "Fast"
                  : processingEfficiency >= 40
                  ? "Average"
                  : "Slow"}
              </span>
            </div>
            <Progress
              percent={processingEfficiency}
              size="small"
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068",
              }}
              showInfo={false}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-gray-600 flex items-center">
                <DollarOutlined className="mr-1" /> Value Rating
              </span>
              <span className="text-xs font-medium text-gray-500">
                {valueScore >= 70
                  ? "Excellent"
                  : valueScore >= 40
                  ? "Good"
                  : "Basic"}
              </span>
            </div>
            <Progress
              percent={valueScore}
              size="small"
              strokeColor={{
                "0%": "#ffa39e",
                "100%": "#ff7a45",
              }}
              showInfo={false}
            />
          </div>
          <div
            data-visa-id={visa._id}
            onClick={handleVisaSelection}
            className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100 transform transition-all duration-300 animate-fadeIn hover:cursor-pointer"
          >
            <div className="text-center text-blue-600 text-sm font-medium">
              Click here to view visa requirements
            </div>
          </div>
        </div>
      </div>

      {/* CTA section - visible when selected or hovered */}
      {/* {(isSelected || isHovered) && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100 transform transition-all duration-300 animate-fadeIn">
          <div className="text-center text-blue-600 text-sm font-medium">
            {isSelected
              ? "Selected for your trip"
              : "Click to select this visa"}
          </div>
        </div>
      )} */}
    </Card>
  );
};

export default VisaCard;
