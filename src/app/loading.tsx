import { Container } from '@/components/Container';
import FiltersSkeleton from '@/components/Filters/skeleton';
import PetsSkeleton from '@/components/Pets/skeleton';

import styles from './index.module.css';

const Loading = () => {
  return (
    <div className="main">
      <Container>
        <div className={styles.petsList} data-testid="cards-list">
          <h1>Pets</h1>
          <FiltersSkeleton />

          <h2>Results</h2>
          <PetsSkeleton />
        </div>
      </Container>
    </div>
  );
};

export default Loading;
