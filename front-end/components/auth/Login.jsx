import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet,KeyboardAvoidingView,Platform,ScrollView, Image ,Modal} from 'react-native';
import { COLORS } from '../../constants'; 
import { useNavigation } from "@react-navigation/native";
import { useAuth } from '../authcontext/authcontext';
import { Ionicons } from '@expo/vector-icons';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const {login,token,handleGoogleSignIn,role, setRole}=useAuth()
  const navigation=useNavigation()

  const handleNext = () => {
        handleGoogleSignIn() 
      };

  return (
    <View style={styles.container}>
     
      <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
        <Ionicons name="arrow-back" size={33} color="#000" />
      </TouchableOpacity>

      <View style={styles.divider} />
      
      <Text style={styles.title}>Login to Ammer Darek</Text>

    
      <TouchableOpacity style={styles.socialButton} onPress={()=>{handleNext()}} >
        <Image
          source={require("../../assets/images/GoogleLogo.png")}
          style={styles.icon}
        />
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>

      <View style={styles.dividerWithText}>
  <View style={styles.line} />
  <Text style={styles.orText}>OR LOGIN WITH EMAIL</Text>
  <View style={styles.line} />
</View>

      
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.inputPassword, { flex: 1 }]}
          placeholder="Password"
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
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      
      <TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("ForgetPassword")}>
        <Text style={styles.forgotText}>Forgot your password?</Text>
        </TouchableOpacity>
        <Text style={styles.OrText}>Or</Text>
        <TouchableOpacity onPress={()=>navigation.navigate("SignUp")}> 
        <Text style={styles.CreateNewText}>Create New account</Text>
           </TouchableOpacity>
        
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    top:10
    
  },
  backButton: {
    marginBottom: 100,
    top:20
  },
  divider: {
    width: '150%',
    borderBottomWidth: 1,
    bottom:80,
    right:20,
    borderBottomColor: '#ccc', 
    marginVertical: 10, 
  },
  title: {
    fontSize: 35,
    fontFamily:"bold",
    color: COLORS.primary,
    marginBottom: 20,
    bottom:40
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: "20%",
    right:10,
    bottom:1
  },
  buttonText: {
    fontSize: 21,
    
    color: '#000',
    fontFamily:"bold",
  },
  dividerWithText: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 25,
     bottom:15
  },
  line: {
    flex: 1, 
    height: 1, 
    backgroundColor: '#ccc', 
    marginHorizontal:3,
   
    
  },
  orText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    fontFamily:"bold"
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontFamily:"bold",
    fontSize: 20,
    color: '#000',
  },
  inputPassword: {
    fontSize: 20,
    color: '#000',
    fontFamily:"bold",

  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontFamily:"bold",
    padding: 15,
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: '#000',
    padding: 6,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginText: {
    fontSize: 28,
    color: '#fff',
    fontFamily:"bold",
  },
  forgotText: {
    textAlign: 'center',
    color: '#666',
    fontFamily:"bold",
    textDecorationLine: 'underline',
    fontSize: 18,
  },
  OrText: {
    textAlign: 'center',
    color: '#666',
    fontFamily:"bold",
    fontSize: 18,
  },
  CreateNewText: {
    textAlign: 'center',
    color: '#666',
    fontFamily:"bold",
    textDecorationLine: 'underline',
    fontSize: 18,
  },

});

export default Login;
