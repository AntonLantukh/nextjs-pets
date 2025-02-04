import { getOptions } from './utils';

const mockPets = [
  {
    id: 1234,
    name: 'Test',
    species: 'Cat',
    available: true,
    birthYear: 2008,
    dateAdded: '25-04-2021',
    photoUrl: 'test',
  },
  {
    id: 4321,
    name: 'Test1',
    species: 'Dog',
    available: true,
    birthYear: 2009,
    dateAdded: '25-04-2021',
    photoUrl: 'test',
  },
];

describe('getOptions', () => {
  it('returns list of filter options from the response list (species key)', () => {
    const options = getOptions(mockPets, 'species');

    expect(options).toEqual([
      { label: 'Cat', value: 'Cat' },
      { label: 'Dog', value: 'Dog' },
    ]);
  });

  it('returns list of filter options from the response list (name key)', () => {
    const options = getOptions(mockPets, 'name');

    expect(options).toEqual([
      { label: 'Test', value: 'Test' },
      { label: 'Test1', value: 'Test1' },
    ]);
  });

  it('returns empty list of filter options when pets not defined', () => {
    const options = getOptions(undefined, 'name');

    expect(options).toEqual([]);
  });
});
