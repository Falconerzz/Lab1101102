import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function ProductCard({ product, onSelect }) {
  const { name, price, stock, pic } = product;

  return (
    <TouchableOpacity onPress={() => onSelect(product)}>
      <View style={styles.card}>
      <Image source={{ uri: product.pic }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>ราคา: {product.price} บาท</Text>
      <Text style={styles.stock}>คงเหลือ: {product.stock}</Text>
      <TouchableOpacity style={styles.button} onPress={() => onSelect(product)}>
        <Text style={styles.buttonText}>เพิ่มลงตะกร้า</Text>
      </TouchableOpacity>
    </View>
    </TouchableOpacity>
  );
}



// Styles
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 10,
    width: 350,
    padding: 10,
    borderRadius: 10,
    
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: 'red',
    marginTop: 5
  },
  stock: {
    fontSize: 12,
    color: '#555',
    marginTop: 5
  }
});
