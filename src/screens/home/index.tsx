import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {HomeScreenProps} from '../../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Avatar, Pressable, VStack} from 'native-base';
import {profileScreenName} from '../Profile';

export const people = [
  {name: 'Sondre', img: require('../../../imgs/sondre.jpg')},
  {name: 'Ivar', img: require('../../../imgs/ivar.jpg')},
  {name: 'Mathias', img: require('../../../imgs/mathias.jpg')},
];

export const homeScreenName = 'Home';

const HomeScreen = ({navigation}: HomeScreenProps) => {
  return (
    <SafeAreaView style={styles.screen}>
      <VStack>
        {people.map(person => (
          <Pressable
            key={person.name}
            py="5"
            onPress={() =>
              navigation.navigate(profileScreenName, {personName: person.name})
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
      </VStack>
      <TouchableOpacity
        onPress={() => AsyncStorage.clear()}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{position: 'absolute', bottom: 40}}>
        <Text>Slett all data</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileScreen: {
    flex: 1,
    alignItems: 'center',
  },
  roundButton: {
    marginTop: 20,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#ccc',
  },
});

export default HomeScreen;
