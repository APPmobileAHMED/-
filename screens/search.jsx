import {View,Text,StyleSheet,TouchableOpacity,TextInput} from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";

const Search=()=>{




    return(
        <SafeAreaView>
        <View style={styles.searchcont}>
<TouchableOpacity>
    <Ionicons name="camera-outline" size={SIZES.xLarge} style={styles.searchhIco} />
</TouchableOpacity>

<View style={styles.searchwrapper} >
    <TextInput
    style={styles.searchinput}
    value=""
    onPressIn={()=>{}}
    placeholder=" what are you looking here"
    />
</View>

<View>
    <TouchableOpacity style={styles.searchbtn}>
        < Feather name="search" size={24}  color={COLORS.offwhite}/>
    </TouchableOpacity>
</View>
</View>
        </SafeAreaView>
    )
}

export default Search
const  styles=StyleSheet.create({
    container:{
        width:"100"
    },
    tex:{
        fontFamily:"bold",
        fontSize:SIZES.xxLarge -5,
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
       }
})