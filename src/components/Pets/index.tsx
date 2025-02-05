import { getPets } from '@/api/pets';
import { Card } from '@/components/Card';
import type { Pet } from '@/types/pet';

import styles from './index.module.css';

const PetsList = ({ pets }: { pets: Pet[] | undefined }) => {
  return (
    <div className={styles.cardContainer}>
      {(pets || []).map(pet => (
        <Card name={pet.name} image={pet.photoUrl} key={pet.id} />
      ))}
    </div>
  );
};

const Pets = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) => {
  const { species, sortBy, order } = await searchParams;

  const pets = await getPets({ species: [species], sortBy: [sortBy], order: [order] });

  return <PetsList pets={pets} />;
};

export default Pets;
