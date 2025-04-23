import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductCard = () => {
  return (
    <View style={styles.card}>
      <Image
        style={styles.image}
        source={{ uri: 'https://reactjs.org/logo-og.png' }}
      />
      <Text style={styles.title}>Product</Text>
      <Text style={styles.price}>$999</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 15,
    borderRadius: 0,
    width: 200,
  },
  image: {
    width: 190,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  title: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'left',
    width: '100%',
    alignSelf: 'flex-start',
  },
  price: {
    color: '#000',
    fontSize: 16,
    marginTop: 5,
    textAlign: 'left',
    width: '100%',
    alignSelf: 'flex-start',
  },
});

export default ProductCard;