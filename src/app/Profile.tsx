import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface CardProps {
  name: string;
  comment: string;
  actor: string;
  movie: string;
  onNameChange: (name: string) => void;
  onCommentChange: (text: string) => void;
  onActorChange: (actor: string) => void;
  onMovieChange: (movie: string) => void
}

const Profile: React.FC<CardProps> = ({
  name,
  comment,
  actor,
  movie,
  onNameChange,
  onCommentChange,
  onActorChange,
  onMovieChange
}) => {
  return (
    <View style={styles.card}>
      <TextInput
        style={styles.titleInput}
        placeholder="ユーザー名を入力"
        value={name}
        onChangeText={onNameChange}
      />

    <TextInput
      style={styles.titleInput}
      placeholder="好きな俳優を入力"
      value={actor}
      onChangeText={onActorChange}
    />

    <TextInput
      style={styles.titleInput}
      placeholder="好きな映画を入力"
      value={movie}
      onChangeText={onMovieChange}
    />
  
    <TextInput
        style={styles.contentInput}
        placeholder="コメントを入力"
        value={comment}
        onChangeText={onCommentChange}
        multiline
    />
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
    height: 100,
    textAlignVertical: 'top',
    borderBottomWidth: 1,
    borderColor: '#C5B1AD',
    borderRadius: 3
  },
});



export default Profile
