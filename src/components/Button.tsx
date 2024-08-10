import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

interface Props {
    label: string
    onPress?: () => void
}

const Button = (props: Props): JSX.Element => {
    const { label, onPress } = props
    return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonLabel}>{label}</Text>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#C5B1AD',
        borderRadius: 4,
        alignSelf: 'center',
        marginBottom: 24,
        paddingHorizontal: 25
        
    },
    buttonLabel: {
        fontSize: 16,
        lineHeight: 32,
        color: '#ffffff',
        paddingVertical: 8,
        paddingHorizontal: 24,
    },

})

export default Button