import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

const Splash = () => {
  const [isGo, setIsGo] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      setTimeout(() => {
        navigation.replace('AdminTabs');
        setIsGo(false);
      }, 3000);
    };

    checkToken();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>E-Learning</Text>
      <Text style={styles.subtitle}>Your personalized learning assistant</Text>
      <FastImage
        style={styles.image}
        source={require('../assets/loadd.gif')}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    marginTop:10
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default Splash;
