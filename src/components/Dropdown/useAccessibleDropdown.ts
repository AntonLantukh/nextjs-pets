import { useCallback, useEffect, useState } from 'react';

import type { Option } from './types';

const registerOpenDropdownHandlers = ({
  options,
  activeIndex,
  selectValue,
  setActiveIndex,
  setIsDropdownOpen,
}: {
  options: Option[];
  activeIndex: number;
  selectValue: (v: string) => void;
  setActiveIndex: (v: number) => void;
  setIsDropdownOpen: (v: boolean) => void;
}) => {
  const keyDownCallback = (evt: KeyboardEvent) => {
    evt.preventDefault();
    switch (evt.key) {
      case 'Up':
      case 'ArrowUp':
        evt.preventDefault();
        setActiveIndex(activeIndex <= 0 ? options.length - 1 : activeIndex - 1);
        return;
      case 'Down':
      case 'ArrowDown':
        evt.preventDefault();
        setActiveIndex(activeIndex + 1 === options.length ? 0 : activeIndex + 1);
        return;
      case 'Enter':
      case ' ':
        evt.preventDefault();
        selectValue(options[activeIndex].value);
        return;
      case 'Esc':
      case 'Escape':
        evt.preventDefault();
        setIsDropdownOpen(false);
        return;
      case 'PageUp':
      case 'Home':
        evt.preventDefault();
        setActiveIndex(0);
        return;
      case 'PageDown':
      case 'End':
        evt.preventDefault();
        setActiveIndex(options.length - 1);
        return;
    }
  };

  document.addEventListener('keydown', keyDownCallback);

  return () => {
    document.removeEventListener('keydown', keyDownCallback);
  };
};

const registerClosedDropdownHandlers = ({
  setIsDropdownOpen,
}: {
  setIsDropdownOpen: (v: boolean) => void;
}) => {
  const keyDownCallback = (evt: KeyboardEvent) => {
    switch (evt.key) {
      case 'Up':
      case 'ArrowUp':
      case 'Down':
      case 'ArrowDown':
      case ' ':
      case 'Enter':
        evt.preventDefault();
        setIsDropdownOpen(true);
    }
  };

  document.addEventListener('keydown', keyDownCallback);

  return () => {
    document.removeEventListener('keydown', keyDownCallback);
  };
};

export const useAccessibleDropdown = ({
  options,
  value,
  onChange,
}: {
  options: Option[];
  value: string[] | null;
  onChange: (value: string[]) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFocus, setIsFocus] = useState(false);

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

  const setIsDropdownOpen = useCallback(
    (v: boolean) => {
      if (v) {
        setActiveIndex(0);
      }

      setExpanded(v);
    },
    [setActiveIndex, setExpanded],
  );

  useEffect(() => {
    if (expanded) {
      return registerOpenDropdownHandlers({
        activeIndex,
        options,
        setActiveIndex,
        selectValue,
        setIsDropdownOpen,
      });
    } else {
      if (isFocus) {
        return registerClosedDropdownHandlers({
          setIsDropdownOpen,
        });
      }
    }
  }, [expanded, activeIndex, isFocus, options, selectValue, setIsDropdownOpen]);

  return {
    expanded,
    activeIndex,
    setIsDropdownOpen,
    setActiveIndex,
    selectValue,
    setIsFocus,
  };
};
