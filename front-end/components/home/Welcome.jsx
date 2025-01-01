import {View,Text,StyleSheet, TouchableOpacity, TextInput,Image,  Modal,} from "react-native"
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../constants";
import { Feather, Fontisto, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../authcontext/authcontext";
import axios from "axios";
import styles from "../../components/home/styleHomeFile/styleWelcome"
import { useTranslation } from "react-i18next";



const Welcome=()=>{
    const navigation=useNavigation()
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("")
    const [modalVisible, setModalVisible] = useState(false);
   const { t,} = useTranslation()
    return(

        <View>
       <View style={styles.container}>
<Text style={styles.tex}>
{t('welcome:title')}
</Text>
<Text style={styles.texx} > 
{t('welcome:subtitle')}
</Text>
       </View>

<View style={styles.searchcont}>
<TouchableOpacity>
    <Feather name="search" size={24} style={styles.searchhIco} />
</TouchableOpacity>

<View style={styles.searchwrapper} >
    <TextInput
    style={styles.searchinput}
    value=""
    onPressIn={()=>{navigation.navigate("Search")}}
    placeholder={t('welcome:placeholderSearch')}
    />
</View>

<View>
    <TouchableOpacity style={styles.searchbtn} >
        <Fontisto name="filter" size={20} color={COLORS.offwhite}/>
    </TouchableOpacity>
    
</View>

</View>
       </View>



    )
}

export default Welcome
