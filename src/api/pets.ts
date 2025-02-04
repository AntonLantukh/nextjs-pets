import type { Pet } from '@/types/pet';

type Params = {
  species?: string;
  name?: string;
  dateAdded?: string;
};

const getUrlWithQueryParams = ({
  url,
  params,
}: {
  url: string;
  params: Record<string, string>;
}) => {
  const parsedUrl = new URL(url);

  Object.keys(params).forEach(el => {
    if (el) {
      parsedUrl.searchParams.append(el, params[el]);
    }
  });

  return parsedUrl.toString();
};

export const getPets = (params: Params): Promise<Pet[]> => {
  const url = getUrlWithQueryParams({
    url: 'https://660579c92ca9478ea1806a31.mockapi.io/api/v1/pets',
    params,
  });

  return fetch(url).then(data => data.json());
};
