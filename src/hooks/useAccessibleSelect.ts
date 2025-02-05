import { useCallback, useEffect, useState } from 'react';

import type { Option } from '@/types/select';

const registerOpenSelectHandlers = ({
  options,
  activeIndex,
  selectValue,
  setActiveIndex,
  setIsSelectOpen,
}: {
  options: Option[];
  activeIndex: number;
  selectValue: (v: string) => void;
  setActiveIndex: (v: number) => void;
  setIsSelectOpen: (v: boolean) => void;
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
        setIsSelectOpen(false);
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

const registerClosedSelectHandlers = ({
  setIsSelectOpen,
}: {
  setIsSelectOpen: (v: boolean) => void;
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
        setIsSelectOpen(true);
    }
  };

  document.addEventListener('keydown', keyDownCallback);

  return () => {
    document.removeEventListener('keydown', keyDownCallback);
  };
};

export const useAccessibleSelect = ({
  options,
  selectValue,
}: {
  options: Option[];
  selectValue: (value: string) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFocus, setIsFocus] = useState(false);

  const setIsSelectOpen = useCallback(
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
      return registerOpenSelectHandlers({
        activeIndex,
        options,
        setActiveIndex,
        selectValue,
        setIsSelectOpen,
      });
    } else {
      if (isFocus) {
        return registerClosedSelectHandlers({
          setIsSelectOpen,
        });
      }
    }
  }, [expanded, activeIndex, isFocus, options, selectValue, setIsSelectOpen]);

  return {
    expanded,
    activeIndex,
    setIsSelectOpen,
    setActiveIndex,
    selectValue,
    setIsFocus,
  };
};
