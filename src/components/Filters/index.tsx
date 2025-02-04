'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { useQuery } from 'react-query';

import { getPets } from '@/api/pets';
import Dropdown from '@/components/Dropdown';
import Pill from '@/components/Pill';
import type { Pet } from '@/types/pet';

import styles from './index.module.css';
import { getOptions } from './utils';

const Filters = ({
  speciesParam,
  nameParam,
  latestParam,
}: {
  speciesParam: string[];
  nameParam: string[];
  latestParam: string | null;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { data, isLoading } = useQuery<Pet[]>('pets', getPets, {
    staleTime: 30000,
    cacheTime: 30000,
  });

  const speciesOptions = useMemo(() => getOptions(data, 'species'), [data]);
  const nameOptions = useMemo(() => getOptions(data, 'name'), [data]);

  const updateQueryString = useCallback(
    (name: string, value: string[]) => {
      const params = new URLSearchParams(searchParams.toString());

      params.delete(name);

      if (value?.length) {
        value.forEach(param => {
          params.append(name, param);
        });
      }

      router.push(pathname + '?' + params.toString(), { scroll: false });
    },
    [searchParams, pathname, router],
  );

  return (
    <div className={styles.filters}>
      <Dropdown
        options={speciesOptions}
        label="Species"
        value={speciesParam}
        namespace="species"
        isLoading={isLoading}
        onChange={value => {
          updateQueryString('species', value);
        }}
      />
      <Dropdown
        options={nameOptions}
        label="Name"
        value={nameParam}
        namespace="name"
        isLoading={isLoading}
        onChange={value => {
          updateQueryString('name', value);
        }}
      />
      <Pill
        label="Latest added"
        value={latestParam === 'latest'}
        namespace="latest_added"
        onClick={value => {
          updateQueryString('sort', value ? ['latest'] : []);
        }}
      />
    </div>
  );
};

export default Filters;
