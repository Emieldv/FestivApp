import { isFuture } from "date-fns";
import { useData } from "./useData";
import { useStorage } from "./useStorage";

export function useNextLikedGig() {
  const { data } = useData();
  const { likes } = useStorage();

  const futureLikes = data.gigs
    .filter(
      (gig) =>
        likes.data.some((like) => like === gig.id) &&
        isFuture(new Date(gig.start))
    )
    .sort((x, y) => new Date(x.start).getTime() - new Date(y.start).getTime());

  return futureLikes[0];
}
