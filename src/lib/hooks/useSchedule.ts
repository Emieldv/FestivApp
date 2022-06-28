import { useContext } from "react";
import { ScheduleContext } from "../context/Schedule";

export const useSchedule = () => {
  return useContext(ScheduleContext);
};
