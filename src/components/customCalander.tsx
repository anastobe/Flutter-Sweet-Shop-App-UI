// src/components/CustomCalendar.tsx
import React, { useState } from 'react';
import { View, Modal, Pressable, StyleSheet, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import InputField from '../components/textInput';
import { THEME, FONTFAMILY, FONT_SIZES, METRICS } from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { scale } from 'react-native-size-matters';
import { TouchableOpacity } from 'react-native';

type CustomCalendarProps = {
  placeholder?: string;
  value?: string;
  margTp?: number;
  onDateChange?: (date: string) => void;
};

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  placeholder = 'Select Date',
  value,
  onDateChange,
  margTp,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(value || '');

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    onDateChange?.(day.dateString);
    setShowCalendar(false);
  };

  return (
    <View>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setShowCalendar(true)}  >
      <InputField
        placeholder={placeholder}
        value={selectedDate}
        onPress={() => setShowCalendar(true)} // open calendar on press
        image="calendar-outline"
        margTp={margTp}
        imagetintColor={THEME.white}
        disabled={false}
        customInpStyle={{ width: METRICS.width - 40 }}
      />
      </TouchableOpacity>

      {/* 🔹 Calendar Modal */} 
      <Modal
        visible={showCalendar}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCalendar(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Select Date</Text>
              <Pressable onPress={() => setShowCalendar(false)}>
                <Icon name="close" size={22} color={THEME.darkSecondary} />
              </Pressable>
            </View>

            <Calendar
              onDayPress={handleDayPress}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  selectedColor: THEME.darkSecondary,
                },
              }}
              theme={{
                todayTextColor: THEME.darkSecondary,
                arrowColor: THEME.darkSecondary,
                textDayFontFamily: FONTFAMILY.Medium,
                textDayFontSize: FONT_SIZES.oneone,
                textMonthFontFamily: FONTFAMILY.Bold,
                textMonthFontSize: FONT_SIZES.oneone,
                textDayHeaderFontFamily: FONTFAMILY.Medium,
                textDayHeaderFontSize: FONT_SIZES.oneone,
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: THEME.white,
    borderRadius: 12,
    width: METRICS.width - 30,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  headerText: {
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.darkSecondary,
    fontSize: FONT_SIZES.onefive,
  },
});

export default CustomCalendar;