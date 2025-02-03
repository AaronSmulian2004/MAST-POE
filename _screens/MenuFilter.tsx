import React, { useState } from 'react';
import {View,Text,FlatList,StyleSheet,} from 'react-native';
import { Menu } from './RootStackParams';
import { Picker } from '@react-native-picker/picker';

export default function MenuFilter() {
  const [selectedValue, setSelectedValue] = useState('Starter');
  const [menuItems] = useState<Menu[]>([


  ]); 

  const filteredItems = menuItems.filter(item => item.Value === selectedValue);

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue: React.SetStateAction<string>) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Starters" value="Starter" />
        <Picker.Item label="Mains" value="Main" />
        <Picker.Item label="Desserts" value="Dessert" />
      </Picker>

      <FlatList
        data={filteredItems}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text>{item.DishName}</Text>
            <Text>{item.Price}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f9f9f9', // Light neutral background for readability
    },
    picker: {
      height: 50,
      marginBottom: 20,
      backgroundColor: '#fff',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      paddingHorizontal: 10,
    },
    menuItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      marginBottom: 10,
      backgroundColor: '#fff',
      borderRadius: 8,
      elevation: 2, // Adds a shadow for better distinction
    },
    menuItemText: {
      fontSize: 16,
      color: '#333',
    },
    priceText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#007BFF', // Distinct color for prices
    },
  });
  