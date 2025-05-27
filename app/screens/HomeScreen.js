import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Text, ActivityIndicator, Button, Alert } from 'react-native';
import ProductCard from '../Product'; 
import { db, auth } from '../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStock, setFilterStock] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) setUserId(user.uid);
    });

    fetchProducts();
    return unsubscribe;
  }, []);

  useEffect(() => {
    applyFilter();
  }, [products, filterStock]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productList = [];
      querySnapshot.forEach(doc => {
        productList.push({ id: doc.id, ...doc.data() });
      });
      setProducts(productList);
    } catch (err) {
      Alert.alert('เกิดข้อผิดพลาด', 'โหลดข้อมูลสินค้าไม่สำเร็จ');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = () => {
    if (filterStock) {
      setFiltered(products.filter(p => parseInt(p.stock) > 0));
    } else {
      setFiltered(products);
    }
  };

  const handleSelectProduct = async (product) => {
    if (!userId) {
      Alert.alert('ยังไม่ได้เข้าสู่ระบบ', 'กรุณาเข้าสู่ระบบก่อนเพิ่มสินค้า');
      return;
    }

    if (parseInt(product.stock) === 0) {
      Alert.alert('ไม่สามารถเพิ่มสินค้า', `สินค้า "${product.name}" หมดสต๊อก`);
      return;
    }

    try {
      await addDoc(collection(db, 'cart'), {
        title: product.name,
        userId: userId,
        createdAt: new Date(),
        price: product.price,
        pic: product.pic,
      });

      Alert.alert('เพิ่มสินค้า', `เพิ่ม "${product.name}" ลงตะกร้าเรียบร้อย`);
    } catch (e) {
      Alert.alert('เกิดข้อผิดพลาด', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Button title="ALL" onPress={() => setFilterStock(false)} color={filterStock ? "#aaa" : "#0066cc"} />
        <Button title="IN STOCK" onPress={() => setFilterStock(true)} color={filterStock ? "#0066cc" : "#aaa"} />
      </View>

      <View style={styles.productsContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={handleSelectProduct}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#FFFAF0',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  productsContainer: {
    flex: 1,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
});
