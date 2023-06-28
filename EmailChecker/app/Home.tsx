import React, {Component} from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  TextInput,
} from 'react-native';

type HomeScreenProps = {
  navigation: StackNavigationProp<any, any>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [text, onChangeText] = React.useState('');
  const [text2, onChangeText2] = React.useState('');

  const createConfig = () => {
    /* Function to save the chosen config for future use */
  };

  const goToNextScreen = () => {
    navigation.navigate('Settings');
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.logo}>
        <Text style={styles.title}>Check Your Email</Text>
      </SafeAreaView>
      <SafeAreaView style={styles.login}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Imap Server Address"
          placeholderTextColor={'#e0a16d'}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeText2}
          value={text2}
          placeholder="Email address"
          placeholderTextColor={'#e0a16d'}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Password"
          placeholderTextColor={'#e0a16d'}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeText2}
          value={text2}
          placeholder="Date"
          placeholderTextColor={'#e0a16d'}
        />
      </SafeAreaView>
      <TouchableOpacity style={styles.button} onPress={goToNextScreen}>
        <Text style={styles.buttonText}>
          Create Config
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#24242e',
  },
  button: {
    width: 100,
    height: 40,
    backgroundColor: '#e0a16d',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 13,
    fontFamily: 'Roboto',
    color: '#212121',
  },
  logo: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Roboto',
    color: '#e0a16d',
    textTransform: 'uppercase',
  },
  login: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: 250,
    margin: 12,
    color: '#e0a16d',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#e0a16d',
    padding: 10,
  },
});

export default HomeScreen;
