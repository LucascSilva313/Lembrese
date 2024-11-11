import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, startOfMonth, eachDayOfInterval, endOfMonth, addMonths, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import styles from './styles';
import { holidays } from './holidays';

const Index: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const savedNotes = await AsyncStorage.getItem('@notes');
        if (savedNotes) {
          setNotes(JSON.parse(savedNotes));
        }
      } catch (error) {
        console.error("Erro ao carregar notas:", error);
      }
    };
    loadNotes();
  }, []);

  const saveNotesToStorage = async (updatedNotes: { [key: string]: string }) => {
    try {
      await AsyncStorage.setItem('@notes', JSON.stringify(updatedNotes));
    } catch (error) {
      console.error("Erro ao salvar notas:", error);
    }
  };

  const generateCalendarDays = () => {
    const startDate = startOfMonth(currentMonth);
    const endDate = endOfMonth(currentMonth);

    const emptyDays = Array.from({ length: startDate.getDay() }, () => null);
    const monthDays = eachDayOfInterval({ start: startDate, end: endDate });

    return [...emptyDays, ...monthDays];
  };

  const days = generateCalendarDays();

  const handleDayPress = (date: Date) => {
    const formattedDate = format(date, 'dd-MM-yyyy');
    setSelectedDate(formattedDate);
    setNoteText(notes[formattedDate] || '');
    setModalVisible(true);
  };

  const handleSaveNote = () => {
    if (selectedDate) {
      const updatedNotes = {
        ...notes,
        [selectedDate]: noteText,
      };
      setNotes(updatedNotes);
      saveNotesToStorage(updatedNotes);
    }
    setModalVisible(false);
  };

  const handleDeleteNote = () => {
    if (selectedDate) {
      const updatedNotes = { ...notes };
      delete updatedNotes[selectedDate];
      setNotes(updatedNotes);
      saveNotesToStorage(updatedNotes);
    }
    setModalVisible(false);
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const renderItem = ({ item: date }: { item: Date | null }) => {
    if (!date) {
      return <View style={styles.emptyDayBox} />;
    }

    const formattedDate = format(date, 'dd-MM-yyyy');
    const day = format(date, 'd');
    const isNoteDay = notes[formattedDate] !== undefined;

    const holiday = holidays.find((holiday) => holiday.date === formattedDate);
    const isHoliday = !!holiday;

    return (
      <TouchableOpacity
        style={[styles.dayBox, isNoteDay && styles.noteDay]}
        onPress={() => handleDayPress(date)}
      >
        <View style={[styles.dayCircle, isHoliday && styles.holidayCircle]}>
          <Text style={styles.dayText}>{day}</Text>
        </View>
        
        {isHoliday && <Text style={styles.holidayText}>{holiday.name}</Text>}
        {isNoteDay && <Text style={styles.noteIndicator}>*</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.appNameContainer}>
        <Text style={styles.appName}>Lembre-se!</Text>
      </View>

      <View style={styles.header}>
        <TouchableOpacity style={styles.navButtonContainer} onPress={handlePreviousMonth}>
          <Text style={styles.navButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{format(currentMonth, 'MMMM yyyy', { locale: ptBR })}</Text>
        <TouchableOpacity style={styles.navButtonContainer} onPress={handleNextMonth}>
          <Text style={styles.navButton}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.weekDaysRow}>
        {daysOfWeek.map((day) => (
          <Text key={day} style={styles.weekDayText}>{day}</Text>
        ))}
      </View>

      <FlatList
        data={days}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={7}
        contentContainerStyle={styles.calendarContainer}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Não se esqueça!</Text>
            <TextInput
              style={styles.input}
              multiline
              placeholder="Deixe suas notas aqui!"
              value={noteText}
              onChangeText={setNoteText}
            />
            <View style={styles.buttonRow}>
              <Button title="Salvar Nota" onPress={handleSaveNote} />
              <Button title="Cancelar" onPress={() => setModalVisible(false)} color="green" />
              <Button title="Apagar Nota" onPress={handleDeleteNote} color="red" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Index;
