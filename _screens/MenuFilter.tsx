import React, { useState } from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import { Menu } from '../App';
import { Picker } from '@react-native-picker/picker';

type Props = {
    Menus: Menu[];
}

const MenuFilter: React.FC<Props> = ({ Menus }) => {
    const [selectedValue, setSelectedValue] = useState('All');

    const filteredItems = selectedValue === 'All' ? Menus : Menus.filter(item => item.Course === selectedValue);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: '#f0f8ff', // AliceBlue
        },
        title: {
            fontSize: 28,
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#1e90ff', // DodgerBlue
            marginBottom: 20,
        },
        picker: {
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            paddingVertical: 10,
            paddingHorizontal: 15,
            marginBottom: 20,
            fontSize: 16,
            color: '#333',
        },
        menuItem: {
            backgroundColor: 'white',
            padding: 15,
            marginBottom: 10,
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        menuItemText: {
            fontSize: 18,
            color: '#333',
            marginBottom: 5,
        },
        menuItemCourse: {
            fontSize: 14,
            color: '#666',
        },
        menuItemPrice: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#1e90ff', // DodgerBlue
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Menu Filter</Text>
            <Picker
                selectedValue={selectedValue}
                style={styles.picker}
                onValueChange={(itemValue: string) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="All" value="All" />
                <Picker.Item label="Starter" value="Starter" />
                <Picker.Item label="Main" value="Main" />
                <Picker.Item label="Dessert" value="Dessert" />
                <Picker.Item label="Side Dish" value="Side Dish" />
                <Picker.Item label="Drink" value="Drink" />
            </Picker>

            <FlatList
                data={filteredItems}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemText}>{item.DishName}</Text>
                        <Text style={styles.menuItemCourse}>{item.Course}</Text>
                        <Text style={styles.menuItemPrice}>R{item.Price.toFixed(2)}</Text>
                    </View>
                )}
            />
        </View>
    );
}

export default MenuFilter;