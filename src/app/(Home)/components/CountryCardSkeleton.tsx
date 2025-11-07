import { Box } from '@chakra-ui/react';
import { SkeletonText, Skeleton } from '@/components/ui/skeleton';

const CountryCardSkeleton = () => {
  return (
    <Box
      w={['25%', null, '20%']}
      h='24em'
      my='6'
      minW={['310px', null, '250px']}
      maxW='310px'
      bgColor={{ _dark: 'dark.elements', _light: 'light.elements' }}
      borderRadius='md'
    >
      <Box h='50%' w='100%' mb='5' borderRadius='md'>
        <Skeleton w='full' h='full' bgColor='neutral.skeleton' />
      </Box>

      <SkeletonText mx='4' mb='5' noOfLines={1} bgColor='neutral.skeleton' />

      <SkeletonText mx='4' noOfLines={3} bgColor='neutral.skeleton' />
    </Box>
  );
};

export default CountryCardSkeleton;
