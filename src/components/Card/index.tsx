import Image from 'next/image';

import LinkButton from '@/components/LinkButton';
import Skeleton from '@/components/Skeleton';

import styles from './index.module.css';

export const CardSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Skeleton type="image" />
      </div>
      <Skeleton type="title" />
      <Skeleton type="linkButton" />
    </div>
  );
};

export const Card = ({ name, image }: { name: string; image: string }) => {
  return (
    <div className={styles.container} data-testid="pet-card">
      <div className={styles.imageContainer}>
        <Image src={image} alt={name} width={640} height={360} className={styles.image} />
      </div>
      <h3 className={`${styles.petName} h4`}>{name}</h3>
      <LinkButton href="https://coolblue.nl" title="View" />
    </div>
  );
};
