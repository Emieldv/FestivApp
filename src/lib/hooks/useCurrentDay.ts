import { useParams } from "react-router-dom";
import { useSchedule } from "./useSchedule";

export const useCurrentDay = () => {
  const { rawData } = useSchedule();
  const { scheduleId } = useParams();
  return rawData.days.find((day) => day.id === scheduleId);
};
