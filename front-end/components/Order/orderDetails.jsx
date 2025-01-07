import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity,KeyboardAvoidingView,ScrollView, StyleSheet, Animated } from 'react-native';
import { Ionicons,Fontisto } from "@expo/vector-icons";
import { COLORS } from '../../constants';
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import axios from 'axios';
import {AdresseIPPP_} from '@env'
import { useAuth } from '../authcontext/authcontext';
import { useTranslation } from 'react-i18next';



const OrderDetails = () => {
  const[allProductOrder,setall]=useState([])
  const {infor,isProductInWishlist,setrefreshh,refreshh,isProductInCart}=useAuth()
  const navigation = useNavigation();
  const { t} = useTranslation()
  
 const route=useRoute()
 const{OrderId}=route.params
useEffect(()=>{
    axios.get(`${AdresseIPPP_}/api/order/getorderItems/${OrderId}/${infor.id}`)
    .then((result)=>{
        setall(result.data)
        
    })
    .catch((err)=>console.log(err))
},[OrderId])


  const renderCard = ({ item }) => {
    const scaleValue = new Animated.Value(1);
    return (
      <TouchableOpacity onPress={()=>navigation.navigate("ProductDetails",{productId:item.product.id,sellerId:item.product.userId,price:item.product.price})}> 
        <View style={styles.item}>
      <Image source={{ uri: item.product.img1 }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.product.name}</Text>
      <View style={{width:110,bottom:-15}}>
        <Text style={styles.price}> {t('ProductCardView:price')} :{item.product.price}</Text>
        <Text style={styles.rating}>{t('ProductCardView:length')} : {item.product.length}</Text>
        <Text style={styles.sizes}>{t('ProductCardView:width')} : {item.product.width}</Text>
        <Text style={{fontSize: 16,fontFamily:"bold",color: 'green',}}> {t('OrderDetails:quantity')} : x{item.quantity}</Text>
        </View>
        
       
      </View>    
    </View>
      </TouchableOpacity>
      
    );
  };






  return (
   
    
    <View style={styles.container}>
    
    <TouchableOpacity style={{ left: 20,marginTop:30,top:35,marginBottom:20 }}>
         <Ionicons name="arrow-back-outline" size={35} color={COLORS.black} onPress={() => { navigation.navigate("OrderScreen") }} />
       </TouchableOpacity>
       <Text style={{fontFamily:"bold",fontSize:24,left:"35%",}} ></Text>
       <Text  style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center',bottom:70 }}>{t('OrderDetails:title')} {OrderId}</Text>
      
    <FlatList
         data={allProductOrder}
         keyExtractor={item => item.id}
         renderItem={renderCard}
         contentContainerStyle={{ paddingBottom: 90,elevation:4,backgroundColor:"white" }} 
         
 
      />
  </View>
   
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
      paddingTop: 20,
     
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
      marginTop:4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily:"bold",
  },
  headerIcons: {
    flexDirection: 'row',
  },
  
  item: {
    elevation:4,
    backgroundColor:"white",
  flexDirection: 'row',
  padding: 5,
  marginVertical: 8,
  marginHorizontal: 16,
  
  borderRadius: 10,
  alignItems: 'center', // تركز المحتوى عموديا
  },
  image: {
  
  aspectRatio: 1/1,
  height: 110,
  borderRadius: 10,
  marginRight: 10,
  },
  textContainer: {
  flex: 1,
  fontFamily:"bold",
  justifyContent: 'center',
  bottom:30
  
  },
  cartticon:{
  top:40,
  right:8
  
  },
  title: {
  fontSize: 16,
  fontFamily:"bold",
  marginVertical: 5,
  top:30,
  width:55,left:120
  },
  description: {
  fontSize: 14,
  fontFamily:"bold",
  color: '#333',
  marginBottom: 5,
  },
  price: {
  fontSize: 16,
  fontFamily:"bold",
  right:2,
  color: 'green',
  },
  rating: {
  fontSize: 16,
  fontFamily:"bold",
  },
  sizes: {
  fontSize: 16,
  fontFamily:"bold",
  },
  heartIcon: {
  alignSelf: 'center',
  marginLeft: 10,
  bottom:45,
  left:25
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 18,
    top: 10,
    borderRadius:15
    
    
  },
  filterButton: {
    fontSize: 16,
    fontFamily:"bold",
    padding: 10,
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
    marginHorizontal: 5,
    transition: 'background-color 0.2s ease',
  },
  selectedFilter: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
  },
  });

export default OrderDetails;
