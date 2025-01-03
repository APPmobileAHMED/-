import {View,Text,Image} from "react-native"
import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {Home,Search,Profile,AddProduct, Cart, ProductDetails} from "../screens/index.js"
import {Ionicons} from "@expo/vector-icons" 
import {COLORS} from "../constants/index"
import { useAuth } from "../components/authcontext/authcontext.jsx"
import Whishlist from "../screens/wishlist.jsx"
import ProductWithCategorie from "../components/home/productCategories.jsx";
import PaymentScreen from "../components/Cart/payment.jsx"
import PaymentScreenTunisie from "../components/Cart/paymentTunis.jsx"
import SuccessPaymentStripe from "../components/Cart/successPaymentStripe.jsx"
import OrderScreen from "../components/Order/orderScreen.jsx"
import OrderDetails from "../components/Order/orderDetails.jsx"
import OrderShipped from "../components/Order/OrderShipped.jsx"
import ProductSeller from "../screens/ProductSeller.jsx"

const Tab =createBottomTabNavigator()



const screenOptions = {
    tabBarShowLabel: false,
    tabBarHideOnKeyboard: true,
    headerShown: false,
    tabBarStyle: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 70
    }
}
const BottomTabNav=()=>{
    const {infor,setSearchInput}=useAuth()

  
    
   
    




    return(
        <Tab.Navigator screenOptions={screenOptions} >

            <Tab.Screen options={{
                tabBarIcon:({focused})=>{
                    
                    return <Ionicons name={focused ? "home" : "home-outline"} size={24} color={focused ? COLORS.primary : COLORS.gray2}/>
                }
            }} name="Home" component={Home}/>


             <Tab.Screen options={{
                tabBarIcon:({focused})=>{
                    return <Ionicons name={"search-sharp"} size={24} color={focused ? COLORS.primary : COLORS.gray2}/>
                }
            }} name="Search" component={Search}/>
          
          <Tab.Screen
                name="ProductWithCategorie"
                component={ProductWithCategorie}
                options={{
                    tabBarButton: (props) => (
                        <View style={{ display: 'none' }} /> 
                    ),
                }}
            />
           <Tab.Screen
                name="Cart"
                component={Cart}
                options={{
                    tabBarButton: (props) => (
                        <View style={{ display: 'none' }} /> 
                    ),
                }}
            />
             <Tab.Screen
                name="ProductDetails"
                component={ProductDetails}
                options={{
                    tabBarButton: (props) => (
                        <View style={{ display: 'none' }} /> 
                    ),
                }}
            />
                   <Tab.Screen
                name="PaymentScreen"
                component={PaymentScreen}
                options={{
                    tabBarButton: (props) => (
                        <View style={{ display: 'none' }} /> 
                    ),
                }}
            />
                <Tab.Screen
                name="PaymentScreenTunisie"
                component={PaymentScreenTunisie}
                options={{
                    tabBarButton: (props) => (
                        <View style={{ display: 'none' }} /> 
                    ),
                }}
            />
              <Tab.Screen
                name="SuccessPaymentStripe"
                component={SuccessPaymentStripe}
                options={{
                    tabBarButton: (props) => (
                        <View style={{ display: 'none' }} /> 
                    ),
                }}
            />
            <Tab.Screen
                name="OrderScreen"
                component={OrderScreen}
                options={{
                    tabBarButton: (props) => (
                        <View style={{ display: 'none' }} /> 
                    ),
                }}
            />
            <Tab.Screen
                name="OrderShipped"
                component={OrderShipped}
                options={{
                    tabBarButton: (props) => (
                        <View style={{ display: 'none' }} /> 
                    ),
                }}
            />
             <Tab.Screen
                name="OrderDetails"
                component={OrderDetails}
                options={{
                    tabBarButton: (props) => (
                        <View style={{ display: 'none' }} /> 
                    ),
                }}
            />

           {infor.role==="seller" &&(
            <Tab.Screen options={{
                tabBarIcon:({focused})=>{
                    return <Ionicons name={"add-circle-sharp"} size={24} color={focused ? COLORS.primary : COLORS.gray2}/>
                }
            }} name="AddProduct" component={AddProduct}/>
           )}


            {infor.role==="buyer" &&(
            <Tab.Screen options={{
                tabBarIcon:({focused})=>{
                    return <Ionicons name={focused ? "heart" :"heart-outline"} size={24} color={focused ? COLORS.primary : COLORS.gray2}/>
                }
            }} name="Whishlist" component={Whishlist}/>
           )}


{infor.role==="seller" &&(
            <Tab.Screen options={{
                tabBarIcon:({focused})=>{
                    return <Ionicons name={focused ? "layers" : "layers-outline"} size={24} color={focused ? COLORS.primary : COLORS.gray2}/>
                }
            }} name="ProductSeller" component={ProductSeller}/>
           )}

            
            <Tab.Screen options={{
                tabBarIcon:({focused})=>{
                    
                    return <Ionicons name={focused ? "person" : "person-outline"} size={24} color={focused ? COLORS.primary : COLORS.gray2}/>
                }
            }} name="Profile" component={Profile}/>
      
            

        </Tab.Navigator>
    )
}

export default BottomTabNav
