import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';



interface CardProps {
  userId: string
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
  userId,
  name,
  comment,
  actor,
  movie,
  onNameChange,
  onCommentChange,
  onActorChange,
  onMovieChange
}) => {

  console.log('Profile Props:', { name, comment, actor, movie })
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TextInput
          style={styles.titleInput}
          placeholder="ユーザー名を入力"
          value={name}
          onChangeText={onNameChange}
        />

        <Text style={styles.id}>@{userId}</Text>

        <Text style={styles.comment}>ACTOR</Text>
        <TextInput
          style={styles.favoriteInput}
          placeholder="好きな俳優を入力"
          value={actor}
          onChangeText={onActorChange}
        />

        <Text style={styles.comment}>MOVIE</Text>
        <TextInput
          style={styles.favoriteInput}
          placeholder="好きな映画を入力"
          value={movie}
          onChangeText={onMovieChange}
        />
      </View>


      <View style={styles.card}>
<Text style={styles.comment}>COMMENT</Text>
        <TextInput
          style={styles.contentInput}
          placeholder="コメントを入力"
          value={comment}
          onChangeText={onCommentChange}
          multiline
        />
      </View>
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    flexDirection: 'column', 
  },
  card: {
    borderRadius: 8,
    width: 350,
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  titleInput: {
    fontSize: 18,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#C5B1AD',
    padding: 5,
  },
  favoriteInput: {
    fontSize: 18,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#C5B1AD',
    padding: 10,
  },
  id: {
    fontSize: 10,
    color: '#C5B1AD',
    textAlign: 'right',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#C5B1AD',
    padding: 5,
  },
  comment: {
    color: '#C5B1AD'
  },
  contentInput: {
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    height: 200,
    textAlignVertical: 'top',
    borderBottomWidth: 1,
    borderColor: '#C5B1AD',
    borderRadius: 3,
  },
});



export default Profile
