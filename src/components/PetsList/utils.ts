export const parseDate = (date: string) => {
  const parts = date.split('-');
  const parsedDate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));

  return parsedDate;
};
