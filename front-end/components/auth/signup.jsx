import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet,KeyboardAvoidingView,Platform,Image,ScrollView } from 'react-native';
import { COLORS,SIZES } from '../../constants';
import { useNavigation } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";
import styles from "../auth/styleAuth/styleSignup"
import DropDownPicker from 'react-native-dropdown-picker';
import { useAuth } from '../authcontext/authcontext';
const SignUp = () => {
  const navigation=useNavigation()
   const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [RoleOpen, setRoleOpen] = useState(false);
  const [categoryRole, setCategoryRole] = useState([  { label: 'buyer', value: 'buyer' },{ label: 'seller', value: 'seller' }]);
  const {login,token,handleGoogleSignIn,role, setRole,register}=useAuth()
const [email,setEmail]=useState("")
 const [password,setPassword]=useState("")
 const [confirmPassword, setConfirmPassword] = useState(""); 
 const [showPassword, setShowPassword] = useState(false);
 const [showConfirmPassword, setShowConfirmPassword] = useState(false);

 const handleNext = () => {
  handleGoogleSignIn() 
}; 

 const validatePasswords = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return false;
    }
    register(firstname,lastname,email,password,role)
  };

return (
  <KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : undefined}
>
  <ScrollView contentContainerStyle={styles.scrollContainer}>

  <View style={styles.container}>
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={33} color="#000" />
    </TouchableOpacity>
    <View style={styles.divider} />
    <Text style={styles.title}>Sign Up to Aammer Darek</Text>
    <TouchableOpacity style={styles.socialButton} onPress={() => { handleNext() }}>
      <Image
        source={require("../../assets/images/GoogleLogo.png")}
        style={styles.icon}
      />
      <Text style={styles.buttonText}>Create account with Google</Text>
    </TouchableOpacity>

    <View style={styles.dividerWithText}>
      <View style={styles.line} />
      <Text style={styles.orText}>OR SIGN UP WITH EMAIL</Text>
      <View style={styles.line} />
    </View>

    <View style={styles.namesContainer}>
        <TextInput
          style={[styles.input, styles.inputHalf]}
          placeholder="First Name"
          placeholderTextColor="#aaa"
          value={firstname}
          onChangeText={setFirstname}
        />
        <TextInput
          style={[styles.input, styles.inputHalf]}
          placeholder="Last Name"
          placeholderTextColor="#aaa"
          value={lastname}
          onChangeText={setLastname}
        />
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
    style={[styles.inputPassword,{width:"48%"}]}
    placeholder="Password"
    secureTextEntry={!showPassword}
    placeholderTextColor="#aaa"
    value={password}
    onChangeText={setPassword}
  />
  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
    <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color="#000" style={{right:25,bottom:15}} />
  </TouchableOpacity>
  <TextInput
    style={[styles.inputPassword,{width:"50%",right:15}]}
    placeholder="Confirm Pass"
    secureTextEntry={!showConfirmPassword}
    placeholderTextColor="#aaa"
    value={confirmPassword}
    onChangeText={setConfirmPassword}
  />
  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
    <Ionicons name={showConfirmPassword ? 'eye' : 'eye-off'} size={24} color="#000" style={{right:40,bottom:15}}/>
  </TouchableOpacity>
</View>
<Text style={styles.modalLabel}>Select Role:</Text>
          <View style={{ zIndex: RoleOpen ? 1000 : 1,bottom:45 }}>
            <DropDownPicker
              open={RoleOpen}
              value={role}
              items={categoryRole}
              setOpen={setRoleOpen}
              setValue={setRole}
              setItems={setCategoryRole}
              style={styles.dropdown}
              placeholder="Choose a Role..."
              dropDownDirection="BOTTOM"
              textStyle={{fontFamily: "bold",
                color: '#666', fontSize:20}}
            />
          </View>
    <TouchableOpacity style={styles.loginButton} onPress={() => {validatePasswords()}}>
      <Text style={styles.loginText}>Login</Text>
    </TouchableOpacity>

    <TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.CreateNewText}>Sign In if you have account</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  </View>
  </ScrollView>
  </KeyboardAvoidingView>
);
};



export default SignUp;