import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet,KeyboardAvoidingView,Platform,Dimensions,ScrollView, Image ,Modal} from 'react-native';
import { COLORS } from '../../constants'; 
import { useNavigation } from "@react-navigation/native";
import { useAuth } from '../authcontext/authcontext';
import { Ionicons } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');
const Start1 = () => {
    const navigation=useNavigation()
 
  return (
    <View style={styles.container}>
    
    <Image
      source={require("../../assets/images/getstart2.png")} 
     style={[styles.image, { width: width, height: height+10 }]}
        resizeMode="cover"
    />

  
    <Text style={styles.title}>Fumio</Text>
    <Text style={styles.subtitle}>
      Find your favourite furniture just in one place and save your time
    </Text>


    <TouchableOpacity style={styles.signupButton}  onPress={()=>navigation.navigate("Login")}>
      <Text style={styles.loginText}>Log in</Text>
    </TouchableOpacity>

    <View style={styles.linksContainer}>
        <TouchableOpacity onPress={()=>navigation.navigate("SignUp")}>
        <Text style={styles.linkText}>Sign Up</Text>
        </TouchableOpacity> 
  
      <Text style={styles.orText}> if you don't have an account. </Text>
      
    </View>
  </View>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
},
image: {
    top:35,
    position: 'absolute',
},
title: {
  fontSize: 45,
  color:COLORS.primary,
  fontFamily:"bold",
  marginTop: 20,
},
subtitle: {
  fontSize: 21,
  color: '#00C135',
  fontFamily:"bold",
  textAlign: 'center',
  marginVertical: 10,
},
signupButton: {
  backgroundColor: '#fff',
  paddingVertical: 8,
  paddingHorizontal: "41%",
  borderRadius: 5,
  marginTop: "140%",
},
loginText: {
  fontSize: 24,
  color: '#000',
  fontFamily: 'bold',
  
},
linksContainer: {
  flexDirection: 'row',
  marginTop: 20,
},
linkText: {
  fontSize: 20,
  color: '#FFFFFF',
  fontFamily:"bold",
  top:10,
  textDecorationLine: 'underline',
},
orText: {
  fontSize: 20,
  top:10,
  fontFamily:"bold",
  color: '#FFFFFF',
},
});


export default Start1;
