import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TabScreenNavigationProps } from '../App';
import { Menu } from '../App';

type HomeScreenNavigationProp = TabScreenNavigationProps<'Home'>;

type Props = {
  Menus: Menu[];
}

const HomeScreen: React.FC<Props> = ({ Menus }) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [someCondition, setSomeCondition] = useState(false);

    useEffect(() => {
        console.log("Menus in HomeScreen:", Menus);
    }, [Menus]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to the Chef App</Text>
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

        {/* This button is no longer needed */}
      {/* <TouchableOpacity */}
        {/*   style={styles.button} */}
        {/*  onPress={() => setSomeCondition(true)} */}
      {/* > */}
        {/*    <Text style={styles.buttonText}>Set Condition</Text> */}
      {/*  </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
    }
});

export default HomeScreen;