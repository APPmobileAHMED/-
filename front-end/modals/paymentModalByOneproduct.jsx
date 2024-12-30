import React from 'react';
import { View, Text, TouchableOpacity, Modal, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import styles from "../styleScreens/styleCart"
const PaymentModalByOneproduct = ({
  isModalVisible,
  toggleModal,
  handlePaymentOptionSelect,
  selectedPayment,
  nextPage,
  count,
  price,
  calculTotal
  
}) => {
  return (
    <Modal
      visible={isModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={toggleModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Payment</Text>

          <TouchableOpacity
            onPress={() => { handlePaymentOptionSelect("MasterCard") }}
            style={[styles.paymentOption, selectedPayment === 'MasterCard' && styles.selectedPaymentOption]}
          >
            <Image source={require('../assets/images/credit.png')} style={{ width: 36, height: 22, right: 5 }} />
            <Text style={[styles.paymentText, selectedPayment === 'MasterCard' && styles.selectedPaymentText]}>
              Credit Card
            </Text>
            <Ionicons
              name={selectedPayment === 'MasterCard' ? "ellipse" : "ellipse-outline"}
              size={20}
              color={selectedPayment === 'MasterCard' ? "#fff" : "#000"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => { handlePaymentOptionSelect("Visa") }}
            style={[styles.paymentOption, selectedPayment === 'Visa' && styles.selectedPaymentOption]}
          >
            <Image source={require('../assets/images/visa.png')} style={{ width: 68, height: 22, right: 5 }} />
            <Text style={[styles.paymentText, selectedPayment === 'Visa' && styles.selectedPaymentText]}>
              Visa
            </Text>
            <Ionicons
              name={selectedPayment === 'Visa' ? "ellipse" : "ellipse-outline"}
              size={20}
              color={selectedPayment === 'Visa' ? "#fff" : "#000"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => { handlePaymentOptionSelect("Flouci") }}
            style={[styles.paymentOption, selectedPayment === 'Flouci' && styles.selectedPaymentOption]}
          >
            <Image source={require('../assets/images/flouci_logo_new.webp')} style={{ width: 110, height: 22, right: 5 }} />
            <Text style={[styles.paymentTextt, selectedPayment === 'Flouci' && styles.selectedPaymentTextt]}>
              الدفع بتونسي
            </Text>
            <Ionicons
              name={selectedPayment === 'Flouci' ? "ellipse" : "ellipse-outline"}
              size={20}
              color={selectedPayment === 'Flouci' ? "#fff" : "#000"}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { nextPage(selectedPayment,calculTotal(price,count)) }} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentModalByOneproduct;
