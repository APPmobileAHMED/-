import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Button,ActivityIndicator, Image,Modal ,Alert} from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Ionicons,MaterialCommunityIcons } from "@expo/vector-icons"
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import {AdresseIPPP_} from '@env'
import { useAuth } from '../authcontext/authcontext';
import axios from 'axios';

 
const SuccessPaymentStripe = () => {
  const {infor,refreshh,setrefreshh,cartProducts,totalPriceTunisie, setTotalPriceTunisie} = useAuth()
  const [isModalVisible, setModalVisible] = useState(true);
  const route = useRoute();
  const {status}=route.params
   const navigation=useNavigation()

   const deleteAllItem=()=>{
    axios.delete(`${AdresseIPPP_}/api/cart/deleteAllitems/${infor.id}`).then((res)=>{
      console.log(res.data)
      
      setrefreshh(!refreshh)
    }).catch((error)=>{console.log(error)})
  }





  const onClose=()=>{
    setModalVisible(false)
    deleteAllItem()
    navigation.navigate('Main', {
      screen: 'Home',   
    });
  }

  return (
    <View >

   
    <Modal isVisible={isModalVisible} animationIn="zoomIn" animationOut="zoomOut">
    <View style={styles.modalContent}>
      {/* Success Icon */}
      {status==="SUCCESS" &&(<Ionicons name="checkmark-circle" size={80} color="#4CAF50" style={styles.icon} />) ||
       status==="FAILURE" &&(<Ionicons name="close-circle" size={80} color="#FF0000" style={styles.icon} />)
      }
      

      {/* Success Message */}
      <Text style={styles.title}>Payment Successful!</Text>
      <Text style={styles.subtitle}>Thank you for your payment</Text>
  
      {/* User Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>📧 Email: {infor.email}</Text>
        <Text style={styles.infoText}>👤 Name: {infor.firstname+" "+infor.lastname}</Text>
        <Text style={styles.infoText}>📞 Phone: {infor.phoneNumber}</Text>
        {status==="SUCCESS"?(<Text  style={{color:"#4CAF50",fontSize: 16,marginVertical: 3}}>✅ Status: {status}</Text>):
        <Text  style={{color:"#FF0000",fontSize: 16,marginVertical: 3}}>❌ Status: {status}</Text>
        }
        
      </View>

      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={()=>onClose()}>
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
    </View>
  </Modal>
  </View>
  );
};

const styles = StyleSheet.create({
 modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontFamily:"bold",
    color: '#4CAF50',
  },
  subtitle: {
    fontFamily:"bold",
    fontSize: 26,
    marginBottom: 15,
    color: '#555',
  },
  infoContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  infoText: {
    
    fontFamily:"bold",
    fontSize: 19,
    marginVertical: 3,
    color: '#333',
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SuccessPaymentStripe;
