import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet,KeyboardAvoidingView,Platform,ScrollView, Image ,Modal} from 'react-native';
import { COLORS } from '../../constants'; 
import { useNavigation } from "@react-navigation/native";
import { useAuth } from '../authcontext/authcontext';
import { Ionicons } from '@expo/vector-icons';
const Login = () => {
 
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const {login,token,handleGoogleSignIn,role, setRole}=useAuth()
  const [modalVisible, setModalVisible] = useState(false);
  const [isBuyerSelected, setIsBuyerSelected] = useState(false); 
  const [isSellerSelected, setIsSellerSelected] = useState(false); 
  const navigation=useNavigation()
 
  const handleBuyerSelection = () => {
    setRole("buyer")
    setIsBuyerSelected(true);
    setIsSellerSelected(false); // إلغاء تحديد الـ seller عند تحديد الـ buyer
  };

  // التعامل مع تغيير اختيار الـ seller
  const handleSellerSelection = () => {
    setRole("seller")
    setIsSellerSelected(true);
    setIsBuyerSelected(false); // إلغاء تحديد الـ buyer عند تحديد الـ seller
  };

  const handleNext = () => {
    
    setModalVisible(false);
    handleGoogleSignIn()
    
    // أضف الكود هنا حسب الإجراء اللي تحب تعملو بعد الضغط على "Next"
  };
  return (
    <KeyboardAvoidingView
    
    behavior={Platform.OS === "ios" ? "padding" : null} 
  >
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styles.container}>
      <View style={styles.formBody}>
        <View style={styles.welcomeLines}>
          <Text style={styles.welcomeLine1}>عمر دارك </Text>
          <Text style={styles.welcomeLine2}>مرحبا بيك لنا تلقى أرخص الأسوام</Text>
        </View>
        <View style={styles.inputArea}>
          <View style={styles.formInp}>
            <TextInput 
              placeholder="هوني تحط بريدك الإكتروني" 
              placeholderTextColor={COLORS.white} 
              style={styles.input} 
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.formInp}>
            <TextInput 
              placeholder="كلمة السر" 
              placeholderTextColor={COLORS.white} 
               value={password}
               onChangeText={setPassword}
               style={styles.input}
            />
          </View>
        </View>
        <View style={styles.submitButtonCvr}>
          <TouchableOpacity style={styles.submitButton} onPress={()=>{login(password,email)}}>
            <Text style={styles.submitButtonText}>دخول </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.forgotPass}>
          <TouchableOpacity>
            <Text style={styles.forgotPassText}>نسيت كلمة السر ؟</Text>
          </TouchableOpacity>
        </View>
        <Text style={{padding:20, color:COLORS.white, left:20}} > إذا كان ماعندكش حساب تنجم تدخل لنا وتصنع حساب جديد </Text>
        <TouchableOpacity style={{right:120, top:-37,}}><Text  onPress={()=>{navigation.navigate("SignUp")}} style={{color: '#00FF7F'}} >إضغط  هنا</Text></TouchableOpacity>
        <View style={styles.submitButtonCvrr}>
          <TouchableOpacity style={styles.submitButton} onPress={()=>{setModalVisible(true)}}>
            <Text style={styles.submitButtonText}>الدخول عبر جوجل</Text>
            <Image source={require('../.././assets/images/0-6167_google-app-icon-png-transparent-png-removebg-preview.png')} style={{height:30,width:30,right:70,marginTop:-25}} ></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.bar}></View>

      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Are you sure?</Text>
            <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={[styles.checkbox, isBuyerSelected && styles.checked]}
              onPress={handleBuyerSelection}
            >
              {isBuyerSelected && <Text style={styles.checkmark}>✔</Text>}
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>Buyer</Text>
          </View>

          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={[styles.checkbox, isSellerSelected && styles.checked]}
              onPress={handleSellerSelection}
            >
              {isSellerSelected && <Text style={styles.checkmark}>✔</Text>}
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>Seller</Text>
          </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.nextButton} onPress={()=>{handleNext()}}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  submitButtonCvrr: {
    marginTop: -13,
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
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    backgroundColor: COLORS.gray,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#4CAF50', // اللون عندما يتم تحديد الـ checkbox
  },
  checkmark: {
    color: 'white',
    fontSize: 14,
  },
  checkboxLabel: {
    fontSize: 14,
  },
});

export default Login;
