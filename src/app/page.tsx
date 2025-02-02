import { Suspense } from 'react';

import PetsList from '@/components/PetsList';

import Loading from './loading';

export default async function Home() {
  return (
    <div className="main">
      <Suspense fallback={<Loading />}>
        <PetsList  />
      </Suspense>
    </div>
  );
}
