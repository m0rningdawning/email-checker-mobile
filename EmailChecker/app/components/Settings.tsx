import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SettingScreen = () => {
  return (
    <View>
      <Text>This is the Settings Screen</Text>
    </View>
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
});

export default SettingScreen;
