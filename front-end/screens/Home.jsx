import {View,Text,StyleSheet, TouchableOpacity, ScrollView} from "react-native"
import React, { useEffect,useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../constants";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import Welcome from "../components/home/Welcome";
import Carousel from "../components/home/carousel"
import Headings from "../components/home/heading";
import ProductRow from "../components/products/productRow";
import { useNavigation } from "@react-navigation/native";
import Categories from "../components/home/categories";
import { useAuth } from "../components/authcontext/authcontext";
import axios from 'axios';
import {AdresseIPPP_} from '@env'


const Home=()=>{
    const {infor,refreshh,setrefreshh} = useAuth()
    const [cartItems, setCartItems] = useState([])
    useEffect(() => {
        axios.get(`${AdresseIPPP_}/api/cart/cartitems/${infor.id}`)
          .then((res) => {
            
            setCartItems(Array.isArray(res.data) ? res.data : []);
            console.log(res.data, "rf");
          })
          .catch((error) => {
            console.log(error);
            setCartItems([]); 
          });
      }, [refreshh, infor.id]);

    const navigation=useNavigation()



    return(
        
        <SafeAreaView>
            < View style={styles.appBarWrapper}>
             
             <View style={styles.appBar}>
<Ionicons name="location-outline" size={24}/>
   
   <Text style={styles.location}>tunisia</Text>

<View  style={{alignItems:"flex-end"}} >

<View style={styles.cartCount}>
    <Text style={styles.cartnumber}>{cartItems.length}</Text>

</View>
<TouchableOpacity onPress={()=>{navigation.navigate("Cart")}} >
   <Fontisto name="shopping-bag" size={24}/> 
</TouchableOpacity>
</View>
             </View>
        

            </View>
            <ScrollView>
                <Welcome/>
                <Carousel/>
                <Categories/> 
                <Headings/>
                <ProductRow/>
            </ScrollView>
            
        </SafeAreaView>
    )
}

export default Home
const  styles=StyleSheet.create({
    textStyle:{
        fontFamily:"bold",
        fontSize:40,
    },
    appBarWrapper:{
        marginHorizontal:22,
        marginTop:SIZES.small
    }, 
    appBar:{
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems:"center"

    }, 
    location:{
       
       fontFamily: "semibold",
        fontSize:SIZES.medium, 
        color:COLORS.gray
        
    },
    cartCount:{ 
        position:"absolute",
        bottom:16,
        width:16,
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
    }

})