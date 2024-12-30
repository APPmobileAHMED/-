import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet,KeyboardAvoidingView,Platform,Dimensions,ScrollView, Image ,Modal} from 'react-native';
import { COLORS } from '../../constants'; 
import { useNavigation } from "@react-navigation/native";
import styles from "../auth/styleAuth/styleStart1"
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




export default Start1;
