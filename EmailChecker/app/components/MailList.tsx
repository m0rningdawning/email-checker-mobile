import React, {useRef, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import DrawerMenu from './Drawer';

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  DrawerLayoutAndroid,
  Platform,
} from 'react-native';

type MailListScreenProps = {
  navigation: StackNavigationProp<any, any>;
  route: any;
};

const MailListScreen: React.FC<MailListScreenProps> = ({navigation, route}) => {
  const drawerRef = useRef<DrawerLayoutAndroid>(null);

  const {credentials} = route.params;

  const navigationView = <DrawerMenu navigation={navigation} />;

  const [loading, setLoading] = useState(false);

  const openDrawer = () => {
    drawerRef.current?.openDrawer();
  };

  const isServerAvailable = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch('http://192.168.0.27:3000/', {
        method: 'HEAD',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      return response.status === 200;
    } catch (error) {
      return false;
    }
  };

  const fetchDataFromServer = async (credentials: any) => {
    setLoading(true);
    const isAvailable = await isServerAvailable();
    setLoading(false);

    // Fix the error with credential object creation!!!
    console.log(credentials.imap);

    if (!isAvailable) {
      Alert.alert(
        'Server is Down',
        'The server is currently unavailable. Please try again later.',
      );
      return;
    }

    try {
      const response = await fetch('http://192.168.0.27:3000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Unread Emails Count:', data.count);
        Alert.alert('Info', `You have ${data.count} unread emails.`);
      } else {
        console.log('Server Error/Incorrect Credentials');
        Alert.alert('Error', 'Server Error/Incorrect Credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while connecting to the server.');
      console.error(error);
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
          <Text style={styles.drawerText}>Email Details</Text>
          <TouchableOpacity style={styles.activePreset}>
            <Text style={styles.apText}>AP</Text>
          </TouchableOpacity>
        </View>
        <SafeAreaView style={styles.container}>
          <View style={styles.mainView}>
            <Text style={styles.content}>IMAP: {credentials.imap}</Text>
            <Text style={styles.content}>Email: {credentials.email}</Text>
            {/*<Text style={styles.content}>Password: {credentials.password}</Text>*/}
            {loading ? (
              <ActivityIndicator
                style={styles.indicator}
                size="large"
                color="#e0a16d"
              />
            ) : (
              <TouchableOpacity
                onPress={fetchDataFromServer}
                style={styles.checkButton}>
                <Text style={styles.buttonText}>Check</Text>
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
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
    backgroundColor: '#24242e',
  },
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    fontSize: 18,
    fontFamily: 'Roboto',
    color: '#e0a16d',
    marginBottom: 0,
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
  checkButton: {
    width: 100,
    height: 40,
    backgroundColor: '#e0a16d',
    padding: 9,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'Roboto',
    color: '#22222e',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  indicator: {
    marginTop: 14,
  },
});

export default MailListScreen;
