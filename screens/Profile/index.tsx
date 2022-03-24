import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {dateToNorwegianString} from '../../helpers';
import {ProfileScreenProps, Gullkorn} from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  console.log('gullkorn', gullkorn);

  return (
    <SafeAreaView style={styles.profileScreen}>
      <Text style={styles.gullkornText}>{gullkornText}</Text>
      <Text style={styles.gullkornDate}>
        {dateToNorwegianString(gullkornDate)}
      </Text>
      <Text style={styles.gullkornAuthor}>- {route.params.personName}</Text>
      <TextInput
        style={styles.inputText}
        onChangeText={text => setGullkornText(text)}
        value={gullkornText}
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setDatePickerOpen(true)}>
          <Text>Velg dato</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
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
          }}>
          <Text>Lagre gullkorn</Text>
        </TouchableOpacity>
      </View>
      <View>
        {gullkorn &&
          gullkorn?.map(g => (
            <Text key={g.gullkorn}>
              {g.gullkorn} - {dateToNorwegianString(g.date)}
            </Text>
          ))}
      </View>
      <DatePicker
        modal
        open={datePickerOpen}
        date={new Date(gullkornDate)}
        onConfirm={date => {
          console.log('date', date);

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  profileScreen: {
    flex: 1,
    alignItems: 'center',
  },
  gullkornText: {
    fontSize: 20,
    fontStyle: 'italic',
    height: 40,
    borderBottomWidth: 1,
    padding: 10,
    color: '#333',
  },
  gullkornDate: {
    fontSize: 20,
    height: 40,
    borderBottomWidth: 1,
    padding: 10,
  },
  gullkornAuthor: {
    fontSize: 20,
    fontStyle: 'italic',
    height: 40,
    borderBottomWidth: 1,
  },
  inputText: {
    width: '90%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default ProfileScreen;
