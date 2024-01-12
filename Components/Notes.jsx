import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const Notes = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState([]);

<<<<<<<<<<<<<<  ✨ Codeium Command ⭐ >>>>>>>>>>>>>>>>
  import AsyncStorage from '@react-native-async-storage/async-storage';

  const storeNote = async () => {
    try {
      const note = { title, description };
      const updatedNotes = [...notes, note];
      setNotes(updatedNotes);
      const jsonValue = JSON.stringify(updatedNotes);
      await AsyncStorage.setItem('@notes', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const loadNotes = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@notes');
      return jsonValue != null ? setNotes(JSON.parse(jsonValue)) : null;
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);
<<<<<<<  d65edaf7-29ef-47e1-9786-6d130f21690e  >>>>>>>

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input2}
        placeholder="Notes"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Add Note" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  input2: {
    height: 120,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  noteItem: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  noteDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default Notes;
