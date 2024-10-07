import React, { useContext, useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Modal,
  Animated
} from 'react-native';
import minusImage from '../assets/minus_18.png'; 
import plusImage from '../assets/plus8.png';  
import { CartContext } from '../contexts/CartContext'; // Adjust path if necessary

export default function CartScreen() {
  const { cart, increaseQuantity, decreaseQuantity, removeItem } = useContext(CartContext); // Access functions from context

  // State for Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const fadeAnim = useState(new Animated.Value(0))[0];

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

  // Handle decrease button press
  const handleDecreasePress = (item) => {
    if (item.quantity === 1) {
      // Show confirmation modal to remove product
      setSelectedItem(item);
      setModalVisible(true);
    } else if (item.quantity > 1) {
      decreaseQuantity(item.id);
    }
  };

  // Confirm removal of product
  const confirmRemoval = () => {
    if (selectedItem) {
      removeItem(selectedItem.id); // Remove product from cart
      setSelectedItem(null);
      setModalVisible(false);
    }
  };

  // Cancel removal
  const cancelRemoval = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => handleDecreasePress(item)} disabled={item.quantity === 0}>
          <Image source={minusImage} style={styles.buttonImage} />  
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
          <Image source={plusImage} style={styles.buttonImage} />  
        </TouchableOpacity>
      </View>
    </View>
  );

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Đơn Hàng Của Bạn</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyCartText}>Giỏ hàng của bạn đang trống.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCartItem}
        />
      )}
      <View style={styles.footer}>
        <View style={styles.dashedLine} />
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Tổng:</Text>
          <Text style={styles.totalAmount}>$ {total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={() => {/* Implement checkout logic */}}>
          <Text style={styles.checkoutButtonText}>THANH TOÁN NGAY</Text>
        </TouchableOpacity>
      </View>

      {/* Confirmation Modal */}
      <Modal
        transparent={true}
        animationType="none" // Set to none for custom animation
        visible={modalVisible}
        onRequestClose={cancelRemoval}
      >
        <Animated.View style={[styles.modalBackground, { opacity: fadeAnim }]}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Xác Nhận</Text>
            <Text style={styles.modalMessage}>
              Bạn có muốn hủy sản phẩm "{selectedItem ? selectedItem.name : ''}" không?
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
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
    position: 'relative', 
    overflow: 'hidden',
  },
  image: {
    position: 'absolute', 
    left: 0,
    top: 0,
    width: 100, 
    height: '100%', 
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  info: {
    flex: 1,
    marginLeft: '30%',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    color: '#888',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    width: 120,
  },
  buttonImage: {
    width: 20,
    height: 20,
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  dashedLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderStyle: 'dashed',
    width: '100%',
    marginBottom: 10,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
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
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#fff',
  },
  emptyCartText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
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
