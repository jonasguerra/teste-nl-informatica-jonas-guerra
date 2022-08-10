export const getFullDate = (datetime: string) => {
  let date = new Date(datetime);
  return date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
};
