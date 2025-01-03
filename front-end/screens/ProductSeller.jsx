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


const ProductSeller = () => {
  const navigation=useNavigation()
  const {infor,refreshh,setrefreshh,isProductInCart,cartProducts,ourProducts} = useAuth()
   const { t,} = useTranslation()
 
  const Item = (item) => {
    const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
      item.img1,
      item.img2,
      item.img3,
      item.img4,
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
         
          <TouchableOpacity onPress={()=>navigation.navigate("ProductDetails", { productId: item.id, sellerId: item.userId })}>
<Image key={index} source={{ uri: img }} style={styles.carouselImage} />
          </TouchableOpacity>
          
        ))}
      </ScrollView>
    </TouchableOpacity>
       
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={{width:80,left:85,bottom:10}}>
        <Text style={styles.price}>{t('wishlist:price')} :{item.price}</Text>
        <Text style={styles.length}>{t('wishlist:length')}: {item.length}</Text>
        <Text style={styles.width}>{t('wishlist:width')}: {item.width}</Text>
        </View>
      </View>
    </View>
 ) }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
    
        <Text style={{fontSize: 20,fontWeight: 'bold',left:"450%"}}>{t('productSeller:title')}</Text>
        <View style={styles.headerIcons}> 
        
        </View>
      </View>
      {ourProducts.length> 0 ?(
         <FlatList
         data={ourProducts}
         renderItem={({ item }) => <Item {...item} />}
         keyExtractor={item => item.id}
         contentContainerStyle={{ paddingBottom: 90,}} 
       />
      ):( 
      <View>
        <Text style={{ fontFamily: 'bold', fontSize: 35, top: 50, left: -3, zIndex:99999}}> {t('productSeller:notfound')}</Text>
        <Ionicons name="heart-dislike" size={350} style={{top:20}} color={"#ccc"}/>    
      </View>
      )}
     
    </View>
  );
};


    
export default ProductSeller;