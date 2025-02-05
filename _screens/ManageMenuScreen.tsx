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

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
            backgroundColor: '#f9f9f9',
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 16,
            textAlign: 'center',
            color: '#2e86de',
        },
        sectionTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginTop: 20,
            marginBottom: 10,
            color: '#2e86de',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            paddingBottom: 5,
        },
        input: {
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: 'white',
            padding: 8,
            marginBottom: 12,
            borderRadius: 4,
        },
        menuItem: {
            padding: 10,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 4,
            backgroundColor: 'white',
            elevation: 2,
        },
        removeButton: {
            backgroundColor: '#f44336',
            padding: 8,
            borderRadius: 4,
            marginTop: 10,
        },
        removeButtonText: {
            color: 'white',
            textAlign: 'center',
        },
    });

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
                        <Text>{item.DishName}</Text>
                        <Text>{item.Course}</Text>
                        <Text>{item.Description}</Text>
                        <Text>R{item.Price.toFixed(2)}</Text>
                        <TouchableOpacity onPress={() => removeDish(index)} style={styles.removeButton}>
                            <Text style={styles.removeButtonText}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

export default ManageMenuScreen;