import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet,KeyboardAvoidingView,Platform,ScrollView, Image ,Modal} from 'react-native';
import { COLORS } from '../../constants'; 
import { useNavigation } from "@react-navigation/native";
import { useAuth } from '../authcontext/authcontext';
import { Ionicons } from '@expo/vector-icons';
import styles from "../auth/styleAuth/styleLogin"
import { useTranslation } from 'react-i18next';
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const {login,token,handleGoogleSignIn,role, setRole}=useAuth()
  const navigation=useNavigation()
const { t} = useTranslation()
  const handleNext = () => {
        handleGoogleSignIn() 
      };

  return (

    <KeyboardAvoidingView
    
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
  >
    <ScrollView contentContainerStyle={styles.scrollContainer}>

    <View style={styles.container}>
     
      <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
        <Ionicons name="arrow-back" size={33} color="#000" />
      </TouchableOpacity>

      <View style={styles.divider} />
      
      <Text style={styles.title}>{t('Login:title')}</Text>

    
      <TouchableOpacity style={styles.socialButton} onPress={()=>{handleNext()}} >
        <Image
          source={require("../../assets/images/GoogleLogo.png")}
          style={styles.icon}
        />
        <Text style={styles.buttonText}>{t('Login:buttonGoogle')}</Text>
      </TouchableOpacity>

      <View style={styles.dividerWithText}>
  <View style={styles.line} />
  <Text style={styles.orText}>{t('Login:orText')}</Text>
  <View style={styles.line} />
</View>

      
      <TextInput
        style={styles.input}
        placeholder={t('SignUp:placeholderName')}
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.inputPassword, { flex: 1 }]}
          placeholder={t('SignUp:placeholderpassword')}
          secureTextEntry={!showPassword}
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color="#000" />
        </TouchableOpacity>
      </View>

     
      <TouchableOpacity style={styles.loginButton} onPress={()=>{login(password,email)}}>
        <Text style={styles.loginText}>{t('Login:buttonLogin')}</Text>
      </TouchableOpacity>

      
      <TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("ForgetPassword")}>
        <Text style={styles.forgotText}>{t('Login:ForgetPass')}</Text>
        </TouchableOpacity>
        <Text style={styles.OrText}>{t('Login:or')}</Text>
        <TouchableOpacity onPress={()=>navigation.navigate("SignUp")}> 
        <Text style={styles.CreateNewText}>{t('Login:if')}</Text>
           </TouchableOpacity>
        
      </TouchableOpacity>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};


export default Login;
