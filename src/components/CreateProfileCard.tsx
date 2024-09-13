import { StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { signOut } from "firebase/auth";

import { auth } from "../config";
import { router } from "expo-router";

const handlePress = (): void => {
    signOut(auth)
    .then(() => {
        router.replace('/components/Profile')
    })
    .catch(() => {
        Alert.alert('プロフィール作成に失敗しました')
    })
}

const CreateProfileCardButton = (): JSX.Element => {
    return (
        <TouchableOpacity onPress={handlePress}>
            <Text style={styles.text}>プロフィール</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 12,
        lineHeight: 24,
        color: 'rgba(255,255,255,0.7)'
    }
})

export default CreateProfileCardButton