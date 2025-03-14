import {VisaRequirement} from "../../types";
import DetailsCards from "./DetailsCards";

interface VisaDetailsCardProps {
  visaRequirements: VisaRequirement;
}

const VisaDetailsCard: React.FC<VisaDetailsCardProps> = ({
  visaRequirements,
}) => {
  return <DetailsCards visaRequirements={visaRequirements} />;
};

export default VisaDetailsCard;
