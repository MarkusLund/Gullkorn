import React, {useEffect, useState} from 'react';

import DatePicker from 'react-native-date-picker';
import {
  dateToNorwegianString,
  dateToNorwgianStringTodayIfNow,
} from '../../../helpers';
import {ProfileScreenProps, Gullkorn} from '../../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Avatar,
  Box,
  Text,
  Input,
  VStack,
  HStack,
  Button,
  ScrollView,
} from 'native-base';
import {Keyboard} from 'react-native';
import {people} from '../home';
import GullkornCard from '../../components/Card';

export const profileScreenName = 'Profile';

const storeGullkorn = async (author: string, gullkorn: Gullkorn[]) => {
  try {
    const jsonValue = JSON.stringify(gullkorn);
    await AsyncStorage.setItem(author, jsonValue);
  } catch (e) {
    console.error(e);
  }
};

const fetchGullkorn = async (author: string): Promise<Gullkorn[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(author);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e);
    return [];
  }
};

const ProfileScreen = ({route}: ProfileScreenProps) => {
  const [gullkornText, setGullkornText] = useState('');
  const [gullkornDate, setGullkornDate] = useState(new Date().toISOString());
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [gullkorn, setGullkorn] = useState<Gullkorn[]>([]);

  useEffect(() => {
    fetchGullkorn(route.params.personName).then(setGullkorn);
  }, [route.params.personName]);

  const saveGullkorn = () => {
    const newGullkorn: Gullkorn = {
      author: route.params.personName,
      gullkorn: gullkornText,
      date: gullkornDate,
      id: Date.now(),
    };
    const updatedGullkorns = gullkorn
      ? [...gullkorn, newGullkorn]
      : [newGullkorn];
    storeGullkorn(route.params.personName, updatedGullkorns);
    setGullkorn(updatedGullkorns);
    setGullkornText('');
    setGullkornDate(new Date().toISOString());
    Keyboard.dismiss();
  };

  return (
    <Box safeArea h="100%">
      <VStack alignItems="center">
        <Avatar
          size="2xl"
          source={
            people.find(a => a.name === route.params.personName)?.img ?? ''
          }
          shadow="5"
        />
        <Text shadow="5" fontSize="2xl" mb="5">
          {route.params.personName}
        </Text>
        <Input
          w="80%"
          size="xl"
          backgroundColor="white"
          placeholder="Gullkorn"
          mb="5"
          onChangeText={text => {
            setGullkornText(text);
          }}
          value={gullkornText}
          onSubmitEditing={() => {
            saveGullkorn();
          }}
        />
        <HStack mb="5">
          <Button onPress={() => setDatePickerOpen(true)}>
            {dateToNorwgianStringTodayIfNow(gullkornDate)}
          </Button>
          <Button
            disabled={!gullkornText}
            ml="10"
            onPress={() => {
              saveGullkorn();
            }}>
            Lagre gullkorn 🌽
          </Button>
        </HStack>
      </VStack>
      <ScrollView>
        <VStack>
          {gullkorn &&
            gullkorn
              ?.sort(
                (g1, g2) =>
                  new Date(g2.date).getTime() - new Date(g1.date).getTime(),
              )
              .map(g => (
                <GullkornCard
                  key={g.id}
                  gullKornDate={dateToNorwegianString(g.date)}
                  gullkornText={g.gullkorn}
                />
              ))}
        </VStack>
      </ScrollView>
      <DatePicker
        modal
        open={datePickerOpen}
        date={new Date(gullkornDate)}
        onConfirm={date => {
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
