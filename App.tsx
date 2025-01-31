import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import icon library
import 'react-native-gesture-handler';

import HomeScreen from './_screens/Home';
import AddMenuScreen from './_screens/MenuAdd';
import FilterMenuScreen from './_screens/MenuFilter';

console.log(HomeScreen);

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string; // Ensure iconName is always a string

            // Check the route and set the appropriate icon name
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'AddMenu') {
              iconName = focused ? 'plus' : 'plus-outline';
            } else if (route.name === 'FilterMenu') {
              iconName = focused ? 'filter' : 'filter-outline';
            } else {
              // Fallback to a default icon name if route is unexpected
              iconName = 'home';
            }

            // Return MaterialCommunityIcons with the iconName
            return (
              <MaterialCommunityIcons
                name={iconName}  // This is now guaranteed to be a string
                size={size}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: 'tomato',  // Active tab color
          tabBarInactiveTintColor: 'gray',  // Inactive tab color
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="MenuAdd" component={AddMenuScreen} />
        <Tab.Screen name="MenuFilter" component={FilterMenuScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
