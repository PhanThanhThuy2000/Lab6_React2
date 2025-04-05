import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { useSignupMutation } from '../authApi';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignupScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    password: '',
    gender: 'male',
  });

  const [signup, { isLoading }] = useSignupMutation();

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const userData = {
        ...formData,
        age: parseInt(formData.age, 10),
      };

      const response = await signup(userData).unwrap();
      Alert.alert('Thành công', response.message);
    } catch (error) {
      Alert.alert('Lỗi', 'Đăng ký không thành công');
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.label}>Name*</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(text) => handleChange('name', text)}
          placeholder="Nhập tên"
        />

        <Text style={styles.label}>User's Age*</Text>
        <TextInput
          style={styles.input}
          value={formData.age}
          onChangeText={(text) => handleChange('age', text)}
          placeholder="Nhập tuổi"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Email*</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
          placeholder="Nhập email"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password*</Text>
        <TextInput
          style={styles.input}
          value={formData.password}
          onChangeText={(text) => handleChange('password', text)}
          placeholder="Nhập mật khẩu"
          secureTextEntry
        />

        <Text style={styles.label}>Gender*</Text>
        <View style={styles.radioGroup}>
          <Button
            title="Nam"
            onPress={() => handleChange('gender', 'male')}
            color={formData.gender === 'male' ? 'blue' : 'gray'}
          />
          <Button
            title="Nữ"
            onPress={() => handleChange('gender', 'female')}
            color={formData.gender === 'female' ? 'blue' : 'gray'}
          />
        </View>

        <Button
          title="Submit"
          onPress={handleSubmit}
          disabled={isLoading}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
});

export default SignupScreen;