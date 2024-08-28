import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Category: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ジャンル:</Text>
      <RNPickerSelect
        onValueChange={(value) => setSelectedValue(value)}
        items={[
          { label: 'アクション', value: 'option1' },
          { label: 'ホラー', value: 'option2' },
          { label: 'SF', value: 'option3' },
          { label: 'コメディ', value: 'option4' },
          { label: 'サスペンス', value: 'option5' },
          { label: '恋愛', value: 'option6' },
          { label: 'ファンタジー', value: 'option7' },
          { label: 'クライム', value: 'option8' },
          { label: 'ミュージカル', value: 'option9' },
          { label: 'スポーツ', value: 'option10' },
          { label: 'その他', value: 'option11' },
        ]}
        placeholder={{ label: '選択してください', value: null }}
        style={pickerSelectStyles}
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
    marginLeft: 10,
    marginBottom: 10
  },
});

export default Category;
