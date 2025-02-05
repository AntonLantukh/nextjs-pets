'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import Pill from '@/components/Pill';
import Select from '@/components/Select';
import { getUpdatedSearchParams } from '@/utils/url';

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

const Filters = () => {
  const searchParams = useSearchParams();
  // TODO: validate incoming values
  const species = searchParams.get('species');
  const sortBy = searchParams.get('sortBy');
  const order = searchParams.get('order');

  const router = useRouter();
  const pathname = usePathname();

  const updateQueryString = useCallback(
    (params: Record<string, (string | undefined)[]>) => {
      const newParams = getUpdatedSearchParams({ searchParams, params });

      router.push(pathname + '?' + newParams.toString(), { scroll: false });
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
          updateQueryString({ species: [value] });
        }}
      />
      <Select
        options={NAME_OPTIONS}
        label="Name"
        value={sortBy === 'name' ? order || '' : ''}
        namespace="name"
        onChange={value => {
          updateQueryString({
            sortBy: value ? ['name'] : [],
            order: value ? [value] : [],
          });
        }}
      />
      <Pill
        label="Latest added"
        value={sortBy === 'dateAdded' ? order === 'desc' : false}
        namespace="latest-added"
        onClick={value => {
          updateQueryString({
            sortBy: value ? ['dateAdded'] : [],
            order: value ? ['desc'] : [],
          });
        }}
      />
    </div>
  );
};

export default Filters;
