import { useContext } from "react";
import { ConfigContext } from "../context/Config";

export const useConfig = () => {
  const configContext = useContext(ConfigContext);
  if (!configContext) {
    throw new Error("No configProvider detected");
  }

  return configContext;
};
