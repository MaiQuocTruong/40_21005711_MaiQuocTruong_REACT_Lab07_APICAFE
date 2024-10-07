// screens/DrinksScreen.js
import React, { useEffect, useState, useContext } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Modal,
  Animated
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import minusImage from '../assets/minus_18.png'; 
import plusImage from '../assets/plus8.png';  
import { CartContext } from '../contexts/CartContext'; // Import the CartContext

export default function DrinksScreen() {
  const [drinks, setDrinks] = useState([]);
  const navigation = useNavigation();  

  const { cart, addToCart, decreaseQuantity, removeItem } = useContext(CartContext); // Access removeItem from context

  // State for Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    axios.get('http://localhost:5000/drinks')
      .then(response => setDrinks(response.data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible, fadeAnim]);

  // Helper function to get the quantity of a specific drink in the cart
  const getQuantity = (id) => {
    const item = cart.find(cartItem => cartItem.id === id);
    return item ? item.quantity : 0;
  };

  // Handler for minus button press
  const handleMinusPress = (item) => {
    const quantity = getQuantity(item.id);
    if (quantity === 1) {
      // Show modal to confirm removal
      setSelectedItem(item);
      setModalVisible(true);
    } else if (quantity > 1) {
      decreaseQuantity(item.id);
    }
    // If quantity is 0, do nothing (button should be disabled)
  };

  // Handler for confirming removal
  const confirmRemoval = () => {
    if (selectedItem) {
      removeItem(selectedItem.id); // Explicitly remove the item from cart
      setSelectedItem(null); // Reset selected item
      // Ẩn modal ngay lập tức
      setModalVisible(false); 
    }
  };

  // Handler for cancelling removal
  const cancelRemoval = () => {
    setSelectedItem(null); // Reset selected item
    setModalVisible(false); // Ẩn modal ngay lập tức
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
          onPress={() => handleMinusPress(item)}
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

      {/* Confirmation Modal */}
      <Modal
        transparent={true}
        animationType="none" // Set to none for custom animation
        visible={modalVisible}
        onRequestClose={cancelRemoval}
      >
        <Animated.View style={[styles.modalBackground, { opacity: fadeAnim }]}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Xác nhận</Text>
            <Text style={styles.modalMessage}>
              Bạn muốn hủy sản phẩm "{selectedItem ? selectedItem.name : ''}" không?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={confirmRemoval}>
                <Text style={styles.modalButtonText}>Có</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={cancelRemoval}>
                <Text style={styles.modalButtonText}>Không</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </Modal>
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
  // Modal Styles
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#ffcc00',
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
