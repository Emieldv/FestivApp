import { GigFull } from "../../interfaces/data";
import { useSelectedDay } from "./useCurrentDay";
import { useData } from "./useData";
import { useStorage } from "./useStorage";

export function useGetDayLikes(): GigFull[] | null {
  const { rawData } = useData();
  const day = useSelectedDay();
  const { likes } = useStorage();

  if (!day || !day.gigs) {
    return null;
  }

  return day.gigs
    .filter((gig) => likes.data.includes(gig))
    .map((gig) => {
      const gigData = rawData.gigs.find((data) => data.id === gig)!;
      const stage = rawData.stages.find(
        (stage) => stage.id === gigData.stage[0]
      )!;
      return {
        ...gigData,
        stage: stage,
      };
    })
    .sort((x, y) => new Date(x.start).getTime() - new Date(y.start).getTime());
}
