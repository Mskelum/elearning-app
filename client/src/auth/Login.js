import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode'; // ensure this is installed correctly

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const login = async () => {
        try {
            const res = await axios.post('http://192.168.147.234:5000/api/auth/login', {
                email,
                password,
            });

            const token = res.data.token;
            const role = res.data.user.role;

            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('role', role);

            if (role === 'student') {
                navigation.replace('UserTabs');
            } else {
                navigation.replace('AdminTabs');
            }

        } catch (err) {
            console.log('Login error:', err?.response?.data || err.message);
            Alert.alert('Error', err.response?.data?.msg || 'Something went wrong');
        }
    };




    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Welcome Back 👋</Text>
                <Text style={styles.subtitle}>Login to your account</Text>

                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#aaa"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    style={styles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity style={styles.button} onPress={login}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.switchText}>
                        Don’t have an account? <Text style={styles.link}>Register</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEF2FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 30,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#1E3A8A',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        color: '#64748B',
    },
    input: {
        backgroundColor: '#F1F5F9',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        color: '#111',
    },
    button: {
        backgroundColor: '#4F46E5',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    switchText: {
        textAlign: 'center',
        color: '#6B7280',
        marginTop: 10,
    },
    link: {
        color: '#4F46E5',
        fontWeight: '600',
    },
});
