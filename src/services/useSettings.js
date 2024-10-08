import { useQuery } from "@tanstack/react-query";
import { getSettings } from "./apiSettings"; // Adjust the import path accordingly

const useSettings = () => {
  const {
    isPending,
    data: settings,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isPending, settings, error };
};

export default useSettings;
