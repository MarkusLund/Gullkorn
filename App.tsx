import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import ProfileScreen from './screens/Profile';
import {HomeScreenProps, RootStackParamList} from './types';

const profileScreenName = 'Profile';

const Stack = createNativeStackNavigator<RootStackParamList>();
const names = ['Sondre', 'Ivar', 'Mathias'];

const GullkornScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Text>Gullkorn</Text>
    </SafeAreaView>
  );
};

const HomeScreen = ({navigation}: HomeScreenProps) => {
  return (
    <SafeAreaView style={styles.screen}>
      {names.map(name => (
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() =>
            navigation.navigate(profileScreenName, {personName: name})
          }>
          <Text>{name}</Text>
        </TouchableOpacity>
      ))}
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
