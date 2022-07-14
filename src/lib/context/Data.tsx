import { createContext, FC, ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { ErrorScreen } from "../../components/ErrorScreen";
import { Loader } from "../../components/Loader";
import {
  ConfigData,
  Day,
  DayFull,
  Gig,
  IColors,
  IDataContext,
  Stage,
} from "../../interfaces/data";
import { useAirTable } from "../hooks/useAirtable";

export const DataContext = createContext<IDataContext | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: FC<DataProviderProps> = ({ children }) => {
  const {
    data: config,
    error: configError,
    loading: configLoading,
  } = useAirTable<ConfigData[]>("/config");
  const {
    data: stages,
    error: stagesError,
    loading: stagesLoading,
  } = useAirTable<Stage[]>("/stages");
  const {
    data: days,
    error: daysError,
    loading: daysLoading,
  } = useAirTable<Day[]>("/days");
  const {
    data: gigs,
    error: gigsError,
    loading: gigsLoading,
  } = useAirTable<Gig[]>("/gigs");

  // Check if the app is offline
  if (!window.navigator.onLine) {
    const storage = localStorage.getItem("localData");

    if (!storage) {
      return (
        <ErrorScreen error="Data cache empty, please connect to the internet to store data for offline usage" />
      );
    }

    const value = JSON.parse(storage);
    return (
      <DataContext.Provider value={value}>
        <ThemeProvider
          theme={{
            ...value.config.Colors,
          }}
        >
          {children}
        </ThemeProvider>
      </DataContext.Provider>
    );
  }

  // Still loading?
  if (configLoading || gigsLoading || daysLoading || stagesLoading) {
    return <Loader />;
  }

  // Any errors?
  if (configError || gigsError || daysError || stagesError) {
    return <ErrorScreen error="Error retrieving data" />;
  }

  const sortedDays = days!.sort(
    (x, y) => new Date(x.start).getTime() - new Date(y.start).getTime()
  );

  // Link Data
  const fullDays: DayFull[] = sortedDays.map((day) => ({
    ...day,
    stages: stages!.map((stage) => ({
      ...stage,
      gigs: gigs!.filter(
        (gig) => gig.stage[0] === stage.id && gig.day[0] === day.id
      ),
    })),
  }));

  const value = {
    rawData: {
      stages: stages!,
      days: sortedDays!,
      gigs: gigs!,
    },
    data: {
      days: fullDays,
    },
    config: {
      Colors: JSON.parse(config![0].Colors) as IColors,
      FestivalName: config![0].FestivalName,
      EnableMap: config![0].EnableMap,
    },
  };

  localStorage.setItem("localData", JSON.stringify(value));

  return (
    <DataContext.Provider value={value}>
      <ThemeProvider
        theme={{
          ...value.config.Colors,
        }}
      >
        {children}
      </ThemeProvider>
    </DataContext.Provider>
  );
};
