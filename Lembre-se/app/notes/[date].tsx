// notes/[date].tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function NoteScreen() {
  const { date } = useLocalSearchParams();
  const [note, setNote] = useState('');
  const router = useRouter();

  const handleSaveNote = () => {

    console.log(`Nota para ${date}: ${note}`);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nota para {date}</Text>
      <TextInput
        style={styles.noteInput}
        value={note}
        onChangeText={setNote}
        placeholder="Digite sua nota aqui"
        multiline={true}
        textAlignVertical="top"
      />
      <Button title="Salvar Nota" onPress={handleSaveNote} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  noteInput: {
    height: 200,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
});
