import { useData } from "./useData";

export const useConfig = () => {
  const { config } = useData();
  return config;
};
