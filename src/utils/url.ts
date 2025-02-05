export const getUrlWithQueryParams = ({
  url,
  params,
}: {
  url: string;
  params: Record<string, string | null>;
}) => {
  const parsedUrl = new URL(url);

  Object.keys(params).forEach(el => {
    if (params[el]) {
      parsedUrl.searchParams.append(el, params[el]);
    }
  });

  return parsedUrl.toString();
};
