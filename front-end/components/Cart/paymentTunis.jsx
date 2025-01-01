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
import styles from "../../components/Cart/StyleCart/StylePaymentTunisie"
import { useTranslation } from 'react-i18next';
 
const PaymentScreenTunisie = () => {
  const {infor,refreshh,setrefreshh,cartProducts,totalPriceTunisie, setTotalPriceTunisie} = useAuth()
  const [isModalVisible, setModalVisible] = useState(true);
  const route = useRoute();
  const [infoPayment, setinfoPayment] = useState([])
  const [StatusPayment, setStatusPayment] = useState([])
  const {paymentId}=route.params
   const navigation=useNavigation()
    const { t} = useTranslation()

   const deleteAllItem=()=>{
    axios.delete(`${AdresseIPPP_}/api/cart/deleteAllitems/${infor.id}`).then((res)=>{
      console.log(res.data)
      
      setrefreshh(!refreshh)
    }).catch((error)=>{console.log(error)})
  }

  useEffect(()=>{
   
    axios.get(`${AdresseIPPP_}/api/flouci/buy/${paymentId}`,{
      userId: infor.id,
      cartItems: cartProducts,
      totalAmount: parseFloat(totalPriceTunisie), 
      username: `${infor.firstname} ${infor.lastname}`,
    })
    .then((res)=>{ 
      if(res.data.result.status==="SUCCESS"){
      setinfoPayment(res.data.result.details)
setStatusPayment(res.data.result.status|| "SUCCESS" )
axios.post(`${AdresseIPPP_}/api/flouci/save`,{
  userId: infor.id,
  totalAmount: parseFloat(totalPriceTunisie),
  username: `${infor.firstname} ${infor.lastname}`,
  cartItems: cartProducts,
})   

}else{
  setStatusPayment("FAILURE")   
}

    }) 
    .catch((error)=>console.log(error))
  },[paymentId])



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
      {StatusPayment==="SUCCESS" &&(<Ionicons name="checkmark-circle" size={80} color="#4CAF50" style={styles.icon} />) ||
       StatusPayment==="FAILURE" &&(<Ionicons name="close-circle" size={80} color="#FF0000" style={styles.icon} />)
      }
      

      {/* Success Message */}
      <Text style={styles.title}>{t('successPayment:title')}</Text>
      <Text style={styles.subtitle}>{t('successPayment:subtitle')}</Text>
  
      {/* User Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>📧 {t('successPayment:email')}: {infoPayment.email}</Text>
        <Text style={styles.infoText}>👤 {t('successPayment:name')}: {infoPayment.name}</Text>
        <Text style={styles.infoText}>📞 {t('successPayment:phone')}: {infoPayment.phone_number}</Text>
        {StatusPayment==="SUCCESS"?(<Text  style={{color:"#4CAF50",fontSize: 16,marginVertical: 3}}>✅ Status: {StatusPayment}</Text>):
        <Text  style={{color:"#FF0000",fontSize: 16,marginVertical: 3}}>❌ Status: {StatusPayment}</Text>
        }
        
      </View>

      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={()=>onClose()}>
        <Text style={styles.buttonText}>{t('successPayment:close')}</Text>
      </TouchableOpacity>
    </View>
  </Modal>
  </View>
  );
};



export default PaymentScreenTunisie;
