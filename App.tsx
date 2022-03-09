import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {dateToNorwegianString, datoToPrettyString} from './helpers';

type RootStackParamList = {
  Profile: {personName: string};
  Home: undefined;
};

const profileScreenName = 'Profile';
type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

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

const ProfileScreen = ({route}: ProfileScreenProps) => {
  const [newGullkorn, setNewGullkorn] = React.useState('');
  const [gullkornDate, setGullkornDate] = React.useState(new Date());

  return (
    <SafeAreaView style={styles.profileScreen}>
      <Text style={styles.gullkornText}>{newGullkorn}</Text>
      <Text style={styles.gullkornDate}>
        {dateToNorwegianString(gullkornDate)}
      </Text>
      <Text style={styles.gullkornAuthor}>- {route.params.personName}</Text>
      <TextInput
        style={styles.inputText}
        onChangeText={text => setNewGullkorn(text)}
        value={newGullkorn}
      />
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
  gullkornText: {
    // width: '90%',
    fontSize: 20,
    fontStyle: 'italic',
    height: 40,
    borderBottomWidth: 1,
    padding: 10,
  },
  gullkornDate: {
    // width: '90%',
    fontSize: 20,
    height: 40,
    borderBottomWidth: 1,
    padding: 10,
  },
  gullkornAuthor: {
    // width: '90%',
    fontSize: 20,
    fontStyle: 'italic',
    height: 40,
    borderBottomWidth: 1,
  },
  inputText: {
    width: '90%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;
