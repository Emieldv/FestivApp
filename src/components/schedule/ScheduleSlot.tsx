import { FC } from "react";
import { format } from "date-fns";
import styled from "styled-components";
import { Gig } from "../../interfaces/data";
import { calculateGridPosition } from "../../lib/calculate";
import { useCurrentDay } from "../../lib/hooks/useCurrentDay";
import { BookmarkIcon } from "@heroicons/react/outline";
import { BookmarkIcon as LikedIcon } from "@heroicons/react/solid";
import { useStorage } from "../../lib/hooks/useStorage";
import { useConfig } from "../../lib/hooks/useConfig";

interface ScheduleSlotProps {
  band: Gig;
}

export const ScheduleSlot: FC<ScheduleSlotProps> = ({ band }) => {
  const { Colors } = useConfig();
  const currentDay = useCurrentDay()!;
  const { likes } = useStorage();

  const [start, end] = calculateGridPosition(
    { start: new Date(currentDay.start) },
    { start: new Date(band.start), end: new Date(band.end) }
  );

  const liked = likes.data.find((like) => like === band.id);

  const handleLike = () => {
    if (!liked) return likes.addLike(band.id);

    return likes.removeLike(band.id);
  };

  return (
    <Slot start={start} end={end} className={liked ? "liked" : ""}>
      <div>
        <h3>{band.name}</h3>
        <p>
          {format(new Date(band.start), "HH:mm")} -{" "}
          {format(new Date(band.end), "HH:mm")}
        </p>
      </div>
      {liked ? (
        <LikedIcon color={Colors.lightest} onClick={handleLike} />
      ) : (
        <BookmarkIcon color={Colors.primary} onClick={handleLike} />
      )}
    </Slot>
  );
};

interface SlotProps {
  start: number;
  end: number;
}

const Slot = styled.div<SlotProps>`
  background-color: ${({ theme }) => theme.dark};
  padding: 10px;
  color: ${({ theme }) => theme.white};
  grid-row-start: ${({ start }) => start + 1};
  grid-row-end: ${({ end }) => end + 1};
  margin: 1px 15px 0 15px;
  z-index: 20;
  border-left: 3px solid ${({ theme }) => theme.primary};
  border-radius: 2px;

  display: grid;
  grid-template-columns: auto 20px;

  h3 {
    font-size: 21px;
    margin: 0;
    color: ${({ theme }) => theme.primary};
  }

  p {
    margin: 0;
    font-weight: 500;
    font-size: 18px;
  }

  &.liked {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.lightest};

    h3 {
      color: ${({ theme }) => theme.lightest};
    }

    svg {
      transform: scaleX(130%) scaleY(105%);
    }
  }
`;
