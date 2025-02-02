'use client';

import type { ChangeEvent } from 'react';

export type Option = {
  value: string;
  label: string;
};

import styles from './index.module.css';

const Dropdown = ({
  options,
  label,
  value,
  onChange,
}: {
  options: Option[];
  label: string;
  value: string | null;
  onChange: (value: string) => void;
}) => {
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target?.value || '');
  };

  return (
    <div className={styles.dropdownContainer}>
      <select className={styles.dropdown} value={value || ''} onChange={handleSelectChange}>
        <option value="">{label}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
