import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

export default function Register({ navigation }) {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const register = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        if (!role) {
            Alert.alert('Error', 'Please select a role');
            return;
        }

        try {
            const res = await axios.post('http://192.168.147.234:5000/api/auth/register', {
                name,
                role,
                email,
                password
            });
            Alert.alert('Success', res.data.msg);
            navigation.navigate('Login');
        } catch (err) {
            Alert.alert('Error', err.response?.data?.msg || 'Something went wrong');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Create Account 🚀</Text>
                <Text style={styles.subtitle}>Sign up to get started</Text>

                <TextInput
                    placeholder="Name"
                    placeholderTextColor="#aaa"
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />

                {/* Role Selector */}
                <Text style={styles.roleLabel}>Select Role</Text>
                <View style={styles.roleContainer}>
                    <TouchableOpacity
                        style={[styles.roleButton, role === 'student' && styles.roleButtonSelected]}
                        onPress={() => setRole('student')}
                    >
                        <Text style={[styles.roleText, role === 'student' && styles.roleTextSelected]}>Student</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.roleButton, role === 'teacher' && styles.roleButtonSelected]}
                        onPress={() => setRole('teacher')}
                    >
                        <Text style={[styles.roleText, role === 'teacher' && styles.roleTextSelected]}>Teacher</Text>
                    </TouchableOpacity>
                </View>

                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#aaa"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    style={styles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor="#aaa"
                    style={styles.input}
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                <TouchableOpacity style={styles.button} onPress={register}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.switchText}>
                        Already have an account? <Text style={styles.link}>Login</Text>
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
    roleLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#475569',
    },
    roleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    roleButton: {
        flex: 1,
        paddingVertical: 12,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#94A3B8',
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
    },
    roleButtonSelected: {
        backgroundColor: '#4F46E5',
        borderColor: '#4F46E5',
    },
    roleText: {
        color: '#64748B',
        fontWeight: '600',
        fontSize: 16,
    },
    roleTextSelected: {
        color: '#fff',
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
