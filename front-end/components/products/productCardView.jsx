import { TouchableOpacity, Text, View, Image, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../authcontext/authcontext";
import axios from "axios";
import {AdresseIPPP_} from '@env'
const ProductCardView = ({ product }) => {
  const navigation = useNavigation();
  
 
 
const{infor,refreshh,cartProducts, isProductInCart,setrefreshh}=useAuth()



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
            مقاس: الطول {product.length} <Text style={{ fontWeight: 'bold',fontSize: 18}}>/</Text> العرض {product.width}
            </Text>
            <Text style={styles.price}>{product.price}</Text>
            
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
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProductCardView;

const styles = StyleSheet.create({
  container: {
    width: 182,
    height: 270,
    marginEnd: 22,
    marginBottom: 120,
    borderRadius: SIZES.medium,
    backgroundColor:"white",
    
    elevation: 4,
  },
  imageContainer: {
    flex: 1,
    width: 170,
    marginLeft: SIZES.small / 2,
    marginTop: SIZES.small / 2,
    borderRadius: SIZES.small,
    overflow: "hidden",
  },
  image: {
    aspectRatio: 1/1,
    resizeMode: "cover",
    height: 150,
    left: 10,
    top:3,
    borderRadius:15
  },
  details: {
    padding: SIZES.small,
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.large,
    marginBottom: 2,
  },
  supplier: {
    fontFamily: "regular",
    fontSize: 13,
    color: COLORS.gray,
    marginBottom: 2,
  },
  price: {
    fontFamily: "bold",
    fontSize: SIZES.large,
    marginBottom: 2,
  },
  addBtn: {
    position: "absolute",
    bottom: SIZES.xSmall,
    right: SIZES.xSmall,
  },
});
