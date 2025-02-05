'use client';

import { useCallback, useRef } from 'react';

import { useAccessibleSelect } from '@/hooks/useAccessibleSelect';
import { useClickOutside } from '@/hooks/useClickOutside';
import type { Option } from '@/types/select';

import styles from './index.module.css';

const MultiSelect = ({
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

  const selectValue = useCallback(
    (optionValue: string) => {
      const checked = !(value || []).includes(optionValue);

      const newValue = [...(value || []), optionValue];
      const list: string[] = (newValue || []).filter(el => {
        if (optionValue === el) {
          return checked;
        }

        return true;
      });

      onChange(list);
    },
    [value, onChange],
  );

  useClickOutside({ ref, handler: () => setIsSelectOpen(false) });
  const { expanded, activeIndex, setIsSelectOpen, setActiveIndex, setIsFocus } =
    useAccessibleSelect({ options, selectValue });

  return (
    <div className={styles.multiSelectContainer} ref={ref}>
      <button
        disabled={isLoading}
        className={styles.multiSelect}
        type="button"
        onClick={() => setIsSelectOpen(!expanded)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        role="combobox"
        data-testid={`multi-select-${namespace}`}
        aria-expanded={expanded}
        aria-label={`${label} filter`}
        aria-haspopup="listbox"
        aria-controls={`multi-select-${label}`}
        aria-activedescendant={`multi-select-${namespace}-element-${activeIndex}`}
      >
        {value?.length ? `Selected: ${value.length}` : label}
      </button>
      <ul
        className={styles.options}
        data-state={expanded ? 'expanded' : 'closed'}
        role="listbox"
        id={`multi-select-${namespace}`}
        tabIndex={-1}
      >
        {options.map((option, idx) => (
          <li
            key={option.value}
            className={styles.option}
            id={`multi-select-${namespace}-element-${idx}`}
            role="option"
            aria-selected={idx === activeIndex}
            onMouseOver={() => setActiveIndex(idx)}
            onFocus={() => setActiveIndex(idx)}
          >
            <input
              type="checkbox"
              data-testid={`multi-select-${namespace}-option`}
              name={`multi-select-${namespace}-element-${option.label}`}
              value={option.value}
              id={`multi-select-${namespace}-option-field-${option.label}`}
              checked={value?.includes(option.value)}
              onChange={() => selectValue(option.value)}
            />
            <label htmlFor={`multi-select-${namespace}-option-field-${option.label}`}>
              {option.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MultiSelect;
