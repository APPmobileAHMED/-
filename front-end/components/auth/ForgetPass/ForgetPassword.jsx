import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import styles from "./styleForgetPass/styleForgetPassword"
import {AdresseIPPP_} from '@env'
const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [info, setinfo] = useState({});
  const navigation = useNavigation();

  const FindUserByEmail= async (email)=>{
    if(email){
      try{
        const result=await axios.get(`${AdresseIPPP_}/api/getemail/${email}`)
          
         setinfo(result.data)
         console.log(result)
         if(result.data.status==="success"){
          navigation.navigate("ConfirmIdentity",{image:result.data.photo,email:result.data.email,firstname:result.data.firstname,lastname:result.data.lastname})
         }else{
          alert("your email is not exist ")
         }
      }catch(err){
        console.log(err)
      }
    }else {
      alert("please enter your email")
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>{'< Back'}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Forgot Your Password?</Text>
      <Text style={styles.subtitle}>Enter Your Email To Find Your Account </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity
        style={styles.resetButton}
        onPress={()=>FindUserByEmail(email)}
      >
        <Text style={styles.resetText}>Next Step</Text>
      </TouchableOpacity>
    </View>
  );
};



export default ForgetPassword;
