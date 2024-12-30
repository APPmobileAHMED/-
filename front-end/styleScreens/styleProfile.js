
import { StyleSheet} from 'react-native';
import { SIZES } from "../constants/theme";
const COLORS = {
  green: '#4CAF50',
  lightGreen: '#81C784',
  darkGreen: '#388E3C',
  white: '#FFFFFF',
  lightGray: '#E0E0E0',
  darkGray: '#757575',
};

const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: COLORS.lightGreen,
    },
    header: {
      fontFamily:"bold",
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.green,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    backIcon: {
      position: 'absolute',
      top: 40,
      right: 120,
    },
    logoutIcon: {
      position: 'absolute',
      top: 40,
      left: 120,
    },
    headerText: {
      color: COLORS.white,
      fontSize: 24,
      fontFamily:"bold",
      bottom: -10,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 60,
      borderWidth: 3,
      borderColor: COLORS.white,
      bottom:-15
    },
    uploadButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.darkGreen,
      paddingVertical: 10,
      marginTop: 10,
      borderRadius: 20,
      marginHorizontal: 20,
    },
    uploadButtonText: {
      color: COLORS.white,
      marginLeft: 10,
      fontFamily:"bold",
      fontSize: 16,
    },
    detailsContainer: {
      flex: 1,
      padding: 20,
      backgroundColor: COLORS.white,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      fontFamily:"bold",
      marginTop: 20,
    },
    detailItem: {
      flexDirection: 'row',
      fontFamily:"bold",
      alignItems: 'center',
      marginBottom: 15,
    },
    detailTextInput: {
      flex: 1,
  
      fontFamily:"bold",
      marginLeft: 10,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.lightGray,
      paddingVertical: 5,
      fontSize: 20,
      color: COLORS.darkGray,
    },
    map: {
      height: 320,
      marginVertical: 2,
      marginHorizontal:-20,
      borderRadius: 15,
      overflow: 'hidden',
    },
    editButton: {
      backgroundColor: COLORS.green,
      paddingVertical: 8,
      borderRadius: 25,
      alignItems: 'center',
      marginHorizontal: 80,
      top: 10,
    },
    editButtonText: {
      color: COLORS.white,
      fontSize: 18,
      fontFamily:"bold",
    },
    saveLocationButton: {
      backgroundColor: COLORS.darkGreen,
      paddingVertical: 1,
      borderRadius: 25,
      alignItems: 'center',
      marginHorizontal: 120,
       top: -315,
       left:132,
    },
    saveLocationButtonText: {
      color: "yellow",
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  

export default styles