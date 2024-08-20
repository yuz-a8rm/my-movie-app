import { 
    View, Text, TextInput, TouchableOpacity,
    StyleSheet, 
    Alert
    } from "react-native";

import { Link, router } from "expo-router";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config";


import Button from "../../components/Button";

const handlePress = (email: string, password: string): void => {
    // login
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log(userCredential.user.uid)
        router.replace('/components/Card')
    })
    .catch((error) => {
        const { code, message } = error
        console.log(code, message)
        Alert.alert(message)

    })

}

const LogIn = (): JSX.Element => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <Text style={styles.title}>Log In</Text>
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
                <Button label = 'Submit' onPress={() => { handlePress( email, password )}} />
                
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Not registered?</Text>
                    <Link href='/auth/sign_up' asChild replace>
                        <TouchableOpacity>
                            <Text style={styles.footerLink}>Sign up here</Text>
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
        justifyContent: 'center',

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

export default LogIn