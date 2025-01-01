import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet,KeyboardAvoidingView,Platform,Image,ScrollView } from 'react-native';
import { COLORS,SIZES } from '../../constants';
import { useNavigation } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";
import styles from "../auth/styleAuth/styleSignup"
import DropDownPicker from 'react-native-dropdown-picker';
import { useAuth } from '../authcontext/authcontext';
import { useToast } from '../../toastProvider/toast';
import { useTranslation } from 'react-i18next';
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
 const { showToast } = useToast()
 const handleNext = () => {
  handleGoogleSignIn() 
}; 
const { t} = useTranslation()

 const validatePasswords = () => {
    if (password !== confirmPassword) {
      showToast(t('SignUp:Wrongpassword'),"red");
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
    <Text style={styles.title}>{t('SignUp:title')}</Text>
    <TouchableOpacity style={styles.socialButton} onPress={() => { handleNext() }}>
      <Image
        source={require("../../assets/images/GoogleLogo.png")}
        style={styles.icon}
      />
      <Text style={styles.buttonText}>{t('SignUp:buttonGoogle')}</Text>
    </TouchableOpacity>

    <View style={styles.dividerWithText}>
      <View style={styles.line} />
      <Text style={styles.orText}>{t('SignUp:orText')}</Text>
      <View style={styles.line} />
    </View>

    <View style={styles.namesContainer}>
        <TextInput
          style={[styles.input, styles.inputHalf]}
          placeholder={t('SignUp:placeholderName')}
          placeholderTextColor="#aaa"
          value={firstname}
          onChangeText={setFirstname}
        />
        <TextInput
          style={[styles.input, styles.inputHalf]}
          placeholder={t('SignUp:placeholderLastname')}
          placeholderTextColor="#aaa"
          value={lastname}
          onChangeText={setLastname}
        />
      </View>
    <TextInput
      style={styles.input}
      placeholder={t('SignUp:placeholderemail')}
      placeholderTextColor="#aaa"
      value={email}
      onChangeText={setEmail}
    />
   <View style={styles.passwordContainer}>
  <TextInput
    style={[styles.inputPassword,{width:"48%"}]}
    placeholder={t('SignUp:placeholderpassword')}
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
    placeholder={t('SignUp:placeholderconfirmPass')}
    secureTextEntry={!showConfirmPassword}
    placeholderTextColor="#aaa"
    value={confirmPassword}
    onChangeText={setConfirmPassword}
  />
  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
    <Ionicons name={showConfirmPassword ? 'eye' : 'eye-off'} size={24} color="#000" style={{right:40,bottom:15}}/>
  </TouchableOpacity>
</View>
<Text style={styles.modalLabel}>{t('SignUp:role')}:</Text>
          <View style={{ zIndex: RoleOpen ? 1000 : 1,bottom:45 }}>
            <DropDownPicker
              open={RoleOpen}
              value={role}
              items={categoryRole}
              setOpen={setRoleOpen}
              setValue={setRole}
              setItems={setCategoryRole}
              style={styles.dropdown}
              placeholder={t('SignUp:placeholderRole')}
              dropDownDirection="BOTTOM"
              textStyle={{fontFamily: "bold",
                color: '#666', fontSize:20}}
            />
          </View>
    <TouchableOpacity style={styles.loginButton} onPress={() => {validatePasswords()}}>
      <Text style={styles.loginText}>{t('SignUp:buttonSignup')}</Text>
    </TouchableOpacity>

    <TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.CreateNewText}>{t('SignUp:if')}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  </View>
  </ScrollView>
  </KeyboardAvoidingView>
);
};



export default SignUp;