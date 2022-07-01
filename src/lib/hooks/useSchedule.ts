import { useContext } from "react";
import { DataContext } from "../context/Schedule";

export const useData = () => {
  const dataContext = useContext(DataContext);
  if (!dataContext) {
    throw new Error("No scheduleProvider detected");
  }

  return dataContext;
};
