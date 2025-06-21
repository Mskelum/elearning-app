import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';


const Dashboard = ({navigation}) => {

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.replace('Login');  // or navigation.reset(...) to clear history
    } catch (error) {
      console.error('Logout error:', error);
    }
  };


  return (
    <View>
      <Text style={{color:'black'}}> Dashboard </Text>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: '#EF4444', // red
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    width: '50%',
    alignSelf: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});


export default Dashboard
