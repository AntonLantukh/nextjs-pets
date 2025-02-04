'use client';

import styles from './index.module.css';

const Pill = ({
  label,
  value,
  namespace,
  onClick,
}: {
  label: string;
  value: boolean;
  namespace: string;
  onClick: (value: boolean) => void;
}) => {
  const handleClick = () => {
    onClick(!value);
  };

  return (
    <button
      className={styles.pill}
      name={`pill-${namespace}`}
      data-state={value ? 'active' : 'non-active'}
      value={value ? 'sorted' : 'unsorted'}
      onClick={handleClick}
      role="switch"
      aria-checked={value}
      aria-label={`Sorted by ${label}`}
    >
      {label}
    </button>
  );
};

export default Pill;
