import { StyleSheet} from 'react-native';
import { COLORS, SIZES } from "../../../constants/theme";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
      top: 10,
      
      height:770
    },
    backButton: {
      marginBottom: 100,
      top: 20
    },
    divider: {
      width: '150%',
      borderBottomWidth: 1,
      bottom: 80,
      right: 20,
      borderBottomColor: '#ccc',
      marginVertical: 10, 
    },
    title: {
      fontSize: 35,
      fontFamily: "bold",
      color: COLORS.primary,
      bottom:80,
      marginBottom: -50,
    },
    socialButton: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 15,
      borderRadius: 8,
      marginBottom: 15,
    },
    icon: {
      width: 24,
      height: 24,
      marginLeft: "20%",
      right: 10,
      bottom: 1
    },
    buttonText: {
      fontSize: 21,
      color: '#000',
      fontFamily: "bold",
    },
    dividerWithText: {
      flexDirection: 'row', 
      alignItems: 'center', 
      marginVertical: 25,
      bottom: 15
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: '#ccc',
      marginHorizontal: 3,
    },
    orText: {
      textAlign: 'center',
      color: '#666',
       fontSize: 16,
        fontFamily:"bold"
    },
    namesContainer: {
      marginBottom:1,
      
      flexDirection: 'row', 
      justifyContent: 'space-between',
      
    },
    inputHalf: {
      width: '48%', 
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 15,
      marginBottom: 15,
      fontFamily: "bold",
      fontSize: 20,
      color: '#000',
      bottom:35
    
    },
    dropdown:{
      borderColor: '#ccc',
      
      
    },
    modalLabel:{
      bottom:47,
      color: '#666',
    },
    
    dropdownContainr:{
      color:"#666"
    },
    inputPassword: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 15,
      marginBottom: 15,
      fontFamily: "bold",
      fontSize: 20,
      color: '#000',
      bottom:35
    },
    passwordContainer: {
      flexDirection: 'row', 
      justifyContent: 'space-between',  
    },
    loginButton: {
      backgroundColor: '#000',
      padding: 6,
      borderRadius: 8,
      alignItems: 'center',
     
      marginBottom: 17,
    },
    loginText: {
      fontSize: 28,
      color: '#fff',
      fontFamily: "bold",
    },
    forgotText: {
      textAlign: 'center',
      color: '#666',
      fontFamily: "bold",
      textDecorationLine: 'underline',
      fontSize: 18,
    },
    OrText: {
      textAlign: 'center',
      color: '#666',
      fontFamily: "bold",
      fontSize: 18,
    },
    CreateNewText: {
      textAlign: 'center',
      color: '#666',
      fontFamily: "bold",
      textDecorationLine: 'underline',
      fontSize: 18,
      marginBottom:22
    },
    });
export default styles