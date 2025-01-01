import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";
import {AdresseIPPP_} from '@env'
import axios from 'axios';
import { useAuth } from '../../authcontext/authcontext';
import styles from "./styleForgetPass/styleConfirmIdentity"
import { useToast } from '../../../toastProvider/toast';
import { useTranslation } from 'react-i18next';
const ConfirmIdentity = () => {

const route = useRoute()
const { image,email,firstname,lastname } = route.params;
const navigation = useNavigation();
const {code,setCode} = useAuth();
const { showToast } = useToast()
const { t} = useTranslation()
const sendmail=()=>{
    axios.post(`${AdresseIPPP_}/api/forgetPassword`,{
        to:email,
        subject:"Reset your password"
    }).then((result)=>{
      showToast(t('ConfirmIdentity:sendSucces'))
        setCode(result.data.code)
        navigation.navigate("VerifyCode",{email:email})
    }).catch((err)=>showToast(t('ConfirmIdentity:errorsend'),"red"))
}
  return (
    <View style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>{t('ConfirmIdentity:back')}</Text>
              </TouchableOpacity>
      <Image
        source={{uri:image}} 
        style={styles.userImage}
      />
      <Text style={styles.text}>{t('ConfirmIdentity:areYou')} {firstname+" "+lastname} ?</Text>
      <Text style={styles.text}>{email}</Text>

      <TouchableOpacity style={styles.confirmButton} onPress={()=>{sendmail()}}>
        <Text style={styles.buttonText}>{t('ConfirmIdentity:me')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={()=>navigation.navigate("Login")}>
        <Text style={styles.buttonText}>{t('ConfirmIdentity:cancel')}</Text>
      </TouchableOpacity>
    </View>
  );
};


export default ConfirmIdentity;
