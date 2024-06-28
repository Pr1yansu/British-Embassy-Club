export const formatTime = (time) => {
  const date = new Date(time);
  return date.toLocaleTimeString();
};
