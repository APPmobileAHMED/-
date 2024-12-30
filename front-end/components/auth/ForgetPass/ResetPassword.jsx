import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../constants';
import {AdresseIPPP_} from '@env'
import { useRoute } from "@react-navigation/native";
import axios from 'axios';
import style from "./styleForgetPass/styleResetpassword"
const ResetPassword = () => {
    const route = useRoute()
    const { email } = route.params;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigation = useNavigation();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleResetPassword = () => {
    console.log(email,"ahaha")
    if (newPassword === confirmPassword) {
      axios.patch(`${AdresseIPPP_}/api/ResetPassword/${email}`,{password:newPassword}).then((result)=>{
       navigation.navigate("Login")
      }).catch((err)=>alert("error in axios"))
      
    }

    else {
      setError('Passwords do not match')
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Your Password</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry={!showNewPassword}
          placeholderTextColor="#aaa"
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
          <Ionicons name={showNewPassword ? 'eye' : 'eye-off'} size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          secureTextEntry={!showConfirmPassword}
          placeholderTextColor="#aaa"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Ionicons name={showConfirmPassword ? 'eye' : 'eye-off'} size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
        <Text style={styles.resetButtonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};



export default ResetPassword;
