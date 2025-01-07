import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet,KeyboardAvoidingView,Platform,Dimensions,ScrollView, Image ,Modal} from 'react-native';
import { COLORS } from '../../constants'; 
import { useNavigation } from "@react-navigation/native";
import styles from "../auth/styleAuth/styleStart1"
import { useTranslation } from 'react-i18next';
const { width, height } = Dimensions.get('window');

const Start1 = () => {
    const navigation=useNavigation()
  const { t} = useTranslation()
  return (
    <View style={styles.container}>
    
    <Image
      source={require("../../assets/images/getstart2.png")} 
     style={[styles.image, { width: width, height: height+10 }]}
        resizeMode="cover"
    />

  
    <Text style={styles.title}>Aamer Darek</Text>
    <Text style={styles.subtitle}>
    {t('start1:title')}
    </Text>


    <TouchableOpacity style={styles.signupButton}  onPress={()=>navigation.navigate("Login")}>
      <Text style={styles.loginText}>{t('start1:login')}</Text>
    </TouchableOpacity>

    <View style={styles.linksContainer}>
        <TouchableOpacity onPress={()=>navigation.navigate("SignUp")}>
        <Text style={styles.linkText}>{t('start1:SignUp')}</Text>
        </TouchableOpacity> 
  
      <Text style={styles.orText}> {t('start1:if')} </Text>
      
    </View>
  </View>
);
}




export default Start1;
