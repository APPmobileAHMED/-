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
    text: {
      fontSize: 20,
      fontFamily: 'bold',
      color: COLORS.primary,
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 15,
      marginBottom: 15,
      width: '80%',
      fontSize: 18,
      color: '#000',
      textAlign: 'center',
    },
    timerText: {
      fontSize: 16,
      color: '#666',
      marginBottom: 20,
    },
    verifyButton: {
      backgroundColor: COLORS.primary,
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 8,
      marginBottom: 15,
      width: '80%',
      alignItems: 'center',
    },
    disabledButton: {
      backgroundColor: '#ccc',
    },
    resendButton: {
      backgroundColor: '#000',
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 8,
      width: '80%',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 18,
      color: '#fff',
      fontFamily: 'bold',
    },
    resendText: {
      fontSize: 18,
      color: '#fff',
      fontFamily: 'bold',
    },
  });
export default styles