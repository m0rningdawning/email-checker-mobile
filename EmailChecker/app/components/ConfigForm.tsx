import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

interface ConfigFormProps {
  onSaveConfig: (credentials: {
    imap: string;
    password: string;
    email: string;
    date: string;
  }) => void;
}

function ConfigForm({onSaveConfig}: ConfigFormProps) {
  const [imap, setImap] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [date, setDate] = useState('');

  const handleSave = () => {
    const credentials = {
      imap,
      email,
      password,
      date,
    };

    onSaveConfig(credentials);
  };

  return (
    <View style={styles.credentials}>
      <TextInput
        style={styles.input}
        onChangeText={setImap}
        value={imap}
        placeholder="Imap Server Address"
        placeholderTextColor={'#e0a16d'}
      />
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email address"
        placeholderTextColor={'#e0a16d'}
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
        placeholderTextColor={'#e0a16d'}
      />
      <TextInput
        style={styles.input}
        onChangeText={setDate}
        value={date}
        placeholder="Date"
        placeholderTextColor={'#e0a16d'}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  credentials: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 250,
    margin: 12,
    color: '#e0a16d',
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: '#e0a16d',
    padding: 10,
  },
  button: {
    width: 100,
    height: 40,
    margin: 12,
    backgroundColor: '#e0a16d',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: '#212121',
    margin: 0,
    padding: 0,
    textTransform: 'uppercase',
  },
});

export default ConfigForm;
