import Skeleton from '@/components/Skeleton';

import styles from './index.module.css';

const SkeletonFilters = () => {
  return (
    <div className={styles.filters}>
      <Skeleton type="linkButton" />
      <Skeleton type="linkButton" />
      <Skeleton type="linkButton" />
    </div>
  );
};

export default SkeletonFilters;
