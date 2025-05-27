import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { db, auth } from '../firebase';
import { collection, query, where, getDocs, deleteDoc, doc, addDoc, Timestamp } from 'firebase/firestore';

export default function CartScreen({ navigation }) {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
      loadCart(user.uid);
    }

    const unsubscribe = navigation.addListener('focus', () => {
      if (user) loadCart(user.uid);
    });

    return unsubscribe;
  }, [navigation]);

  const loadCart = async (uid) => {
    try {
      const q = query(collection(db, 'cart'), where('userId', '==', uid));
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCartItems(items);
    } catch (err) {
      console.error(err);
      Alert.alert('เกิดข้อผิดพลาด', 'โหลดข้อมูลไม่สำเร็จ');
    }
  };

  const removeItem = async (id) => {
    try {
      await deleteDoc(doc(db, 'cart', id));
      setCartItems(prev => prev.filter(item => item.id !== id));
      Alert.alert('Alert', 'ลบสินค้าเรียบร้อยแล้ว'); 
    } catch (e) {
      Alert.alert('ผิดพลาด', e.message);
    }
  };
  
  const handleOrder = async () => {
    try {
      const orderData = cartItems.map(item => ({
        title: item.title,
        userId: userId,
        orderedAt: Timestamp.now()
      }));

      for (let data of orderData) {
        await addDoc(collection(db, 'order'), data);
      }

      // ลบของใน cart ทั้งหมด
      for (let item of cartItems) {
        await deleteDoc(doc(db, 'cart', item.id));
      }

      setCartItems([]);
      Alert.alert('สั่งซื้อสำเร็จ', 'ย้ายข้อมูลไปยัง order แล้ว');
    } catch (e) {
      Alert.alert('ผิดพลาด', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>สินค้าในตะกร้า:</Text>

      {cartItems.length === 0 ? (
        <Text>ยังไม่มีสินค้า</Text>
      ) : (
        cartItems.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => removeItem(item.id)}>
            <Text style={styles.item}>• {item.title}</Text>
          </TouchableOpacity>
        ))
      )}

      <View style={{ marginTop: 20 }}>
        <Button
          title="ORDER"
          onPress={handleOrder}
          color="green"
          disabled={cartItems.length === 0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    fontSize: 16,
    paddingVertical: 8,
    color: '#333',
  },
});
