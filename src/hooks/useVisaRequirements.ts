import {useState, useEffect} from "react";
import {getVisaRequirements} from "../utils/api";
import {TAuthData} from "../Context";
import {VisaRequirement, VisaRequirementResponse, VisaTypeData} from "../types";

export const useVisaRequirements = (
  authData: TAuthData,
  data: VisaTypeData
) => {
  const [visaRequirements, setVisaRequirements] =
    useState<VisaRequirement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const {_id} = data;
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
  }, [authData, _id]);

  return {visaRequirements, loading, error};
};
