import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';


type Menu = {
  Course: string;
  DishName: string;
  Description: string;
  Price: number;
};

export default function AddmenuScreen() {
  const [menuItems, setMenuItems] = useState<Menu[]>([]);
  const [newDish, setNewDish] = useState<Menu>({
    Course: '',
    DishName: '',
    Description: '',
    Price: 0,
  });

  const addDish = () => {
    if (newDish.DishName && newDish.Course && newDish.Price > 0) {
      setMenuItems([...menuItems, newDish]);
      setNewDish({ Course: '', DishName: '', Description: '', Price: 0 });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Dish</Text>
      <TextInput
        placeholder="Course"
        value={newDish.Course}
        onChangeText={text => setNewDish({ ...newDish, Course: text })}
        style={styles.input}
      />
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
        onChangeText={text => setNewDish({ ...newDish, Price: parseFloat(text) })}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Add Dish" onPress={addDish} />

      <FlatList
        data={menuItems}
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
