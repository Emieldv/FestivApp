export const sizes = {
  hourHeight: 180,
  slotSize: parseInt(process.env.REACT_APP_SLOT_SIZE || "5") || 5,
  pageHeaderHeight: "50px",
  scheduleHeaderHeight: "40px",
  mainNavigationHeight: "60px",
};

// These breakpoints are the max-width of the specefied category
export const breakpoints = {
  mobile: "414px",
  tabletPortrait: "834px",
  tabletLandscape: "1112px",
  laptop: "1440px",
  desktopLarge: "1920px",
};
