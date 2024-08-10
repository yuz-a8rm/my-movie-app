import { 
    View, StyleSheet, TextInput } from "react-native";
import CircleButton from "../../components/CircleButton";
import Icon from "../../components/icon";
import KeyBoardAvoidingView from '../../components/KeyBoardAvoidingView'

import { router } from "expo-router";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db, auth } from "../../config";
import { useState } from "react";

const handlePress = (bodyText: string): void => {
    if (auth.currentUser === null ) { return }
    const ref = collection(db, `users/${auth.currentUser.uid}/memos`)
    addDoc(ref, {
        bodyText,
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

const Create = () => {
    const [bodyText, setBodyText] = useState('')
    return (
        <KeyBoardAvoidingView  style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput multiline style={styles.input} 
                value={bodyText}
                onChangeText={(text) => { setBodyText(text) }}
                autoFocus
                />
            </View>
            <CircleButton onPress = {() => { handlePress(bodyText) }}>
                <Icon name='check' size={40} color='#ffffff'/>
            </CircleButton>
        </KeyBoardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    inputContainer: {
        paddingVertical: 32,
        paddingHorizontal: 27,
        flex: 1
    },
    input: {
        flex: 1,
        textAlignVertical: 'top',
        fontSize: 16,
        lineHeight: 24
    }
})

export default Create