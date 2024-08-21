import { View, Alert, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { useState } from "react";

import { Link, router } from "expo-router";
import { auth } from "../../config";
import Button from "../../components/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";

const handlePress = (email:string, password:string): void => {
    // 会員登録
    console.log(email, password)
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {       
    console.log(userCredential.user.uid)
    router.replace('../components/Card')
    })
    .catch((error) => {
        const { code, message } = error
        console.log(error)
        Alert.alert(message)
    })
}

const SignUp = (): JSX.Element => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <Text style={styles.title}>Sign Up</Text>
                <TextInput 
                style={styles.input} 
                value={email}
                onChangeText = {(text) => {setEmail(text)}}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="Email Address"
                textContentType="emailAddress"
                />
            
            <TextInput 
                style={styles.input} 
                value={password} 
                onChangeText = {(text) => {setPassword(text)}}
                autoCapitalize="none"
                secureTextEntry
                placeholder='Password'
                textContentType="password"
                />

                <Button label = 'Submit' onPress={() => { handlePress(email, password) }} />
                
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already registered?</Text>
                    <Link href='/auth/log_in' asChild replace>
                        <TouchableOpacity>
                            <Text style={styles.footerLink}>Log in</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0EEEB',
        alignContent: 'center',
        justifyContent: 'center',  // 縦方向に中央揃え

    },
    inner: {
        paddingVertical: 10,
        paddingHorizontal: 70
    },
    title: {
        color: '#C5B1AD',
        fontSize: 24,
        lineHeight: 32,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#dddddd',
        backgroundColor: '#ffffff',
        height: 50,
        padding: 5,
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 10
    },
    footer: {

    },
    footerText: {
        fontSize: 14,
        lineHeight: 24,
        color: '#C5B1AD',
        textAlign: 'center'
        
    },
    footerLink: {
        fontSize: 14,
        lineHeight: 24,
        color: '#8AA680',
        textAlign: 'center'
    }

})

export default SignUp