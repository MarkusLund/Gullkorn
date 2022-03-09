import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';

type RootStackParamList = {
  Profile: {personName: string};
  Home: undefined;
};

const profileScreenName = 'Profile';
type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const names = ['Sondre', 'Ivar', 'Mathias'];

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

const ProfileScreen = ({route}: ProfileScreenProps) => {
  return (
    <SafeAreaView style={styles.screen}>
      <TouchableOpacity style={styles.roundButton}>
        <Text>{route.params.personName}</Text>
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
