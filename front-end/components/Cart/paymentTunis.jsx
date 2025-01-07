import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { AdresseIPPP_ } from '@env';
import { useAuth } from '../authcontext/authcontext';
import axios from 'axios';
import styles from "../../components/Cart/StyleCart/StylePaymentTunisie";
import { useTranslation } from 'react-i18next';

const PaymentScreenTunisie = () => {
  const { infor, refreshh, setrefreshh, cartProducts, totalPriceTunisie, setTotalPriceTunisie, setCartProducts } = useAuth();
  const [isModalVisible, setModalVisible] = useState(false); // Set initial state to false to prevent showing before payment status is fetched
  const [infoPayment, setInfoPayment] = useState([]);
  const [statusPayment, setStatusPayment] = useState(null);
  const { paymentId } = useRoute().params;
  const navigation = useNavigation();
  const { t } = useTranslation();

  const deleteAllItems = async () => {
    try {
      await axios.delete(`${AdresseIPPP_}/api/cart/deleteAllitems/${infor.id}`);
      setrefreshh(!refreshh);
    } catch (error) {
      console.error("Error deleting cart items:", error);
    }
  };

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const response = await axios.get(`${AdresseIPPP_}/api/flouci/buy/${paymentId}`);
        const { result } = response.data;

        if (result.status === "SUCCESS") {
          setInfoPayment(result.details);
          setStatusPayment(result.status);
          await savePaymentDetails();
        } else {
          setStatusPayment("FAILURE");
        }

       
        setModalVisible(true);

      } catch (error) {
        console.error("Error fetching payment status:", error);
        setStatusPayment("FAILURE");
        setModalVisible(true); 
      }
    };

    fetchPaymentStatus();
  }, [paymentId]);

  const savePaymentDetails = async () => {
    try {
      await axios.post(`${AdresseIPPP_}/api/flouci/save`, {
        userId: infor.id,
        totalAmount: parseFloat(totalPriceTunisie),
        username: `${infor.firstname} ${infor.lastname}`,
        cartItems: cartProducts,
      });
    } catch (error) {
      console.error("Error saving payment details:", error);
    }
  };

  const onClose = () => {
    setCartProducts([{}]);
    setTotalPriceTunisie(0);
  
    deleteAllItems();
    navigation.navigate('Main', { screen: 'Home' });
    setModalVisible(false);
  };

  return (
    <View>
   
        <View style={styles.modalContent}>
          {/* Success or Failure Icon */}
          <Ionicons
            name={statusPayment === "SUCCESS" ? "checkmark-circle" : "close-circle"}
            size={80}
            color={statusPayment === "SUCCESS" ? "#4CAF50" : "#FF0000"}
            style={styles.icon}
          />

          
          <Text style={styles.title}>{t('successPayment:title')}</Text>
          <Text style={styles.subtitle}>{t('successPayment:subtitle')}</Text>

         
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>📧 {t('successPayment:email')}: {infor.email}</Text>
            <Text style={styles.infoText}>👤 {t('successPayment:name')}: {infor.firstname} {infor.lastname}</Text>
            <Text style={styles.infoText}>📞 {t('successPayment:phone')}: {infor.phoneNumber}</Text>
            <Text style={{ color: statusPayment === "SUCCESS" ? "#4CAF50" : "#FF0000", fontSize: 16, marginVertical: 3 }}>
              {statusPayment === "SUCCESS" ? "✅ Status: SUCCESS" : "❌ Status: FAILURE"}
            </Text>
          </View>

         
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.buttonText}>{t('successPayment:close')}</Text>
          </TouchableOpacity>
        </View>
     
    </View>
  );
};

export default PaymentScreenTunisie;
