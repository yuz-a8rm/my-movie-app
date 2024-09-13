import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Category from '../components/Category';
import Point from '../components/Point';
import CircleButton from '../components/CircleButton';
import Icon from '../components/icon';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '../config';
import { useState } from 'react';
import { router } from 'expo-router';

interface CardProps {
  title: string;
  content: string;
  point: string | null;
  onTitleChange: (text: string) => void;
  onContentChange: (text: string) => void;
  onPointChange: (value: string | null) => void;
}


const Profile: React.FC<CardProps> = ({
  title,
  content,
  point,
  onTitleChange,
  onContentChange,
  onPointChange,
}) => {
  
  const [titleText, setTitleText] = useState('');
  const [contentText, setContentText] = useState('');
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);

  const handlePress = (): void => {
    if (auth.currentUser === null) { return }
    const ref = collection(db, `users/${auth.currentUser.uid}/memos`);
    addDoc(ref, {
      titleText,
      contentText,
      updatedAt: Timestamp.fromDate(new Date()),
      point: selectedPoint,  // Pointの値を保存
    })
    .then((docRef) => {
      console.log('success', docRef.id);
      router.back();
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <View style={styles.card}>
      <TextInput
        style={styles.titleInput}
        placeholder="タイトルを入力"
        value={title}
        onChangeText={onTitleChange}
      />
      <Category />
      <Point selectedValue={point} onValueChange={onPointChange} />
      <TextInput
        style={styles.contentInput}
        placeholder="内容を入力"
        value={content}
        onChangeText={onContentChange}
        multiline
      />
      
      <CircleButton onPress={handlePress}>
        <Icon name='check' size={40} color='#ffffff'/>
      </CircleButton>
    </View>


  );
};

const styles = StyleSheet.create({
  card: {
    width: 350,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    height: 380
  },
  titleInput: {
    fontSize: 18,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#C5B1AD',
    padding: 10
  },
  contentInput: {
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    height: 200,
    textAlignVertical: 'top',
    borderBottomWidth: 1,
    borderColor: '#C5B1AD',
    borderRadius: 3
  },
});

export default Profile;
