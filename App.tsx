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
            DishName: "Chicken Satay Skewers",
            Price: 95.00,
            Course: "Starter",
            Description: "Grilled chicken skewers marinated in peanut sauce, served with a tangy cucumber relish.",
        },
        {
            DishName: "Peri-Peri Chicken",
            Price: 220.00,
            Course: "Main",
            Description: "Flame-grilled half chicken marinated in spicy peri-peri sauce, served with your choice of side.",
        },
        {
            DishName: "Bobotie",
            Price: 185.00,
            Course: "Main",
            Description: "A South African classic! Spiced minced meat baked with an egg custard topping, served with yellow rice and chutney.",
        },
        {
            DishName: "Malva Pudding",
            Price: 80.00,
            Course: "Dessert",
            Description: "Warm, spongy caramel pudding served with creamy custard. A truly decadent treat!",
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