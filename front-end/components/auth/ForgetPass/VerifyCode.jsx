import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";
import {AdresseIPPP_} from '@env'
import axios from 'axios';
import { useAuth } from '../../authcontext/authcontext';
import styles from "./styleForgetPass/styleVerifyCode"
import { useToast } from '../../../toastProvider/toast';
import { useTranslation } from 'react-i18next';
const VerifyCode = () => {
  const { t} = useTranslation()
  const route = useRoute()
  const { email } = route.params;
  const {code,setCode} = useAuth();
  const [codeInput,setcodeInpute]=useState(0)
  const { showToast } = useToast()

  const ReSendmail=()=>{
    axios.post(`${AdresseIPPP_}/api/forgetPassword`,{
        to:email,
        subject:"Reset your password"
    }).then((result)=>{
        setCode(result.data.code)
        showToast(t('verifyCode:toastMailSuccess'))
    }).catch((err)=>showToast(t('verifyCode:errorSend'),"red"))
}

      const [timer, setTimer] = useState(60); 
const navigation = useNavigation();
  useEffect(() => {
    let interval = null;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleResendCode = () => {
    setTimer(60); 
    setCode(''); 
    ReSendmail()
  };
 
const verify=()=>{
   
    if(parseInt(codeInput)===code){
        navigation.navigate("ResetPassword",{email:email})}
        else{showToast(t('verifyCode:wrongCode'))}
}

 

  const isButtonDisabled = timer === 0 || codeInput.length !== 6; 

  return (
    <View style={styles.container}>
 <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>{t('verifyCode:back')}</Text>
              </TouchableOpacity>

      <Text style={styles.text}>
      {t('verifyCode:sentCode')}
     
      </Text>
      <Text style={{fontSize: 20,fontFamily: 'bold',color: COLORS.primary,marginBottom: 20,bottom:20,textAlign: 'center',}}>
      {t('verifyCode:check')}
     
      </Text>

      <TextInput
        style={styles.input}
        placeholder={t('verifyCode:placeholderCode')}
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        maxLength={6}
        value={codeInput}
        onChangeText={setcodeInpute}
      />

      <Text style={styles.timerText}>
        {timer > 0
          ? `${t('verifyCode:time')}: ${timer}s`
          : t('verifyCode:TimeOver')}
      </Text>

      <TouchableOpacity
        style={[styles.verifyButton, isButtonDisabled && styles.disabledButton]}
        onPress={() =>{verify()}}
        disabled={isButtonDisabled}
      >
        <Text style={styles.buttonText}>{t('verifyCode:buttonVerify')}</Text>
      </TouchableOpacity>

      {timer === 0 && (
        <TouchableOpacity style={styles.resendButton} onPress={handleResendCode}>
          <Text style={styles.resendText}>{t('verifyCode:buttonResend')}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};



export default VerifyCode;
