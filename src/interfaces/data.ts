export interface Day {
  createdTime: string;
  end: string;
  id: string;
  name: string;
  start: string;
  gigs: string[];
}

export interface Stage {
  createdTime: string;
  id: string;
  name: string;
}

export interface Gig {
  createdTime: string;
  id: string;
  name: string;
  start: string;
  end: string;
  stage: string;
  day: string;
}

export interface StageFull extends Stage {
  gigs: Gig[];
}

export interface DayFull extends Day {
  stages: StageFull[];
}

export interface IScheduleContext {
  rawData: {
    stages: Stage[];
    days: Day[];
    gigs: Gig[];
  };
  data: {
    days: DayFull[];
  };
}

export interface ILikesContext {
  likes: string[];
  addLike: (id: string) => void;
  removeLike: (id: string) => void;
}
