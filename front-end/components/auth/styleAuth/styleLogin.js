import { StyleSheet} from 'react-native';
import { COLORS, SIZES } from "../../../constants/theme";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
      top:10,
      height:770
    },
    backButton: {
      marginBottom: 100,
      top:20,width:55
    },
    dropdown: {
      position: "absolute",
      top: 75,
      left: 180,
      width:140,
      right: 0,
      backgroundColor: "#fff",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#ddd",
      zIndex: 9999
  },
  dropdownItem: {
    padding: 10,
    fontSize: 16,
    color: COLORS.gray,
},
    divider: {
      width: '150%',
      borderBottomWidth: 1,
      bottom:80,
      right:20,
      borderBottomColor: '#ccc', 
      marginVertical: 10, 
    },
    title: {
      fontSize: 28,
      fontFamily:"bold",
      color: COLORS.primary,
      marginBottom: 20,
      bottom:40
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
      right:10,
      bottom:1
    },
    buttonText: {
      fontSize: 21,
      
      color: '#000',
      fontFamily:"bold",
    },
    dividerWithText: {
      flexDirection: 'row', 
      alignItems: 'center', 
      marginVertical: 25,
       bottom:15
    },
    line: {
      flex: 1, 
      height: 1, 
      backgroundColor: '#ccc', 
      marginHorizontal:3,
     
      
    },
    orText: {
      textAlign: 'center',
      color: '#666',
      fontSize: 16,
      fontFamily:"bold"
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 15,
      marginBottom: 15,
      fontFamily:"bold",
      fontSize: 20,
      color: '#000',
    },
    inputPassword: {
      fontSize: 20,
      color: '#000',
      fontFamily:"bold",
  
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      fontFamily:"bold",
      padding: 15,
      marginBottom: 15,
    },
    loginButton: {
      backgroundColor: '#000',
      padding: 6,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 15,
    },
    loginText: {
      fontSize: 28,
      color: '#fff',
      fontFamily:"bold",
    },
    forgotText: {
      textAlign: 'center',
      color: '#666',
      fontFamily:"bold",
      textDecorationLine: 'underline',
      fontSize: 18,
    },
    OrText: {
      textAlign: 'center',
      color: '#666',
      fontFamily:"bold",
      fontSize: 18,
    },
    CreateNewText: {
      textAlign: 'center',
      color: '#666',
      fontFamily:"bold",
      textDecorationLine: 'underline',
      fontSize: 18,
    },
  
  });
export default styles