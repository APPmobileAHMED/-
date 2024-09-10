import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet,KeyboardAvoidingView,Platform,ScrollView } from 'react-native';
import { COLORS,SIZES } from '../../constants';
import { useNavigation } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useAuth } from '../authcontext/authcontext';


const SignUp2 = ({route}) => {
  const navigation=useNavigation()

  const {firstname,lastname,role}=route.params
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  const [confirmPassword,setconfirmPassword]=useState("")

const {register}=useAuth()
   

  
  return (

    <KeyboardAvoidingView
    
    behavior={Platform.OS === "ios" ? "padding" : null} 
  >
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styles.container}>
        <TouchableOpacity style={{bottom:300,right:130}} >
          <Ionicons name="arrow-back-outline" size={45}  onPress={()=>{navigation.goBack()}}/>
          </TouchableOpacity>
      <View style={styles.formBody}>
        <View style={styles.welcomeLines}>
          <Text style={styles.welcomeLine1}>عمر دارك </Text>
          
          <Text style={styles.welcomeLine3}>لنا حط كلمة السر و البريد الإلكتروني الخاصة بك</Text>
        </View>
       
        <View style={styles.inputArea}>
          <View style={styles.formInp}>
            <TextInput 
              placeholder="البريد الإلكتروني " 
              placeholderTextColor={COLORS.white} 
              style={styles.input} 
              value={email}
              onChangeText={setemail}            />
          </View>
          <View style={styles.formInp}>
            <TextInput 
              placeholder="كلمة السر " 
              placeholderTextColor={COLORS.white} 
              style={styles.input} 
              value={password}
              onChangeText={setpassword}
            />
          </View>
          <View style={styles.formInp}>
            <TextInput 
              placeholder="كلمة السر مرة أخرى "
              placeholderTextColor={COLORS.white} 
              style={styles.input} 
              value={confirmPassword}
              onChangeText={setconfirmPassword}
            />
          </View>
         
        </View>
        <View style={styles.submitButtonCvr}>
          <TouchableOpacity style={{left:100,}} onPress={()=>{register(firstname,lastname,email,password,role)}} >
          <Ionicons name="arrow-forward-circle-outline" size={45} color={COLORS.green}/>
          </TouchableOpacity>
        </View>
        <View style={styles.forgotPass}>
         
        </View>
      
    

      </View>
    </View>
    </ScrollView >
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 370,
    height: 800,
    padding: 25,
    backgroundColor: COLORS.gray,
    boxShadow: '0px 15px 60px #00FF7F',
    borderColor: '#2b9962',
    borderRadius: 10,
    position: 'relative',
  },
  formBody: {
    position: 'absolute',
    top: '50%',
    width: 230,
    marginTop: -156,
    marginHorizontal: 25,
  },
  welcomeLines: {
    textAlign: 'center',
    lineHeight: 1,
  },
  welcomeLine1: {
    color: '#00FF7F',
    fontWeight: '600',
    fontSize: 40,
  },
  welcomeLine2: {
    color: '#ffffff',
    fontSize: 18,
    marginTop: 17,
  },
  welcomeLine3:{
    color: '#ffffff',
    fontSize: 14,
    marginTop: 11,
  },
  inputArea: {
    marginTop: 40,
  },
  formInp: {
    padding: 11,
    backgroundColor: 'transparent',
    borderColor: '#e3e3e3',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
  },
  input: {
    width: '100%',
    backgroundColor: 'none',
    fontSize: 13.4,
    color: '#00FF7F',
    borderWidth: 0,
    padding: 0,
    margin: 0,
    
  },
  submitButtonCvr: {
    marginTop: 20,
  },
  submitButton: {
    width: '100%',
    color: '#00FF7F',
    backgroundColor: 'transparent',
    fontWeight: '600',
    fontSize: 14,
    paddingVertical: 14,
    borderColor: '#00FF7F',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  submitButtonText: {
    color: '#00FF7F',
  },
  forgotPass: {
    textAlign: 'center',
    marginTop: 10,
  },
  forgotPassText: {
    color: COLORS.white,
    fontSize: 12,
    textDecorationLine: 'none',
  },
  bar: {
    position: 'absolute',
    left: '50%',
    bottom: -50,
    width: 28,
    height: 8,
    backgroundColor: '#00FF7F',
    borderRadius: 10,
    transform: [{ translateX: -14 }],
  },
  barBefore: {
    content: "",
    position: 'absolute',
    width: 8,
    height: 8,
    backgroundColor: '#ececec',
    borderRadius: '50%',
    right: -20,
  },
  barAfter: {
    content: "",
    position: 'absolute',
    width: 8,
    height: 8,
    backgroundColor: '#ececec',
    borderRadius: '50%',
    right: -38,
  },
});

export default SignUp2;
