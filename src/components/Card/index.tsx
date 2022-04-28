import {Box, HStack, Pressable, Stack, Text} from 'native-base';
import React from 'react';

const GullkornCard = ({gullkornText, gullKornDate}) => {
  return (
    <Pressable onLongPress={() => console.log('onLongPress')}>
      <Box alignItems="center" mb="2">
        <Box
          w="80"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          backgroundColor="gray.50">
          <Stack p="4" space={3}>
            <Text fontWeight="400">{gullkornText}</Text>
            <HStack
              alignItems="center"
              space={4}
              justifyContent="space-between">
              <HStack alignItems="center">
                <Text color="coolGray.600" fontWeight="400">
                  {gullKornDate}
                </Text>
              </HStack>
            </HStack>
          </Stack>
        </Box>
      </Box>
    </Pressable>
  );
};

export default GullkornCard;
