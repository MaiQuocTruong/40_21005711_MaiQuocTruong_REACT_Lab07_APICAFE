import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ShopsNearMe from './screens/ShopsNearMe';
import DrinksScreen from './screens/DrinksScreen';
import CartScreen from './screens/CartScreen'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ShopsNearMe">
        <Stack.Screen name="ShopsNearMe" component={ShopsNearMe} />
        <Stack.Screen name="DrinksScreen" component={DrinksScreen} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}