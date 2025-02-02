import type { ReactNode } from 'react';

import styles from './index.module.css';

export const Container = ({ children }: { children: ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};
