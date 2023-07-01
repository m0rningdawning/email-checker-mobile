import React, {useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {TouchEventType} from 'react-native-gesture-handler/lib/typescript/TouchEventType';
import {StackNavigationProp} from '@react-navigation/stack';

type DrawerMenuProps = {
  navigation: StackNavigationProp<any, any>;
};

const DrawerMenu = ({navigation}: DrawerMenuProps) => {
  const navigate = (where: number) => {
    if (where === 1) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    } else if (where === 2) {
      navigation.reset({
        index: 0,
        routes: [{name: 'CreateConfig'}],
      });
    } else if (where === 3) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Settings'}],
      });
    } else if (where === 4) {
      navigation.reset({
        index: 0,
        routes: [{name: 'About'}],
      });
    }
  };

  return (
    <View style={styles.menuButtonContainer}>
      <TouchableOpacity onPress={() => navigate(1)}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate(2)}>
        <Text>Create Config</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate(3)}>
        <Text>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate(4)}>
        <Text>About</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuButtonContainer: {
    flex: 1,
    backgroundColor: '#a0724d',
    padding: 10,
  },
});

export default DrawerMenu;
