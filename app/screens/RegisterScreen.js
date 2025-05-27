import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const handleRegister = async () => {
    const authInstance = getAuth();

    if (!email || !password || !userName) {
      Alert.alert('กรอกข้อมูลไม่ครบ', 'กรุณากรอกข้อมูลทุกช่อง');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
      const user = userCredential.user;

      // ตั้งค่าชื่อผู้ใช้บน Firebase Auth
      await updateProfile(user, {
        displayName: userName,
      });

      // เพิ่มข้อมูลลง Firestore โดยไม่เก็บรหัสผ่าน
      await setDoc(doc(db, "users", user.uid), {
        email: email,
        userName: userName,
        createdAt: Timestamp.now(),
      });

      Alert.alert('ลงทะเบียนสำเร็จ', `ยินดีต้อนรับ ${userName}`);
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('เกิดข้อผิดพลาด', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name="person-add-outline" size={70} />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Name"
        value={userName}
        onChangeText={setUserName}
        style={styles.input}
      />

      <TouchableOpacity style={styles.buttonPurple} onPress={handleRegister}>
        <Text style={styles.buttonText}>REGISTER</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonPurple} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>BACK</Text>
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
  input: {
    backgroundColor: '#E0FFFF',
    width: '80%',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
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
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
