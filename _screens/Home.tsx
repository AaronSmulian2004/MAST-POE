import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TabScreenNavigationProps, Menu } from '../App';

type HomeScreenNavigationProp = TabScreenNavigationProps<'Home'>;

type Props = {
    Menus: Menu[];
}

const HomeScreen: React.FC<Props> = ({ Menus }) => {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const [averagePrices, setAveragePrices] = useState<{ [course: string]: number }>({});

    useEffect(() => {
        console.log("Menus in HomeScreen:", Menus);
        calculateAveragePrices(); // Call the function when the component mounts or Menus changes
    }, [Menus]);

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
            <FlatList
                data={Menus}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemText}>{item.DishName}</Text>
                        <Text style={styles.menuItemText}>R{item.Price.toFixed(2)}</Text>
                    </View>
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


            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('MenuAdd')}
            >
                <Text style={styles.buttonText}>Add Menu Item</Text>
            </TouchableOpacity>
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        textAlign: 'center'
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    menuItemText: {
        fontSize: 16,
    },
    menuCount: {
        fontSize: 18,
        marginTop: 10,
        fontWeight: 'bold'
    },
    averagePriceHeader: {
        fontSize: 16,
        marginTop: 10,
        fontWeight: 'bold',
    },
    averagePrice: {
        fontSize: 14,
        marginTop: 5,
    }
});

export default HomeScreen;