import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Button,ActivityIndicator, Image ,Alert} from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Ionicons,MaterialCommunityIcons } from "@expo/vector-icons"
import { useRoute } from "@react-navigation/native";
import { useStripe, CardField,
  
  CardFieldInput,
  PaymentMethod,
  CardForm,
  PaymentIntent, } from '@stripe/stripe-react-native';
import {AdresseIPPP_} from '@env'
import { useAuth } from '../authcontext/authcontext';
import axios from 'axios';

const PaymentScreen = () => {
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


  



const handlePayment = async () => {
  console.log(cardDetails)
  if (!cardDetails?.complete) {
    Alert.alert('Error', 'Please complete the card details.');
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
      Alert.alert('Error', 'Failed to fetch PaymentIntent.');
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
      Alert.alert('Payment failed', error.message);
    } else {
      Alert.alert('Success', 'Payment successful!');
    }
  } catch (err) {
    console.error('Axios Error:', err.response?.data || err.message);
    Alert.alert('Error', err.response?.data?.message || 'Something went wrong.');
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


      
        <Text style={{fontFamily:"bold",fontSize:25}}> card details </Text>
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
          <Text style={styles.buttonText}>Pay Now</Text>
        )}
      </TouchableOpacity>              
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top:"5%",
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardContainer: {
   
    marginBottom: 20,
  },
  cardFieldRow: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    width: '100%', 
  },
  cardFieldStyle: {
    flex: 1, 
    marginRight: 10, 
    height: 50, 
  }, 
  cardImage: {
    width: 300,
    height: 180,
    resizeMode: 'contain',
  },
  formContainer: {
    marginTop:"10%",
    
  },
  input: {
    fontFamily:"bold",
    fontSize:20,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  confirmButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    width: 300,
    height: 180,
    borderRadius: 15,
    backgroundColor: '#111',
    padding: 20,
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  visaText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  cardNumber: {
    top:15,
    color: 'white',
    fontSize: 18,
    letterSpacing: 2,
  },
  label: {
    color: 'gray',
    fontSize: 12,
    marginTop: 10,
  },
  cardHolder: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  validLabel: {
    color: 'gray',
    fontSize: 12,
    position: 'absolute',
    bottom: 20,
    right: 70,
  },
  expiry: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 18,
    right: 5,
  },
  decorations: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default PaymentScreen;
