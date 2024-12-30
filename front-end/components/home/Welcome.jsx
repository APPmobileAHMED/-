import {View,Text,StyleSheet, TouchableOpacity, TextInput,Image,  Modal,} from "react-native"
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../constants";
import { Feather, Fontisto, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../authcontext/authcontext";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import styles from "../../components/home/styleHomeFile/styleWelcome"



const Welcome=()=>{
    const navigation=useNavigation()
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("")
    const [modalVisible, setModalVisible] = useState(false);
  
    return(

        <View>
       <View style={styles.container}>
<Text style={styles.tex}>
عمر دارك بأرخص الأسوام
</Text>
<Text style={styles.texx} > 
Luxurious furniture
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
    placeholder=" what are you looking here"
    />
</View>

<View>
    <TouchableOpacity style={styles.searchbtn} >
        <Fontisto name="filter" size={20} color={COLORS.offwhite}/>
    </TouchableOpacity>
    
</View>

</View>
<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Are you sure?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.nextButton} >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    

       </View>



    )
}

export default Welcome
