'use client';

import { useEffect, useState } from 'react';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { Box, Button, Text } from '@chakra-ui/react';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '@/components/ui/menu';

import { Region } from '@/types';
import { useQueryParams } from '@/hooks';

const FiltersMenu = () => {
  const { createQueryParams, updateQueryParams, getQueryParam } = useQueryParams();

  const [selectedRegion, setSelectedRegion] = useState(getQueryParam('region') ?? '');

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Polar', 'Antarctic'];

  useEffect(() => {
    updateQueryParams(createQueryParams('region', selectedRegion));
  }, [selectedRegion]);

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          display='flex'
          justifyContent='space-between'
          bgColor={{ _dark: 'dark.elements', _light: 'light.elements' }}
          variant='plain'
          w={['full', '52']}
          h='14'
        >
          <Text>{selectedRegion || 'Filter by continent'}</Text>

          <Box>{isMenuOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</Box>
        </Button>
      </MenuTrigger>

      <MenuContent bgColor={{ _dark: 'dark.elements', _light: 'light.elements' }} w={['full', '52']}>
        {regions.map((continent, i) => {
          return (
            <MenuItem
              bgColor={selectedRegion === continent ? { _dark: 'dark.bg', _light: 'light.bg' } : 'unset'}
              cursor='pointer'
              _hover={{ bgColor: { _dark: 'dark.bg', _light: 'light.bg' } }}
              value={continent.toLowerCase()}
              key={`menu item ${i}`}
              onClick={() => {
                setSelectedRegion(prev => (prev === continent ? '' : continent));
              }}
            >
              {continent}
            </MenuItem>
          );
        })}
      </MenuContent>
    </MenuRoot>
  );
};

export default FiltersMenu;
