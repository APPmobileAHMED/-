import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity,KeyboardAvoidingView,ScrollView, StyleSheet, Animated } from 'react-native';
import { Ionicons,Fontisto } from "@expo/vector-icons";
import { COLORS } from '../../constants';
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import axios from 'axios';
import {AdresseIPPP_} from '@env'
import { useAuth } from '../authcontext/authcontext';


const ProductWithCategorie = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const[allproductBycategories,setall]=useState([])
  const {infor,isProductInWishlist,setrefreshh,refreshh,isProductInCart}=useAuth()
  const[refresh,setrefresh]=useState(false)
  const navigation = useNavigation();
  
 const route=useRoute()
 const{name}=route.params
 useEffect(()=>{
  console.log(name)
  axios.get(`${AdresseIPPP_}/api/category/${name}`).then((res)=>{
     setall(res.data) 
    console.log(res.data,"hhhhhsssssssssssss")
   })
  .catch((error)=>console.log(error))
 },[refresh])
const specifiqueproduct=(selectcategory)=>{
  axios.get(`${AdresseIPPP_}/api/category/${name}/${selectcategory}`).then((res)=>{
    setall(res.data) 
   console.log(res.data)
  })
 .catch((error)=>console.log(error))
}
const addtoWishlist=(product)=>{
  axios.post(`${AdresseIPPP_}/api/wishlist/add/${infor.id}`,{
    productId: product
}).then((res)=>{
    console.log(res.data)
    
    setrefreshh(!refreshh) 
    alert("added to cart")
  }).catch((error)=>{console.log("kkjf")})
}

deleteFavoriteItem=(id)=>{
  axios.delete(`${AdresseIPPP_}/api/wishlist/delete/${id}`)
  .then((res) => {
       alert("item deleted")
   setrefreshh(!refreshh)
 })
 .catch((error) => {
   console.log("oops");
     
 });
}

const addtocart=(product)=>{
  axios.post(`${AdresseIPPP_}/api/cart/addtocart/${infor.id}`,{
    productId: product
}).then((res)=>{
    console.log(res.data)
    
    setrefreshh(!refreshh) 
    alert("added to cart")
  }).catch((error)=>{console.log("kkjf")})
}
const deleteItem=(product)=>{
  axios.delete(`${AdresseIPPP_}/api/cart/deleteitems/${infor.id}`,{
    data:{productId: product}
}).then((res)=>{
    console.log(res.data)
    alert("deleted ")
    setrefreshh(!refreshh)
  }).catch((error)=>{console.log(error)})
}

  const renderCard = ({ item }) => {
    const scaleValue = new Animated.Value(1);
    return (
      <View style={styles.item}>
      <Image source={{ uri: item.img1 }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.rating}>Rating: {item.rating}</Text>
        <Text style={styles.sizes}>Sizes: {item.width}</Text>
      </View>
      {isProductInWishlist(item.id) ? (
        <TouchableOpacity style={styles.heartIcon} onPress={() => deleteFavoriteItem(item.id)}>
          <Ionicons 
                        name="heart-dislike" 
                        size={25}
                        style={{top:1}}
                        color={"#f95151"} 
                    />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.heartIcon} onPress={() => addtoWishlist(item.id)}>
          <Ionicons 
                        name="heart-circle" 
                        size={33}
                        style={{top:1}}
                        color={"black"} 
                    />
        </TouchableOpacity>
      )}

      {isProductInCart(item.id) ? (
        <TouchableOpacity style={styles.cartticon} onPress={() => deleteItem(item.id)}>
          <Fontisto name="shopping-basket-remove" size={25} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity  style={styles.cartticon} onPress={() => addtocart(item.id)}>
          <Fontisto name="shopping-basket-add" size={25}  />
        </TouchableOpacity>
      )}
      
    </View>
    );
  };






  return (
   
    
    <View style={styles.container}>
    
    <TouchableOpacity style={{ left: 10,marginTop:25 }}>
         <Ionicons name="arrow-back-outline" size={35} color={COLORS.black} onPress={() => { navigation.goBack() }} />
       </TouchableOpacity>
       <View style={styles.filterContainer}>
         <TouchableOpacity onPress={() => {setSelectedCategory('خشب') ;specifiqueproduct("خشب")}}>
           <Text style={[styles.filterButton, selectedCategory === 'خشب' && styles.selectedFilter]}>خشب</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => {setSelectedCategory('ألومنيوم');specifiqueproduct("ألومنيوم")}}>
           <Text style={[styles.filterButton, selectedCategory === 'ألومنيوم' && styles.selectedFilter]}>ألومنيوم</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => {setSelectedCategory('حديد');specifiqueproduct("حديدية")}}>
           <Text style={[styles.filterButton, selectedCategory === 'حديد' && styles.selectedFilter]}>حديد</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => {setSelectedCategory('');setrefresh(!refresh)}}>
           <Text style={styles.filterButton}>كل الأنواع</Text>
         </TouchableOpacity>
       </View>

    
    <FlatList
         data={allproductBycategories}
         keyExtractor={item => item.id}
         renderItem={renderCard}
         contentContainerStyle={{ paddingBottom: 90 }} 
         
 
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
flexDirection: 'row',
padding: 5,
marginVertical: 8,
marginHorizontal: 16,
backgroundColor: '#f9f9f9',
borderRadius: 10,
alignItems: 'center', // تركز المحتوى عموديا
},
image: {
width: 100,
height: 100,
borderRadius: 10,
marginRight: 10,
},
textContainer: {
flex: 1,
fontFamily:"bold",
justifyContent: 'center',
},
cartticon:{
top:50
},
title: {
fontSize: 16,
fontFamily:"bold",
marginVertical: 5,
},
description: {
fontSize: 14,
fontFamily:"bold",
color: '#333',
marginBottom: 5,
},
price: {
fontSize: 18,
fontFamily:"bold",
color: 'green',
},
rating: {
fontSize: 16,
fontFamily:"bold",
},
sizes: {
fontSize: 14,
},
heartIcon: {
alignSelf: 'center',
marginLeft: 10,
bottom:50,
left:25
},
filterContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginBottom: 20,
  top: 15,
  
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


export default ProductWithCategorie;
