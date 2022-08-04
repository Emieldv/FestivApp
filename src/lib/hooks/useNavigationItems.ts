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
import { isWithinInterval } from "date-fns";

export interface NavigationItem {
  name: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  url: string;
  baseUrl: string;
  routingUrl: string;
  component: FC;
  pages?: {
    value: string;
    label: string;
  }[];
}

export function useNavigationItems(): NavigationItem[] {
  const { rawData, config } = useData();

  // Check if we are in the middle of a festival day
  const currentDay = rawData.days.find((day) =>
    isWithinInterval(new Date(), {
      start: new Date(day.start),
      end: new Date(day.end),
    })
  )?.id;

  // Calculate the nearest day in the future
  const nearestDay = rawData.days.find(
    (day) => new Date(day.start).getTime() >= new Date().getTime()
  )?.id;

  // Otherwise get the first day of the festival
  const dayId = currentDay || nearestDay || rawData.days[0].id;

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
      pages: rawData.days.map((day) => ({ label: day.name, value: day.id })),
    },
    {
      name: "My line up",
      icon: ViewGridIcon,
      url: `/lineup/${dayId}`,
      baseUrl: "/lineup",
      routingUrl: "/lineup/:dayId",
      component: LineUp,
      pages: rawData.days.map((day) => ({ label: day.name, value: day.id })),
    },
  ];

  if (config.map) {
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
