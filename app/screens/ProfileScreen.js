import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { auth, db } from '../firebase';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const [userName, setUserName] = useState('');
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName || user.email);
      setImage(user.photoURL); // โหลดรูปโปรไฟล์หากมี
    }
    requestPermission();
  }, []);

  const requestPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('กรุณาอนุญาตเข้าถึงรูปภาพ');
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedUri = result.assets[0].uri;
      setImage(selectedUri);

      const user = auth.currentUser;

      if (user) {
        try {
          // อัปเดต photoURL ใน Firebase Auth
          await updateProfile(user, { photoURL: selectedUri });

          // อัปเดตใน Firestore ด้วย (กรณีมี collection users)
          const userRef = doc(db, 'users', user.uid);
          await updateDoc(userRef, {
            photoURL: selectedUri,
          });

          Alert.alert('สำเร็จ', 'เปลี่ยนรูปโปรไฟล์เรียบร้อย');
        } catch (error) {
          Alert.alert('เกิดข้อผิดพลาด', error.message);
        }
      }
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.replace('Login'); // กลับไปหน้า Login
    } catch (error) {
      Alert.alert('ออกจากระบบล้มเหลว', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {image ? (
        <Image source={{ uri: image }} style={styles.avatar} />
      ) : (
        <Ionicons name="person-circle-outline" size={100} color="#999" />
      )}

      <Text style={styles.nameText}>{userName || 'Your Name'}</Text>

      <TouchableOpacity style={styles.buttonPurple} onPress={pickImage}>
        <Text style={styles.buttonText}>CHANGE PROFILE PICTURE</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonRed} onPress={handleLogout}>
        <Text style={styles.buttonText}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  buttonPurple: {
    backgroundColor: '#9370DB',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonRed: {
    backgroundColor: '#DC143C',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    backgroundColor: '#ccc',
  },
});
