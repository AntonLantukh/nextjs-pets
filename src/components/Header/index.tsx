import Image from 'next/image';

import { Container } from '@/components/Container';

import styles from './index.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <Image src="/icons/pet-icon.svg" width={60} height={60} priority={true} alt="Logo" />
      </Container>
    </header>
  );
};

export default Header;
