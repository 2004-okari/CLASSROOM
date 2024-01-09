import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.config';

const Notes = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState([]);

  const addNote = () => {
    const newNoteRef = notesRef.push();
    newNoteRef.set({
      title: title,
      description: description,
    }, (error) => {
      if (error) {
        alert('Failed to add note!');
      } else {
        setTitle('');
        setDescription('');
        fetchNotes();
      }
    });
  };

  const fetchNotes = () => {
    notesRef.on('value', (snapshot) => {
      const fetchedNotes = [];
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        const data = childSnapshot.val();
        fetchedNotes.push({ id: key, ...data });
      });
      setNotes(fetchedNotes);
    });
  };

  const deleteNote = (id) => {
    notesRef.child(id).remove(error => {
      if (error) {
        alert('Failed to delete note!');
      } else {
        fetchNotes();
      }
    });
  };

  const editNote = (id, newTitle, newDescription) => {
    notesRef.child(id).update({
      title: newTitle,
      description: newDescription,
    }, (error) => {
      if (error) {
        alert('Failed to edit note!');
      } else {
        fetchNotes();
      }
    });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Notes"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Add Note" onPress={addNote} />

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteItem}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteDescription}>{item.description}</Text>
            <TouchableOpacity onPress={() => deleteNote(item.id)}>
              <Text>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => editNote(item.id, item.title, item.description)}>
              <Text>Edit</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
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
