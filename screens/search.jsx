import {View,Text,StyleSheet,TouchableOpacity,TextInput} from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";


const Search=()=>{




    return(
        <SafeAreaView>
        <View style={styles.searchcont}>
<TouchableOpacity>
    <Feather name="search" size={24} style={styles.searchhIco} />
</TouchableOpacity>

<View style={styles.searchwrapper} >
    <TextInput
    style={styles.searchinput}
    value=""
    onPressIn={()=>{navigation.navigate("Search")}}
    placeholder=" what are you looking here"
    />
</View>

<View>
    <TouchableOpacity style={styles.searchbtn}>
        <Ionicons name="camera-outline" size={SIZES.xLarge} color={COLORS.offwhite}/>
    </TouchableOpacity>
</View>
</View>
        </SafeAreaView>
    )
}

export default Search
const  styles=StyleSheet.create({})