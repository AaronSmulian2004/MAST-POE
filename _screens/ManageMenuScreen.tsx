import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Menu } from "../App";
import { Picker } from '@react-native-picker/picker';

type Props = {
    Menus: Menu[];
    setMenus: React.Dispatch<React.SetStateAction<Menu[]>>;
}

const ManageMenuScreen: React.FC<Props> = ({Menus, setMenus}) => {
    const [newDish, setNewDish] = useState<Menu>({
        Course: '',
        DishName: '',
        Description: '',
        Price: 0,
    });

    const [selectedCourse, setSelectedCourse] = useState('');

    const courseOptions = ['Starter', 'Main', 'Dessert', 'Side Dish', 'Drink'];

    const addDish = () => {
        if (newDish.DishName && selectedCourse) {
            if (isNaN(newDish.Price) || newDish.Price <= 0) {
                Alert.alert("Invalid Price", "Please enter a valid price.");
                return;
            }
            setMenus([...Menus, { ...newDish, Course: selectedCourse }]);
            setNewDish({ Course: '', DishName: '', Description: '', Price: 0 });
        }
    };

    const removeDish = (indexToRemove: number) => {
        Alert.alert(
            "Remove Dish",
            "Are you sure you want to remove this dish?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => {
                        const newMenus = Menus.filter((_, index) => index !== indexToRemove);
                        setMenus(newMenus);
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Manage Menu</Text>

            <Text style={styles.sectionTitle}>Add New Dish</Text>

            <Picker
                selectedValue={selectedCourse}
                style={styles.input}
                onValueChange={(itemValue) => {
                    setSelectedCourse(itemValue);
                }}
            >
                {courseOptions.map((course, index) => (
                    <Picker.Item key={index} label={course} value={course} />
                ))}
            </Picker>

            <TextInput
                placeholder="Dish Name"
                value={newDish.DishName}
                onChangeText={text => setNewDish({ ...newDish, DishName: text })}
                style={styles.input}
            />
            <TextInput
                placeholder="Description"
                value={newDish.Description}
                onChangeText={text => setNewDish({ ...newDish, Description: text })}
                style={styles.input}
            />
            <TextInput
                placeholder="Price"
                value={newDish.Price.toString()}
                onChangeText={text => {
                    const parsedValue = parseFloat(text);
                    setNewDish({ ...newDish, Price: isNaN(parsedValue) ? 0 : parsedValue });
                }}
                keyboardType="numeric"
                style={styles.input}
            />

            <Button title="Add Dish" onPress={addDish} />

            <Text style={styles.sectionTitle}>Current Menu</Text>

            <FlatList
                data={Menus}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.menuItem}>
                        <View style={styles.menuItemDetails}>
                            <Text style={styles.menuItemName}>{item.DishName}</Text>
                            <Text style={styles.menuItemCourse}>({item.Course})</Text>
                        </View>
                        <Text style={styles.menuItemDescription}>{item.Description}</Text>
                        <Text style={styles.menuItemPrice}>R{item.Price.toFixed(2)}</Text>
                        <TouchableOpacity onPress={() => removeDish(index)} style={styles.removeButton}>
                            <Text style={styles.removeButtonText}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

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
        textAlign: 'center',
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
        flexDirection: 'column',
        backgroundColor: colors.textLight,
        padding: spacing.medium,
        marginBottom: spacing.small,
        borderRadius: spacing.small,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    menuItemDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.small,
    },
    menuItemName: {
        fontSize: typography.body,
        fontWeight: 'bold',
        color: colors.textDark,
    },
    menuItemCourse: {
        fontSize: typography.small,
        color: colors.secondary,
    },
    menuItemDescription: {
        fontSize: typography.body,
        color: colors.textDark,
        marginBottom: spacing.small,
    },
    menuItemPrice: {
        fontSize: typography.body,
        fontWeight: 'bold',
        color: colors.primary,
        textAlign: 'right',
    },
    removeButton: {
        backgroundColor: colors.error,
        padding: spacing.small,
        borderRadius: spacing.small,
        marginTop: spacing.medium,
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
});

export default ManageMenuScreen;