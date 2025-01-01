import { StyleSheet} from 'react-native';
import { COLORS, SIZES } from "../../../../constants/theme";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
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
    title: {
      fontSize: 28,
      fontFamily: "bold",
      color: COLORS.primary,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      fontFamily: "regular",
      color: '#666',
      textAlign: 'center',
      marginBottom: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 15,
      marginBottom: 20,
      width: '100%',
      fontSize: 18,
      color: '#000',
    },
    resetButton: {
      backgroundColor: COLORS.primary,
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      width: '100%',
    },
    resetText: {
      fontSize: 18,
      color: '#fff',
      fontFamily: "bold",
    },
  });
export default styles