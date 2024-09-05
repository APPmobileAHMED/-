import {View,Text,StyleSheet,TouchableOpacity} from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "../components/authcontext/authcontext";
import { useNavigation } from "@react-navigation/native";

const Profile=()=>{
const {logout}=useAuth()

const navigation=useNavigation()


    return(
        <SafeAreaView>
            
           <Text> Profile</Text>
           <TouchableOpacity onPress={()=>{logout(); navigation.navigate('Login') }}>
            <Text> deconnexion</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Profile
const  styles=StyleSheet.create({})