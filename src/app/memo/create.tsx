import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Card from '../../components/Card';
import { auth, db } from '../../config';
import { addDoc, Timestamp, collection } from 'firebase/firestore';
import { router } from 'expo-router';
import CircleButton from '../../components/CircleButton';
import Icon from '../../components/icon';

const Create: React.FC = () => {
  const [titleText, setTitleText] = useState('');
  const [contentText, setContentText] = useState('');
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);

  const handlePress = (): void => {
    if (auth.currentUser === null) { return }
    const ref = collection(db, `users/${auth.currentUser.uid}/memos`);
    addDoc(ref, {
      title: titleText,
      content: contentText,
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
    <View style={styles.container}>
      <Card 
        title={titleText}
        content={contentText}
        point={selectedPoint}  // Pointの値を渡す
        onTitleChange={setTitleText}
        onContentChange={setContentText}
        onPointChange={setSelectedPoint}  // Pointの変更を管理
      />
      <CircleButton onPress={handlePress}>
        <Icon name='check' size={40} color='#ffffff'/>
      </CircleButton>
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
});

export default Create;
