import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Card from '../../components/Card';
import { auth, db } from '../../config';
import { addDoc, Timestamp, collection } from 'firebase/firestore';
import { router } from 'expo-router';
import CircleButton from '../../components/CircleButton';
import Icon from '../../components/icon';
import Profile from '../Profile';

const Create: React.FC = () => {
  const [nameText, setNameText] = useState('');
  const [commentText, setCommentText] = useState('');
  const [actorText, setActorText] = useState('')
  const [movieText, setMovieText] = useState('')

  const handlePress = (): void => {
    if (auth.currentUser === null) { return }
    const ref = collection(db, `users/${auth.currentUser.uid}/profiles`);
    addDoc(ref, {
        name: nameText,
        comment: commentText,
        actor: actorText,
        movie: movieText
    })
    .then((docRef) => {
      console.log('success', docRef.id);
      router.push('/list');
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <View style={styles.container}>
      <Profile
        name={nameText}
        comment={commentText}
        actor={actorText}
        movie={movieText}
        onNameChange={setNameText}
        onCommentChange={setCommentText}
        onActorChange={setActorText}
        onMovieChange={setMovieText}
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

