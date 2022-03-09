import React from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput} from 'react-native';
import {dateToNorwegianString} from '../../helpers';
import {ProfileScreenProps} from '../../types';

const ProfileScreen = ({route}: ProfileScreenProps) => {
  const [newGullkorn, setNewGullkorn] = React.useState('');
  const [gullkornDate, setGullkornDate] = React.useState(new Date());

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileScreen: {
    flex: 1,
    alignItems: 'center',
  },
  gullkornText: {
    // width: '90%',
    fontSize: 20,
    fontStyle: 'italic',
    height: 40,
    borderBottomWidth: 1,
    padding: 10,
  },
  gullkornDate: {
    // width: '90%',
    fontSize: 20,
    height: 40,
    borderBottomWidth: 1,
    padding: 10,
  },
  gullkornAuthor: {
    // width: '90%',
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
