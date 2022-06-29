import { useContext } from "react";
import { ScheduleContext } from "../context/Schedule";

export const useSchedule = () => {
  const scheduleContext = useContext(ScheduleContext);
  if (!scheduleContext) {
    throw new Error("No scheduleProvider detected");
  }

  return scheduleContext;
};
