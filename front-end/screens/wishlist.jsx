import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity,ScrollView } from 'react-native';
import { Ionicons,Fontisto} from '@expo/vector-icons';
import { useAuth } from '../components/authcontext/authcontext';
import axios from 'axios';
import {AdresseIPPP_} from '@env'
import { COLORS, SIZES } from "../constants";
import { useNavigation } from "@react-navigation/native";
import styles from "../styleScreens/styleWishlist"
import { useToast } from '../toastProvider/toast';
import { useTranslation } from 'react-i18next'
const Whishlist = () => {
  const navigation=useNavigation()
  
  const [favorite, setfavorite] = useState([]);
  const {infor,refreshh,setrefreshh,isProductInCart,cartProducts} = useAuth()
   const { showToast } = useToast();
   const { t,} = useTranslation()
 


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
         showToast(t('wishlist:toastDeleteWishlist'),"red")
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
      showToast(t('ProductCardView:addTocart'),COLORS.primary)
    }).catch((error)=>{console.log("erorr oops")})
  }
  const deleteItem=(product)=>{
    axios.delete(`${AdresseIPPP_}/api/cart/deleteitems/${infor.id}`,{
      data:{productId: product}
}).then((res)=>{
      console.log(res.data)
      showToast(t('ProductCardView:deleteFromCart'),"red")
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
      }, 3000); 
      return () => clearInterval(interval); 
    }, [images]);
  
    useEffect(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          x: currentIndex * 100, 
          animated: true,
        });
      }
    }, [currentIndex]);
    return(
    
    <View style={styles.item}>
    <TouchableOpacity  >
    <ScrollView
        horizontal
        pagingEnabled
        ref={scrollRef}  
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
      >
        
        {images.map((img, index) => (
         
          <TouchableOpacity onPress={()=>navigation.navigate("ProductDetails", { productId: item.productId, sellerId: item.product.userId })}>
<Image key={index} source={{ uri: img }} style={styles.carouselImage} />
          </TouchableOpacity>
          
        ))}
      </ScrollView>
    </TouchableOpacity>
       
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.product.name}</Text>
        <Text style={styles.description}>{item.product.description}</Text>
        <View style={{width:80,left:85,bottom:10}}>
        <Text style={styles.price}>{t('wishlist:price')} :{item.product.price}</Text>
        <Text style={styles.length}>{t('wishlist:length')}: {item.product.length}</Text>
        <Text style={styles.width}>{t('wishlist:width')}: {item.product.width}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.heartIcon} onPress={()=>deleteFavoriteItem(item.productId)}>
        <Ionicons name="heart-dislike-outline" size={24} color="red" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.cartticon}>

      {isProductInCart(item.productId) ? (
        <TouchableOpacity  onPress={() => deleteItem(item.productId)}>
          <Fontisto name="shopping-basket-remove" size={25} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity  onPress={() => addtocart(item.productId)}>
          <Fontisto name="shopping-basket-add" size={25}  />
        </TouchableOpacity>
      )}
      </TouchableOpacity>
    </View>
 ) }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={()=>navigation.navigate("Search")}>
            <Ionicons name="search" size={30} color="black" />
          </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('wishlist:title')}</Text>
        <View style={styles.headerIcons}>
        <View style={styles.cartCount}>
    <Text style={styles.cartnumber}>{cartProducts.length}</Text>

</View>
          <TouchableOpacity onPress={()=> navigation.navigate("Cart")} >
            <Ionicons name="cart" size={30} color="black" style={{right:20}} />
          </TouchableOpacity>
        </View>
      </View>
      {favorite.length> 0 ?(
         <FlatList
         data={favorite}
         renderItem={({ item }) => <Item {...item} />}
         keyExtractor={item => item.id}
         contentContainerStyle={{ paddingBottom: 90,}} 
       />
      ):( 
      <View>
        <Text style={{ fontFamily: 'bold', fontSize: 35, top: 50, left: -3, zIndex:99999}}> {t('wishlist:notfound')}</Text>
        <Ionicons name="heart-dislike" size={350} style={{top:20}} color={"#ccc"}/>    
      </View>
      )}
     
    </View>
  );
};


    
export default Whishlist;
