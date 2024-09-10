import {View,Text} from "react-native"
import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {Home,Search,Profile} from "../screens/index.js"
import {Ionicons} from "@expo/vector-icons" 
import {COLORS} from "../constants/index"
import { useAuth } from "../components/authcontext/authcontext.jsx"


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
    const {token,information}=useAuth()

  
      
   
    




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
          

          <Tab.Screen options={{
                tabBarIcon:({focused})=>{
                    return <Ionicons name={focused ? "person" : "person-outline"} size={24} color={focused ? COLORS.primary : COLORS.gray2}/>
                }
            }} name="Profile" component={Profile}/>

        </Tab.Navigator>
    )
}

export default BottomTabNav
