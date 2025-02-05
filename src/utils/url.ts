export const getUpdatedSearchParams = ({
  params,
  searchParams,
}: {
  params: Record<string, (string | undefined)[]>;
  searchParams: URLSearchParams;
}) => {
  const newParams = new URLSearchParams(searchParams.toString());

  Object.keys(params).forEach(name => {
    const value = params[name];
    newParams.delete(name);

    if (value?.length) {
      value.forEach(param => {
        if (param) {
          newParams.append(name, param);
        }
      });
    }
  });

  return newParams;
};
