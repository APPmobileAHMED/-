import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import styles from "./styleForgetPass/styleForgetPassword"
import {AdresseIPPP_} from '@env'
import { useToast } from '../../../toastProvider/toast';
import { useTranslation } from 'react-i18next';
const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [info, setinfo] = useState({});
  const navigation = useNavigation();
  const { t} = useTranslation()
  const { showToast } = useToast()
  const FindUserByEmail= async (email)=>{
    if(email){
      try{
        const result=await axios.get(`${AdresseIPPP_}/api/getemail/${email}`)
          
         setinfo(result.data)
         console.log(result)
         if(result.data.status==="success"){
          navigation.navigate("ConfirmIdentity",{image:result.data.photo,email:result.data.email,firstname:result.data.firstname,lastname:result.data.lastname})
         }else{
          showToast(t('ForgetPassword:emailnotexist'),"red")
         }
      }catch(err){
        console.log(err)
      }
    }else {
      showToast(t('ForgetPassword:inputEmpty'),"red")
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>{t('ForgetPassword:back')}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{t('ForgetPassword:title')}</Text>
      <Text style={styles.subtitle}>{t('ForgetPassword:subtitle')}</Text>

      <TextInput
        style={styles.input}
        placeholder={t('ForgetPassword:placeholderemail')}
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity
        style={styles.resetButton}
        onPress={()=>FindUserByEmail(email)}
      >
        <Text style={styles.resetText}>{t('ForgetPassword:buttonNext')}</Text>
      </TouchableOpacity>
    </View>
  );
};



export default ForgetPassword;
