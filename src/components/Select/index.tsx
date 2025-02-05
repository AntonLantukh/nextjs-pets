'use client';

import { useCallback, useRef } from 'react';

import { useAccessibleSelect } from '@/hooks/useAccessibleSelect';
import { useClickOutside } from '@/hooks/useClickOutside';
import type { Option } from '@/types/select';

import styles from './index.module.css';

const Select = ({
  options,
  label,
  value,
  namespace,
  isLoading,
  onChange,
}: {
  options: Option[];
  label: string;
  value: string;
  namespace: string;
  isLoading?: boolean;
  onChange: (value: string | undefined) => void;
}) => {
  const ref = useRef(null);

  const selectValue = useCallback(
    (optionValue: string) => {
      const checked = value === optionValue;

      onChange(checked ? undefined : optionValue);
    },
    [value, onChange],
  );

  const { expanded, activeIndex, setIsSelectOpen, setActiveIndex, setIsFocus } =
    useAccessibleSelect({ options, selectValue });
  useClickOutside({ ref, handler: () => setIsSelectOpen(false) });

  const selectedOption = options.find(el => el.value === value);

  return (
    <div className={styles.selectContainer} ref={ref} data-testid={`select-${namespace}`}>
      <button
        disabled={isLoading}
        className={styles.select}
        type="button"
        onClick={() => setIsSelectOpen(!expanded)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        role="combobox"
        data-expanded={expanded}
        data-selected={!!value}
        aria-expanded={expanded}
        aria-label={`${label} filter`}
        aria-haspopup="listbox"
        aria-controls={`select-${label}`}
        aria-activedescendant={`select-${namespace}-element-${activeIndex}`}
      >
        {value ? `Selected: ${selectedOption?.label}` : label}
      </button>

      <ul
        className={styles.options}
        data-state={expanded ? 'expanded' : 'closed'}
        role="listbox"
        id={`select-${namespace}-options`}
        tabIndex={-1}
      >
        {options.map((option, idx) => (
          <li
            key={option.value}
            className={styles.option}
            id={`select-${namespace}-element-${idx}`}
            role="option"
            data-selected={selectedOption?.value === option.value}
            aria-selected={idx === activeIndex}
            onMouseOver={() => setActiveIndex(idx)}
            onFocus={() => setActiveIndex(idx)}
          >
            <input
              type="checkbox"
              data-testid={`select-${namespace}-option`}
              name={`select-${namespace}-element-${option.label}`}
              value={option.value}
              id={`select-${namespace}-option-field-${option.label}`}
              checked={value?.includes(option.value)}
              onChange={() => selectValue(option.value)}
            />
            <label htmlFor={`select-${namespace}-option-field-${option.label}`}>
              {option.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
