import { View, Text, StyleSheet, TouchableOpacity, ScrollView,Image, Modal } from "react-native"
import React, { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { COLORS, SIZES } from "../constants"
import { Fontisto, Ionicons } from "@expo/vector-icons"
import Welcome from "../components/home/Welcome"
import Carousel from "../components/home/carousel"
import Headings from "../components/home/heading"
import ProductRow from "../components/products/productRow"
import { useNavigation } from "@react-navigation/native"
import Categories from "../components/home/categories"
import { useAuth } from "../components/authcontext/authcontext"
import axios from 'axios'
import styles from "../styleScreens/styleHome.js"
import { AdresseIPPP_ } from '@env' 
import { useTranslation } from 'react-i18next'

const Home = () => {
    const { infor, refreshh, setrefreshh, setSearchInput,orders, ItemsOrder } = useAuth()
    const [cartItems, setCartItems] = useState([])
    const [language, setLanguage] = useState("tunisia") 
    const [isDropdownVisible, setDropdownVisible] = useState(false)
    const { t, i18n } = useTranslation()
   
    useEffect(() => {
       
        axios.get(`${AdresseIPPP_}/api/cart/cartitems/${infor.id}`)
            .then((res) => {
                setCartItems(Array.isArray(res.data) ? res.data : [])
            })
            .catch((error) => {
                console.log(error)
                setCartItems([])
            })
    }, [refreshh, infor.id])

    const navigation = useNavigation()

   
    const toggleLanguage = (selectedLanguage) => {
        setLanguage(selectedLanguage)
        i18n.changeLanguage(selectedLanguage)
        setDropdownVisible(false) 
        
    }

    return (
        <SafeAreaView>
            <View style={styles.appBarWrapper}>
                <View style={styles.appBar}>
                    <TouchableOpacity onPress={() => setDropdownVisible(!isDropdownVisible)}>
                    <Fontisto name="world" size={24} color={"#24AD50"}  />
                    </TouchableOpacity>
                   
                    <TouchableOpacity >
                        
                        <Text style={styles.location}>{language}</Text>
                    </TouchableOpacity>

                    
                    {isDropdownVisible && (
                        <View style={styles.dropdown}>
                            <TouchableOpacity onPress={() =>{ toggleLanguage("tunisia")  } }>
                                <Text style={styles.dropdownItem}>Tunisia</Text>
                                <Image source={require("../assets/images/tunisie.png")} style={{height:20,width:20,left:280,bottom:28,marginBottom:-20}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() =>{ toggleLanguage("french")  }} >
                                <Text style={styles.dropdownItem}>France</Text>
                                <Image source={require("../assets/images/france.png")} style={{height:20,width:20,left:280,bottom:28,marginBottom:-20}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() =>{ toggleLanguage("english")  }}>
                                <Text style={styles.dropdownItem}>english</Text>
                                <Image source={require("../assets/images/britsh.png")} style={{height:20,width:20,left:280,bottom:28,marginBottom:-20}}/>
                            </TouchableOpacity>
                        </View>
                    )}
                 
                 {infor.role==="buyer"?(<View style={{ alignItems: "flex-end" }}>
                        <View style={styles.cartCount}>
                            <Text style={styles.cartnumber}>{cartItems.length}</Text>
                        </View>
                        <TouchableOpacity onPress={() => { navigation.navigate("Cart") }}>
                            <Fontisto name="shopping-bag" size={24} />
                        </TouchableOpacity>
                    </View>):(
                         
                         <View style={{ alignItems: "flex-end" }}>
                        <View style={styles.cartCount}>
                            <Text style={styles.cartnumber}>{ItemsOrder}</Text>
                        </View>
                        <TouchableOpacity onPress={() => { navigation.navigate("OrderScreen") }}>
                        
                            <Image source={require("../assets/images/order.png")} style={{height:24,width:24,top:-4,right:7}} />
                        </TouchableOpacity>
                    </View>

                    )}
                    
                </View>
            </View>
            <ScrollView>
                <Welcome />
                <Carousel />
                <Categories />
                <Headings />
                <ProductRow />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home


