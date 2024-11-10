
declare module 'react-native-calendar-picker' {
    import { Component } from 'react';
    import { StyleProp, ViewStyle, TextStyle } from 'react-native';
  
    interface CalendarPickerProps {
      startFromMonday?: boolean;
      allowRangeSelection?: boolean;
      minDate?: Date;
      maxDate?: Date;
      weekdays?: string[];
      months?: string[];
      previousTitle?: string;
      nextTitle?: string;
      todayBackgroundColor?: string;
      selectedDayColor?: string;
      selectedDayTextColor?: string;
      scaleFactor?: number;
      textStyle?: StyleProp<TextStyle>;
      onDateChange?: (date: Date, type?: 'START_DATE' | 'END_DATE') => void;
      width?: number;
      height?: number;
      customDatesStyles?: (date: Date) => { containerStyle?: StyleProp<ViewStyle>; textStyle?: StyleProp<TextStyle> };
    }
    export default class CalendarPicker extends Component<CalendarPickerProps> {}
  }
  