import { StyleSheet} from 'react-native';
import { COLORS, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
      paddingTop: 20,
     
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
      marginTop:4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily:"bold",
  },
  headerIcons: {
    flexDirection: 'row',
  },
  
  item: {
    elevation:4,
    backgroundColor:"white",
  flexDirection: 'row',
  padding: 5,
  marginVertical: 8,
  marginHorizontal: 16,
  
  borderRadius: 10,
  alignItems: 'center', // تركز المحتوى عموديا
  },
  image: {
  
  aspectRatio: 1/1,
  height: 110,
  borderRadius: 10,
  marginRight: 10,
  },
  textContainer: {
  flex: 1,
  fontFamily:"bold",
  justifyContent: 'center',
  bottom:30,
  
  
  },
  cartticon:{
  top:40,
  right:8
  
  },
  title: {
  fontSize: 16,
  fontFamily:"bold",
  marginVertical: 5,
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
  left:25
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 18,
    top: 10,
    borderRadius:15
    
    
  },
  filterButton: {
    fontSize: 16,
    fontFamily:"bold",
    padding: 10,
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
    marginHorizontal: 5,
    transition: 'background-color 0.2s ease',
  },
  selectedFilter: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
  },
  });
  
export default styles