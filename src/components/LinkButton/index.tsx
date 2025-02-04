import Image from 'next/image';

import styles from './index.module.css';

const LinkButton = ({ title, href }: { title: string; href: string }) => {
  return (
    <a href={href} className={styles.linkButton}>
      <span className={styles.linkButtonName}>{title}</span>
      <Image
        className={styles.linkButtonIcon}
        src="/icons/arrow-right.svg"
        alt={title}
        width={24}
        height={24}
      />
    </a>
  );
};

export default LinkButton;
