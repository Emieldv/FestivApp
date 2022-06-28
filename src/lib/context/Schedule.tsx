import { Children, createContext, FC, ReactNode, useContext } from "react";
import { useAirTable } from "../hooks/useAirtable";

export const ScheduleContext = createContext({
  loading: true,
  data: {
    stages: null,
    days: null,
    gigs: null,
  },
});

// TODO Fix Offline functionality
// TODO provide data

interface ScheduleProviderProps {
  children: ReactNode;
}

export const ScheduleProvider: FC<ScheduleProviderProps> = ({ children }) => {
  const {
    data: stages,
    error: stagesError,
    loading: stagesLoading,
  } = useAirTable("/stages");
  const {
    data: days,
    error: daysError,
    loading: daysLoading,
  } = useAirTable("/days");
  const {
    data: gigs,
    error: gigsError,
    loading: gigsLoading,
  } = useAirTable("/gigs");

  // TODO fix LoadingState
  if (gigsLoading && daysLoading && stagesLoading) {
    return null;
  }

  return (
    <ScheduleContext.Provider
      value={{
        loading: true,
        data: {
          stages: null,
          days: null,
          gigs: null,
        },
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};
