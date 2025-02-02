import Image from 'next/image';

import styles from './index.module.css';

export function Card({ name, image }: { name: string; image: string }) {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image src={image} alt={name} width={300} height={300} className={styles.image} />
      </div>
      <h3 className={`${styles.petName} h4`}>{name}</h3>
      <a href="https://coolblue.nl" className={styles.cta}>
        <Image src="/icons/arrow-right.svg" alt="->" width={24} height={24} />
      </a>
    </div>
  );
}
