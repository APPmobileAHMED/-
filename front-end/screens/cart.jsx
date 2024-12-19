import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, SafeAreaView ,Modal} from 'react-native';
import { useAuth } from '../components/authcontext/authcontext';
import {Ionicons,MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native";
import { COLORS } from '../constants';
import {AdresseIPPP_} from '@env'
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import styles from "../style/styleCart.js"

const Cart = () => {

const navigation=useNavigation()

  const {infor,refreshh,setrefreshh, setTotalPriceTunisie} = useAuth()
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
 
  useEffect(() => {
      const handleOpenURL = ({ url }) => {
        const urlParams = new URL(url);
       
        const paymentId = urlParams.searchParams.get('payment_id');
        const target = urlParams.searchParams.get('target') || 'home';
     
       
        console.log('Payment ID:', paymentId);
        console.log('Target Page:', target);
   
       
        if (target === 'PaymentScreenTunisie') {
          navigation.navigate('Main', {
            screen: 'PaymentScreenTunisie',
            params: { paymentId: paymentId },
          });
        } else {
          navigation.navigate('Main', {
            screen: 'PaymentScreenTunisie',
            params: { paymentId: paymentId },
          });
        }
      };
  
      const subscription = Linking.addEventListener('url', handleOpenURL);
  
      return () => {
        subscription.remove();
      };
    }, []);

  


  const handlePaymentOptionSelect = (option) => {
    setSelectedPayment(option);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible); 
  };

const nextPage=( selected )=>{
if(selected==="Visa"){
  navigation.navigate('PaymentScreen',{methodpayment:selectedPayment,totalPrice:totalPrice})
  setIsModalVisible(false)
}else if(selected==="MasterCard"){

  navigation.navigate('PaymentScreen',{methodpayment:selectedPayment,totalPrice:totalPrice})
  setIsModalVisible(false)

}
else if(selected==="Flouci"){
  axios.post(`${AdresseIPPP_}/api/flouci/buy`,{
    amount:totalPrice
  })
  .then((res)=>{
    const {result}=res.data
    if(result){
      console.log(result.link)

        WebBrowser.openBrowserAsync(result.link);
         setIsModalVisible(false)
        
    }
     

  })
  .catch((err)=>console.log(err))
}
}
   
  useEffect(() => {
    axios.get(`${AdresseIPPP_}/api/cart/cartitems/${infor.id}`)
      .then((res) => {
        
        setCartItems(Array.isArray(res.data) ? res.data : []);
        console.log(res.data, "rf");
      })
      .catch((error) => {
        console.log(error);
        setCartItems([]); 
      });
  }, [refreshh, infor.id]);
 

useEffect(() => {
  calculateTotalPrice(cartItems);
}, [cartItems]);

const calculateTotalPrice = (items) => {
  let total = 0;
  items.forEach(item => {
    total += item.product.price * item.quantity; 
  });
  setTotalPrice(total);
  setTotalPriceTunisie(total)
};

const increment = (productId) => {
  setCartItems(prevItems =>
    prevItems.map(item =>
      item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
    )
  );
  calculateTotalPrice(cartItems)
};

const decrement = (productId) => {
  setCartItems(prevItems =>
    prevItems.map(item =>
      item.productId === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    )
  );
  calculateTotalPrice(cartItems); 
};

const updateQuantity=(product,quantity)=>{
 if(quantity===0){

 }else{

  axios.put(`${AdresseIPPP_}/api/cart/updatequantity/${infor.id}`,{productId: product,quantity:quantity})
  .then((res)=>{
    console.log(res.data)
    setrefreshh(!refreshh)
   
  }).catch((error)=>{console.log(error)})}
}

  const deleteItem=(product)=>{
    axios.delete(`${AdresseIPPP_}/api/cart/deleteitems/${infor.id}`,{
      data:{productId: product}
}).then((res)=>{
      console.log(res.data)
      alert("success")
      setrefreshh(!refreshh)
    }).catch((error)=>{console.log(error)})
  }

  




  return (
    
    <View style={styles.container}>
     
      <TouchableOpacity onPress={() => { navigation.goBack() }}>
        <MaterialCommunityIcons name="arrow-left" size={30} color={COLORS.black} style={{ marginTop: 3 }} />
      </TouchableOpacity>
      <Text style={styles.header}>المشتريات</Text>

      {cartItems.length > 0 ? (
  <FlatList
    data={cartItems}
    keyExtractor={(item, index) => index.toString()} // Use unique keys
    renderItem={({ item }) => (
      <View style={styles.cartItem}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ProductDetails", {
              productId: item.productId,
              sellerId: item.product.userId,
            })
          }
        >
          <Image source={{ uri: item.product.img1 }} style={styles.itemImage} />
        </TouchableOpacity>

        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.product.name}</Text>
          <Text style={styles.itemPrice}>DT {item.product.price}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => {decrement(item.productId);updateQuantity(item.productId,item.quantity-1)}}>
              <Ionicons name='remove-circle-outline' size={23} style={{marginLeft:10}}/>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => {increment(item.productId);updateQuantity(item.productId,item.quantity+1)}}>
            <Ionicons name='add-circle-outline'size={23} style={{left:10}}/>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={() => deleteItem(item.product.id)}>
       
         <Ionicons name='trash-bin' size={25} style={{top:25}} color={"red"}/>
          
        </TouchableOpacity>
      </View>
    )}
    contentContainerStyle={{ paddingBottom: 178 }} 
  />
) : (
  <Text style={{ fontFamily: 'bold', fontSize: 40, top: 250, left: -65 }}>
    السلة فارغة
  </Text>
)}


      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.totalText}>Total {cartItems.length} Items</Text>
          <Text style={styles.totalPrice} > {totalPrice} DT</Text>
          <TouchableOpacity style={styles.checkoutButton} onPress={toggleModal}>
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}

<Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Payment</Text>

            <TouchableOpacity onPress={()=>{handlePaymentOptionSelect("MasterCard")}} style={[styles.paymentOption, selectedPayment === 'MasterCard' && styles.selectedPaymentOption]}>
              <Image source={require('../assets/images/credit.png')} style={{ width: 36, height: 22, right: 5 }} />
              <Text style={[styles.paymentText, selectedPayment === 'MasterCard' && styles.selectedPaymentText]}>Credit Card</Text>
              <Ionicons name={selectedPayment === 'MasterCard' ? "ellipse" : "ellipse-outline"} size={20} color={selectedPayment === 'MasterCard' ? "#fff" : "#000"} />
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={()=>{handlePaymentOptionSelect("Paypal")}} style={[styles.paymentOption, selectedPayment === 'Paypal' && styles.selectedPaymentOption]}>
              <Image source={require('../assets/images/paypal.webp')} style={styles.paymentIcon} />
              <Text style={[styles.paymentText, selectedPayment === 'Paypal' && styles.selectedPaymentText]}>Paypal</Text>
              <Ionicons name={selectedPayment === 'Paypal' ? "ellipse" : "ellipse-outline"} size={20} color={selectedPayment === 'Paypal' ? "#fff" : "#000"} />
            </TouchableOpacity> */}

            <TouchableOpacity onPress={()=>{handlePaymentOptionSelect("Visa")}} style={[styles.paymentOption, selectedPayment === 'Visa' && styles.selectedPaymentOption]}>
              <Image source={require('../assets/images/visa.png')} style={{ width: 68, height: 22, right: 5 }} />
              <Text style={[styles.paymentText, selectedPayment === 'Visa' && styles.selectedPaymentText]}>Visa</Text>
              <Ionicons name={selectedPayment === 'Visa' ? "ellipse" : "ellipse-outline"} size={20} color={selectedPayment === 'Visa' ? "#fff" : "#000"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{handlePaymentOptionSelect("Flouci")}} style={[styles.paymentOption, selectedPayment === 'Flouci' && styles.selectedPaymentOption]}>
              <Image source={require('../assets/images/flouci_logo_new.webp')} style={{ width: 110, height: 22, right: 5 }} />
              <Text style={[styles.paymentTextt, selectedPayment === 'Flouci' && styles.selectedPaymentTextt]}> الدفع بتونسي </Text>
              <Ionicons name={selectedPayment === 'Flouci' ? "ellipse" : "ellipse-outline"} size={20} color={selectedPayment === 'Flouci' ? "#fff" : "#000"} />
            </TouchableOpacity>

           

            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> {nextPage(selectedPayment)}} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>next</Text>
            </TouchableOpacity> 
          </View>
        </View>
      </Modal>


    </View>
  );
};



export default Cart;
