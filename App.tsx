import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import ProfileScreen from './screens/Profile';
import {HomeScreenProps, RootStackParamList} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const profileScreenName = 'Profile';

const Stack = createNativeStackNavigator<RootStackParamList>();
const names = ['Sondre', 'Ivar', 'Mathias'];

const HomeScreen = ({navigation}: HomeScreenProps) => {
  return (
    <SafeAreaView style={styles.screen}>
      {names.map(name => (
        <TouchableOpacity
          key={name}
          style={styles.roundButton}
          onPress={() =>
            navigation.navigate(profileScreenName, {personName: name})
          }>
          <Text>{name}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={() => AsyncStorage.clear()}>
        <Text>Slett all data</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Gullkorn'}}
        />
        <Stack.Screen
          name={profileScreenName}
          component={ProfileScreen}
          options={({route}) => ({title: route.params.personName})}
        />
      </Stack.Navigator>
    </NavigationContainer>
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

export default App;
