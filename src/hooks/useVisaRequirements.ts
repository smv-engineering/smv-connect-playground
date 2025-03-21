import { useState, useEffect } from "react";
import { getVisaRequirements } from "../utils/api";
import {
  VisaRequirement,
  VisaRequirementResponse,
  VisaTypeData,
} from "../types";
import { useAuthContext } from "../Context";

export const useVisaRequirements = (data: VisaTypeData) => {
  const [visaRequirements, setVisaRequirements] =
    useState<VisaRequirement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { authData } = useAuthContext();
  const { _id } = data;
  useEffect(() => {
    const fetchVisaRequirements = async () => {
      setLoading(true);
      try {
        const response = (await getVisaRequirements(
          authData,
          data._id
        )) as VisaRequirementResponse;

        console.log("response", response);

        if (response) {
          setVisaRequirements(response.data);
          setError(null);
        } else {
          throw new Error("API response unsuccessful");
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
        console.log("err err err err", err);
        setVisaRequirements(null);
      } finally {
        setLoading(false);
      }
    };

    if (_id) {
      fetchVisaRequirements();
    }
  }, [_id, data._id, authData]);

  return { visaRequirements, loading, error };
};
