import type { MutableRefObject } from 'react';
import { useEffect } from 'react';

export const useClickOutside = ({
  handler,
  ref,
}: {
  ref: MutableRefObject<HTMLElement | null>;
  handler: (evt: Event) => void;
}) => {
  useEffect(() => {
    const onClick = (e: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(e?.target as Node)) {
        return;
      }
      handler(e);
    };

    document.addEventListener('mousedown', onClick);
    document.addEventListener('touchstart', onClick);

    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('touchstart', onClick);
    };
  });
};
