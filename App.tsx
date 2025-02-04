import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './_screens/Home';
import AddMenuScreen from './_screens/MenuAdd';
import MenuFilter from './_screens/MenuFilter';

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
    Description: string
}

export default function App() {
    const [Menus, setMenus] = useState<Menu[]>([
        {
            DishName: "Test Starter",
            Price: 10.00,
            Course: "Starter",
            Description: ''
        }, {
            DishName: "Test Main 1",
            Price: 12.00,
            Course: "Main",
            Description: ''
        }, {
            DishName: "Test Main 2",
            Price: 12.50,
            Course: "Main",
            Description: ''
        }, {
            DishName: "Test Dessert 1",
            Price: 13.00,
            Course: "Dessert",
            Description: ''
        }
    ]);

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
                <Tab.Screen name="Home" children={() => <HomeScreen Menus={Menus} />} />
                <Tab.Screen name="MenuAdd" children={() => <AddMenuScreen Menus={Menus} setMenus={setMenus} />} />
                <Tab.Screen name="MenuFilter" children={() => <MenuFilter Menus={Menus} />} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
export {Menu}