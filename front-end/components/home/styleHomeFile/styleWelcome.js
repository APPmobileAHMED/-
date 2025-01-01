import { StyleSheet} from 'react-native';
import { COLORS, SIZES } from "../../../constants/theme";

const  styles=StyleSheet.create({
    container:{
        width:"100"
    },
    tex:{
        fontFamily:"bold",
        fontSize:23,
        marginTop:SIZES.xSmall,
        color:COLORS.black,
        marginHorizontal:12,
    },
    texx:{
        fontFamily:"bold",
        fontSize:SIZES.xxLarge -5,
        marginTop:SIZES.xSmall,
        color:COLORS.primary,
        marginHorizontal:SIZES.small,
    }, 
    searchcont:{
        flexDirection:"row",
        justifyContent:"center",
        alignContent:"center",
        backgroundColor:COLORS.secondary,
         borderRadius:SIZES.medium,
         marginVertical:SIZES.medium,
         height:50,
         marginHorizontal:SIZES.small,


    },
    searchhIco:{
        marginTop:SIZES.small,
        marginHorizontal:10,
        color:COLORS.gray
    },
    searchwrapper:{
        flex:1,
      backgroundColor:COLORS.secondary,
      marginRight:SIZES.small,
      borderRadius:SIZES.small
    },
    searchinput:{
        fontFamily:"regular",
        width:"100%",
        height:"100%",
        paddingHorizontal:SIZES.small 
       },
       searchbtn:{
        width:50,
        height:"100%",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:COLORS.primary,
        borderRadius:SIZES.medium
       },
       modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
      },
      modalText: {
        fontSize: 18,
        marginBottom: 20,
      },
      modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
      },
      cancelButton: {
        backgroundColor: COLORS.gray,
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
      },
      nextButton: {
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 5,
      },
      buttonText: {
        color: "white",
        fontWeight: "bold",
      },
})  
export default styles