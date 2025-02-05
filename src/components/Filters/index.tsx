'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import Pill from '@/components/Pill';
import Select from '@/components/Select';

import styles from './index.module.css';

const SPECIES_OPTIONS = [
  { label: 'No filtering', value: '' },
  { label: 'Dog', value: 'dog' },
  { label: 'Cat', value: 'cat' },
  { label: 'Rat', value: 'rat' },
];

const NAME_OPTIONS = [
  { label: 'Default sorting', value: '' },
  { label: 'Sort by asc', value: 'asc' },
  { label: 'Sort by desc', value: 'desc' },
];

const Filters = ({
  species,
  sortBy,
  order,
}: {
  species: string | null;
  sortBy: string | null;
  order: string | null;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const updateQueryString = useCallback(
    (newParams: { name: string; value: (string | undefined)[] }[]) => {
      const params = new URLSearchParams(searchParams.toString());

      newParams.forEach(({ name, value }) => {
        params.delete(name);

        if (value?.length) {
          value.forEach(param => {
            if (param) {
              params.append(name, param);
            }
          });
        }
      });

      router.push(pathname + '?' + params.toString(), { scroll: false });
    },
    [searchParams, pathname, router],
  );

  return (
    <div className={styles.filters}>
      <Select
        options={SPECIES_OPTIONS}
        label="Species"
        value={species || ''}
        namespace="species"
        onChange={value => {
          updateQueryString([{ name: 'species', value: [value] }]);
        }}
      />
      <Select
        options={NAME_OPTIONS}
        label="Name"
        value={sortBy === 'name' ? order || '' : ''}
        namespace="name"
        onChange={value => {
          updateQueryString([
            { name: 'sortBy', value: value ? ['name'] : [] },
            { name: 'order', value: value ? [value] : [] },
          ]);
        }}
      />
      <Pill
        label="Latest added"
        value={sortBy === 'dateAdded' ? order === 'desc' : false}
        namespace="latest-added"
        onClick={value => {
          updateQueryString([
            { name: 'sortBy', value: value ? ['dateAdded'] : [] },
            { name: 'order', value: value ? ['desc'] : [] },
          ]);
        }}
      />
    </div>
  );
};

export default Filters;
