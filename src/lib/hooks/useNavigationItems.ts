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
  routingUrl: string;
  component: FC;
}

export function useNavigationItems(): NavigationItem[] {
  const { rawData } = useSchedule();

  return [
    {
      name: "Home",
      icon: Home,
      url: "/home",
      baseUrl: "/home",
      routingUrl: "/home",
      component: HomePage,
    },
    {
      name: "Schedule",
      icon: Layout,
      url: `/schedule/${rawData.days[0].id}`,
      baseUrl: "/schedule",
      routingUrl: "/schedule/:dayId",
      component: Schedule,
    },
    {
      name: "My line up",
      icon: Grid,
      url: `/lineup/${rawData.days[0].id}`,
      baseUrl: "/lineup",
      routingUrl: "/lineup/:dayId",
      component: LineUp,
    },
    {
      name: "Map",
      icon: Map,
      url: "/map",
      baseUrl: "/map",
      routingUrl: "/map",
      component: MapPage,
    },
  ];
}
