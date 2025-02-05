'use client';

import { useSearchParams } from 'next/navigation';
import { useQuery } from 'react-query';

import { getPets } from '@/api/pets';
import { Card, CardSkeleton } from '@/components/Card';
import { Container } from '@/components/Container';
import Filters from '@/components/Filters';
import type { Pet } from '@/types/pet';

import styles from './index.module.css';

const SkeletonList = () => {
  return (
    <div className={styles.cardContainer} data-testid="pets-skeleton">
      {new Array(6).fill(null).map((_, key) => (
        <CardSkeleton key={key} />
      ))}
    </div>
  );
};

const Pets = ({ pets }: { pets: Pet[] | undefined }) => {
  return (
    <div className={styles.cardContainer}>
      {(pets || []).map(pet => (
        <Card name={pet.name} image={pet.photoUrl} key={pet.id} />
      ))}
    </div>
  );
};

const PetsList = () => {
  const searchParams = useSearchParams();
  const species = searchParams.get('species');
  const sortBy = searchParams.get('sortBy');
  const order = searchParams.get('order');

  // const pets = await getPets({ species, sortBy, order });
  // const isLoading = false;

  const { data: pets, isLoading } = useQuery<Pet[]>(
    ['pets', species, sortBy, order],
    () => getPets({ species, sortBy, order }),
    {
      staleTime: 30000,
      cacheTime: 30000,
    },
  );

  return (
    <Container>
      <div className={styles.petsList} data-testid="cards-list">
        <h1>Pets</h1>

        <Filters species={species} sortBy={sortBy} order={order} />

        <h2>Results</h2>

        <div className={styles.cardContainer}>
          {!isLoading ? <Pets pets={pets} /> : <SkeletonList />}
        </div>
      </div>
    </Container>
  );
};

export default PetsList;
