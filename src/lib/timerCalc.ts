export function secondsToTime(secs: number) {
  const days = Math.floor(secs / (60 * 60 * 24));

  const divisor_for_hours = secs % (60 * 60 * 24);
  const hours = Math.floor(divisor_for_hours / (60 * 60));

  const divisor_for_minutes = secs % (60 * 60);
  const minutes = Math.floor(divisor_for_minutes / 60);

  const divisor_for_seconds = divisor_for_minutes % 60;
  const seconds = Math.ceil(divisor_for_seconds);

  const obj = {
    d: days,
    h: hours,
    m: minutes,
    s: seconds,
  };

  return obj;
}
