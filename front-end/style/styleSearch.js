import { StyleSheet} from 'react-native';
import { COLORS, SIZES } from "../constants/theme";

const styles = StyleSheet.create({
  item: {
    elevation:4,
    backgroundColor:"white",
  flexDirection: 'row',
  padding: 5,
  marginVertical: 8,
  marginHorizontal: 5,
  
  borderRadius: 10,
  alignItems: 'center', 
  },
  image: {
    aspectRatio: 1/1,
    height: 110,
    borderRadius: 10,
    
  },
  textContainer: {
  flex: 1,
  fontFamily:"bold",
  justifyContent: 'center',
  bottom:3,
  right:100
  
  },
  
  title: {
  fontSize: 16,
  fontFamily:"bold",
  marginVertical: 5,
  left:80
  },
  description: {
  fontSize: 14,
  fontFamily:"bold",
  color: '#333',
  marginBottom: 5,
  },
  price: {
  fontSize: 16,
  fontFamily:"bold",
  right:2,
  color: 'green',
  },
  rating: {
  fontSize: 16,
  fontFamily:"bold",
  },
  sizes: {
  fontSize: 16,
  fontFamily:"bold",
  },
  heartIcon: {
  alignSelf: 'center',
  marginLeft: 10,
  bottom:45,
 
  },
  
    searchCont: {
      flexDirection: "row",
      justifyContent: "center",
      alignContent: "center",
      backgroundColor: COLORS.secondary,
      borderRadius: SIZES.medium,
      marginVertical: SIZES.medium,
      height: 50,
      marginHorizontal: SIZES.small,
    },
    searchIcon: {
      marginTop: SIZES.small,
      marginHorizontal: 10,
      color: "#36c964",
    },
    searchWrapper: {
      flex: 1,
      backgroundColor: COLORS.secondary,
      marginRight: SIZES.small,
      borderRadius: SIZES.small,
    },
    searchInput: {
      fontFamily: "regular",
      width: "100%",
      height: "100%",
      paddingHorizontal: SIZES.small,
    },
    searchBtn: {
      width: 50,
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.primary,
      borderRadius: SIZES.medium,
    },
    dropdownContainer: {
      position: "absolute",
      top: 10, // حسب موقع الـ search bar
      left: 10, // مكان بداية dropdown
      right: 10, // يتماشى مع عرض الشاشة
      zIndex: 10, // باش تكون قدام كل العناصر
    },
  
    dropdown: {
      position: "absolute",
      top: 100, // Adjust according to your layout
      
      right:0,
      width:"100%",
      backgroundColor: COLORS.white,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 8,
      zIndex: 99999,
      maxHeight: 210, // To limit the height of dropdown
      overflow: "hidden",
    },
    
    dropdownItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.lightGray,
    },
    
    dropdownText: {
      fontSize: 16,
      // color: COLORS.darkGray,
    },
  });
  

  export default styles