import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Button,ActivityIndicator, Image ,Alert} from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Ionicons,MaterialCommunityIcons } from "@expo/vector-icons"
import { useRoute } from "@react-navigation/native";

import {AdresseIPPP_} from '@env'
import { useAuth } from '../authcontext/authcontext';
import axios from 'axios';

const PaymentScreenTunisie = () => {
  const {infor,refreshh,setrefreshh,cartProducts} = useAuth()
  const route = useRoute();
  const {paymentId}=route.params

  useEffect(()=>{
    axios.get(`${AdresseIPPP_}/api/flouci/buy/${paymentId}`)
    .then((res)=>{

    })
    .catch((error)=>console.log(error))
  },[])

  return (
 <View>
   <Text>{paymentId}</Text>
 </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top:"5%",
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardContainer: {
   
    marginBottom: 20,
  },
  cardFieldRow: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    width: '100%', 
  },
  cardFieldStyle: {
    flex: 1, 
    marginRight: 10, 
    height: 50, 
  }, 
  cardImage: {
    width: 300,
    height: 180,
    resizeMode: 'contain',
  },
  formContainer: {
    marginTop:"10%",
    
  },
  input: {
    fontFamily:"bold",
    fontSize:20,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  confirmButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    width: 300,
    height: 180,
    borderRadius: 15,
    backgroundColor: '#111',
    padding: 20,
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  visaText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  cardNumber: {
    top:15,
    color: 'white',
    fontSize: 18,
    letterSpacing: 2,
  },
  label: {
    color: 'gray',
    fontSize: 12,
    marginTop: 10,
  },
  cardHolder: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  validLabel: {
    color: 'gray',
    fontSize: 12,
    position: 'absolute',
    bottom: 20,
    right: 70,
  },
  expiry: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 18,
    right: 5,
  },
  decorations: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default PaymentScreenTunisie;
