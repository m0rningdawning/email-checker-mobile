import React, {Component, useState, useRef} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerMenu from './Drawer';
import ConfigForm from './ConfigFrom';

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  DrawerLayoutAndroid,
} from 'react-native';

type ConfScreenProps = {
  navigation: StackNavigationProp<any, any>;
  route: any;
};

const CreateConfigScreen: React.FC<ConfScreenProps> = ({navigation}) => {
  const [text, onChangeText] = useState('');
  const [text2, onChangeText2] = useState('');
  const drawerRef = useRef<DrawerLayoutAndroid>(null);

  const navigationView = <DrawerMenu navigation={navigation} />;

  const openDrawer = () => {
    drawerRef.current?.openDrawer();
  };

  const closeDrawer = () => {
    drawerRef.current?.closeDrawer();
  };

  const saveCredentials = async (credentials: any) => {
    try {
      if (
        !credentials.email ||
        !credentials.password ||
        !credentials.imap ||
        !credentials.date
      ) {
        console.log('Cannot save empty preset');
        return;
      }

      const credentialId = Date.now().toString();

      const credentialWithId = {...credentials, id: credentialId};

      const storedCredentialsString = await AsyncStorage.getItem(
        'userCredentials',
      );
      const storedCredentials = storedCredentialsString
        ? JSON.parse(storedCredentialsString)
        : [];

      const updatedCredentials = [...storedCredentials, credentialWithId];

      const updatedCredentialsString = JSON.stringify(updatedCredentials);

      await AsyncStorage.setItem('userCredentials', updatedCredentialsString);

      console.log('Credentials saved successfully!');
      navigation.navigate('Home');
    } catch (error) {
      console.log('Error saving credentials:', error);
    }
  };

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={() => navigationView}>
      <View style={styles.drawerOutContainer}>
        <TouchableOpacity style={styles.drawerInContainer} onPress={openDrawer}>
          <Icon name="bars" size={30} color="#e0a16d" />
        </TouchableOpacity>
        <Text style={styles.drawerText}>Presets</Text>
        <TouchableOpacity style={styles.activePreset}>
          <Text style={styles.apText}>AP</Text>
        </TouchableOpacity>
      </View>
      <SafeAreaView style={styles.container}>
        <View style={styles.logo}>
          <Text style={styles.title}>Create Configuration</Text>
        </View>
        <ConfigForm onSaveConfig={saveCredentials} />
      </SafeAreaView>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#24242e',
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
  credentials: {
    marginBottom: 10,
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
  drawerOutContainer: {
    backgroundColor: '#24242e',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'rgba(224, 161, 109, 0.5)',
    borderBottomWidth: 1,
    padding: 10,
  },
  drawerInContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerText: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 20,
    fontFamily: 'Roboto',
    color: '#e0a16d',
  },
  activePreset: {
    width: 40,
    alignContent: 'center',
    backgroundColor: '#e0a16d',
    borderRadius: 5,
    padding: 5,
  },
  apText: {
    fontSize: 15,
    fontFamily: 'Roboto',
    color: '#22222e',
    textAlign: 'center',
  },
});

export default CreateConfigScreen;
