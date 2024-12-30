import { View, Text, StyleSheet, TouchableOpacity, ScrollView,Image, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../constants";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import Welcome from "../components/home/Welcome";
import Carousel from "../components/home/carousel";
import Headings from "../components/home/heading";
import ProductRow from "../components/products/productRow";
import { useNavigation } from "@react-navigation/native";
import Categories from "../components/home/categories";
import { useAuth } from "../components/authcontext/authcontext";
import axios from 'axios';
import styles from "../styleScreens/styleHome.js"
import { AdresseIPPP_ } from '@env';

const Home = () => {
    const { infor, refreshh, setrefreshh, setSearchInput,orders, ItemsOrder } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [language, setLanguage] = useState("tunisia"); // حالة اللغة
    const [isDropdownVisible, setDropdownVisible] = useState(false); // حالة عرض الـ dropdown

    useEffect(() => {
       
        axios.get(`${AdresseIPPP_}/api/cart/cartitems/${infor.id}`)
            .then((res) => {
                setCartItems(Array.isArray(res.data) ? res.data : []);
            })
            .catch((error) => {
                console.log(error);
                setCartItems([]);
            });
    }, [refreshh, infor.id]);

    const navigation = useNavigation();

    // تغيير اللغة عند الاختيار
    const toggleLanguage = (selectedLanguage) => {
        setLanguage(selectedLanguage);
        setDropdownVisible(false); // إخفاء الـ dropdown بعد اختيار اللغة
    };

    return (
        <SafeAreaView>
            <View style={styles.appBarWrapper}>
                <View style={styles.appBar}>
                    <TouchableOpacity onPress={() => setDropdownVisible(!isDropdownVisible)}>
                    <Fontisto name="world" size={24} color={"#24AD50"}  />
                    </TouchableOpacity>
                   
                    <TouchableOpacity >
                        <Text style={styles.location}>{language === "tunisia" ? "Tunisia" : "French"}</Text>
                    </TouchableOpacity>

                    
                    {isDropdownVisible && (
                        <View style={styles.dropdown}>
                            <TouchableOpacity onPress={() => toggleLanguage("tunisia")}>
                                <Text style={styles.dropdownItem}>Tunisia</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => toggleLanguage("french")}>
                                <Text style={styles.dropdownItem}>France</Text>
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
    );
};

export default Home;


