import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './components/Home';
import SettingScreen from './components/Settings';
import AboutScreen from './components/About';
import CreateConfigScreen from './components/CreateConfig';
import DrawerMenu from './components/Drawer';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="CreateConfig"
          component={CreateConfigScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Settings"
          component={SettingScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="About"
          component={AboutScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Drawer"
          component={DrawerMenu}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
