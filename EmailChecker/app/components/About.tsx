import React, {useRef} from 'react';
import {Linking} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import DrawerMenu from './Drawer';

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  DrawerLayoutAndroid,
  Platform,
} from 'react-native';

type AboutScreenProps = {
  navigation: StackNavigationProp<any, any>;
};

const AboutScreen: React.FC<AboutScreenProps> = ({navigation}) => {
  const drawerRef = useRef<DrawerLayoutAndroid>(null);

  const navigationView = <DrawerMenu navigation={navigation} />;

  const openDrawer = () => {
    drawerRef.current?.openDrawer();
  };

  function closeDrawer() {
    drawerRef.current?.closeDrawer();
  }

  const handleLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log('Cannot open URL');
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
          <Text style={styles.drawerText}>About</Text>
          <TouchableOpacity style={styles.activePreset}>
            <Text style={styles.apText}>AP</Text>
          </TouchableOpacity>
        </View>
        <SafeAreaView style={styles.container}>
          <Text style={styles.content}>
            A small application for checking and managing emails. Created by
            Pavlo Korolov.
          </Text>
          <Text style={styles.subContent}>GitHub repo:</Text>
          <Text style={styles.subContentLink} onPress={() => handleLink('https://github.com/m0rningdawning/email-checker-mobile')}>
            https://github.com/m0rningdawning/email-checker-mobile
          </Text>
          <Text style={styles.content}>
            Even lighter and simpler version for PC:
          </Text>
          <Text style={styles.subContentLink} onPress={() => handleLink('https://github.com/m0rningdawning/email-checker')}>
            https://github.com/m0rningdawning/email-checker
          </Text>
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
  content: {
    fontSize: 15,
    fontFamily: 'Roboto',
    color: '#e0a16d',
    margin: 10,
    marginBottom: 0,
  },
  subContent: {
    fontSize: 15,
    fontFamily: 'Roboto',
    color: '#e0a16d',
    margin: 10,
    marginBottom: 0,
  },
  subContentLink: {
    fontSize: 15,
    fontFamily: 'Roboto',
    color: '#e0a16d',
    margin: 10,
    marginBottom: 0,
    textDecorationLine: 'underline',
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

export default AboutScreen;
