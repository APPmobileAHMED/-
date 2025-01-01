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
import styles from "../styleScreens/styleCart"
import PaymentModal from '../modals/PaymentModal';
import { useToast } from '../toastProvider/toast';
import { useTranslation } from 'react-i18next';

const Cart = () => {
const { t} = useTranslation()
const navigation=useNavigation()

  const {infor,refreshh,setrefreshh, setTotalPriceTunisie} = useAuth()
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const { showToast } = useToast();
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
      showToast(t('cart:deleteItem'),"red")
      setrefreshh(!refreshh)
    }).catch((error)=>{console.log(error)})
  }

  




  return (
    
    <View style={styles.container}>
     
      <TouchableOpacity onPress={() => { navigation.goBack() }}>
        <MaterialCommunityIcons name="arrow-left" size={30} color={COLORS.black} style={{ marginTop: 3 }} />
      </TouchableOpacity>
      <Text style={styles.header}>{t('cart:Purchases')}</Text>

      {cartItems.length > 0 ? (
  <FlatList
    data={cartItems}
    keyExtractor={(item, index) => index.toString()} 
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
          <View style={{width:100,marginBottom:12,marginTop:-25}}>
          <Text style={styles.itemPrice}>{t('cart:price')}: <Text style={{color:COLORS.primary}}>{item.product.price} dinars</Text> </Text>
          <Text style={styles.itemPrice}>{t('cart:length')}: <Text style={{color:COLORS.primary}}>{item.product.width}</Text></Text>
          <Text style={styles.itemPrice}>{t('cart:width')}:<Text style={{color:COLORS.primary}}>{item.product.length}</Text></Text>
          </View>
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
       
         <Ionicons name='trash-bin' size={25} style={{top:25}} color={COLORS.tertiary}/>
          
        </TouchableOpacity>
      </View>
    )}
    contentContainerStyle={{ paddingBottom: 178 }} 
  />
) : (
  <Text style={{ fontFamily: 'bold', fontSize: 40, top: 250, left: -65 }}>
   {t('cart:notfound')}
  </Text>
)}


      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.totalText}>{t('cart:total')} {cartItems.length} {t('cart:Items')}</Text>
          <Text style={styles.totalPrice} > {totalPrice} DT</Text>
          <TouchableOpacity style={styles.checkoutButton} onPress={toggleModal}>
            <Text style={styles.checkoutButtonText}>{t('cart:checkout')}</Text>
          </TouchableOpacity>
        </View>
      )}

<PaymentModal
  isModalVisible={isModalVisible}
  toggleModal={toggleModal}
  handlePaymentOptionSelect={handlePaymentOptionSelect}
  selectedPayment={selectedPayment}
  nextPage={nextPage}
  
/>

    </View>
  );
};



export default Cart;
