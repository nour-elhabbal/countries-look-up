'use client';

import { Center } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const BackButton = () => {
  const router = useRouter();

  const [paths, setPaths] = useState<Record<string, number>>({});

  // This is used to Fix the hydration issue with sessionStorage (lazy setting of the path)
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('pageIndex');
      if (stored) setPaths(JSON.parse(stored));
    } catch {
      setPaths({});
    }
  }, []);

  const isValidBack = paths['/'] && window.history.length > paths['/'] + 1;

  const handleBack = () => {
    if (isValidBack) {
      router.back();
      return;
    }
    router.push('/');
  };

  return (
    <>
      <Center
        bgColor={{ _dark: 'dark.elements', _light: 'light.elements' }}
        cursor='pointer'
        width='32'
        height='10'
        boxShadow='sm'
        borderRadius='md'
        onClick={handleBack}
      >
        {isValidBack ? 'Go Back' : 'Go Home'}
      </Center>
    </>
  );
};

export default BackButton;
