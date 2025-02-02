import Image from 'next/image';

import { Container } from '@/components/Container';

import styles from './index.module.css';

export const Header = () => {
  return (
    <div className={styles.header}>
      <Container>
        <Image src="/icons/pet-icon.svg" width={60} height={60} alt="Logo" />
      </Container>
    </div>
  );
};
