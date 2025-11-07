'use client';
import { Box, Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';

import type { Country } from '@/types';
import Link from 'next/link';

const CountryCard = ({ country }: { country: Country }) => {
  return (
    <Box
      w={['25%', null, '20%']}
      h='24em'
      my='6'
      minW={['310px', null, '250px']}
      maxWidth='310px'
      bgColor={{ _dark: 'dark.elements', _light: 'light.elements' }}
      borderRadius='md'
    >
      <Link href={`/${country.alpha2Code.toLowerCase()}`} prefetch>
        <Box position='relative' h='12em' w='100%' mb='5' borderRadius='md'>
          <Image
            src={country.flag}
            width={500}
            height={200}
            alt={`Flag of ${country.name}`}
            priority
            style={{
              objectFit: 'cover',
              borderTopLeftRadius: 'inherit',
              borderTopRightRadius: 'inherit',
              height: 'inherit',
            }}
          />
        </Box>

        <Heading fontSize='xl' mx='4' mb='3'>
          {country.name}
        </Heading>

        <Box mx='4' fontSize='md'>
          <Text>
            Population:{' '}
            <Box as='span' fontWeight='thin' opacity='.8'>
              {country.population}
            </Box>
          </Text>

          <Text>
            Continent:{' '}
            <Box as='span' fontWeight='thin' opacity='.8'>
              {country.region}
            </Box>
          </Text>

          <Text>
            Capital:{' '}
            <Box as='span' fontWeight='thin' opacity='.8'>
              {country.capital}
            </Box>
          </Text>
        </Box>
      </Link>
    </Box>
  );
};

export default CountryCard;
