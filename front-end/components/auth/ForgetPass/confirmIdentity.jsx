import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";
import {AdresseIPPP_} from '@env'
import axios from 'axios';
import { useAuth } from '../../authcontext/authcontext';
const ConfirmIdentity = () => {

const route = useRoute()
const { image,email,firstname,lastname } = route.params;
const navigation = useNavigation();
const {code,setCode} = useAuth();

const sendmail=()=>{
    axios.post(`${AdresseIPPP_}/api/forgetPassword`,{
        to:email,
        subject:"Reset your password"
    }).then((result)=>{
        setCode(result.data.code)
        navigation.navigate("VerifyCode",{email:email})
    }).catch((err)=>alert("errorrr send"))
}
  return (
    <View style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>{'< Back'}</Text>
              </TouchableOpacity>
      <Image
        source={{uri:image}} 
        style={styles.userImage}
      />
      <Text style={styles.text}>Are you {firstname+" "+lastname} ?</Text>
      <Text style={styles.text}>{email}</Text>

      <TouchableOpacity style={styles.confirmButton} onPress={()=>{sendmail()}}>
        <Text style={styles.buttonText}>yes it's me</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={()=>navigation.navigate("Login")}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  userImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  text: {
    fontSize: 20,
    fontFamily: 'bold',
    color: COLORS.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    width: '80%',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'bold',
  },
});

export default ConfirmIdentity;
