import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, SafeAreaView ,Modal} from 'react-native';
import { useAuth } from '../components/authcontext/authcontext';
import {Ionicons,MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native";
import { COLORS } from '../constants';
import {AdresseIPPP_} from '@env'


const Cart = () => {

const navigation=useNavigation()
  const {infor,refreshh,setrefreshh} = useAuth()
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);


  const handlePaymentOptionSelect = (option) => {
    setSelectedPayment(option);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible); 
  };

const nextPage=( selected )=>{
if(selected==="Visa"){
  navigation.navigate('PaymentScreen',{methodpayment:selectedPayment,totalPrice:totalPrice})

}else if(selected==="MasterCard"){
  navigation.navigate('PaymentScreen',{methodpayment:selectedPayment,totalPrice:totalPrice})
}
else if(selected==="Flouci"){
  navigation.navigate('PaymentScreenTunisie',{methodpayment:selectedPayment,totalPrice:totalPrice})
}
}
   
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
  <FlatList
    data={cartItems}
    keyExtractor={(item, index) => index.toString()} // Use unique keys
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
          <Text style={styles.itemPrice}>DT {item.product.price}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => decrement(item.productId)}>
              <Ionicons name='remove-circle-outline' size={23} style={{marginLeft:10}}/>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => increment(item.productId)}>
            <Ionicons name='add-circle-outline'size={23} style={{left:10}}/>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={() => deleteItem(item.product.id)}>
       
         <Ionicons name='trash-bin' size={25} style={{top:25}} color={"red"}/>
          
        </TouchableOpacity>
      </View>
    )}
    contentContainerStyle={{ paddingBottom: 178 }} 
  />
) : (
  <Text style={{ fontFamily: 'bold', fontSize: 40, top: 250, left: -65 }}>
    السلة فارغة
  </Text>
)}


      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.totalText}>Total {cartItems.length} Items</Text>
          <Text style={styles.totalPrice} > {totalPrice} DT</Text>
          <TouchableOpacity style={styles.checkoutButton} onPress={toggleModal}>
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}

<Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Payment</Text>

            <TouchableOpacity onPress={()=>{handlePaymentOptionSelect("MasterCard")}} style={[styles.paymentOption, selectedPayment === 'MasterCard' && styles.selectedPaymentOption]}>
              <Image source={require('../assets/images/credit.png')} style={{ width: 36, height: 22, right: 5 }} />
              <Text style={[styles.paymentText, selectedPayment === 'MasterCard' && styles.selectedPaymentText]}>Credit Card</Text>
              <Ionicons name={selectedPayment === 'MasterCard' ? "ellipse" : "ellipse-outline"} size={20} color={selectedPayment === 'MasterCard' ? "#fff" : "#000"} />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{handlePaymentOptionSelect("Paypal")}} style={[styles.paymentOption, selectedPayment === 'Paypal' && styles.selectedPaymentOption]}>
              <Image source={require('../assets/images/paypal.webp')} style={styles.paymentIcon} />
              <Text style={[styles.paymentText, selectedPayment === 'Paypal' && styles.selectedPaymentText]}>Paypal</Text>
              <Ionicons name={selectedPayment === 'Paypal' ? "ellipse" : "ellipse-outline"} size={20} color={selectedPayment === 'Paypal' ? "#fff" : "#000"} />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{handlePaymentOptionSelect("Visa")}} style={[styles.paymentOption, selectedPayment === 'Visa' && styles.selectedPaymentOption]}>
              <Image source={require('../assets/images/visa.png')} style={{ width: 68, height: 22, right: 5 }} />
              <Text style={[styles.paymentText, selectedPayment === 'Visa' && styles.selectedPaymentText]}>Visa</Text>
              <Ionicons name={selectedPayment === 'Visa' ? "ellipse" : "ellipse-outline"} size={20} color={selectedPayment === 'Visa' ? "#fff" : "#000"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{handlePaymentOptionSelect("Flouci")}} style={[styles.paymentOption, selectedPayment === 'Flouci' && styles.selectedPaymentOption]}>
              <Image source={require('../assets/images/flouci_logo_new.webp')} style={{ width: 110, height: 22, right: 5 }} />
              <Text style={[styles.paymentTextt, selectedPayment === 'Flouci' && styles.selectedPaymentTextt]}> الدفع بتونسي </Text>
              <Ionicons name={selectedPayment === 'Flouci' ? "ellipse" : "ellipse-outline"} size={20} color={selectedPayment === 'Flouci' ? "#fff" : "#000"} />
            </TouchableOpacity>

           

            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> {nextPage(selectedPayment)}} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>next</Text>
            </TouchableOpacity> 
          </View>
        </View>
      </Modal>


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
    fontWeight:"bold",
    fontSize: 18,
   left:20
    
  },
  itemPrice: {
    fontWeight:"bold",
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
    left:15
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
    marginLeft:8
  },
  deleteButton: {
    fontSize: 24,
    color: '#ff3b30',
  },
 
  totalText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#888',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 2,
  },
  checkoutButton: {
    
    backgroundColor: '#32CD32',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  checkoutButtonText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute', 
    bottom: 100,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 10,
    
    alignItems: 'center',
  },
  modalOverlay: {
 
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
   top:165,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  selectedPaymentOption: {
    backgroundColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  selectedPaymentText: {
    color: 'white',
  },
  selectedPaymentTextt: {
    color: 'white',
  },
  paymentIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  paymentTextt: {
    flex: 1,
    right:10,
    fontSize: 16,
    color: '#000',
  },
  paymentText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  selectedPaymentText: {
    color: '#fff',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f00',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
  
});

export default Cart;
