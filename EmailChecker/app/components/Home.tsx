import React, {Component, useState, useRef, useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  MCOIMAPMessage,
  MCOIMAPSession,
  MCOIMAPMessagesRequestKind,
} from 'react-native-mailcore';
import NetInfo from '@react-native-community/netinfo';
import DrawerMenu from './Drawer';
import {fetchEmails} from '../ImapClient.js';

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  DrawerLayoutAndroid,
  FlatList,
  Dimensions,
  Platform,
} from 'react-native';

const {width, height} = Dimensions.get('window');
const itemWidth = width * 0.9;

type HomeScreenProps = {
  navigation: StackNavigationProp<any, any>;
};

type ItemProps = {
  imap: string;
  email: string;
  removeCredentials: () => void;
  onPress: () => void;
};

interface Credentials {
  imap: string;
  email: string;
  password: string;
}

const Item = ({ imap, email, removeCredentials, onPress }: ItemProps) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <View>
      <Text style={styles.itemTitle}>{imap}</Text>
      <Text style={styles.itemTitle}>{email}</Text>
    </View>
    <View style={styles.itemIcon}>
      <Icon
        name="ellipsis-v"
        size={30}
        color="#e0a16d"
        onPress={removeCredentials}
      />
    </View>
  </TouchableOpacity>
);

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const drawerRef = useRef<DrawerLayoutAndroid>(null);

  const navigationView = <DrawerMenu navigation={navigation} />;

  const [credentials, setCredentials] = useState([]);
  const [isStorageEmpty, setIsStorageEmpty] = useState<boolean | undefined>(
    undefined,
  );
  
  const openDrawer = () => {
    drawerRef.current?.openDrawer();
  };

  const closeDrawer = () => {
    drawerRef.current?.closeDrawer();
  };

  const handleEmailPress = (credentials: Credentials) => {
    navigation.navigate('MailList', {credentials});
  };

  const goToScreen = (name: string) => {
    navigation.reset({
      index: 0,
      routes: [{name: name}],
    });
  };

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const storedCredentialsString = await AsyncStorage.getItem(
          'userCredentials',
        );

        if (storedCredentialsString) {
          const storedCredentials = JSON.parse(storedCredentialsString);
          setCredentials(storedCredentials);
        }
      } catch (error) {
        console.log('Error fetching credentials:', error);
      }
    };
    fetchCredentials();
  }, []);

  useEffect(() => {
    const checkStorageStatus = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        setIsStorageEmpty(keys.length === 0);
      } catch (error) {
        console.log('Error checking AsyncStorage:', error);
        setIsStorageEmpty(true);
      }
    };

    checkStorageStatus();
  }, []);

  const removeCredentials = async (credentialId: any) => {
    try {
      const storedCredentialsString = await AsyncStorage.getItem(
        'userCredentials',
      );
      const storedCredentials = storedCredentialsString
        ? JSON.parse(storedCredentialsString)
        : [];

      const updatedCredentials = storedCredentials.filter(
        (credential: {id: any}) => credential.id !== credentialId,
      );

      const updatedCredentialsString = JSON.stringify(updatedCredentials);

      await AsyncStorage.setItem('userCredentials', updatedCredentialsString);

      console.log('Credential removed successfully!');

      if (storedCredentials.length === 1) {
        clearAsyncStorage();
        goToScreen('Home');
      }

      setCredentials(updatedCredentials);
    } catch (error) {
      console.log('Error removing credential:', error);
    }
  };

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared successfully!');
    } catch (error) {
      console.log('Error clearing AsyncStorage:', error);
    }
  };

  const list = () => {
    return (
      <FlatList
        data={credentials}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Item
            imap={item.imap}
            email={item.email}
            removeCredentials={() => removeCredentials(item.id)}
            onPress={() => handleEmailPress(item)}
          />
        )}
        // keyExtractor={item => item.id}
      />
    );
  };

  const noList = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.titleNoList}>No presets found</Text>
        <Text style={styles.titleNoList}>Create one</Text>
        <TouchableOpacity
          style={styles.addButtonIn}
          onPress={() => goToScreen('CreateConfig')}>
          {/* <Text style={styles.addButtonText}>+</Text> */}
          <Icon name="plus-square-o" size={30} color="#22222e" />
        </TouchableOpacity>
      </View>
    );
  };

  const plusButton = () => {
    return (
      <View style={styles.addButtonOut}>
        <TouchableOpacity
          style={styles.addButtonIn}
          onPress={() => goToScreen('CreateConfig')}>
          {/* <Text style={styles.addButtonText}>+</Text> */}
          <Icon name="plus-square-o" size={30} color="#22222e" />
        </TouchableOpacity>
      </View>
    );
  };

  const checkButton = () => {
    if (!isStorageEmpty) {
      return plusButton();
    }
  };

  const mainScreen = () => {
    return (
      <DrawerLayoutAndroid
        ref={drawerRef}
        drawerWidth={300}
        drawerPosition="left"
        renderNavigationView={() => navigationView}>
        <View style={styles.drawerOutContainer}>
          <TouchableOpacity
            style={styles.drawerInContainer}
            onPress={openDrawer}>
            <Icon name="bars" size={30} color="#e0a16d" />
          </TouchableOpacity>
          <Text style={styles.drawerText}>Home</Text>
          <TouchableOpacity style={styles.activePreset}>
            <Text style={styles.apText}>AP</Text>
          </TouchableOpacity>
        </View>
        <SafeAreaView style={styles.container}>
          {isStorageEmpty === undefined
            ? null
            : isStorageEmpty
            ? noList()
            : list()}
        </SafeAreaView>
        {checkButton()}
      </DrawerLayoutAndroid>
    );
  };

  if (Platform.OS === 'ios') {
    // WIP
    return <Text>Running on iOS</Text>;
  } else if (Platform.OS === 'android') {
    return (
      <DrawerLayoutAndroid
        ref={drawerRef}
        drawerWidth={300}
        drawerPosition="left"
        renderNavigationView={() => navigationView}>
        {mainScreen()}
      </DrawerLayoutAndroid>
    );
  }
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
  titleNoList: {
    fontSize: 20,
    fontFamily: 'Roboto',
    color: '#e0a16d',
    textTransform: 'uppercase',
    marginBottom: 5,
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
  item: {
    width: itemWidth,
    flexDirection: 'row',
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: '#e0a16d',
  },
  itemTitle: {
    fontSize: 20,
    fontFamily: 'Roboto',
    color: '#e0a16d',
  },
  itemIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  addButtonOut: {
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
  addButtonIn: {
    width: 50,
    height: 50,
    backgroundColor: '#e0a16d',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 40,
    fontFamily: 'Roboto',
    color: '#22222e',
  },
});

export default HomeScreen;
