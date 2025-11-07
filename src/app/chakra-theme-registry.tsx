'use client';

import { CacheProvider } from '@emotion/react';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { system } from '@/theme';

export function ChakraThemeRegistry({ children }: { children: ReactNode }) {
  const cache = createCache({ key: 'css' });
  const inserted: string[] = [];
  const originalInsert = cache.insert.bind(cache); // 🧠 store the real one first

  cache.insert = (...args) => {
    const [, serialized] = args;
    if (!inserted.includes(serialized.name)) {
      inserted.push(serialized.name);
    }
    return originalInsert(...args); // ✅ call the saved version instead
  };

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${inserted.join(' ')}`}
      dangerouslySetInnerHTML={{
        __html: inserted.map(name => cache.inserted[name]).join(' '),
      }}
    />
  ));

  return (
    <CacheProvider value={cache}>
      <ChakraProvider value={system}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
