import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { useAuth } from '../authcontext/authcontext';
import { COLORS } from '../../constants';
import { useNavigation } from "@react-navigation/native";
import { Fontisto, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { AdresseIPPP_ } from '@env';

const OrderScreen = () => {
  const { pendingOrders, orders, setrefreshh, refreshh } = useAuth();
  const navigation = useNavigation();
  
  
  const [animationStates, setAnimationStates] = useState({});
  const [shipped, setShipped] = useState(true);


  useEffect(() => {
    const initialStates = {};
    pendingOrders.forEach(order => {
      initialStates[order.id] = {
        fadeAnim: new Animated.Value(0),
        showImage: false
      };
    });
    setAnimationStates(initialStates);
  }, [pendingOrders]);

  const shippedOrder = (orderId) => {
    axios.patch(`${AdresseIPPP_}/api/order/changeStatus/${orderId}`, { status: "shipped" })
      .then((result) => {
        console.log(result);
        handleShippedClick(orderId);
      })
      .catch((err) => console.log(err));
  };

  const handleShippedClick = (orderId) => {
    setShipped(false);
    
    // Update animation state for specific order
    setAnimationStates(prev => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        showImage: true
      }
    }));

    
    if (animationStates[orderId]) {
      Animated.timing(animationStates[orderId].fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(animationStates[orderId].fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start();

        setTimeout(() => {
          setAnimationStates(prev => ({
            ...prev,
            [orderId]: {
              ...prev[orderId],
              showImage: false
            }
          }));
          setrefreshh(!refreshh);
        }, 1000);
      }, 2000);
    }
  };

  const renderOrder = ({ item }) => (
    <View style={styles.orderContainer}>
      {item.status === "pending" ? 
        <Image
          source={require("../../assets/images/pending.png")}
          style={{width: 80, height: 30, zIndex: 99999}}
        /> : 
        <Image
          source={require("../../assets/images/approved.png")}
          style={{width: 80, height: 30, zIndex: 99999}}
        />
      }
      <View style={styles.orderCard}>
        <Text style={styles.orderTitle}>Order Number: {item.id}</Text>
        {item.User.photoDeprofile && (
          <Image source={{ uri: item.User.photoDeprofile }} style={styles.userImage} />
        )}
        <Text style={styles.orderDetail}>Phone Number: {item.User.phoneNumber}</Text>
        <Text style={styles.orderDetail}>buyer: {item.User.firstname}</Text>
        <Text style={styles.orderDetail}>Location: {item.User.Location}</Text>
        <Text style={styles.orderDetail}>Price: ${item.totalAmount}</Text>
        <Text style={styles.orderDetail}>Date: {new Date(item.createdAt).toLocaleDateString()}</Text>
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("OrderDetails", {OrderId: item.id})}>
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => shippedOrder(item.id)}>
          <Image
            source={require("../../assets/images/shipped.png")}
            style={{width: 60, height: 50, left: 230, bottom: 50}}
          />
        </TouchableOpacity>
      </View>
      {animationStates[item.id]?.showImage && (
        <Animated.View 
          style={[
            styles.shippedContainer, 
            { opacity: animationStates[item.id]?.fadeAnim }
          ]}
        >
          <Image
            source={require("../../assets/images/verified.png")}
            style={styles.shippedImage}
          />
        </Animated.View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Orders</Text>
      <View>
      <TouchableOpacity style={{ left: 10, marginTop: 0, marginBottom: 15 }}>
        <Ionicons name="arrow-back-outline" size={35} color={COLORS.black} onPress={() => { navigation.goBack() }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate("OrderShipped")}>
        <Image source={require("../../assets/images/orderSuccess.png")} style={{height:50,width:50,left:"85%", marginTop: -60}}/>
      </TouchableOpacity>
      </View>
      <FlatList
        data={pendingOrders}
        keyExtractor={(item, index) => item.id ? item.id.toString() : `${index}`}
        renderItem={renderOrder}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 20,
  },
  orderContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  header: {
    fontSize: 24,
    fontFamily: 'bold',
    color: '#000',
    marginBottom: 2,
    textAlign: 'center',
    top: 15
  },
  list: {
    paddingBottom: 50,
  },
  orderCard: {
    backgroundColor: '#f9f9f9',
    padding: 8,
    marginBottom: 15,
    borderRadius: 8,
    bottom: 12,
    height: 240,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  orderTitle: {
    fontSize: 25,
    fontFamily: 'bold',
    color: '#333',
    marginBottom: -50,
  },
  orderDetail: {
    fontSize: 19,
    color: '#555',
    fontFamily: "bold",
    marginBottom: 3,
  },
  button: {
    marginTop: 10,
    backgroundColor: COLORS.primary,
    padding: 10,
    width: 100,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'bold',
    fontSize: 15,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 1,
    left: 250,
    top: 20,
  },
  shippedContainer: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [
      { translateX: -125 },  // Half of the image width
      { translateY: -125 }   // Half of the image height
    ],
    zIndex: 999,
  },
  shippedImage: {
    width: 250,
    height: 250,
  },
});

export default OrderScreen;