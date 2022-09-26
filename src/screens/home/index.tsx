import React from 'react';
import {SafeAreaView} from 'react-native';
import {HomeScreenProps} from '../../../types';
import {Avatar, Button, Center, Pressable, VStack} from 'native-base';
import {profileScreenName} from '../Profile';
import {settingsScreenName} from '../Settings';

export const people = [
  {name: 'Sondre', img: require('../../../imgs/sondre.jpg')},
  {name: 'Ivar', img: require('../../../imgs/ivar.jpg')},
  {name: 'Mathias', img: require('../../../imgs/mathias.jpg')},
];

export const homeScreenName = 'Home';

const HomeScreen = ({navigation}: HomeScreenProps) => {
  return (
    <SafeAreaView>
      <Center>
        <VStack h="100%" justifyContent="center" space="10">
          {people.map(person => (
            <Pressable
              key={person.name}
              onPress={() =>
                navigation.navigate(profileScreenName, {
                  personName: person.name,
                })
              }>
              {({isPressed}) => (
                <Avatar
                  size="2xl"
                  source={person.img}
                  style={{
                    transform: [{scale: isPressed ? 0.96 : 1}],
                  }}
                />
              )}
            </Pressable>
          ))}
          <Button onPress={() => navigation.navigate(settingsScreenName)}>
            Innstillinger
          </Button>
        </VStack>
      </Center>
    </SafeAreaView>
  );
};

export default HomeScreen;
