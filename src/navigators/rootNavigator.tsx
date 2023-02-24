import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { RootStackParamList } from "../types";
import ProfileScreen, { profileScreenName } from "../screens/Profile";
import HomeScreen, { homeScreenName } from "../screens/home";
import SettingsScreen from "../screens/Settings";

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function RootStack() {
  return (
    <Stack.Navigator initialRouteName={homeScreenName}>
      <Stack.Screen
        name={homeScreenName}
        component={HomeScreen}
        options={{ title: "Velg person" }}
      />
      <Stack.Screen
        name={profileScreenName}
        component={ProfileScreen}
        options={() => ({ title: "Legg til gullkorn" })}
      />
    </Stack.Navigator>
  );
}
