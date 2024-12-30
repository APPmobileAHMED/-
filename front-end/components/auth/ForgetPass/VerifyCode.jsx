import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";
import {AdresseIPPP_} from '@env'
import axios from 'axios';
import { useAuth } from '../../authcontext/authcontext';
import style from "./styleForgetPass/styleVerifyCode"
const VerifyCode = () => {

  const route = useRoute()
  const { email } = route.params;
  const {code,setCode} = useAuth();
  const [codeInput,setcodeInpute]=useState(0)
console.log(code,"hapdok")
  const ReSendmail=()=>{
    axios.post(`${AdresseIPPP_}/api/forgetPassword`,{
        to:email,
        subject:"Reset your password"
    }).then((result)=>{
        setCode(result.data.code)
    }).catch((err)=>alert("errorrr send"))
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
        else{alert("ooops")}
}

 

  const isButtonDisabled = timer === 0 || codeInput.length !== 6; 

  return (
    <View style={styles.container}>
 <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>{'< Back'}</Text>
              </TouchableOpacity>

      <Text style={styles.text}>
      We have sent you a code
     
      </Text>
      <Text style={{fontSize: 20,fontFamily: 'bold',color: COLORS.primary,marginBottom: 20,bottom:20,textAlign: 'center',}}>
      Please check your email.
     
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Code"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        maxLength={6}
        value={codeInput}
        onChangeText={setcodeInpute}
      />

      <Text style={styles.timerText}>
        {timer > 0
          ? `Time remaining: ${timer}s`
          : 'Time is up! Resend the code.'}
      </Text>

      <TouchableOpacity
        style={[styles.verifyButton, isButtonDisabled && styles.disabledButton]}
        onPress={() =>{verify()}}
        disabled={isButtonDisabled}
      >
        <Text style={styles.buttonText}>Verify Code</Text>
      </TouchableOpacity>

      {timer === 0 && (
        <TouchableOpacity style={styles.resendButton} onPress={handleResendCode}>
          <Text style={styles.resendText}>Resend Code</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};



export default VerifyCode;
