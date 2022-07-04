import { FC } from "react";
import { Home as HomePage } from "../../pages/Home";
import { useData } from "./useData";
import { Schedule } from "../../pages/Schedule";
import { LineUp } from "../../pages/MyLineUp";
import { Map as MapPage } from "../../pages/Map";
import {
  HomeIcon,
  MapIcon,
  ViewBoardsIcon,
  ViewGridIcon,
} from "@heroicons/react/outline";

export interface NavigationItem {
  name: string;
  // TODO typing
  icon: any;
  url: string;
  baseUrl: string;
  routingUrl: string;
  component: FC;
}

export function useNavigationItems(): NavigationItem[] {
  const { rawData } = useData();

  return [
    {
      name: "Home",
      icon: HomeIcon,
      url: "/home",
      baseUrl: "/home",
      routingUrl: "/home",
      component: HomePage,
    },
    {
      name: "Schedule",
      icon: ViewBoardsIcon,
      url: `/schedule/${rawData.days[0].id}`,
      baseUrl: "/schedule",
      routingUrl: "/schedule/:dayId",
      component: Schedule,
    },
    {
      name: "My line up",
      icon: ViewGridIcon,
      url: `/lineup/${rawData.days[0].id}`,
      baseUrl: "/lineup",
      routingUrl: "/lineup/:dayId",
      component: LineUp,
    },
    {
      name: "Map",
      icon: MapIcon,
      url: "/map",
      baseUrl: "/map",
      routingUrl: "/map",
      component: MapPage,
    },
  ];
}
