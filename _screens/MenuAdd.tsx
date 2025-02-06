import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Menu } from "../App";
import { Picker } from '@react-native-picker/picker';

type Props = {
    Menus: Menu[];
    setMenus: React.Dispatch<React.SetStateAction<Menu[]>>;
}

const MenuAdd: React.FC<Props> = ({Menus, setMenus}) => {
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add New Dish</Text>

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

            <FlatList
                data={Menus}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.menuItem}>
                        <Text>{item.DishName}</Text>
                        <Text>{item.Course}</Text>
                        <Text>{item.Description}</Text>
                        <Text>R{item.Price.toFixed(2)}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 12,
        borderRadius: 4,
    },
    menuItem: {
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 8,
        borderRadius: 4,
    },
});

export default MenuAdd;