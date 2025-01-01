import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../constants';
import {AdresseIPPP_} from '@env'
import { useRoute } from "@react-navigation/native";
import axios from 'axios';
import styles from "./styleForgetPass/styleResetpassword"
import { useToast } from '../../../toastProvider/toast';
import { useTranslation } from 'react-i18next';
const ResetPassword = () => {
  const { showToast } = useToast()
    const route = useRoute()
    const { email } = route.params;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigation = useNavigation();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const { t} = useTranslation()
  const handleResetPassword = () => {
    console.log(email,"ahaha")
    if (newPassword === confirmPassword) {
      axios.patch(`${AdresseIPPP_}/api/ResetPassword/${email}`,{password:newPassword}).then((result)=>{
       navigation.navigate("Login")
      }).catch((err)=>alert("error in axios"))
      
    }

    else {
      showToast(t('ResetPassword:matchPass'))
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('ResetPassword:title')}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={t('ResetPassword:placeholderNewPass')}
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
          placeholder={t('ResetPassword:placeholderConfirm')}
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
        <Text style={styles.resetButtonText}>{t('ResetPassword:buttonReset')}</Text>
      </TouchableOpacity>
    </View>
  );
};



export default ResetPassword;
