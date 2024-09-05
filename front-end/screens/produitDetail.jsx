import {View,Text,StyleSheet,TouchableOpacity,Image, SingleTouchInput}     from "react-native"
import React,{useState} from "react"
import {  Fontisto, Ionicons ,MaterialCommunityIcons,SimpleLineIcons} from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";







const ProductDetails = ({navigation}) => {
    const [count,setCount]=useState(1)
    const increment=()=>{
        setCount(count+1)
    }
    const decrement=()=>{
        if(count>1){
        setCount(count-1)}

    }
    return (
        <View style={styles.contt} >
             <View style={styles.upperRow}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-circle" size={30} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                    <Ionicons name="heart" size={30} color={COLORS.primary} />
                </TouchableOpacity>
            </View>
        <View style={styles.container}>
           
            <Image
                source={{uri: "https://axio-menuiseries.fr/wp-content/uploads/2019/11/fenetre_aluminium.png"}}
                style={styles.image}
            />
            <View style={styles.details}>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>Product</Text>
                
                <View style={styles.priceWrapper}>
                    <Text style={styles.price}>$ 660.88</Text>
                </View>
                </View>
                <View style={styles.ratingRow}></View>
                <View style={styles.rating} >
{[1,2,3,4,5].map((index)=>(
    
    <Ionicons
    key={index}
    name="star"
    size={24}
    color="gold"
    />


))}
<Text style={styles.ratetext} >({count})</Text> 
 
                </View>
                <View style={styles.userRate} >


 <TouchableOpacity onPress={()=>{increment()}}>
<SimpleLineIcons
name="plus" size={20}/>
</TouchableOpacity>
<Text style={styles.ratetext} > (4.9)</Text> 
<TouchableOpacity onPress={()=>{decrement()}}>
<SimpleLineIcons
name="minus" size={20}/>
</TouchableOpacity>
 
                </View>   
            </View>
            <View style={styles.descripWrap}> 
                <Text style={styles.descrip} > Description</Text>
                <Text style={styles.descrText}>ghfgjlhmkjbk </Text>
                
                 </View>
                 <View Style={{marginBottom:SIZES.small}} > 
                    <View style={styles.location}>
                   <View style={{flexDirection:'row'}}>
                   <Ionicons name="location-outline" size={20}  />
                   <Text> loaction </Text> 
                   </View>

                   <View style={{flexDirection:'row'}}>
                   <MaterialCommunityIcons name="truck-delivery-outline" size={20}  />
                   <Text> delivery </Text> 
                   </View>

                    </View>

                   <View style={styles.cartRow}>
                    <TouchableOpacity onPress={()=>{}} style={styles.cartBtn}>
                      <Text style={styles.cartTitle}>BUY NOW</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{}} style={styles.addCart}>
                      <Fontisto  name="shopping-bag" size={24} color={COLORS.lightWhite} style={{top:5}} />
                    </TouchableOpacity>
                   </View>

                 </View>


        </View>
        </View>
    );
}

export default ProductDetails;
const styles = StyleSheet.create({
    contt:{
        top:50,
        flex: 1,
        backgroundColor: COLORS.lightWhite,
    },

    addCart:{
        width:37,
        height:37,
        borderRadius:50,
        margin:SIZES.small,
        backgroundColor:COLORS.black,
        alignItems:"center"
    },
    cartBtn:{
        width:SIZES.width*0.7,
        backgroundColor:COLORS.black,
        padding:5,
        borderRadius:SIZES.large,
        marginLeft:12,
    },
    descrText:{
        fontFamily:"regular",
        fontSize:SIZES.small,
        textAlign:"justify",
        marginBottom:SIZES.small
    },
    container: {
        top:60,
        flex: 1,
        backgroundColor: COLORS.lightWhite,
    },
    ratetext:{
        color:COLORS.gray,
        fontFamily:"regular",
        paddingHorizontal:SIZES.xSmall,

    },
    cartRow:{
      
        paddingBottom: SIZES.small,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: SIZES.width ,

       
    },
    descripWrap:{
        marginTop:SIZES.large*2,
        marginHorizontal:SIZES.large
    },
    userRate:{
        top:SIZES.large,
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        marginHorizontal:SIZES.large,
        left:230,
        marginTop:-22
    },
    rating:{
top:SIZES.large,
flexDirection:"row",
justifyContent:"flex-start",
alignItems:"center",
marginHorizontal:SIZES.large
    },
    
    location:{
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center",
  backgroundColor:COLORS.secondary,
  marginHorizontal:12,
  padding:5,
  borderRadius:SIZES.large
},

    upperRow: {
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",
        top: 10,
        width: SIZES.width - 44,
        zIndex: 999,
    },
    image: {
    
        aspectRatio: 1,
        resizeMode: "cover",
    },
    details: {
        marginTop: -SIZES.large,
        backgroundColor: COLORS.lightWhite,
        width: SIZES.width,
        borderTopLeftRadius: SIZES.medium,
        borderTopRightRadius: SIZES.medium,
    },
    titleRow: {
        marginHorizontal: 20,
        paddingBottom: SIZES.small,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: SIZES.width - 44,
        top: 20,
    },
    ratingRow:{
        marginHorizontal: 20,
        paddingBottom: SIZES.small,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: SIZES.width - 10,
        top: 5,
    },
    cartTitle: {
        marginLeft:SIZES.small,
        fontFamily: "semibold",
        fontSize: SIZES.large,
        color:COLORS.lightWhite
    },
    
    title: {
        fontFamily: "bold",
        fontSize: SIZES.large,
    },
    descrip:{
        fontFamily: "bold",
        fontSize: SIZES.large,
    },
    price: {
        paddingHorizontal: 10,
        fontFamily: "semibold",
        fontSize: SIZES.large,
    },
    priceWrapper: {
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.large,
    },
    
});

