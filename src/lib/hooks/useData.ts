import { useContext } from "react";
import { DataContext } from "../context/Data";

export const useData = () => {
  const dataContext = useContext(DataContext);
  if (!dataContext) {
    throw new Error("No dataProvider detected");
  }

  return dataContext;
};
