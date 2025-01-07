import { StyleSheet} from 'react-native';
import { COLORS, SIZES } from "../../../constants/theme";
const styles = StyleSheet.create({
    modalContent: {
       backgroundColor: 'white',
       padding: 20,
       borderRadius: 10,
       alignItems: 'center',
       justifyContent: 'center',
       height:777
     },
     icon: {
       marginBottom: 10,
     },
     title: {
       fontSize: 22,
       fontFamily:"bold",
       color: '#4CAF50',
     },
     subtitle: {
       fontFamily:"bold",
       fontSize: 26,
       marginBottom: 15,
       color: '#555',
     },
     infoContainer: {
       alignItems: 'flex-start',
       marginBottom: 20,
     },
     infoText: {
       
       fontFamily:"bold",
       fontSize: 19,
       marginVertical: 3,
       color: '#333',
     },
     closeButton: {
       backgroundColor: '#4CAF50',
       paddingVertical: 10,
       paddingHorizontal: 20,
       borderRadius: 5,
     },
     buttonText: {
       color: '#fff',
       fontSize: 16,
     },
   });
export default styles