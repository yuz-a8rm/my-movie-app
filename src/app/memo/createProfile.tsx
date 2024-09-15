import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { auth, db } from '../../config';
import { addDoc, collection, doc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore';
import { router, useNavigation } from 'expo-router';
import CircleButton from '../../components/CircleButton';
import Icon from '../../components/icon';
import Profile from '../Profile';
import { Profiletype } from '../../../types/profileType';
import HomeButton from '../../components/HomeButton';


const CreateProfile: React.FC = () => {
  const [profile, setProfile] = useState<Profiletype | null>(null);
  const [nameText, setNameText] = useState<string>('');
  const [commentText, setCommentText] = useState<string>('');
  const [actorText, setActorText] = useState<string>('');
  const [movieText, setMovieText] = useState<string>('');
  const [userId, setUserId] = useState<string>('')

  const navigation = useNavigation();

  useEffect(() => {
    if (auth.currentUser === null) { return; }

   setUserId(auth.currentUser.uid)

    const ref = collection(db, `users/${auth.currentUser.uid}/profiles`);

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const profilesData = snapshot.docs.map((doc) => doc.data() as Profiletype);

      if (profilesData.length > 0) {
        const profile = profilesData[0];
        setProfile(profile);
        setNameText(profile.name);
        setCommentText(profile.comment);
        setActorText(profile.actor);
        setMovieText(profile.movie);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HomeButton />
    });
  }, []);

  const handlePress = async (): Promise<void> => {
    if (auth.currentUser === null) { return; }

    const ref = collection(db, `users/${auth.currentUser.uid}/profiles`);

    try {
      const profilesQuery = await getDocs(ref);
      if (profilesQuery.empty) {
        await addDoc(ref, {
          name: nameText,
          comment: commentText,
          actor: actorText,
          movie: movieText
        });
      } else {
        const docRef = profilesQuery.docs[0].ref;
        await updateDoc(docRef, {
          name: nameText,
          comment: commentText,
          actor: actorText,
          movie: movieText
        });
      }
      console.log('success');
      router.push('/memo/list');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Profile
        name={nameText}
        userId={userId}
        comment={commentText}
        actor={actorText}
        movie={movieText}
        onNameChange={setNameText}
        onCommentChange={setCommentText}
        onActorChange={setActorText}
        onMovieChange={setMovieText}
      />
      <CircleButton onPress={handlePress}>
        <Icon name="check" size={40} color="#ffffff" />
      </CircleButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0EEEB',
  },
});

export default CreateProfile;
