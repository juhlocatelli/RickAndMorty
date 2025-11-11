import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetalhePersonagem from './src/screens/DetalhePersonagem';
import ListaPersonagem from './src/screens/ListaPersonagem';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListaPersonagem">
        <Stack.Screen
          name="ListaPersonagem"
          component={ListaPersonagem}
          options={{ title: 'Rick and Morty' }}
        />
        <Stack.Screen
          name="DetalhePersonagem"
          component={DetalhePersonagem}
          options={({ route }) => ({ title: route.params?.name ?? 'Detalhes' })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}