let isMobile = //has to be a let, as window size might differ, while the js has already declared the const
  // check window with
  window.innerWidth < 480 ||
  // check user agent
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) ||
  // check with MediaQueryList
  window.matchMedia("only screen and (max-width: 480px)").matches;

/**
 * The default date format.
 */
const defaultDateFormat = {
  weekday: "short",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  year: "numeric",
};
