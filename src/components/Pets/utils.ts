export const parseDate = (str: string) => {
  const parts = str.split('-');

  return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
};
