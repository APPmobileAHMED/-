import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet,KeyboardAvoidingView,Platform,ScrollView, Image ,Modal} from 'react-native';
import { COLORS } from '../../constants'; 
import { useNavigation } from "@react-navigation/native";
import { useAuth } from '../authcontext/authcontext';
import { Ionicons,Fontisto } from '@expo/vector-icons';
import styles from "../auth/styleAuth/styleLogin"
import { useTranslation } from 'react-i18next';
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const {login,token,handleGoogleSignIn,role, setRole,language, setLanguage}=useAuth()
  const navigation=useNavigation()
   const [isDropdownVisible, setDropdownVisible] = useState(false)
const { t,i18n} = useTranslation()


  const handleNext = () => {
        handleGoogleSignIn() 
      }


      const toggleLanguage = (selectedLanguage) => {
        setLanguage(selectedLanguage)
        i18n.changeLanguage(selectedLanguage)
        setDropdownVisible(false) 
        
    }

  return (

    <KeyboardAvoidingView
    
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
  >
    <ScrollView contentContainerStyle={styles.scrollContainer}>

    <View style={styles.container}>
     
      <TouchableOpacity style={styles.backButton} onPress={()=>navigation.navigate("Start1")}>
        <Ionicons name="arrow-back" size={33} color="#000" />
      </TouchableOpacity>


      <TouchableOpacity style={{bottom:107,left:280}} onPress={() => setDropdownVisible(!isDropdownVisible)}>
                    <Fontisto name="world" size={24} color={"#24AD50"}  />
                    </TouchableOpacity>

      {isDropdownVisible && (
                        <View style={styles.dropdown}>
                            <TouchableOpacity onPress={() =>{ toggleLanguage("tunisia")  } }>
                                <Text style={styles.dropdownItem}>Tunisia</Text>
                                <Image source={require("../../assets/images/tunisie.png")} style={{height:20,width:20,left:110,bottom:30,marginBottom:-20}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() =>{ toggleLanguage("french")  }} >
                                <Text style={styles.dropdownItem}>France</Text>
                                <Image source={require("../../assets/images/france.png")} style={{height:20,width:20,left:110,bottom:28,marginBottom:-20}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() =>{ toggleLanguage("english")  }}>
                                <Text style={styles.dropdownItem}>english</Text>
                                <Image source={require("../../assets/images/britsh.png")} style={{height:20,width:20,left:110,bottom:28,marginBottom:-20}}/>
                            </TouchableOpacity>
                        </View>
                    )}

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
