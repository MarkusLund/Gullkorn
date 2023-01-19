import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { HomeScreenProps } from "../../types";
import { Avatar, Button, Center, Pressable, VStack, Text } from "native-base";
import { profileScreenName } from "../Profile";
import { settingsScreenName } from "../Settings";
import { people } from "../../data/consts";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../services/firestore";

export const homeScreenName = "Home";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [documents, setDocuments] = useState([]);
  const c = collection(firestore, "test");
  useEffect(() => {
    getDocs(c)
      .then((querySnapshot) => {
        setDocuments(querySnapshot.docs);
      })
      .catch(() => {
        console.log("Could not fetch docs");
      });
  }, []);

  if (!documents) return <div>Loading...</div>;
  const te = documents[0]?.data()?.born || "mangler";

  return (
    <SafeAreaView>
      <Center>
        <VStack h="100%" justifyContent="center" space="10">
          <Text>Hei {te}</Text>
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
          <Button onPress={() => navigation.navigate(settingsScreenName)}>
            Innstillinger
          </Button>
        </VStack>
      </Center>
    </SafeAreaView>
  );
};

export default HomeScreen;
