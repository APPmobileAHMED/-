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
import styles from "../../components/Cart/StyleCart/styleSuccessPaye"
import { useTranslation } from 'react-i18next';

 
const SuccessPaymentStripe = () => {
  const {infor,refreshh,setrefreshh,cartProducts,totalPriceTunisie, setTotalPriceTunisie} = useAuth()
  const [isModalVisible, setModalVisible] = useState(true);
  const route = useRoute();
  const {status}=route.params
   const navigation=useNavigation()
   const { t} = useTranslation()

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

   
    {/* <Modal isVisible={isModalVisible} animationIn="zoomIn" animationOut="zoomOut"> */}
    <View style={styles.modalContent}>
      {/* Success Icon */}
      {status==="SUCCESS" &&(<Ionicons name="checkmark-circle" size={80} color="#4CAF50" style={styles.icon} />) ||
       status==="FAILURE" &&(<Ionicons name="close-circle" size={80} color="#FF0000" style={styles.icon} />)
      }
      

      {/* Success Message */}
      <Text style={styles.title}>{t('successPayment:title')} STRIPE</Text>
      <Text style={styles.subtitle}>{t('successPayment:subtitle')}</Text>
  
      {/* User Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>📧 {t('successPayment:email')}: {infor.email}</Text>
        <Text style={styles.infoText}>👤 {t('successPayment:name')}: {infor.firstname+" "+infor.lastname}</Text>
        <Text style={styles.infoText}>📞 {t('successPayment:phone')}: {infor.phoneNumber}</Text>
        {status==="SUCCESS"?(<Text  style={{color:"#4CAF50",fontSize: 16,marginVertical: 3}}>✅ {t('successPayment:status')}: {status}</Text>):
        <Text  style={{color:"#FF0000",fontSize: 16,marginVertical: 3}}>❌ {t('successPayment:status')}: {status}</Text>
        }
        
      </View>

      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={()=>onClose()}>
        <Text style={styles.buttonText}>{t('successPayment:close')}</Text>
      </TouchableOpacity>
    </View>
  {/* </Modal> */}
  </View>
  );
};



export default SuccessPaymentStripe;
