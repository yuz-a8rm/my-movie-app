import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Card from '../../components/Card';
import { auth, db } from '../../config';
import { addDoc, Timestamp, collection } from 'firebase/firestore';
import { router } from 'expo-router';
import CircleButton from '../../components/CircleButton';
import Icon from '../../components/icon';

const [titleText, setTitleText] = useState('')
const [contentText, setContentText] = useState('')

const handlePress = (): void => {
    if (auth.currentUser === null ) { return }
    const ref = collection(db, `users/${auth.currentUser.uid}/memos`)
    addDoc(ref, {
        title: titleText,
        content: contentText,
        updateAt: Timestamp.fromDate(new Date())
    })
    .then((docRef) => {
        console.log('success', docRef.id)
        router.back()
})
    .catch((error) => {
        console.log(error)
    })
    
} 

const Create: React.FC = () => {
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
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    },
    inputContainer: {
        paddingVertical: 32,
        paddingHorizontal: 27,
        flex: 1
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
      },
  });

            <CircleButton onPress = {handlePress}>
                <Icon name='check' size={40} color='#ffffff'/>
            </CircleButton>
  
  export default Create;
  

// import { 
//     View, StyleSheet, TextInput } from "react-native";
// import CircleButton from "../../components/CircleButton";
// import Icon from "../../components/icon";
// import KeyBoardAvoidingView from '../../components/KeyBoardAvoidingView'

// import { router } from "expo-router";
// import { collection, addDoc, Timestamp } from "firebase/firestore";
// import { db, auth } from "../../config";
// import { useState } from "react";

// const handlePress = (bodyText: string): void => {
//     if (auth.currentUser === null ) { return }
//     const ref = collection(db, `users/${auth.currentUser.uid}/memos`)
//     addDoc(ref, {
//         bodyText,
//         updateAt: Timestamp.fromDate(new Date())
//     })
//     .then((docRef) => {
//         console.log('success', docRef.id)
//         router.back()
// })
//     .catch((error) => {
//         console.log(error)
//     })
    
// } 

// const Create = () => {
//     const [bodyText, setBodyText] = useState('')
//     return (
//         <KeyBoardAvoidingView  style={styles.container}>
//             <View style={styles.inputContainer}>
//                 <TextInput multiline style={styles.input} 
//                 value={bodyText}
//                 onChangeText={(text) => { setBodyText(text) }}
//                 autoFocus
//                 />
//             </View>
//             <CircleButton onPress = {() => { handlePress(bodyText) }}>
//                 <Icon name='check' size={40} color='#ffffff'/>
//             </CircleButton>
//         </KeyBoardAvoidingView>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#ffffff'
//     },
//     inputContainer: {
//         paddingVertical: 32,
//         paddingHorizontal: 27,
//         flex: 1
//     },
//     input: {
//         flex: 1,
//         textAlignVertical: 'top',
//         fontSize: 16,
//         lineHeight: 24
//     }
// })

// export default Create