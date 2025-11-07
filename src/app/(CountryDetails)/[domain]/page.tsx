import { getCountryDetails } from '@/utils/getCountry';
import { Box, Flex, Text } from '@chakra-ui/react';
import { notFound } from 'next/navigation';

import BackButton from '../components/BackButton';
import Image from 'next/image';
import BorderCountries from '../components/BorderCountries';

export const revalidate = 3600; // 1 hour

interface CountryDetailsProps {
  params: Promise<{
    domain: string;
  }>;
}

const CountryDetails = async ({ params }: CountryDetailsProps) => {
  const { domain } = await params;
  console.log(domain);

  const country = await getCountryDetails(domain);

  if (!country) notFound();

  return (
    <Flex direction='column' gap='20' px={['4', null, '16']} py={'8'}>
      <BackButton />

      <Flex gap='16' direction={['column', null, 'row']} alignItems={['center', null, 'flex-start']}>
        <Box
          position='relative'
          w={['50%', '90%', '50%']}
          minW='320px'
          maxW='580px'
          aspectRatio='580/400'
          mb='5'
          borderRadius='md'
          overflow='hidden'
        >
          <Image
            src={country.flag}
            alt={`Flag of ${country.name}`}
            priority
            fill
            style={{
              objectFit: 'cover',
            }}
          />
        </Box>

        <Flex flexDirection='column' gap='8'>
          <Text as='h2' fontSize='4xl' fontWeight='800' mb='6'>
            {country.name}
          </Text>

          <Flex
            w={['90vw', null, 'unset']}
            justify='space-between'
            borderRadius='lg'
            fontSize={['15px', null, 'md']}
            maxW='700px'
            gap='8'
          >
            {/* Left Column */}
            <Flex direction='column' gap='2'>
              <InfoItem label='Native Name:' value={country.nativeName} />
              <InfoItem label='Population:' value={country.population?.toLocaleString()} />
              <InfoItem label='Region:' value={country.region} />
              <InfoItem label='Sub Region:' value={country.subregion} />
              <InfoItem label='Capital:' value={country.capital} />
            </Flex>

            {/* Right Column */}
            <Flex direction='column' gap='2'>
              <InfoItem label='Top Level Domain:' value={country.topLevelDomain?.[0]} />
              <InfoItem label='Currencies:' value={country.currencies?.map(c => c.name).join(', ')} />
              <InfoItem label='Languages:' value={country.languages?.map(l => l.name).join(', ')} />
            </Flex>
          </Flex>
          <BorderCountries country={country} />
        </Flex>
      </Flex>
    </Flex>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <Text fontSize='md'>
    <Text as='span' fontWeight='semibold'>
      {label}
    </Text>{' '}
    <Text as='span' color='gray.300'>
      {value || '—'}
    </Text>
  </Text>
);

export default CountryDetails;
