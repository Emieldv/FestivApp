import { createContext, FC, ReactNode } from "react";
import { ErrorScreen } from "../../components/ErrorScreen";
import { Loader } from "../../components/Loader";
import { ConfigData, IConfigContext } from "../../interfaces/data";
import { useAirTable } from "../hooks/useAirtable";

export const ConfigContext = createContext<IConfigContext | undefined>(
  undefined
);

interface ConfigProviderProps {
  children: ReactNode;
}

export const ConfigProvider: FC<ConfigProviderProps> = ({ children }) => {
  const { data, error, loading } = useAirTable<ConfigData[]>("/config");

  // Still loading?
  if (loading) {
    return <Loader />;
  }

  // Any errors?
  if (error) {
    return <ErrorScreen error="Error retrieving data" />;
  }

  return (
    <ConfigContext.Provider value={data![0]}>{children}</ConfigContext.Provider>
  );
};
