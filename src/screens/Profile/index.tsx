import React, { useContext, useEffect, useState } from "react";

import DatePicker from "react-native-date-picker";
import {
  dateToNorwegianString,
  dateToNorwgianStringTodayIfNow,
} from "../../helpers";
import { ProfileScreenProps, Gullkorn } from "../../types";
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
} from "native-base";
import { Keyboard } from "react-native";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
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
import {
  deleteGullkorn,
  fetchGullkorn,
  storeGullkorn,
} from "../../data/storage";

export const profileScreenName = "Profile";

const removeGullkorn = (id: string) => {
  // const newLocal = gullkorn.filter((g) => g.id !== id);
  // setGullkorn(newLocal);
  deleteGullkorn(id);
};

// Define a custom converter
const gullkornConverter = {
  toFirestore(gullkorn: Gullkorn): DocumentData {
    return {
      content: gullkorn,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Gullkorn {
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
  const [gullkornDate, setGullkornDate] = useState(new Date().toISOString());
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [gullkorn, setGullkorn] = useState<Gullkorn[]>([]);

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
    setGullkornDate(new Date().toISOString());
  };

  const { colors } = useTheme();

  const createGullkorn = () => {
    const newGullkorn: Gullkorn = {
      author: route.params.personName,
      gullkorn: gullkornText,
      date: gullkornDate,
      id: "will be replaced by firestore id",
    };
    storeGullkorn(newGullkorn);
    resetGullkornForm();
    Keyboard.dismiss();
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
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
        <HStack mb="5">
          <Button onPress={() => setDatePickerOpen(true)}>
            {dateToNorwgianStringTodayIfNow(gullkornDate)}
          </Button>
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
      <DatePicker
        modal
        open={datePickerOpen}
        date={new Date(gullkornDate)}
        onConfirm={(date) => {
          setDatePickerOpen(false);
          setGullkornDate(date.toISOString());
        }}
        onCancel={() => {
          setDatePickerOpen(false);
        }}
        mode="date"
        locale="nb-NO"
        confirmText="Bekreft"
        cancelText="Avbryt"
        title="Velg dato"
      />
    </Box>
  );
};

export default ProfileScreen;
