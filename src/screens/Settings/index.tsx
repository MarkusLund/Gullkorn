import React from 'react';
import {SafeAreaView} from 'react-native';
import {Center, Text, VStack} from 'native-base';
import {SettingsScreenProps} from '../../../types';

export const settingsScreenName = 'Settings';

const SettingsScreen = ({}: SettingsScreenProps) => {
  return (
    <SafeAreaView>
      <Center>
        <VStack h="100%" justifyContent="center" space="10">
          <Text fontSize="2xl" mb="5">
            Innstillinger
          </Text>
        </VStack>
      </Center>
    </SafeAreaView>
  );
};

export default SettingsScreen;
