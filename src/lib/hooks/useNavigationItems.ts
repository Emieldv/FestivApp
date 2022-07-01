import { FC } from "react";
import { Home as HomePage } from "../../pages/Home";
import { Grid, Home, Icon, Layout, Map } from "react-feather";
import { useSchedule } from "./useSchedule";
import { Schedule } from "../../pages/Schedule";
import { LineUp } from "../../pages/LineUp";
import { Map as MapPage } from "../../pages/Map";

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
      component: HomePage,
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
    {
      name: "Map",
      icon: Map,
      baseUrl: "/map",
      url: "/map",
      component: MapPage,
    },
  ];
}
