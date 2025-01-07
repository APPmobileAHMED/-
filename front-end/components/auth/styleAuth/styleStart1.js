import { Dimensions, StyleSheet} from 'react-native';
import { COLORS, SIZES } from "../../../constants/theme";

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    image: {
        top:35,
        position: 'absolute',
    },
    title: {
      fontSize: 45,
      color:COLORS.primary,
      fontFamily:"bold",
      marginTop: 20,
    },
    subtitle: {
      fontSize: 21,
      color: '#00C135',
      fontFamily:"bold",
      textAlign: 'center',
      marginVertical: 10,
    },
    signupButton: {
      backgroundColor: '#fff',
      paddingVertical: 8,
      paddingHorizontal: "30%",
      borderRadius: 5,
      marginTop: "140%",
      
    },
    loginText: {
      fontSize: 18,
      color: '#000',
      fontFamily: 'bold',
      
      
    },
    linksContainer: {
      flexDirection: 'row',
      marginTop: 20,
    },
    linkText: {
      fontSize: 20,
      color: '#FFFFFF',
      fontFamily:"bold",
      top:10,
      textDecorationLine: 'underline',
    },
    orText: {
      fontSize: 20,
      top:10,
      fontFamily:"bold",
      color: '#FFFFFF',
    },
    });
export default styles