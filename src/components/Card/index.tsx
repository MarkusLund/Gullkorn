import {
  Box,
  Button,
  HStack,
  Popover,
  Pressable,
  Stack,
  Text,
  VStack,
} from 'native-base';
import React, {useState} from 'react';

type GullkornCardProps = {
  gullkornText: string;
  gullkornDate: string;
  deleteGullkorn: () => void;
};

const GullkornCard: React.FC<GullkornCardProps> = ({
  gullkornText,
  gullkornDate,
  deleteGullkorn,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box w="100%" alignItems="center">
      <VStack space={6} alignSelf="flex-start" w="100%">
        <Popover
          trigger={triggerProps => {
            return (
              <Pressable {...triggerProps} onLongPress={() => setIsOpen(true)}>
                <Box alignItems="center" mb="2">
                  <Box
                    w="80"
                    rounded="lg"
                    overflow="hidden"
                    borderColor={isOpen ? 'coolGray.500' : 'coolGray.200'}
                    borderWidth="1"
                    backgroundColor={isOpen ? 'gray.200' : 'gray.50'}>
                    <Stack p="4" space={3}>
                      <Text fontWeight="400">{gullkornText}</Text>
                      <HStack
                        alignItems="center"
                        space={4}
                        justifyContent="space-between">
                        <HStack alignItems="center">
                          <Text color="coolGray.600" fontWeight="400">
                            {gullkornDate}
                          </Text>
                        </HStack>
                      </HStack>
                    </Stack>
                  </Box>
                </Box>
              </Pressable>
            );
          }}
          isOpen={isOpen}
          onClose={() => setIsOpen(!isOpen)}>
          <Popover.Content w="56">
            <Popover.Arrow />
            <Popover.CloseButton onPress={() => setIsOpen(false)} />
            <Popover.Header>Slett gullkorn</Popover.Header>
            <Popover.Body>Dette vil permanent slette gullkornet.</Popover.Body>
            <Popover.Footer justifyContent="flex-end">
              <Button.Group space={2}>
                <Button
                  colorScheme="coolGray"
                  variant="ghost"
                  onPress={() => setIsOpen(false)}>
                  Avbryt
                </Button>
                <Button
                  colorScheme="danger"
                  onPress={() => {
                    setIsOpen(false);
                    deleteGullkorn();
                  }}>
                  Slett
                </Button>
              </Button.Group>
            </Popover.Footer>
          </Popover.Content>
        </Popover>
      </VStack>
    </Box>
  );
};

export default GullkornCard;
