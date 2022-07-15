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
import { startOfDay } from "date-fns";

export interface NavigationItem {
  name: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  url: string;
  baseUrl: string;
  routingUrl: string;
  component: FC;
}

export function useNavigationItems(): NavigationItem[] {
  const { rawData, config } = useData();

  // Show the nearest day or the first day if the festival is over
  const dayId =
    rawData.days.find(
      (day) =>
        startOfDay(new Date(day.start)).getTime() >=
        startOfDay(new Date()).getTime()
    )?.id || rawData.days[0].id;

  const routes = [
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
      url: `/schedule/${dayId}`,
      baseUrl: "/schedule",
      routingUrl: "/schedule/:dayId",
      component: Schedule,
    },
    {
      name: "My line up",
      icon: ViewGridIcon,
      url: `/lineup/${dayId}`,
      baseUrl: "/lineup",
      routingUrl: "/lineup/:dayId",
      component: LineUp,
    },
  ];

  if (config.EnableMap) {
    routes.push({
      name: "Map",
      icon: MapIcon,
      url: "/map",
      baseUrl: "/map",
      routingUrl: "/map",
      component: MapPage,
    });
  }

  return routes;
}
