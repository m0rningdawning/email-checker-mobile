import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Home';
import SettingScreen from './Settings';
import AboutScreen from './About';
import CreateConfigScreen from './CreateConfig';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="CreateConfig" component={CreateConfigScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Settings" component={SettingScreen} />
        <Stack.Screen options={{ headerShown: false }} name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
