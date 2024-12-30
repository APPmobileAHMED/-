import { StyleSheet} from 'react-native';
import { COLORS, SIZES } from "../../../../constants/theme";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    backButton: {
      position: 'absolute',
      top: 50,
      left: 20,
    },
    backText: {
      fontSize: 18,
      color: COLORS.primary,
    },
    userImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: 20,
      borderWidth: 2,
      borderColor: COLORS.primary,
    },
    text: {
      fontSize: 20,
      fontFamily: 'bold',
      color: COLORS.primary,
      marginBottom: 20,
      textAlign: 'center',
    },
    confirmButton: {
      backgroundColor: COLORS.primary,
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 8,
      marginBottom: 15,
      alignItems: 'center',
      width: '80%',
    },
    cancelButton: {
      backgroundColor: '#ccc',
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 8,
      alignItems: 'center',
      width: '80%',
    },
    buttonText: {
      fontSize: 18,
      color: '#fff',
      fontFamily: 'bold',
    },
  });
  
export default styles