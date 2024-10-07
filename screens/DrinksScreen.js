import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import minusImage from '../assets/minus_18.png'; 
import plusImage from '../assets/plus8.png';  
import { CartContext } from '../contexts/CartContext'; // Import the CartContext

export default function DrinksScreen() {
  const [drinks, setDrinks] = useState([]);
  const navigation = useNavigation();  

  const { cart, addToCart, decreaseQuantity } = useContext(CartContext); // Access cart, addToCart, and decreaseQuantity from context

  useEffect(() => {
    axios.get('http://localhost:5000/drinks')
      .then(response => setDrinks(response.data))
      .catch(error => console.error(error));
  }, []);

  // Helper function to get the quantity of a specific drink in the cart
  const getQuantity = (id) => {
    const item = cart.find(cartItem => cartItem.id === id);
    return item ? item.quantity : 0;
  };

  const renderDrinkItem = ({ item }) => (
    <View style={styles.drinkItem}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <View style={styles.buttons}>
        {/* Minus Button */}
        <TouchableOpacity 
          style={styles.button}
          onPress={() => decreaseQuantity(item.id)}
          disabled={getQuantity(item.id) === 0} // Disable if quantity is zero
        >
          <Image source={minusImage} style={styles.buttonImage} />
        </TouchableOpacity>

        {/* Plus Button */}
        <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
          <Image source={plusImage} style={styles.buttonImage} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%", height: 500 }}>
        <FlatList
          data={drinks}
          keyExtractor={item => item.id.toString()}
          renderItem={renderDrinkItem}
        />
      </ScrollView>
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => navigation.navigate('CartScreen')}  
      >
        <Text style={styles.cartButtonText}>GO TO CART ({cart.length})</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'space-between',
  },
  drinkItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    height: 80, 
    borderWidth: 1,            
    borderColor: '#cccccc',
    overflow: 'hidden', 
  },
  image: {
    width: 80, 
    height: 80, 
    position: 'absolute', 
    left: 0, 
    top: 0, 
    borderRadius: 10, 
  },
  info: {
    flex: 1,
    marginLeft: 90, 
    padding: 15,
  },
  name: {
    fontSize: 18, 
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16, 
    color: '#888',
  },
  buttons: {
    flexDirection: 'row',
    width: 100, 
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  buttonImage: {
    width: 20,
    height: 20, 
  },
  cartButton: {
    marginBottom: 20,
    backgroundColor: '#ffcc00',
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    width: '100%',
    height: 44,
  },
  cartButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#fff',
  },
});
