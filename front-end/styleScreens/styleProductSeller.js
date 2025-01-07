import { StyleSheet} from 'react-native';
import { COLORS, SIZES } from "../constants/theme";
const styles = StyleSheet.create({
    container: {
        padding:5,
       
      flex: 1,
      backgroundColor: 'white',
    },
    header: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'center', // Centre le contenu horizontalement
        alignItems: 'center', // Centre le contenu verticalement
        padding: 10,
      },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    headerIcons: {
      flexDirection: 'row',
    },

item: {
  flexDirection: 'row',
  padding: 1,
  marginVertical: 8,
  marginHorizontal: 16,
  elevation:7,
  backgroundColor:"white",
  borderRadius: 10,
  alignItems: 'center', 
},
image: {
  width: 100,
  height: 100,
  borderRadius: 10,
  marginRight: 10,
},
textContainer: {
  flex: 1,
  justifyContent: 'center',
  
},
cartticon:{
    top:40,
right:8
},
cartCount:{ 
  position:"absolute",
  bottom:18,
  width:16,
  left:2,
  height:16,
  borderRadius:8,
  alignItems:"center",
  backgroundColor:"green",
  justifyContent:"center",
  zIndex:9999
}, 
cartnumber:{
  fontFamily:"regular",
  fontWeight:"600",
  fontSize:10,
  color:COLORS.lightWhite
},

title: {
  fontSize: 16,
 display:"flex",
  marginVertical: 5,
   fontFamily:"bold"
},
description: {
  fontSize: 14,
  color: '#333',
  marginBottom: 5,
},
price: {
  fontSize: 16,
  color: 'green',
  fontFamily:"regular",
  right:80
},
length: {
  fontSize: 14,
  fontFamily:"regular",
  right:80
},
width: {
  fontSize: 14,
  fontFamily:"regular",
  right:80
},
heartIcon: {
  alignSelf: 'center',
  marginLeft: 10,
  bottom:42,
  left:20,
  
},
carousel: {
  width: 100, 
  height: 100, 
  marginBottom: 10,
  top:10
},
carouselImage: {
  width: 90,
  height: 100,
  borderRadius: 10,
  marginRight: 9,
  left:5
},

    });
export default styles