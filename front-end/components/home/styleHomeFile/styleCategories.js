import { Dimensions, StyleSheet} from 'react-native';
import { COLORS, SIZES } from "../../../constants/theme";
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
      marginHorizontal: 22,
      marginTop: SIZES.small,
    },
    title: {
      fontFamily: "semibold",
      fontSize: SIZES.medium,
      color: COLORS.black,
      marginBottom: SIZES.small,
    },
    categoriesWrapper: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    categoryCard: {
      width: "48%",
      marginBottom: SIZES.small,
      backgroundColor: COLORS.white,
      borderRadius: 8,
      elevation: 4,
      overflow: "hidden",
      alignItems: "center",
      padding: SIZES.small,
    },
    iconWrapper: {
      backgroundColor: COLORS.lightGray, // Adjust the background color if needed
      borderRadius: 50,
      padding: SIZES.small,
      marginBottom: SIZES.small,
    },
    categoryName: {
      fontFamily: "regular",
      fontSize: SIZES.medium,
      color: COLORS.black,
    },
    image: {
      width: width * 0.2,  
      height: 80,        
      borderRadius: 10,
    }
  });
  
export default styles