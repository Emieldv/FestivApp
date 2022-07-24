export interface IColors {
  background: string;

  timerBackground: string;
  timerText: string;
  timerTitleBackground: string;
  timerTitleText: string;

  navigation: string;
  navigationIcon: string;
  navigationIconActive: string;

  scheduleHeaderBackground: string;
  scheduleHeaderText: string;

  slotBackground: string;
  slotTitle: string;
  slotText: string;
  slotSelectedBackground: string;
  slotSelectedText: string;

  timestampBackground: string;
  timestampText: string;

  timelineDark: string;
  timelineLight: string;
  hourBorder: string;
  halfhourBorder: string;
  error: string;
}

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
  notes?: string;
}

export interface ConfigData {
  createdTime: string;
  id: string;
  festivalName: string;
  colors: string;
  banner: [{ url: string }];
  logo: [{ url: string }];
  map?: [{ url: string }];
}

export interface StageFull extends Stage {
  gigs: Gig[];
}

export interface DayFull extends Day {
  stages: StageFull[];
}

export interface GigFull extends Omit<Gig, "stage"> {
  stage: Stage;
}

export interface IDataContext {
  rawData: {
    stages: Stage[];
    days: Day[];
    gigs: Gig[];
  };
  data: {
    days: DayFull[];
    gigs: GigFull[];
  };
  config: Omit<ConfigData, "colors" | "logo" | "banner" | "map"> & {
    colors: IColors;
    logo: string;
    banner: string;
    map?: string;
  };
}

export interface IStorageContext {
  likes: {
    data: string[];
    addLike: (id: string) => void;
    removeLike: (id: string) => void;
  };
}
