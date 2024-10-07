import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal, Button } from 'react-native';
import axios from 'axios';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

const ShopsNearMe = ({ navigation }) => {
  const [shops, setShops] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/shops')
      .then(response => setShops(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleShopPress = (shop) => {
    if (shop.isAvailable) {
      navigation.navigate('DrinksScreen');
    } else {
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%", height: 500 }}>
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={24} color="gray" />
        </View>
        {shops.map((shop) => (
          <TouchableOpacity key={shop.id} style={styles.shopCard} onPress={() => handleShopPress(shop)}>
            <Image source={{ uri: shop.image }} style={styles.shopImage} />
            <View style={styles.shopInfo}>
              <View style={styles.statusAndTime}>
                <Text style={shop.isAvailable ? styles.statusAvailable : styles.statusUnavailable}>
                  <MaterialIcons name={shop.isAvailable ? "check-circle" : "lock"} size={16} color={shop.isAvailable ? "green" : "red"} />
                  {` ${shop.status}`} 
                </Text>
                <Text style={styles.deliveryTime}>
                  <FontAwesome name="clock-o" size={16} color="green" />
                  {` ${shop.delivery_time}`}
                </Text>
                <View style={styles.locationContainer}>
                  <FontAwesome name="map-marker" size={20} color="green" />
                </View>
              </View>
              <Text style={styles.shopName}>{shop.name}</Text>
              <Text style={styles.shopAddress}>{shop.address}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal for unavailable shop */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Tiệm này đang đóng cửa.</Text>
            <Button title="Đóng" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  searchContainer: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  shopCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
    overflow: 'hidden',
  },
  shopImage: {
    width: '100%',
    height: 150, 
  },
  shopInfo: {
    padding: 10,
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusAndTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  statusAvailable: {
    color: 'green',
    fontSize: 16,
  },
  statusUnavailable: {
    color: 'red',
    fontSize: 16,
  },
  deliveryTime: {
    color: 'red',
    marginLeft: 5,
  },
  locationContainer: {
    position: 'absolute', 
    right: 0,
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  shopAddress: {
    color: '#666',
    marginTop: 5,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default ShopsNearMe;
