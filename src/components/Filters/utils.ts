import type { Option } from '@/components/Dropdown/types';
import type { Pet } from '@/types/pet';

export const getOptions = (pets: Pet[] | undefined, key: 'name' | 'species'): Option[] => {
  const dict = (pets || []).reduce((acc, pet: Pet) => ({ ...acc, [pet[key]]: pet[key] }), {});

  return Object.keys(dict).map(name => ({ label: name, value: name }));
};
