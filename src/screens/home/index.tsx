import React from "react";
import { SafeAreaView } from "react-native";
import { HomeScreenProps } from "../../types";
import { Avatar, Center, Pressable, VStack, Text } from "native-base";
import { profileScreenName } from "../Profile";
import { people } from "../../data/consts";

export const homeScreenName = "Home";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <SafeAreaView>
      <Center>
        <VStack h="100%" justifyContent="center" space="10">
          {people.map((person) => (
            <Pressable
              key={person.name}
              onPress={() =>
                navigation.navigate(profileScreenName, {
                  personName: person.name,
                })
              }
            >
              {({ isPressed }) => (
                <Avatar
                  size="2xl"
                  source={person.img}
                  style={{
                    transform: [{ scale: isPressed ? 0.96 : 1 }],
                  }}
                />
              )}
            </Pressable>
          ))}
        </VStack>
      </Center>
    </SafeAreaView>
  );
};

export default HomeScreen;
