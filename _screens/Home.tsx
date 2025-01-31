import React, { memo, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Menu, RootStackParamList } from './RootStackParams';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = memo(() => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const Menus: Menu[] = [
    // Empty array for dynamic data input
  ];

  const [averagePrices, setAveragePrices] = useState<{ [key: string]: number }>({});

  // Calculate average prices
  const calculateAveragePrices = (menus: Menu[]) => {
    const courseTotals: { [key: string]: { total: number; count: number } } = {};

    menus.forEach(menu => {
      const { Course, Price } = menu;
      if (!courseTotals[Course]) {
        courseTotals[Course] = { total: 0, count: 0 };
      }
      courseTotals[Course].total += Price;
      courseTotals[Course].count += 1;
    });

    const averagePrices: { [key: string]: number } = {};
    for (const course in courseTotals) {
      averagePrices[course] = courseTotals[course].total / courseTotals[course].count;
    }

    return averagePrices;
  };

  useEffect(() => {
    const averages = calculateAveragePrices(Menus);
    setAveragePrices(averages);
  }, [Menus]);

  return (
    <View style={styles.container}>
      <View style={styles.averagePricesContainer}>
        <Text style={styles.averagePricesTitle}>Average Prices by Course</Text>
        {Object.entries(averagePrices).map(([course, avgPrice]) => (
          <Text key={course} style={styles.averagePriceText}>
            {course}: R{avgPrice.toFixed(2)}
          </Text>
        ))}
      </View>

      <TouchableOpacity
        style={styles.navigationButton}
        onPress={() => navigation.navigate('Addmenu')}
      >
        <Text style={styles.buttonText}>Chef's Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navigationButton}
        onPress={() => navigation.navigate('FilterMenu')}
      >
        <Text style={styles.buttonText}>Filter Menu</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Light background for contrast
  },
  averagePricesContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  averagePricesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  averagePriceText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 5,
  },
  navigationButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
