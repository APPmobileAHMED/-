import { StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    container: {
      
      flex: 1,
    },
    content: {
      flex: 1,
      padding: 10,
      marginTop: 23,
      
    },
    title: {
      fontFamily:"bold",
      top:10,
      fontSize: 28,
  
     
      marginBottom: 30,
      color: '#E8F5E9',
      textAlign: 'center',
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
    },
    inputContainer: {
      fontFamily:"bold",
      marginBottom: 10,
      zIndex:999999,
  
    borderRadius:12
    },
    label: {
      fontSize: 16,
      fontFamily:"bold",
      color: '#E8F5E9',
      marginBottom: 1,
    },
    loadingText: {
      color: '#FFF',
      fontSize: 15,
      textAlign: 'center',
      marginBottom: 10,
    },
    
    input: {
      fontFamily:"bold",
      backgroundColor: 'rgba(232, 245, 233, 0.9)',
      borderRadius: 12,
      padding: 5,
      fontSize: 16,
      color: '#2E7D32',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    textArea: {
      height: 70,
      textAlignVertical: 'top',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: -15,
    },
    halfInputContainer: {
      width: '48%',
    },
    imageContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 30,
      top:12
    },
    imageBox: {
      width: 70,
      height: 70,
      backgroundColor: 'rgba(232, 245, 233, 0.9)',
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: 10,
    },
    imagePlaceholder: {
      fontSize: 30,
      color: '#4CAF50',
    },
    picker:{
      fontFamily:"bold",
      backgroundColor: 'rgba(232, 245, 233, 0.9)',
      borderRadius: 12,
      padding: 15,
      fontSize: 16,
      color: '#2E7D32',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    button: {
      backgroundColor: '#81C784',
      padding: 18,
      borderRadius: 12,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 5,
    },
    buttonText: {
      color: '#1B5E20',
      fontSize: 18,
    
      fontFamily:"bold",
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      width:280,
       left:35,
    },
    checkbox: {
    right:25
    },
    checkboxLabel: {
      fontSize: 20,
      color: '#E8F5E9',
    },
    checkboxText: {
      color: '#E8F5E9',
      fontSize: 12,
      right:22
    },
  });
  
  export default styles