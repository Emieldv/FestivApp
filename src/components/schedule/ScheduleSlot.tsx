import { FC } from "react";
import { format } from "date-fns";
import styled from "styled-components";
import { Gig } from "../../interfaces/data";
import { calculateGridPosition } from "../../lib/scheduleCalc";
import { useSelectedDay } from "../../lib/hooks/useCurrentDay";
import { BookmarkIcon } from "@heroicons/react/outline";
import { BookmarkIcon as LikedIcon } from "@heroicons/react/solid";
import { useStorage } from "../../lib/hooks/useStorage";
import { useConfig } from "../../lib/hooks/useConfig";

interface ScheduleSlotProps {
  band: Gig;
}

export const ScheduleSlot: FC<ScheduleSlotProps> = ({ band }) => {
  const { colors } = useConfig();
  const currentDay = useSelectedDay()!;
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
        {band.notes && <p className="notes">{band.notes}</p>}
        <p>
          {format(new Date(band.start), "HH:mm")} -{" "}
          {format(new Date(band.end), "HH:mm")}
        </p>
      </div>
      {liked ? (
        <LikedIcon color={colors.slotSelectedText} onClick={handleLike} />
      ) : (
        <BookmarkIcon color={colors.slotText} onClick={handleLike} />
      )}
    </Slot>
  );
};

interface SlotProps {
  start: number;
  end: number;
}

const Slot = styled.div<SlotProps>`
  background-color: ${({ theme }) => theme.slotBackground};
  padding: 10px;
  grid-area: ${({ start }) => start + 1} / 1;
  grid-row-end: ${({ end }) => end + 1};
  margin: 1px 15px 0 15px;
  z-index: 20;
  border-left: 3px solid ${({ theme }) => theme.slotSelectedBackground};
  border-radius: 2px;

  display: grid;
  grid-template-columns: auto 20px;

  svg {
    cursor: pointer;
  }

  h3 {
    font-size: 25px;
    margin: 0;
    color: ${({ theme }) => theme.slotTitle};
    hyphens: auto;
  }

  p {
    margin: 0;
    font-weight: 500;
    font-size: 18px;
    color: ${({ theme }) => theme.slotText};
  }

  p.notes {
    opacity: 80%;
    padding-bottom: 5px;
  }

  p:last-of-type {
    font-weight: 600;
    font-size: 22px;
  }

  &.liked {
    background-color: ${({ theme }) => theme.slotSelectedBackground};

    h3 {
      color: ${({ theme }) => theme.slotSelectedText};
    }

    p {
      color: ${({ theme }) => theme.slotSelectedText};
    }

    svg {
      transform: scaleX(130%) scaleY(105%);
    }
  }
`;
