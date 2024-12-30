import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity,KeyboardAvoidingView,ScrollView, StyleSheet, Animated } from 'react-native';
import { Ionicons,Fontisto } from "@expo/vector-icons";
import { COLORS } from '../../constants';
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import axios from 'axios';
import {AdresseIPPP_} from '@env'
import { useAuth } from '../authcontext/authcontext';
import styles from "../../components/home/styleHomeFile/styleProductCategories"

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
   <Text style={styles.price}> Price :{item.price}</Text>
          <Text style={styles.rating}>length : {item.length}</Text>
          <Text style={styles.sizes}>width : {item.width}</Text>
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
       <View style={{elevation:4,marginHorizontal:5,backgroundColor:"white",borderRadius:20,marginBottom:12,top:5}}>

       
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
       </View>
    
    <FlatList
         data={allproductBycategories}
         keyExtractor={item => item.id}
         renderItem={renderCard}
         contentContainerStyle={{ paddingBottom: 90,elevation:4,backgroundColor:"white" }} 
         
 
      />
  </View>
   
  );
};



export default ProductWithCategorie;
