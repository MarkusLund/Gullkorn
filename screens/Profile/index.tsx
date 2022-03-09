import React, {useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {dateToNorwegianString} from '../../helpers';
import {ProfileScreenProps} from '../../types';

const ProfileScreen = ({route}: ProfileScreenProps) => {
  const [newGullkorn, setNewGullkorn] = useState('');
  const [gullkornDate, setGullkornDate] = useState(new Date());

  const [datePickerOpen, setDatePickerOpen] = useState(false);

  return (
    <SafeAreaView style={styles.profileScreen}>
      <Text style={styles.gullkornText}>{newGullkorn}</Text>
      <Text style={styles.gullkornDate}>
        {dateToNorwegianString(gullkornDate)}
      </Text>
      <Text style={styles.gullkornAuthor}>- {route.params.personName}</Text>
      <TextInput
        style={styles.inputText}
        onChangeText={text => setNewGullkorn(text)}
        value={newGullkorn}
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setDatePickerOpen(true)}>
          <Text>Velg dato</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            Alert.alert('🏆🌽', '', [
              {
                text: '⭐️',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
            ])
          }>
          <Text>Lagre gullkorn</Text>
        </TouchableOpacity>
      </View>
      <DatePicker
        modal
        open={datePickerOpen}
        date={gullkornDate}
        onConfirm={date => {
          setDatePickerOpen(false);
          setGullkornDate(date);
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
    justifyContent: 'center',
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
