import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions, Modal, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, startOfMonth, eachDayOfInterval, endOfMonth, addMonths, subMonths } from 'date-fns';

const CalendarScreen: React.FC = () => {
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
      return <View style={styles.dayBox} />;
    }

    const formattedDate = format(date, 'dd-MM-yyyy');
    const day = format(date, 'd');
    const isNoteDay = notes[formattedDate] !== undefined;

    return (
      <TouchableOpacity
        style={[styles.dayBox, isNoteDay && styles.noteDay]}
        onPress={() => handleDayPress(date)}
      >
        <Text style={styles.dayText}>{day}</Text>
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
        <Text style={styles.title}>{format(currentMonth, 'MMMM yyyy')}</Text>
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
            <Text style={styles.modalTitle}>não se esqueça!</Text>
            <TextInput
              style={styles.input}
              multiline
              placeholder="deixe suas notas aqui!"
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

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingTop: 20,

  },
  appNameContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    fontWeight:'bold',
    backgroundColor:'#87cefa'
  },
  appName: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#FFF',
  },
  header: {
    height: '8%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    marginBottom: 10,
    
  },
  title: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 5,
  },
  navButtonContainer: {
    padding: 10,
  },
  navButton: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#DDD',
    paddingVertical: 10,
  },
  weekDayText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    width: Dimensions.get('window').width / 7,
  },
  calendarContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  dayBox: {
    width: Dimensions.get('window').width / 6,
    height: (Dimensions.get('window').height - 350) / 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dayText: {
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
  },
  noteDay: {
    backgroundColor: '#F4988d'
  },
  noteIndicator: {
    fontSize: 32,
    color: '#000',
    position: 'absolute',
    bottom: 1,  
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    
  },
  input: {
    width: '100%',
    height: 150,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
});
