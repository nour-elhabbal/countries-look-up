'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ColorModeProvider, type ColorModeProviderProps } from './color-mode';

const queryClient = new QueryClient();

export function Provider(props: ColorModeProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeProvider {...props} />
    </QueryClientProvider>
  );
}
