import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  backText: {
    fontSize: 18,
    color: COLORS.primary,
  },
  title: {
    fontSize: 28,
    fontFamily: "bold",
    color: COLORS.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "regular",
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    width: '100%',
    fontSize: 18,
    color: '#000',
  },
  resetButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  resetText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: "bold",
  },
});

export default ForgetPassword;
