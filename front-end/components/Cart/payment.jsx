import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Button,ActivityIndicator, Image} from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useStripe, CardField} from '@stripe/stripe-react-native';
import {AdresseIPPP_} from '@env'
import { useAuth } from '../authcontext/authcontext';
import axios from 'axios';
import styles from "../../components/Cart/StyleCart/stylePayment"
import { useToast } from '../../toastProvider/toast';
import { useTranslation } from 'react-i18next';

const PaymentScreen = () => {
  const navigation=useNavigation()
  const { t} = useTranslation()
  const {infor,refreshh,setrefreshh,cartProducts} = useAuth()
  const route = useRoute();
  const {methodpayment,totalPrice}=route.params
  const { confirmPayment, createPaymentMethod } = useStripe();
  const [cardDetails, setCardDetails] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [mounth, setmounth] = useState("");
  const [methode, setmethode] = useState("");
  const [year, setyear] = useState("");
  const [loading, setLoading] = useState(false);
 const { showToast } = useToast();


const handlePayment = async () => {
  console.log(cardDetails)
  if (!cardDetails?.complete) {
  showToast(t('PaymentStripe:inputEmpty'),"red");
    return;
  }

  setLoading(true);
  
  try {
 
    const response = await axios.post(`${AdresseIPPP_}/api/payment/buy`, {
      userId: infor.id,
      cartItems: cartProducts,
      totalAmount: parseFloat(totalPrice), 
      username: `${infor.firstname} ${infor.lastname}`,
    });

    const { clientSecret } = response.data;

    if (!clientSecret) {
    showToast(t('PaymentStripe:failedFetch'),"red");
      return;
    }

    
    const { error } = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
      paymentMethodData: {
        billingDetails: {
          email: infor.email,
          name: `${infor.firstname} ${infor.lastname}`,
        },
      },
    });

    if (error) {
    showToast(t('PaymentStripe:paymentFailed'),"red")
      navigation.navigate('Main', {
        screen: 'SuccessPaymentStripe',
        params: { status: "FAILURE" },
      });
    } else {
      
      navigation.navigate('Main', {
        screen: 'SuccessPaymentStripe',
        params: { status: "SUCCESS" },
      });
    }
  } catch (err) {
    console.error('Axios Error:', err.response?.data || err.message);
  showToast(t('PaymentStripe:wrong'),"red");
    navigation.navigate('Main', {
      screen: 'SuccessPaymentStripe',
      params: { status: "FAILURE" },
    });
  } finally {
    setLoading(false);
  }
};




  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>
      <View style={styles.cardContainer}>
      <View style={styles.card}>
      <Text style={styles.visaText}>
        
        {methode==="MasterCard"&&(
<Text>MasterCard </Text> ) || methode==="Visa" && ( <Text>Visa </Text> ) ||
 methode==="Visa"&& (<Text>Visa</Text>)||
 
 methode==="Discover"&& (<Text>Discover</Text>)||

 methode==="AmericanExpress"&& (<Text>American Express</Text>)||

 methode==="DinersClub"&& (<Text>Diners Club</Text>)||
 methode==="UnionPay"&& (<Text>UnionPay</Text>)
}
</Text>
      <Text style={styles.cardNumber}>{cardNumber? `**** **** **** ${cardNumber}` :"**** **** **** ****"}</Text>
      <Text style={styles.label}>CARD HOLDER NAME</Text>
      <Text style={styles.cardHolder}>{infor.firstname+" "+infor.lastname}</Text>
      <Text style={styles.validLabel}>VALID THRU</Text>
      <Text style={styles.expiry}> {mounth}/{year} </Text>
      <Svg height="100%" width="100%" style={styles.decorations}>
      <Image
       source={
    methode === "Discover"
      ? require("../../assets/images/discover.png")
      : methode === "Visa"
      ? require("../../assets/images/visa circle.png")
      : methode === "UnionPay"
      ? require("../../assets/images/unionpay.png")
      : methode === "DinersClub"
      ? require("../../assets/images/dinerss.png")
      : methode === "AmericanExpress"
      ? require("../../assets/images/american_express-512.webp")
      : methode === "MasterCard"
      ? require("../../assets/images/creditcard circl.png")
      
       :require("../../assets/images/visa.png")
  }
  style={{
    width: 90,
    height: 60,
    right: 5,
    top: 11,
    left: 10,
    borderRadius: 30,
  }}
  />
        
        <Rect x="250" y="50" width="60" height="60" fill="#666" />
      </Svg>
    </View>
          </View>
      <View style={styles.cardContainer}>


      
        <Text style={{fontFamily:"bold",fontSize:25}}> {t('PaymentStripe:detailsCard')} </Text>
<View style={styles.cardFieldRow}> 
  

<CardField
      postalCodeEnabled={true}   
      placeholders={{
        number: '4242 4242 4242 4242',
            
      }}
      
      cardStyle={{
        backgroundColor: '#FFFFFF',
        textColor: '#000000',
        
      }}
     style={styles.cardFieldStyle}
      onCardChange={(cardDetails) => {  
        setCardDetails(cardDetails)
        setmounth(cardDetails.expiryMonth)
        setyear(cardDetails.expiryYear)
        setCardNumber(cardDetails.last4)
        setmethode(cardDetails.brand || methodpayment)
      }}
      onFocus={(focusedField) => {
        console.log('focusField', focusedField);
      }}
      />
</View>
        
        
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: loading ? '#ccc' : 'white' }]}
        onPress={handlePayment}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{t('PaymentStripe:buttonPay')}</Text>
        )}
      </TouchableOpacity>              
    </View>
  );
};



export default PaymentScreen;
