'use client';

import { type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
