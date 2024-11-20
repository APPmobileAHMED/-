import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useAuth } from '../components/authcontext/authcontext';
import {Ionicons,MaterialCommunityIcons } from "@expo/vector-icons"
import { COLORS } from '../constants';
import {AdresseIPPP_} from '@env'
import { useNavigation } from "@react-navigation/native"
const Cart = () => {
const navigation=useNavigation()
  const {infor,refreshh,setrefreshh} = useAuth()
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([])


  useEffect(() => {
    axios.get(`${AdresseIPPP_}cart/cartitems/${infor.id}`)
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
    total += item.product.price * item.quantity; // Multiply price by quantity
  });
  setTotalPrice(total); // Set the total price
};

const increment = (productId) => {
  setCartItems(prevItems =>
    prevItems.map(item =>
      item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
    )
  );
  calculateTotalPrice(cartItems); // Recalculate total price after increment
};

const decrement = (productId) => {
  setCartItems(prevItems =>
    prevItems.map(item =>
      item.productId === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    )
  );
  calculateTotalPrice(cartItems); 
};


  const deleteItem=(product)=>{
    axios.delete(`${AdresseIPPP_}cart/deleteitems/${infor.id}`,{
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

       cartItems.map((item,index)=>(
        <View key={index} style={styles.cartItem}  >
      
        <TouchableOpacity  onPress={() => navigation.navigate("ProductDetails", { productId: item.productId, sellerId: item.product.userId })} >
        <Image source={{ uri: item.product.img1 }} style={styles.itemImage} />
        </TouchableOpacity>
      
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.product.name}</Text>
          <Text style={styles.itemPrice}>DT {item.product.price}</Text>
          <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => decrement(item.productId)} >
    <Text style={styles.quantityButton}>-</Text>
  </TouchableOpacity>
  <Text style={styles.quantityText}>{item.quantity}</Text>
  <TouchableOpacity onPress={() => increment(item.productId)} >
    <Text style={styles.quantityButton}>+</Text>
  </TouchableOpacity>
  
          </View>
        </View>
        <TouchableOpacity onPress={() =>{ deleteItem(item.product.id)}}>
          <Text style={styles.deleteButton}>🗑️</Text>
        </TouchableOpacity>
      </View>
       )) 
      ) : (
        <Text style={{ fontFamily: 'bold', fontSize: 40, top: 250, left: -65 }}>
          السلة فارغة
        </Text>
      )}

      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.totalText}>Total {cartItems.length} Items</Text>
          <Text style={styles.totalPrice} > {totalPrice} DT</Text>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top:36,
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartList: {
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  itemImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 20,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    fontSize: 24,
    color: '#ff3b30',
  },
  footer: {
    marginTop:'auto',
    bottom:40,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 16,
    color: '#888',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  checkoutButton: {
    backgroundColor: '#32CD32',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  checkoutButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Cart;
