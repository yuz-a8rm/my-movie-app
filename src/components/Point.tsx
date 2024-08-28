import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

interface PointProps {
  selectedValue: string | null;
  onValueChange: (value: string | null) => void;
}

const Point: React.FC<PointProps> = ({ selectedValue, onValueChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>評価:</Text>
      <RNPickerSelect
        onValueChange={onValueChange}
        items={[
          { label: '★', value: '★' },
          { label: '★★', value: '★★' },
          { label: '★★★', value: '★★★' },
          { label: '★★★★', value: '★★★★' },
          { label: '★★★★★', value: '★★★★★' },
        ]}
        placeholder={{ label: '選択してください', value: null }}
        style={pickerSelectStyles}
        value={selectedValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  label: {
    marginBottom: 10,
    fontSize: 10,
    color: '#C5B1AD'
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#C5B1AD',
    borderRadius: 3,
    color: '#C5B1AD',
    alignItems: 'flex-end',
    width: 90,
    marginLeft: 10
  }
});

export default Point;
