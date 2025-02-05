import { Suspense } from 'react';

import Pets from '@/components//Pets';
import { Container } from '@/components/Container';
import Filters from '@/components/Filters';
import PetsSkeleton from '@/components/Pets/skeleton';

import styles from './index.module.css';

const Home = ({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) => {
  return (
    <div className="main">
      <Container>
        <div className={styles.petsList} data-testid="cards-list">
          <h1>Pets</h1>

          <Filters />

          <h2>Results</h2>
          <Suspense fallback={<PetsSkeleton />}>
            <Pets searchParams={searchParams} />
          </Suspense>
        </div>
      </Container>
    </div>
  );
};

export default Home;
