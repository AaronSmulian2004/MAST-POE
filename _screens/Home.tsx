import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SectionList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TabScreenNavigationProps, Menu } from '../App';

type HomeScreenNavigationProp = TabScreenNavigationProps<'Home'>;

type Props = {
    Menus: Menu[];
}

type Section = {
    title: string;
    data: Menu[];
}

const HomeScreen: React.FC<Props> = ({ Menus }) => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const [averagePrices, setAveragePrices] = useState<{ [course: string]: number }>({});
    const [groupedMenu, setGroupedMenu] = useState<Section[]>([])

    useEffect(() => {
        console.log("Menus in HomeScreen:", Menus);
        calculateAveragePrices();
    }, [Menus]);

    useEffect(() => {
        groupMenuByCategory()
    }, [Menus])

    const groupMenuByCategory = () => {
        const grouped: { [key: string]: Menu[] } = {}

        Menus.forEach(menu => {
            if (grouped[menu.Course]) {
                grouped[menu.Course].push(menu)
            } else {
                grouped[menu.Course] = [menu]
            }
        })

        const sectionList: Section[] = []

        Object.keys(grouped).forEach(key => {
            sectionList.push({
                title: key,
                data: grouped[key]
            })
        })

        setGroupedMenu(sectionList)
    }

    const calculateAveragePrices = () => {
        const courseTotals: { [course: string]: { sum: number; count: number } } = {};

        Menus.forEach(item => {
            const course = item.Course;
            if (!courseTotals[course]) {
                courseTotals[course] = { sum: 0, count: 0 };
            }
            courseTotals[course].sum += item.Price;
            courseTotals[course].count++;
        });

        const newAveragePrices: { [course: string]: number } = {};
        for (const course in courseTotals) {
            newAveragePrices[course] = courseTotals[course].sum / courseTotals[course].count;
        }

        setAveragePrices(newAveragePrices);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Welcome to the Chef App</Text>

            {/* Display the Menu */}
            <SectionList
                sections={groupedMenu}
                keyExtractor={(item, index) => item.DishName + index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemText}>{item.DishName}</Text>
                        <Text style={styles.menuItemText}>R{item.Price.toFixed(2)}</Text>
                    </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.sectionHeader}>{title}</Text>
                )}
            />

            {/* Display the number of Menu Items*/}
            <Text style={styles.menuCount}>Total Menu Items: {Menus.length}</Text>

            {/*Display average price by course*/}
            <Text style={styles.averagePriceHeader}>Average prices by course:</Text>
            {Object.entries(averagePrices).map(([course, averagePrice]) => (
                <Text key={course} style={styles.averagePrice}>
                    {course}: R{averagePrice.toFixed(2)}
                </Text>
            ))}

            {/* Removed the Add Button here */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate('MenuFilter')
                }}
            >
                <Text style={styles.buttonText}>Go To Filter</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f8ff', // AliceBlue
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#1e90ff', // DodgerBlue
        color: 'white',
        padding: 15,
        marginBottom: 20,
        borderRadius: 10,
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: '#ff8c00', // DarkOrange
        color: 'white',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    menuItem: {
        backgroundColor: 'white',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    menuItemText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    menuCount: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        color: '#4682b4', // SteelBlue
    },
    averagePriceHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        color: '#4682b4', // SteelBlue
    },
    averagePrice: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 5,
        color: '#333',
    },
    button: {
        backgroundColor: '#1e90ff', // DodgerBlue
        padding: 12,
        borderRadius: 8,
        marginTop: 20,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomeScreen;