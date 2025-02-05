import type { Pet } from '@/types/pet';
import { getUrlWithQueryParams } from '@/utils/url';

type Params = {
  species?: string | null;
  sortBy?: string | null;
  order?: string | null;
};

export const getPets = (params: Params): Promise<Pet[]> => {
  const url = getUrlWithQueryParams({
    url: 'https://660579c92ca9478ea1806a31.mockapi.io/api/v1/pets',
    params,
  });

  return fetch(url).then(data => data.json());
};
