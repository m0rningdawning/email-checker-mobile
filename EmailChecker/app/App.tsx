import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './components/Home';
import SettingScreen from './components/Settings';
import AboutScreen from './components/About';
import CreateConfigScreen from './components/CreateConfig';
import DrawerMenu from './components/Drawer';
import MailListScreen from './components/MailList';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: '#fff'},
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          transitionSpec: {
            open: {animation: 'timing', config: {duration: 200}},
            close: {animation: 'timing', config: {duration: 200}},
          },
          cardStyleInterpolator: ({current, layouts}) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}>
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
          name="MailList"
          component={MailListScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
