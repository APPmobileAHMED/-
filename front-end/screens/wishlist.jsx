import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity,ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../components/authcontext/authcontext';
import axios from 'axios';
import {AdresseIPPP_} from '@env'
import { COLORS, SIZES } from "../constants";
import { useNavigation } from "@react-navigation/native";

const Whishlist = () => {
  const navigation=useNavigation()

  const [favorite, setfavorite] = useState([]);
  const {infor,refreshh,setrefreshh,isProductInCart,cartProducts} = useAuth()


 


  useEffect(() => {
    axios.get(`${AdresseIPPP_}/api/wishlist/get/${infor.id}`)
      .then((res) => {
        
         setfavorite(Array.isArray(res.data) ? res.data : []);
        console.log(res.data, "rf");
      })
      .catch((error) => {
        console.log(error);
           setfavorite([]);
      });
  }, [refreshh, infor.id]);


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
    }).catch((error)=>{console.log("erorr oops")})
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
 
  const Item = (item) => {
    const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
      item.product.img1,
      item.product.img2,
      item.product.img3,
      item.product.img4,
    ].filter((img) => img);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000); // كل 3 ثواني يتبدل
      return () => clearInterval(interval); // تنظيف التايمر
    }, [images]);
  
    useEffect(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          x: currentIndex * 100, // عرض الصورة
          animated: true,
        });
      }
    }, [currentIndex]);
    return(
    
    <View style={styles.item}>
    <TouchableOpacity onPress={()=>navigation.navigate("ProductDetails", { productId: item.productId, sellerId: item.product.userId })}>
    <ScrollView
        horizontal
        pagingEnabled
        ref={scrollRef}  
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
      >
        {images.map((img, index) => (
          <Image key={index} source={{ uri: img }} style={styles.carouselImage} />
        ))}
      </ScrollView>
    </TouchableOpacity>
       
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.product.name}</Text>
        <Text style={styles.description}>{item.product.description}</Text>
        <Text style={styles.price}>الثمن :{item.product.price}</Text>
        <Text style={styles.length}>الطول: {item.product.length}</Text>
        <Text style={styles.width}>العرض: {item.product.width}</Text>
      </View>
      <TouchableOpacity style={styles.heartIcon} onPress={()=>deleteFavoriteItem(item.productId)}>
        <Ionicons name="heart-dislike-outline" size={24} color="red" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.cartticon}>

      {isProductInCart(item.productId) ? (
        <TouchableOpacity onPress={() => deleteItem(item.productId)}>
          <Ionicons name="bag-check-outline" size={28} color="green" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => addtocart(item.productId)}>
          <Ionicons name="bag-add-outline" size={28} color="black" />
        </TouchableOpacity>
      )}
      </TouchableOpacity>
    </View>
 ) }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity>
            <Ionicons name="search" size={30} color="black" />
          </TouchableOpacity>
        <Text style={styles.headerTitle}>favoris</Text>
        <View style={styles.headerIcons}>
        <View style={styles.cartCount}>
    <Text style={styles.cartnumber}>{cartProducts.length}</Text>

</View>
          <TouchableOpacity onPress={()=> navigation.navigate("Cart")} >
            <Ionicons name="cart" size={30} color="black" style={{right:20}} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={favorite}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        padding:5,
       
      flex: 1,
      backgroundColor: 'white',
    },
    header: {
        marginTop:25,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    headerIcons: {
      flexDirection: 'row',
    },

item: {
  flexDirection: 'row',
  padding: 1,
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
  justifyContent: 'center',
},
cartticon:{
    top:40
},
cartCount:{ 
  position:"absolute",
  bottom:18,
  width:16,
  left:2,
  height:16,
  borderRadius:8,
  alignItems:"center",
  backgroundColor:"green",
  justifyContent:"center",
  zIndex:9999
}, 
cartnumber:{
  fontFamily:"regular",
  fontWeight:"600",
  fontSize:10,
  color:COLORS.lightWhite
},

title: {
  fontSize: 20,
  
  marginVertical: 5,
   fontFamily:"bold"
},
description: {
  fontSize: 14,
  color: '#333',
  marginBottom: 5,
},
price: {
  fontSize: 16,
  color: 'green',
  fontFamily:"regular",
  right:80
},
length: {
  fontSize: 14,
  fontFamily:"regular",
  right:80
},
width: {
  fontSize: 14,
  fontFamily:"regular",
  right:80
},
heartIcon: {
  alignSelf: 'center',
  marginLeft: 10,
  bottom:50,
  left:25
},
carousel: {
  width: 100, // نفس عرض الصور
  height: 100, // نفس ارتفاع الصور
  marginBottom: 10,
  top:10
},
carouselImage: {
  width: 90,
  height: 100,
  borderRadius: 10,
  marginRight: 9,
  left:5
},

    });
    
export default Whishlist;
