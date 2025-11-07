'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useSessionStorage } from '@/hooks';

const PageIndexSetter = () => {
  const pathname = usePathname();
  const [_, setPath] = useSessionStorage('pageIndex', {});

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // store page index safely in sessionStorage
    setPath({ [pathname]: window.history.length });
  }, [pathname]);

  return <></>;
};

export default PageIndexSetter;
