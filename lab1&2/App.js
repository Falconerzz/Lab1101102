import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ProductCard from './components/ProductCard';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff4e6',
    paddingTop: 50,
    paddingLeft: 10,
  },
});