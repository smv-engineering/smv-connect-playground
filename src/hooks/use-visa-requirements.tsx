import { useState, useCallback } from "react";
import useAuthStatus from "./use-auth";
import {
  VisaRequirement,
  VisaRequirementApiResponse,
} from "../utils/interfaces";
import { getVisaRequirements } from "../utils/api";

const useVisaRequirement = () => {
  const { authData } = useAuthStatus();
  const [loading, setLoading] = useState(false);
  const [visaRequirement, setVisaRequirement] =
    useState<VisaRequirement | null>(null);

  const fetchVisaRequirement = useCallback(
    async (visaId: string) => {
      try {
        setLoading(true);
        const data = (await getVisaRequirements(authData, {
          visa_type_id: visaId,
        })) as VisaRequirementApiResponse;
        setVisaRequirement(data.data);
      } catch (err) {
        console.error("Error fetching visa requirement:", err);
      } finally {
        setLoading(false);
      }
    },
    [authData]
  );

  return { loading, visaRequirement, fetchVisaRequirement };
};
export default useVisaRequirement;
