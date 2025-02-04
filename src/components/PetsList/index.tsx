'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { getPets } from '@/api/pets';
import { Card, CardSkeleton } from '@/components/Card';
import { Container } from '@/components/Container';
import Filters from '@/components/Filters';
import type { Pet } from '@/types/pet';

import styles from './index.module.css';
import { parseDate } from './utils';

export default function PetsList() {
  const searchParams = useSearchParams();

  const speciesParam = searchParams.getAll('species');
  const nameParam = searchParams.getAll('name');
  const latestParam = searchParams.get('sort');

  const { data, isLoading } = useQuery<Pet[]>('pets', getPets, {
    staleTime: 30000,
    cacheTime: 30000,
  });

  const pets = useMemo(() => {
    const filteredData: Pet[] = (data || []).filter(pet => {
      if (
        (speciesParam.length && !speciesParam.includes(pet.species)) ||
        (nameParam.length && !nameParam.includes(pet.name))
      ) {
        return false;
      }
      return true;
    });

    if (latestParam) {
      const sortedData: Pet[] = filteredData
        .slice(0)
        .sort((a, b) => parseDate(b.dateAdded).getTime() - parseDate(a.dateAdded).getTime());

      return sortedData;
    }

    return filteredData;
  }, [data, speciesParam, nameParam, latestParam]);

  return (
    <Container>
      <div className={styles.petsList}>
        <h1>Pets</h1>

        <Filters speciesParam={speciesParam} nameParam={nameParam} latestParam={latestParam} />

        <h2>Results</h2>

        <div className={styles.cardContainer}>
          {!isLoading
            ? pets.map(pet => <Card name={pet.name} image={pet.photoUrl} key={pet.id} />)
            : new Array(6).fill(null).map((_, key) => <CardSkeleton key={key} />)}
        </div>
      </div>
    </Container>
  );
}
