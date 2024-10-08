import { useQuery } from "@tanstack/react-query";
import { getPlaces } from "./apiPlaces"; // Adjust the import path accordingly

const usePlaces = () => {
  const {
    isPending,
    data: places,
    error,
  } = useQuery({
    queryKey: ["places"],
    queryFn: getPlaces,
  });

  return { isPending, places, error };
};

export default usePlaces;
