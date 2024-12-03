import {View,Text,StyleSheet, TouchableOpacity, TextInput,Image,  Modal,} from "react-native"
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../constants";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../authcontext/authcontext";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

import * as FileSystem from 'expo-file-system'; 



const Welcome=()=>{
    const navigation=useNavigation()
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("")
    const [modalVisible, setModalVisible] = useState(false);
    const [analysisResult, setAnalysisResult] = useState("");
    const [label, setLabel] = useState([])

    const openCamera = async () => {
        // Demander la permission pour accéder à la caméra
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Permission to access camera is required!");
          return;
        }
    
        // Ouvrir la caméra
        const result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          quality: 1,
        });
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);

          console.log(result.assets[0].uri)
        //   setModalVisible(true)
          
        }
      };

      const uploadImage = () => {
        const formData = new FormData()
    
        if(!image){
          alert("please enter image")
        }else{
          formData.append("file", {
            uri: image,
            type: "image/jpeg",
            name: image.split("/").pop() ,
          })
          formData.append("upload_preset", "ecommer-ce")
        
          axios.post("https://api.cloudinary.com/v1_1/dcwa4oceq/image/upload", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
      
              console.log("Upload response:", response)
        
              if (response.status === 200) {
                const imageUrl = response.data.secure_url
                setUrl(imageUrl) 
                analyzeImage(imageUrl);
                console.log(imageUrl)
                
              } else {
                Alert.alert("Error", "Failed to upload image")
              }
            }) 
            .catch((error) => {
              console.error("Image upload error:", error)
              Alert.alert("Error", "An error occurred while uploading the image")
            })
    
        }
        
      }

      const analyzeImage = async (imageUrl) => {
      
       try{
        if(!imageUrl){
            alert("select image please")
        }

        const apiKey= "AIzaSyBV6zRZHtpiLvXKK8QI3fn16BLKlKqOpTI"
        const apiUrl= `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`
        const base64ImageData=await FileSystem.readAsStringAsync(imageUrl,{
            encoding:FileSystem.EncodingType.Base64
        })

        const requestData={
            requests:[
                {
                    image:{
                        content:base64ImageData,
                    },
                    features: [{type:'LABEL_DETECTION',maxResults:5} ],
                },
            ],
        }

        const apiResponse=await axios.post(apiUrl,requestData)
        setLabel(apiResponse.data.responses[0].labelAnnotations)
       }catch (error){
        console.error("errroeoorr",error)
        alert("errror")
       }
       
      };

      const handleNext = () => {
        uploadImage()
        setModalVisible(false);
        console.log("Next clicked, image URL:", image);
        // أضف الكود هنا حسب الإجراء اللي تحب تعملو بعد الضغط على "Next"
      };


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
    <TouchableOpacity style={styles.searchbtn} onPress={openCamera}>
        <Ionicons name="camera-outline" size={SIZES.xLarge} color={COLORS.offwhite}/>
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
              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
     {
        label.length > 0 && (
            <View>
                <Text>
                    labels:
                </Text>
                {
                    label.map((label)=>(
                   <Text key={label.mid}>
                       {label.description}
                   </Text>
                    )
                    )
                }
                </View>
        )
     }

       </View>



    )
}

export default Welcome
const  styles=StyleSheet.create({
    container:{
        width:"100"
    },
    tex:{
        fontFamily:"bold",
        fontSize:SIZES.xLarge,
        marginTop:SIZES.xSmall,
        color:COLORS.black,
        marginHorizontal:12,
    },
    texx:{
        fontFamily:"bold",
        fontSize:SIZES.xxLarge -5,
        marginTop:SIZES.xSmall,
        color:COLORS.primary,
        marginHorizontal:SIZES.small,
    }, 
    searchcont:{
        flexDirection:"row",
        justifyContent:"center",
        alignContent:"center",
        backgroundColor:COLORS.secondary,
         borderRadius:SIZES.medium,
         marginVertical:SIZES.medium,
         height:50,
         marginHorizontal:SIZES.small,


    },
    searchhIco:{
        marginTop:SIZES.small,
        marginHorizontal:10,
        color:COLORS.gray
    },
    searchwrapper:{
        flex:1,
      backgroundColor:COLORS.secondary,
      marginRight:SIZES.small,
      borderRadius:SIZES.small
    },
    searchinput:{
        fontFamily:"regular",
        width:"100%",
        height:"100%",
        paddingHorizontal:SIZES.small 
       },
       searchbtn:{
        width:50,
        height:"100%",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:COLORS.primary,
        borderRadius:SIZES.medium
       },
       modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
      },
      modalText: {
        fontSize: 18,
        marginBottom: 20,
      },
      modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
      },
      cancelButton: {
        backgroundColor: COLORS.gray,
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
      },
      nextButton: {
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 5,
      },
      buttonText: {
        color: "white",
        fontWeight: "bold",
      },
})  