import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { database } from '../config/firebaseConfig'; // Import the database
import { ref, onValue } from 'firebase/database'; // Import the necessary functions from Firebase
import TypeWriter from 'react-native-typewriter';

const Home = ({ navigation }) => {
  const [shops, setShops] = useState([]);
  const [displayTitle, setDisplayTitle] = useState('Welcome to Cafe World');

  useEffect(() => {
    // Fetch shops data from Firebase
    const shopsRef = ref(database, 'shops'); // Reference to the shops in your database
    onValue(shopsRef, (snapshot) => {
      const data = snapshot.val();
      const shopsArray = data ? Object.values(data) : []; // Convert object to array
      setShops(shopsArray);
    }, {
      onlyOnce: true // Fetch data once
    });

    // Set interval to update the title
    const interval = setInterval(() => {
      setDisplayTitle(prevTitle => prevTitle === 'Welcome to Cafe World' ? 'Cafe World Awaits You!' : 'Welcome to Cafe World');
    }, 3000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const renderTitle = (title) => {
    const parts = title.split('Cafe World');
    return (
      <Text style={styles.title}>
        {parts[0]}
        <Text style={styles.cafeWorld}>Cafe World</Text>
        {parts[1]}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TypeWriter typing={1} minDelay={100} style={styles.title}>
          {renderTitle(displayTitle)}
        </TypeWriter>
      </View>
      <ScrollView contentContainerStyle={styles.shopList}>
        {shops.slice(0, 3).map((shop) => (
          <View key={shop.id} style={styles.shopContainer}>
            <Image source={{ uri: shop.image }} style={styles.shopImage} />
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('ShopsNearMe')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  titleContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: '10%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  cafeWorld: {
    color: '#8B4513',
  },
  shopList: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  shopContainer: {
    marginBottom: 20,
  },
  shopImage: {
    width: 300,
    height: 150,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#00c4cc',
    width: 300,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Home;
