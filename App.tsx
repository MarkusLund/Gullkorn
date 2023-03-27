import "expo-dev-client";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { NativeBaseProvider } from "native-base";
import RootStack from "./src/navigators/rootNavigator";

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
