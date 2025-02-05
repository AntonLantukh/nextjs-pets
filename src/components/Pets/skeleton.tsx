import { CardSkeleton } from '@/components/Card';

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

export default SkeletonList;
