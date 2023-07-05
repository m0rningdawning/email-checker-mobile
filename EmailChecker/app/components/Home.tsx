import React, {Component, useState, useRef} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import DrawerMenu from './Drawer';

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  TextInput,
  DrawerLayoutAndroid,
  FlatList,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';

const {width, height} = Dimensions.get('window');
const itemWidth = width * 0.9;

type HomeScreenProps = {
  navigation: StackNavigationProp<any, any>;
};

type ItemProps = {
  title: string;
  subtitle: string;
};

const DATA = [
  {
    id: 'mprs0',
    title: 'Google Mail',
    subtitle: 'imap.gmail.com',
  },
  {
    id: 'mprs1',
    title: 'PSK Mail',
    subtitle: 'imap.psk.edu.my',
  },
  {
    id: 'mprs2',
    title: 'Yahoo Mail',
    subtitle: 'imap.mail.yahoo.com',
  },
];

const Item = ({title, subtitle}: ItemProps) => (
  <TouchableOpacity style={styles.item}>
    <View>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.itemTitle}>{subtitle}</Text>
    </View>
    <View style={styles.itemIcon}>
      <Icon name="ellipsis-v" size={30} color="#e0a16d"/>
    </View>
  </TouchableOpacity>
);

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const drawerRef = useRef<DrawerLayoutAndroid>(null);

  const navigationView = <DrawerMenu navigation={navigation} />;

  const openDrawer = () => {
    drawerRef.current?.openDrawer();
  };

  function closeDrawer(){
    drawerRef.current?.closeDrawer();
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
          <Text style={styles.drawerText}>Presets</Text>
          <TouchableOpacity style={styles.activePreset}>
            <Text style={styles.apText}>AP</Text>
          </TouchableOpacity>
        </View>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={DATA}
            renderItem={({item}) => (
              <Item title={item.title} subtitle={item.subtitle} />
            )}
            keyExtractor={item => item.id}
          />
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
});

export default HomeScreen;
