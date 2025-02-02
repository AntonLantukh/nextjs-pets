'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { useQuery } from 'react-query';

import { getPets } from '@/api/pets';
import { Card } from '@/components/Card';
import { Container } from '@/components/Container';
import Dropdown, { type Option } from '@/components/Dropdown';
import Pill from '@/components/Pill';
import type { Pet } from '@/types/pet';

import styles from './index.module.css';

const getOptions = (pets: Pet[] | undefined, key: 'name' | 'species'): Option[] => {
  const dict = (pets || []).reduce((acc, pet: Pet) => ({ ...acc, [pet[key]]: pet[key] }), {});

  return Object.keys(dict).map(name => ({ label: name, value: name }));
};

export default function PetsList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const speciesParam = searchParams.get('species');
  const nameParam = searchParams.get('name');
  const latestParam = searchParams.get('sort');

  const { data, isLoading } = useQuery<Pet[]>('pets', getPets);

  const speciesOptions = useMemo(() => getOptions(data, 'species'), [data]);
  const nameOptions = useMemo(() => getOptions(data, 'name'), [data]);

  const pets = useMemo(() => {
    const filteredData: Pet[] = (data || []).filter(pet => {
      if ((speciesParam && pet.species !== speciesParam) || (nameParam && pet.name !== nameParam)) {
        return false;
      }
      return true;
    });

    if (latestParam) {
      const sortedData: Pet[] = filteredData
        .slice(0)
        .sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime());

      return sortedData;
    }

    return filteredData;
  }, [data, speciesParam, nameParam, latestParam]);

  const updateQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (!value) {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      router.push(pathname + '?' + params.toString());
    },
    [searchParams, pathname, router],
  );

  return (
    <Container>
      <h1>Pets</h1>

      <div className={styles.filters}>
        <Dropdown
          options={speciesOptions}
          label="Species"
          value={speciesParam}
          onChange={value => {
            updateQueryString('species', value);
          }}
        />
        <Dropdown
          options={nameOptions}
          label="Name"
          value={nameParam}
          onChange={value => {
            updateQueryString('name', value);
          }}
        />
        <Pill
          label="Latest added"
          value={latestParam === 'latest'}
          onClick={value => {
            updateQueryString('sort', value ? 'latest' : '');
          }}
        />
      </div>

      <h2>Results</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.cardContainer}>
          {pets.map(pet => (
            <Card name={pet.name} image={pet.photoUrl} key={pet.id} />
          ))}
        </div>
      )}
    </Container>
  );
}
