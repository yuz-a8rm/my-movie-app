import { StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { router } from "expo-router";

const handlePress = (): void => {
        router.replace('../../memo/createProfile')
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