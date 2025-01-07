import { StyleSheet} from 'react-native';
import { COLORS, SIZES } from "../../../constants/theme";
import { StatusBar } from "react-native";


const styles = StyleSheet.create({
    container: {
      width: 182,
      height: 270,
      marginEnd: 22,
      marginBottom: 120,
      borderRadius: SIZES.medium,
      backgroundColor:"white",
      
      elevation: 4,
    },
    imageContainer: {
      flex: 1,
      width: 170,
      marginLeft: SIZES.small / 2,
      marginTop: SIZES.small / 2,
      borderRadius: SIZES.small,
      overflow: "hidden",
    },
    image: {
      aspectRatio: 1/1,
      resizeMode: "cover",
      height: 150,
      left: 10,
      top:3,
      borderRadius:15
    },
    details: {
      padding: SIZES.small,
    },
    title: {
      fontFamily: "bold",
      fontSize: SIZES.large,
      marginBottom: 2,
    },
    supplier: {
      fontFamily: "regular",
      fontSize: 13,
      color: COLORS.gray,
      marginBottom: 2,
    },
    price: {
      fontFamily: "bold",
      fontSize: SIZES.large,
      marginBottom: 2,
      width:110
    },
    addBtn: {
      position: "absolute",
      bottom: SIZES.xSmall,
      right: SIZES.xSmall,
    },
    toastContainer: {
      position: "absolute",
      bottom: 350 || 10, // Add status bar height
      left: 0,
      right: 0,
      backgroundColor: "#333",
      padding: 15,
      zIndex: 9999,
      alignItems: "center",
    },
    toastText: {
      color: "#fff",
      fontSize: 16,
    },
  
  });
  
export default styles