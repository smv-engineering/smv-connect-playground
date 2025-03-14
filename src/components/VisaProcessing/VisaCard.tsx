import {Card, Tag, Tooltip} from "antd";
import {
  InfoCircleOutlined,
  TagOutlined,
  DollarOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
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
  return (
    <Card
      key={visa._id}
      className={`border-2 rounded-xl shadow-sm ${
        isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 hover:border-blue-300"
      } hover:shadow-lg transition-all duration-300`}
      title={
        <div className="flex justify-between items-center">
          <span
            data-visa-id={visa._id}
            onClick={handleVisaSelection}
            className="font-bold text-lg text-gray-800 hover:cursor-pointer"
          >
            {visa.visa_type}
          </span>
          {visa.tags.includes("POPULAR") && (
            <Tag
              color="green"
              className="rounded-full px-3 py-1 text-xs font-semibold"
            >
              <TagOutlined className="mr-1" /> POPULAR
            </Tag>
          )}
        </div>
      }
    >
      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-3 flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
              <CalendarOutlined className="text-blue-600 text-lg" />
            </div>
            <div>
              <div className="text-xs text-blue-600 font-medium">
                Stay Duration
              </div>
              <Tooltip title="How long you can stay">
                <div className="font-bold text-gray-800">
                  {visa.duration_permitted} days
                </div>
              </Tooltip>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-3 flex items-center">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
              <ClockCircleOutlined className="text-green-600 text-lg" />
            </div>
            <div>
              <div className="text-xs text-green-600 font-medium">
                Processing
              </div>
              <Tooltip title="Time needed to process your visa">
                <div className="font-bold text-gray-800">
                  {visa.processing_time} days
                </div>
              </Tooltip>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-3 flex items-center">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
              <InfoCircleOutlined className="text-purple-600 text-lg" />
            </div>
            <div>
              <div className="text-xs text-purple-600 font-medium">
                Validity
              </div>
              <Tooltip title="Period during which you can enter the country">
                <div className="font-bold text-gray-800">
                  {visa.validity_period} days
                </div>
              </Tooltip>
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-3 flex items-center">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-2">
              <DollarOutlined className="text-red-600 text-lg" />
            </div>
            <div>
              <div className="text-xs text-red-600 font-medium">Total Cost</div>
              <Tooltip title="Total cost including all fees">
                <div className="font-bold text-gray-800">
                  {totalPrice} {visa.pricing.visa_fee.currency}
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VisaCard;
