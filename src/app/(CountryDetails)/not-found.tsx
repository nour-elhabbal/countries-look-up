'use client';

import { Heading, Text, VStack, Flex } from '@chakra-ui/react';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <Flex flexDir='column' minH='100vh' gap='20' justifyContent='center'>
      <VStack textAlign='center'>
        <Heading fontSize='9xl' mb='10'>
          404
        </Heading>
        <Text fontSize='2xl'>Country not found</Text>

        <Link href='/'>
          <Text textDecoration='underline'>Go Back Home</Text>
        </Link>
      </VStack>
    </Flex>
  );
}
