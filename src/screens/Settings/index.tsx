import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { Button, Center, Input, Text, VStack } from "native-base";
import { SettingsScreenProps } from "../../types";
import { fetchUserID, UserContext } from "../../data/storage";
import { useContext } from "react";

export const settingsScreenName = "Settings";

const SettingsScreen = ({}: SettingsScreenProps) => {
  const [user, setUser] = useContext(UserContext);

  const [userInput, setUserInput] = useState("");

  const userId = fetchUserID();
  console.log(userId);

  console.log("userInput", userInput);

  return (
    <SafeAreaView>
      <Center>
        <VStack h="100%" justifyContent="center" space="10">
          <Text fontSize="xl" mb="5">
            {"Bruker ID: " + user}
          </Text>
          <Text fontSize="xl" mb="5">
            {"userId: " + userId}
          </Text>
          <Input onChange={(e) => setUserInput(e.nativeEvent.text)}></Input>
          <Button onPress={() => setUser(new Date())}>Set user</Button>
        </VStack>
      </Center>
    </SafeAreaView>
  );
};

export default SettingsScreen;
