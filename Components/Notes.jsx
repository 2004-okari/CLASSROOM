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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';

const Notes = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isNotedModalOpen, setIsNoteModalOpen] = useState(false);

  const storeNote = async () => {
    try {
      const note = { title, description };
      const updatedNotes = [...notes];

      if (editIndex !== null) {
        // Editing existing note
        updatedNotes[editIndex] = note;
        setEditIndex(null);
      } else {
        // Adding new note
        updatedNotes.push(note);
      }

      setNotes(updatedNotes);
      const jsonValue = JSON.stringify(updatedNotes);
      await AsyncStorage.setItem('@notes', jsonValue);

      // Clear input fields after adding/editing note
      setTitle('');
      setDescription('');
    } catch (e) {
      // saving error
    }
  };

  const deleteNote = async (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
    const jsonValue = JSON.stringify(updatedNotes);
    await AsyncStorage.setItem('@notes', jsonValue);
  };

  const editNote = (index) => {
    const selectedNote = notes[index];
    setTitle(selectedNote.title);
    setDescription(selectedNote.description);
    setEditIndex(index);
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

  return (
    <View style={styles.container}>
      <View>
        <Text onPress={() => setIsNoteModalOpen(true)}>Add Note</Text>
      </View>
      <Modal isVisible={isNotedModalOpen}>
        <Text onPress={() => setIsNoteModalOpen(false)}>Cancel</Text>
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
        <Button
          title={editIndex !== null ? 'Update Note' : 'Add Note'}
          onPress={() => {
            storeNote();
            setIsNoteModalOpen(false);
          }}
        />
      </Modal>

      <FlatList
        horizontal
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.noteItem}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteDescription}>{item.description}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => editNote(index)}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteNote(index)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
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
