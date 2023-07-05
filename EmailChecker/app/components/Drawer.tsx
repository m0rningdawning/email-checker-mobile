import React, {useRef} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchEventType} from 'react-native-gesture-handler/lib/typescript/TouchEventType';
import {StackNavigationProp} from '@react-navigation/stack';
import {useRoute} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const itemWidth = width * 0.9;

type DrawerMenuProps = {
  navigation: StackNavigationProp<any, any>;
};

const DrawerMenu = ({navigation}: DrawerMenuProps) => {
  const route = useRoute();

  const navigate = (where: number) => {
    if (where === 1 && route.name !== 'Home') {
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    } else if (where === 2 && route.name !== 'CreateConfig') {
      navigation.reset({
        index: 0,
        routes: [{name: 'CreateConfig'}],
      });
    } else if (where === 3 && route.name !== 'Settings') {
      navigation.reset({
        index: 0,
        routes: [{name: 'Settings'}],
      });
    } else if (where === 4 && route.name !== 'About') {
      navigation.reset({
        index: 0,
        routes: [{name: 'About'}],
      });
    }
  };

  return (
    <View style={styles.menuButtonContainer}>
      <TouchableOpacity style={styles.button} onPress={() => navigate(1)}>
        <View style={styles.icon}>
          <Icon name="home" size={30} color="#a0724d" />
        </View>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigate(2)}>
        <View style={styles.icon}>
          <Icon name="pencil" size={30} color="#a0724d" />
        </View>
        <Text style={styles.buttonText}>Create Config</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigate(3)}>
        <View style={styles.icon}>
          <Icon name="gear" size={30} color="#a0724d" />
        </View>
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigate(4)}>
        <View style={styles.icon}>
          <Icon name="question" size={30} color="#a0724d" />
        </View>
        <Text style={styles.buttonText}>About</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuButtonContainer: {
    flex: 1,
    backgroundColor: '#a0724d',
    padding: 8,
  },
  button: {
    backgroundColor: '#22222e',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  buttonText: {
    color: '#a0724d',
    fontSize: 20,
    marginLeft: 10,
  },
  icon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DrawerMenu;
