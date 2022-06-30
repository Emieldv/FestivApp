import { useParams } from "react-router-dom";
import { useSchedule } from "./useSchedule";

export function useCurrentDay() {
  const { data } = useSchedule();
  const { dayId } = useParams();
  return data.days.find((day) => day.id === dayId);
}
