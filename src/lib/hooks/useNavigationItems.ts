import { FC, ReactNode } from "react";
import { Home as HomeComponent } from "../../pages/Home";
import { Grid, Home, Icon, Layout } from "react-feather";
import { useSchedule } from "./useSchedule";
import { Schedule } from "../../pages/Schedule";
import { LineUp } from "../../pages/LineUp";

export interface NavigationItem {
  name: string;
  icon: Icon;
  url: string;
  baseUrl: string;
  component: FC;
}

export function useNavigationItems(): NavigationItem[] {
  const { rawData } = useSchedule();

  return [
    {
      name: "Home",
      icon: Home,
      baseUrl: "/",
      url: "/",
      component: HomeComponent,
    },
    {
      name: "Schedule",
      icon: Layout,
      baseUrl: "/schedule/:dayId",
      url: `/schedule/${rawData.days[0].id}`,
      component: Schedule,
    },
    {
      name: "My line up",
      icon: Grid,
      baseUrl: "/lineup/:dayId",
      url: `/lineup/${rawData.days[0].id}`,
      component: LineUp,
    },
  ];
}
