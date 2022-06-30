import { createContext, FC, ReactNode, useMemo } from "react";
import { ErrorScreen } from "../../components/ErrorScreen";
import { Loader } from "../../components/Loader";
import {
  Day,
  DayFull,
  Gig,
  IScheduleContext,
  Stage,
} from "../../interfaces/data";
import { useAirTable } from "../hooks/useAirtable";

export const ScheduleContext = createContext<IScheduleContext | undefined>(
  undefined
);

interface ScheduleProviderProps {
  children: ReactNode;
}

export const ScheduleProvider: FC<ScheduleProviderProps> = ({ children }) => {
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

  // Still loading?
  if (gigsLoading || daysLoading || stagesLoading) {
    return <Loader />;
  }

  // Any errors?
  // TODO better error handling
  if (gigsError || daysError || stagesError) {
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

  // TODO Fix Offline functionality

  return (
    <ScheduleContext.Provider
      value={{
        rawData: {
          stages: stages!,
          days: sortedDays!,
          gigs: gigs!,
        },
        data: {
          days: fullDays,
        },
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};
