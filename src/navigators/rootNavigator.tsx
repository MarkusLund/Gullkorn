import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from '../../types';
import ProfileScreen, {profileScreenName} from '../screens/Profile';
import HomeScreen, {homeScreenName} from '../screens/home';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={homeScreenName}
        component={HomeScreen}
        options={{title: 'Gullkorn'}}
      />
      <Stack.Screen
        name={profileScreenName}
        component={ProfileScreen}
        options={({route}) => ({title: route.params.personName})}
      />
    </Stack.Navigator>
  );
}
