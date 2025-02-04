'use client';

import { useRef } from 'react';

import { useClickOutside } from '@/hooks/useClickOutside';

import styles from './index.module.css';
import type { Option } from './types';
import { useAccessibleDropdown } from './useAccessibleDropdown';

const Dropdown = ({
  options,
  label,
  value,
  namespace,
  isLoading,
  onChange,
}: {
  options: Option[];
  label: string;
  value: string[] | null;
  namespace: string;
  isLoading: boolean;
  onChange: (value: string[]) => void;
}) => {
  const ref = useRef(null);

  const { expanded, activeIndex, setIsDropdownOpen, setActiveIndex, selectValue, setIsFocus } =
    useAccessibleDropdown({ options, value, onChange });
  useClickOutside({ ref, handler: () => setIsDropdownOpen(false) });

  return (
    <div className={styles.dropdownContainer} ref={ref}>
      <button
        disabled={isLoading}
        className={styles.dropdown}
        type="button"
        onClick={() => setIsDropdownOpen(!expanded)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        role="combobox"
        aria-expanded={expanded}
        aria-label={`${label} filter`}
        aria-haspopup="listbox"
        aria-controls={`dropdown-${label}`}
        aria-activedescendant={`dropdown-${namespace}-element-${activeIndex}`}
      >
        {value?.length ? `Selected: ${value.length}` : label}
      </button>
      <ul
        className={styles.options}
        data-state={expanded ? 'expanded' : 'closed'}
        role="listbox"
        id={`dropdown-${namespace}`}
        tabIndex={-1}
      >
        {options.map((option, idx) => (
          <li
            key={option.value}
            className={styles.option}
            id={`dropdown-${namespace}-element-${idx}`}
            role="option"
            aria-selected={idx === activeIndex}
            onMouseOver={() => setActiveIndex(idx)}
            onFocus={() => setActiveIndex(idx)}
          >
            <input
              type="checkbox"
              name={`dropdown-${namespace}-element-${option.label}`}
              value={option.value}
              id={`dropdown-${namespace}-option-field-${option.label}`}
              checked={value?.includes(option.value)}
              onChange={() => selectValue(option.value)}
            />
            <label htmlFor={`dropdown-${namespace}-option-field-${option.label}`}>
              {option.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
