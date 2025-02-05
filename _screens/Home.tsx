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

const colors = {
    primary: '#2e86de',          // A vibrant blue as the main color
    secondary: '#f5b041',        // An inviting orange for accents
    background: '#f9f9f9',       // Light grey as a clean background
    textDark: '#333',            // Dark text for readability
    textLight: '#fff',           // Light text for contrast
    border: '#ccc',              // Subtle border color
    success: '#4CAF50',           // Green for success messages
    error: '#f44336',             // Red for error messages
};

const typography = {
    header: 28,
    title: 22,
    section: 18,
    body: 16,
    small: 12,
};

const spacing = {
    small: 8,
    medium: 16,
    large: 24,
    extraLarge: 32,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.medium,
    },
    header: {
        fontSize: typography.header,
        fontWeight: 'bold',
        color: colors.textLight,
        backgroundColor: colors.primary,
        padding: spacing.medium,
        textAlign: 'center',
        marginBottom: spacing.large,
        borderRadius: spacing.small,
    },
    title: {
        fontSize: typography.title,
        fontWeight: 'bold',
        color: colors.textDark,
        marginBottom: spacing.small,
    },
    sectionTitle: {
        fontSize: typography.section,
        fontWeight: 'bold',
        color: colors.primary,
        marginTop: spacing.large,
        marginBottom: spacing.small,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingBottom: spacing.small,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.textLight,
        padding: spacing.small,
        marginBottom: spacing.medium,
        borderRadius: spacing.small,
        fontSize: typography.body,
        color: colors.textDark,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: spacing.medium,
        marginBottom: spacing.small,
        borderRadius: spacing.small,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        backgroundColor: colors.textLight,
    },
    menuItemText: {
        fontSize: typography.body,
        color: colors.textDark,
    },
    removeButton: {
        backgroundColor: colors.error,
        padding: spacing.small,
        borderRadius: spacing.small,
        marginTop: spacing.small,
    },
    removeButtonText: {
        color: colors.textLight,
        fontSize: typography.body,
        textAlign: 'center',
    },
    button: {
        backgroundColor: colors.primary,
        padding: spacing.medium,
        borderRadius: spacing.small,
        marginTop: spacing.medium,
    },
    buttonText: {
        color: colors.textLight,
        fontSize: typography.body,
        textAlign: 'center',
    },
    menuCount: {
        fontSize: typography.section,
        fontWeight: 'bold',
        color: colors.secondary,
        textAlign: 'center',
        marginTop: spacing.large,
    },
    averagePriceHeader: {
        fontSize: typography.section,
        fontWeight: 'bold',
        color: colors.primary,
        marginTop: spacing.large,
        textAlign: 'center',
    },
    averagePrice: {
        fontSize: typography.body,
        color: colors.textDark,
        textAlign: 'center',
        marginTop: spacing.small,
    },
    picker: {
        height: 50,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: spacing.small,
        marginBottom: spacing.medium,
        color: colors.textDark,
    },
    sectionHeader: {
        fontSize: typography.section,
        fontWeight: 'bold',
        backgroundColor: colors.secondary, // Highlight courses
        color: colors.textLight,
        padding: spacing.small,
        marginBottom: spacing.small,
        borderRadius: spacing.small,
        textAlign: 'center'
    }
});

export default HomeScreen;