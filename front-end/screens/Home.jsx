import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from "react-native";
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
import { AdresseIPPP_ } from '@env';

const Home = () => {
    const { infor, refreshh, setrefreshh, setSearchInput } = useAuth();
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

                    <View style={{ alignItems: "flex-end" }}>
                        <View style={styles.cartCount}>
                            <Text style={styles.cartnumber}>{cartItems.length}</Text>
                        </View>
                        <TouchableOpacity onPress={() => { navigation.navigate("Cart") }}>
                            <Fontisto name="shopping-bag" size={24} />
                        </TouchableOpacity>
                    </View>
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

const styles = StyleSheet.create({
    textStyle: {
        fontFamily: "bold",
        fontSize: 40,
    },
    appBarWrapper: {
        marginHorizontal: 22,
        marginTop: SIZES.small
    },
    appBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    location: {
        fontFamily: "semibold",
        fontSize: SIZES.medium,
        color: COLORS.gray
    },
    cartCount: {
        position: "absolute",
        bottom: 16,
        width: 16,
        height: 16,
        borderRadius: 8,
        alignItems: "center",
        backgroundColor: "green",
        justifyContent: "center",
        zIndex: 9999
    },
    cartnumber: {
        fontFamily: "regular",
        fontWeight: "600",
        fontSize: 10,
        color: COLORS.lightWhite
    },
    dropdown: {
        position: "absolute",
        top: 40,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
        zIndex: 9999
    },
    dropdownItem: {
        padding: 10,
        fontSize: 16,
        color: COLORS.gray,
    }
});
