import React, { useContext, useEffect, useState } from "react";

import DateTimePicker from "@react-native-community/datetimepicker";
import { dateToNorwegianString } from "../../helpers";
import { ProfileScreenProps, Gullkorn, GullkornWithId } from "../../types";
import {
  Avatar,
  Box,
  Text,
  Input,
  VStack,
  HStack,
  Button,
  ScrollView,
  useTheme,
  Spinner,
} from "native-base";
import { Keyboard } from "react-native";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../services/firestore";
import {
  collection,
  DocumentData,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import GullkornCard from "../../components/Card";
import { people } from "../../data/consts";
import { deleteGullkorn, storeGullkorn } from "../../data/storage";

export const profileScreenName = "Profile";

const removeGullkorn = (id: string) => {
  // const newLocal = gullkorn.filter((g) => g.id !== id);
  // setGullkorn(newLocal);
  deleteGullkorn(id);
};

// Define a custom converter
const gullkornConverter = {
  toFirestore(gullkorn: GullkornWithId): DocumentData {
    return {
      content: gullkorn,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): GullkornWithId {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      author: data.author,
      gullkorn: data.gullkorn,
      date: data.date,
    };
  },
};

const ProfileScreen = ({ route }: ProfileScreenProps) => {
  const [gullkornText, setGullkornText] = useState("");
  const [gullkornDate, setGullkornDate] = useState(new Date());

  const gullkornCollectionRef = collection(firestore, "gullkorn").withConverter(
    gullkornConverter
  );
  const authorQuery = query(
    gullkornCollectionRef,
    where("author", "==", route.params.personName)
  );

  const [gullkornDocs, loading, error] = useCollectionData(authorQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const resetGullkornForm = () => {
    setGullkornText("");
    setGullkornDate(new Date());
  };

  const { colors } = useTheme();

  const createGullkorn = () => {
    const newGullkorn: Gullkorn = {
      author: route.params.personName,
      gullkorn: gullkornText,
      date: gullkornDate.toISOString(),
    };
    storeGullkorn(newGullkorn);
    resetGullkornForm();
    Keyboard.dismiss();
  };

  if (loading) {
    <Box safeArea h="100%">
      <VStack alignItems="center">
        <Text>Loading...</Text>
        <Spinner />
      </VStack>
    </Box>;
  }
  if (error) {
    <Box safeArea h="100%">
      <VStack alignItems="center">
        <Text>Error: {error.message}</Text>
      </VStack>
    </Box>;
  }

  return (
    <Box safeArea h="100%">
      <VStack alignItems="center">
        <Avatar
          size="2xl"
          source={
            people.find((a) => a.name === route.params.personName)?.img ?? ""
          }
          shadow="5"
        />
        <Text fontSize="2xl" mb="5">
          {route.params.personName}
        </Text>
        <Input
          w="80%"
          size="xl"
          backgroundColor="white"
          placeholder="..."
          mb="5"
          onChangeText={(text) => {
            setGullkornText(text);
          }}
          value={gullkornText}
          onSubmitEditing={() => {
            createGullkorn();
          }}
          returnKeyType="send"
        />
        <HStack mb="5" mr="5">
          <DateTimePicker
            style={{ width: 150 }}
            locale="nb"
            value={new Date(gullkornDate)}
            mode={"date"}
            is24Hour={true}
            onChange={(_, selectedDate) => {
              const currentDate = selectedDate;
              setGullkornDate(currentDate);
            }}
          />
          <Button
            disabled={!gullkornText}
            backgroundColor={gullkornText ? colors.primary[500] : "gray.300"}
            ml="10"
            onPress={() => {
              createGullkorn();
            }}
          >
            Lagre gullkorn 🌽
          </Button>
        </HStack>
      </VStack>
      <ScrollView>
        <VStack>
          {gullkornDocs &&
            gullkornDocs
              ?.sort(
                (g1, g2) =>
                  new Date(g2.date).getTime() - new Date(g1.date).getTime()
              )
              .map((g) => (
                <GullkornCard
                  key={g.id}
                  gullkornDate={dateToNorwegianString(g.date)}
                  gullkornText={g.gullkorn}
                  deleteGullkorn={() => {
                    removeGullkorn(g.id);
                  }}
                />
              ))}
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default ProfileScreen;
