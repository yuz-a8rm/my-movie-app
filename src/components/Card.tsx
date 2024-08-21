import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const App: React.FC = () => {
  const [titleText, setTitleText] = useState<string>('');
  const [contentText, setContentText] = useState<string>('');

  return (
    <View style={styles.container}>
      <Card
        title={titleText}
        content={contentText}
        onTitleChange={setTitleText}
        onContentChange={setContentText}
      />
    </View>
  );
};


interface CardProps {
  title: string;
  content: string;
  onTitleChange: (text: string) => void;
  onContentChange: (text: string) => void;
}

const Card: React.FC<CardProps> = ({ title, content, onTitleChange, onContentChange }) => {
  return (
    <View style={styles.card}>

      <TextInput
        style={styles.inputTitle}
        placeholder="タイトルを入力"
        value={title}
        onChangeText={onTitleChange}
      />

      <TextInput
        style={styles.textArea}
        placeholder="内容を入力"
        value={content}
        onChangeText={onContentChange}
        multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: 350,
    height: 250
  },
  inputTitle: {
    borderBottomColor: '#C5B1AD', 
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default Card;
