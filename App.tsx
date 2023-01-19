import "expo-dev-client";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { NativeBaseProvider } from "native-base";
import RootStack from "./src/navigators/rootNavigator";
import { UserContext } from "./src/data/storage";

const App = () => {
  console.log("App starting");

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
