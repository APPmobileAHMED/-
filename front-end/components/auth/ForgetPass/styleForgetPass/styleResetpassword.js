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
    title: {
      fontSize: 24,
      fontFamily: 'bold',
      color: COLORS.primary,
      marginBottom: 20,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 15,
      marginBottom: 15,
      width: '80%',
    },
    input: {
      flex: 1,
      fontSize: 18,
      color: '#000',
    },
    errorText: {
      color: 'red',
      fontSize: 14,
      marginBottom: 10,
    },
    resetButton: {
      backgroundColor: COLORS.primary,
      padding: 15,
      borderRadius: 8,
      width: '80%',
      alignItems: 'center',
    },
    resetButtonText: {
      fontSize: 18,
      color: '#fff',
      fontFamily: 'bold',
    },
  });
export default styles