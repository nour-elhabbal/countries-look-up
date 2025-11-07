'use client';

import { countriesNames } from '@/consts/countriesNames';
import { Country } from '@/types';
import { Text, Center, Flex } from '@chakra-ui/react';
import Link from 'next/link';

interface BorderCountriesProps {
  country: Country;
}

const BorderCountries = ({ country }: BorderCountriesProps) => {
  const borders = country.borders || [];

  return (
    <Flex alignItems='center' gap='4' flexWrap='wrap' w='90%'>
      <Text fontWeight='bold'>Border Countries:</Text>

      <Flex flexWrap='wrap' gap='4'>
        {borders.map(code3 => (
          <Link href={`/${code3}`} key={code3}>
            <Center
              minW='20'
              bgColor={{ _dark: 'dark.elements', _light: 'light.elements' }}
              fontSize='sm'
              cursor='pointer'
              height='10'
              px='3'
              boxShadow='sm'
              borderRadius='md'
            >
              {countriesNames[code3] || code3}
            </Center>
          </Link>
        ))}
      </Flex>
    </Flex>
  );
};

export default BorderCountries;
