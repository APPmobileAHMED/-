import { StyleSheet} from 'react-native';
import { COLORS } from '../constants';


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
      fontFamily:"bold",
      fontSize: 16,
      color: 'black',
      
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
      color: COLORS.tertiary,
    },
    totalPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      marginVertical: 2,
    
    },
    checkoutButton: {
      
      backgroundColor: COLORS.primary,
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

  export default styles