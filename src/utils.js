export const timeStampToLocaleString = (timeStamp) => {
  const date = new Date(timeStamp);

  const istDate = date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h12",
    timeZoneName: "short",
  });
  return istDate;
};
