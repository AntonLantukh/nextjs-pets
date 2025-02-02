import type { Pet } from '@/types/pet';

export const getPets = (): Promise<Pet[]> => {
  return fetch('https://660579c92ca9478ea1806a31.mockapi.io/api/v1/pets').then(data => data.json());
};
