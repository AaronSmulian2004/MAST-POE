import 'react-native-gesture-handler'; // Moved to the top

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import HomeScreen from './_screens/Home';
import AddMenuScreen from './_screens/MenuAdd';
import MenuFilter from './_screens/MenuFilter'; // Correct Import
// import {Menu} from "./_screens/RootStackParams"; // Not used yet.

// Define the navigation parameters
export type RootTabParamList = {
    Home: undefined;
    MenuAdd: undefined;
    MenuFilter: undefined;
};


// type for the navigation prop in each screen
export type TabScreenNavigationProps<T extends keyof RootTabParamList> = BottomTabNavigationProp<RootTabParamList, T>;

const Tab = createBottomTabNavigator<RootTabParamList>();

type Menu = {
  DishName: string
  Price: number
  Course: string
  Value: string
  Description: string
}
export default function App() {
    const Menus : Menu[] = [{
        DishName: "Test Starter",
        Price: 10.00,
        Course: "Starter",
        Value: '',
        Description: ''
    },{
        DishName: "Test Main 1",
        Price: 12.00,
        Course: "Main",
        Value: '',
        Description: ''
    },{
        DishName: "Test Main 2",
        Price: 12.50,
        Course: "Main",
        Value: '',
        Description: ''
    },{
        DishName: "Test Dessert 1",
        Price: 13.00,
        Course: "Dessert",
        Value: '',
        Description: ''
    }];
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName: string;
                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'MenuAdd') {
                            iconName = focused ? 'plus' : 'plus-outline';
                        } else if (route.name === 'MenuFilter') {
                            iconName = focused ? 'filter' : 'filter-outline';
                        } else {
                            iconName = 'Home';
                        }
                        console.log("Navigating to:", route.name)
                        return (
                            <MaterialCommunityIcons
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        );
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
              <Tab.Screen name="Home"  children={()=><HomeScreen propValue={"Initial Value"} />} />
              <Tab.Screen name="MenuAdd" component={AddMenuScreen} />
                <Tab.Screen name="MenuFilter" component={MenuFilter} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}