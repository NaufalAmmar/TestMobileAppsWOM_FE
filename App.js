// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FormCustomer from './src/pages/FormCustomer';
import UpdateCustomer from './src/pages/UpdateCustomer';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}
      >
        <Stack.Screen name="FormCustomer" component={FormCustomer} />
        <Stack.Screen name="UpdateCustomer" component={UpdateCustomer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;