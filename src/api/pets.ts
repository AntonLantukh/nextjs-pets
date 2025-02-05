import type { Pet } from '@/types/pet';
import { getUpdatedSearchParams } from '@/utils/url';

type Params = {
  species?: (string | undefined)[];
  sortBy?: (string | undefined)[];
  order?: (string | undefined)[];
};

export const getPets = (params: Params): Promise<Pet[]> => {
  const url = 'https://660579c92ca9478ea1806a31.mockapi.io/api/v1/pets';
  const newParams = getUpdatedSearchParams({ searchParams: new URLSearchParams(), params });

  return fetch(url + '?' + newParams.toString()).then(data => data.json());
};
