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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import { RFPercentage as rp } from 'react-native-responsive-fontsize';
import COLORS from '../Constants/colors';
import Ionicons from '@expo/vector-icons/Ionicons';

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
      <View style={styles.header}>
        <Text style={styles.text}>Notes</Text>
        <Text onPress={() => setIsNoteModalOpen(true)} style={styles.addText}>
          Add Note
        </Text>
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
                <Ionicons name="create-outline" size={20} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteNote(index)}>
                <Ionicons name="trash-outline" size={20} />
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
    marginTop: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  text: {
    fontSize: rp(2.5),
    fontWeight: 'bold',
  },
  addText: {
    fontSize: rp(2),
    color: COLORS.COLOR_11,
    fontWeight: '500',
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
    backgroundColor: 'red',
    padding: 16,
    width: wp('90%'),
    marginBottom: 8,
    borderRadius: 8,
    marginRight: wp('2%'),
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
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
});

export default Notes;
