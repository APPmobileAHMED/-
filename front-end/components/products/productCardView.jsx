import { TouchableOpacity, Text, View, Image, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../authcontext/authcontext";
import axios from "axios";
import styles from "../../components/products/styleProductFile/styleProductCard"
import {AdresseIPPP_} from '@env'
import { useToast } from "../../toastProvider/toast";
import { useTranslation } from "react-i18next";
const ProductCardView = ({ product }) => {
  const navigation = useNavigation();
  const { showToast } = useToast();
  const { t} = useTranslation()
 
const{infor,refreshh,cartProducts, isProductInCart,setrefreshh}=useAuth()



  const addtocart=(product)=>{
    axios.post(`${AdresseIPPP_}/api/cart/addtocart/${infor.id}`,{
      productId: product
}).then((res)=>{
    
      setrefreshh(!refreshh) 
      showToast(t('ProductCardView:addTocart'),COLORS.primary)
    }).catch((error)=>{console.log(error)})
  }
  const deleteItem=(product)=>{
    axios.delete(`${AdresseIPPP_}/api/cart/deleteitems/${infor.id}`,{
      data:{productId: product}
}).then((res)=>{
      
      showToast(t('ProductCardView:deleteFromCart'),"red")
      setrefreshh(!refreshh)
    }).catch((error)=>{console.log(error)})
  }
  
 

  return (
    <ScrollView>
      <TouchableOpacity key={product.id} onPress={() => navigation.navigate("ProductDetails", { productId: product.id, sellerId: product.userId })}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={
                product.img1
                  ? { uri: product.img1 }
                  : "https://www.shutterstock.com/image-vector/loading-bar-icons-website-load-600nw-2508563717.jpg" 
              }
              style={styles.image}
            />
          </View>
          <View style={styles.details}>
            <Text style={styles.title} numberOfLines={1}>
              {product.name}
            </Text>
            <Text style={styles.supplier} numberOfLines={1}>
            {t('ProductCardView:size')}: {t('ProductCardView:length')} {product.length} <Text style={{ fontWeight: 'bold',fontSize: 18}}>/</Text> {t('ProductCardView:width')} {product.width}
            </Text>
            <Text style={styles.price}>{t('ProductCardView:price')}: {product.price} dt</Text>
            {infor.role==="buyer"&&(
   <TouchableOpacity style={styles.addBtn}>
   {isProductInCart(product.id) ? (
     <TouchableOpacity onPress={() => deleteItem(product.id)}>
       <Fontisto name="shopping-basket-remove" size={25} />
     </TouchableOpacity>
   ) : (
     <TouchableOpacity onPress={() => addtocart(product.id)}>
       <Fontisto name="shopping-basket-add" size={25}  />
     </TouchableOpacity>
   )}
 </TouchableOpacity>
            )}
         
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProductCardView;

