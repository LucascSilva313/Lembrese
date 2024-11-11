import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingTop: 20,
  },
  appNameContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    fontWeight: 'bold',
    backgroundColor: '#87cefa'
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
    fontSize: 22,
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
    fontSize: 18,
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
    width: Dimensions.get('window').width / 7,
    minHeight: (Dimensions.get('window').height - 250) / 5, 
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingVertical: 5,
  },
  emptyDayBox: {
    width: Dimensions.get('window').width / 7,
    minHeight: (Dimensions.get('window').height - 250) / 5,
  },
  dayCircle: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17.5,
  },
  holidayCircle: {
    borderWidth: 1,
    borderColor: '#87CEFA',
    backgroundColor: 'rgba(135, 206, 250, 0.3)',
  },
  dayText: {
    fontSize: 16,
    color: '#333',
  },
  noteDay: {
    backgroundColor: '#F4988d',
  },
  noteIndicator: {
    fontSize: 12,
    color: '#333',
    marginTop: 1,
  },
  holidayText: {
    fontSize: 10,
    color: '#333',
    textAlign: 'center',
    marginTop: 5,
    paddingHorizontal: 2,
    flexWrap: 'wrap', 
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

export default styles;
