import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TelaCartas from './telas/TelaCartas';
import TelaFavoritos from './telas/TelaFavoritos';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#1a1a1a',
            borderTopColor: '#2a2a2a',
            borderTopWidth: 1,
          },
          tabBarActiveTintColor: '#f0c040',
          tabBarInactiveTintColor: '#555',
          tabBarIcon: () => null,
          tabBarIconStyle: { display: 'none' },
        }}
      >
        <Tab.Screen name="Cartas" component={TelaCartas} />
        <Tab.Screen name="Favoritos" component={TelaFavoritos} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}