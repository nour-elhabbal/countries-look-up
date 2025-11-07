import { Suspense } from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Box, Flex } from '@chakra-ui/react';

import CountriesList from './components/CountriesList';
import FiltersMenu from '@/components/FiltersMenu';
import Search from '@/components/Search';
import { Region } from '@/types';
import { useCountriesInfiniteQuery } from '@/hooks';
import PageIndexSetter from '@/components/PageIndexSetter';

interface HomeProps {
  searchParams: Promise<{ region: Region; query: string }>;
}

const Home = async ({ searchParams }: HomeProps) => {
  const { region = '', query = '' } = await searchParams;
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: useCountriesInfiniteQuery.queryKey({ region, query }),
    queryFn: useCountriesInfiniteQuery.queryFn,
    initialPageParam: 0,
  });

  return (
    <>
      <PageIndexSetter />
      <Box>
        <Flex
          direction={['column', null, 'row']}
          align={['start', null, 'center']}
          justify='space-between'
          gapY='3'
          mx={['2', '8']}
          my='10'
        >
          <Search />

          <FiltersMenu />
        </Flex>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CountriesList />
        </HydrationBoundary>
      </Box>
    </>
  );
};

export default Home;
