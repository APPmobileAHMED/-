import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet,KeyboardAvoidingView,Platform,Image,ScrollView,Modal  } from 'react-native';
import { COLORS,SIZES } from '../../constants';
import { useNavigation } from "@react-navigation/native";
import { Feather, Ionicons,Fontisto } from "@expo/vector-icons";
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
  const [categoryRole, setCategoryRole] = useState([]);
  const {login,token,handleGoogleSignIn,role, setRole,register,language, setLanguage}=useAuth()
const [email,setEmail]=useState("")
 const [password,setPassword]=useState(null)
 const [confirmPassword, setConfirmPassword] = useState(null); 
 const [showPassword, setShowPassword] = useState(false);
 const [isDropdownVisible, setDropdownVisible] = useState(false)
 const [showConfirmPassword, setShowConfirmPassword] = useState(false)
 const [isModalVisible, setModalVisible] = useState(false);
 const { showToast } = useToast()
const { i18n,t} = useTranslation()

 const toggleLanguage = (selectedLanguage) => {
  setLanguage(selectedLanguage)
  i18n.changeLanguage(selectedLanguage)
  setDropdownVisible(false) 
  
}

const handleNext = () => {
  setModalVisible(true); 
};

const closeModal = () => {
  setModalVisible(false); 
};

const confirmRoleAndSignIn = () => {
  setModalVisible(false);
  handleGoogleSignIn();
};



 const validatePasswords = () => {
    if (password !== confirmPassword) {
      showToast(t('SignUp:Wrongpassword'),"red");
      return
    }
    register(firstname,lastname,email,password,role)
  };

return (
  <KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : undefined}
>
  <ScrollView contentContainerStyle={styles.scrollContainer} >

  <View style={styles.container}>

  <Modal visible={isModalVisible} transparent={true} animationType="slide">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Select your role</Text>
                <View style={styles.roleOptions}>
                  <TouchableOpacity onPress={() => setRole('buyer')}>
                    <Text style={[styles.roleOption, role === 'buyer' && styles.selectedRole]}>
                   { t('role:buyer')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setRole('seller')}>
                    <Text style={[styles.roleOption, role === 'seller' && styles.selectedRole,]}>
                    { t('role:seller')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.modalActions}>
                  <Button title={t('PaymentModalByOneProduct:next')} onPress={confirmRoleAndSignIn} color={COLORS.primary}/>
                  <Button title={t('PaymentModalByOneProduct:close')} onPress={closeModal} color={"black"}/>
                </View>
              </View>
            </View>
          </Modal>
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Start1")}>
      <Ionicons name="arrow-back" size={33} color="#000" />
    </TouchableOpacity>

    <TouchableOpacity style={{bottom:107,left:280}} onPress={() => setDropdownVisible(!isDropdownVisible)}>
                    <Fontisto name="world" size={24} color={"#24AD50"}  />
                    </TouchableOpacity>

                    
      {isDropdownVisible && (
                        <View style={styles.dropdownn}>
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
    <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color="#000" style={{right:25,bottom:2}} />
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
    <Ionicons name={showConfirmPassword ? 'eye' : 'eye-off'} size={24} color="#000" style={{right:40,bottom:2}}/>
  </TouchableOpacity>
</View>
<Text style={styles.modalLabel}>{t('SignUp:role')}:</Text>
          <View style={{ zIndex: RoleOpen ? 1000 : 1,bottom:45 }}>
            <DropDownPicker
              open={RoleOpen}
              value={role}
              items={[  { label: t('role:buyer'), value: 'buyer' },{ label: t('role:seller'), value: 'seller' }]}
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