'use client';

import styles from './index.module.css';

const Pill = ({
  label,
  value,
  onClick,
}: {
  label: string;
  value: boolean;
  onClick: (value: boolean) => void;
}) => {
  const handleClick = () => {
    onClick(!value);
  };

  return (
    <button
      className={styles.pill}
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
