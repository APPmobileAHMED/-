import { StyleSheet} from 'react-native';
import { COLORS, SIZES } from "../constants/theme";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.lightWhite,
      
  },
  upperRow: {
      marginHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      position: "absolute",
      top: SIZES.xLarge * 1.3,
      zIndex: 999,
      width: SIZES.width - 44
  },
  listItem: {
    top:10,
    right: 220,
    fontFamily: "bold",
    
    color: COLORS.gray,
  },
  image: {
      top: 100,
      aspectRatio: 1,
      height: 600,
      width: 360
  },
  navigationArrows: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'absolute',
      top: 400,
      width: '100%',
      paddingHorizontal: 20
  },

  
  
    details: {
      top: -18,
      backgroundColor: COLORS.lightWhite,
      width: SIZES.width,
      borderTopLeftRadius: SIZES.medium,
      marginBottom: SIZES.xLarge,
      borderTopRightRadius: SIZES.medium,
    },
    titleRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: SIZES.width - 44,
      top: 20,
      marginHorizontal: 20,
      paddingBottom: SIZES.small,
    },
    title: {
      fontFamily: "bold",
      fontSize: SIZES.large,
    },
    priceWrapper: {
      backgroundColor: COLORS.secondary,
      borderRadius: SIZES.large
    },
    price: {
      fontFamily: "semibold",
      fontSize: SIZES.large,
      paddingHorizontal: 10,
    },
    ratingRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: SIZES.width - 10,
      top: 5,
      paddingBottom: SIZES.small
    },
    rating: {
      top: SIZES.large,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      marginHorizontal: SIZES.large
    },
    ratingText: {
      color: COLORS.gray,
      fontFamily: "medium",
      marginLeft: 5,
      paddingHorizontal: SIZES.xSmall,
      
    },
    descriptionWrapper: {

      
      marginTop: 35,
      top: -55,
      width:95,
      left:50
    },
    
    description: {
      right:220,
      top:10,
      fontSize: SIZES.large - 2,
    },
    descText: {
      
      fontSize: SIZES.small,
      textAlign: "justify",
      marginBottom: SIZES.small,
    },
    location: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: COLORS.secondary,
      alignItems: "center",
      padding: 5,
      borderRadius: SIZES.large,
      marginHorizontal: 12,
    },
    cartRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: SIZES.width - 22,
      paddingBottom: SIZES.small,
    },
    cartBtn: {
      width: SIZES.width * 0.7,
      backgroundColor: COLORS.black,
      padding: SIZES.xSmall,
      borderRadius: SIZES.large,
      marginLeft: 12,
      alignItems: "center"
    },
    cartTitle: {
      fontFamily: "bold",
      color: COLORS.lightWhite,
      fontSize: 18
    },
    addCard: {
      width: 37,
      height: 37,
      borderRadius: 50,
      margin: SIZES.small,
      backgroundColor: COLORS.black,
      alignItems: "center",
      justifyContent: "center"
    },
    addCard1: {
      width: 37,
      height: 37,
      borderRadius: 50,
      marginTop:-30,
      backgroundColor:COLORS.lightWhite,
      alignItems: "center",
      justifyContent: "center",
      bottom:10,
      left:290,
    },
      modalContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
      },
      modalContent: {
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 10,
          alignItems: 'center'
      },
      modalCloseBtn: {
          marginTop: 20
      },
      modalCloseText: {
          color: '#0891b2',
          fontSize: 16,
          fontWeight: 'bold'
      },
      overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
      modalBox: { width: '90%', backgroundColor: 'white', borderRadius: 10, padding: 20, maxHeight: '100%' },
      closeButton: { alignSelf: 'flex-end', padding: 10 },
      closeButtonText: { color: '#0891b2', fontFamily:"bold",fontSize:20,right:25,bottom:15 },
      commentsScroll: { flexGrow: 0, maxHeight: '60%' },  
      commentBox: { flexDirection: 'row', marginVertical: 10, alignItems: 'center',  marginBottom: 10, 
        marginLeft: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "gray",
        paddingVertical: 5,
        
        color:'gray', },
      userImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
      commentTextBox: { flex: 1 },
      userName: { fontFamily:"bold",fontSize:20 },
      usercomments:{fontFamily:"regular",fontSize:18 },
      commentInputContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
      commentInput: {   width: '100%', 
        marginTop:30,    
        height: "13%",        
        padding: 5,        
        fontSize: 14, 
        borderColor: '#ccc',  
        borderWidth: 2,     
        borderRadius: 5, },
      submitButton: { backgroundColor: '#0891b2', padding: 10, borderRadius: 5,top:10,width:200,marginHorizontal:40,alignItems: 'center', },
      submitButtonText: { color: 'white', fontWeight: 'bold' },
      
  });
export default styles