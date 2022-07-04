import { useParams } from "react-router-dom";
import { useData } from "./useData";

export function useCurrentDay() {
  const { data } = useData();
  const { dayId } = useParams();
  return data.days.find((day) => day.id === dayId);
}
