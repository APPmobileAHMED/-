import React, { useState, useRef,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Animated, Easing,ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Ionicons,MaterialCommunityIcons } from "@expo/vector-icons"
import * as ImagePicker from 'expo-image-picker'
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native"
import axios from 'axios';
import {AdresseIPPP_} from '@env'
import { useAuth } from '../components/authcontext/authcontext';
const COLORS = {
  green: '#4CAF50',
  lightGreen: '#81C784',
  darkGreen: '#388E3C',
  white: '#FFFFFF',
  lightGray: '#E0E0E0',
  darkGray: '#757575',
};
const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [img1, setImages1] = useState('');
  const [img2, setImages2] = useState('');
  const [img3, setImages3] = useState('');
  const [img4, setImages4] = useState('');
  const [file1, setfile1] = useState(null)
  const [file2, setfile2] = useState(null)
  const [file3, setfile3] = useState(null)
  const [file4, setfile4] = useState(null)
const[allfiles,setallfiles]=useState([])
const [loading, setLoading] = useState(false); 
const [refr, setref] = useState(false)
const [length, setLength] = useState('');
const [width, setWidth] = useState('');
const navigation = useNavigation()
  const {category,setrefreshh,refreshh,infor} = useAuth()
  const [selectedCategory, setSelectedCategory] = useState('')


  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;


  React.useEffect(() => {
    
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);


  

  const pickImage = async (imageNumber) => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log('ImagePicker result:', result);
  
      if (!result.canceled) {
        const source = { uri: result.assets[0].uri };
        console.log('Selected image URI:', source.uri);
  
        if (imageNumber === 1) setfile1(source.uri);
        else if (imageNumber === 2) setfile2(source.uri);
        else if (imageNumber === 3) setfile3(source.uri);
        else if (imageNumber === 4) setfile4(source.uri);
  
        setallfiles((prevFiles) => [...prevFiles, source.uri]);
      }
    } catch (error) {
      console.error('ImagePicker Error: ', error);
    }
  };
  

  const uploadImage = async () => {
    setLoading(true)
    const uploadedImages = [];

    
    for (let i = 0; i < allfiles.length; i++) {
      const formData = new FormData();
      formData.append("file", {
        uri: allfiles[i],
        type: "image/jpeg",
        name: allfiles[i].split("/").pop(),
      });
      formData.append("upload_preset", "ecommer-ce");
  
      try { 
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dcwa4oceq/image/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        if (response.status === 200) {
          const imageUrl = response.data.secure_url;
          uploadedImages.push(imageUrl);
        } else {
          console.error("Failed to upload image");
        }
      } catch (error) {
        console.error("Image upload error: ", error);
      }
    }
  
    
    if (uploadedImages.length === allfiles.length) {
      
      setImages1(uploadedImages[0] || '');
      setImages2(uploadedImages[1] || '');
      setImages3(uploadedImages[2] || '');
      setImages4(uploadedImages[3] || '');
  
      console.log("Uploaded Images:", uploadedImages);
  
     
      setallfiles([]);
    }
    setLoading(false)
  };
  
  
  
  const animatedStyle = {
    opacity: fadeAnim,
    transform: [{ translateY: slideAnim }],
  }

  const addproduct= async ()=>{
    try{
     
  const result=await axios.post(`${AdresseIPPP_}/api/product/add`,{
    name:name,
    price:price,
    width:width,
    length:length,
    stock:stock,
    img1:img1,
    img2:img2,
    img3:img3,
    img4:img4,
    userId:infor.id,
    categoryId: selectedCategory.id
  })

console.log(result.data,"gh")
setrefreshh(!refreshh)

    }
    catch(err){
      console.log(err)
      
    }

  }

  return (
    <LinearGradient colors={['#4CAF50', '#45a049', '#388E3C']} style={styles.container}>
      <Animated.View style={[styles.content, animatedStyle]}>
        <Text style={styles.title}>إضافة منتج جديد</Text>
        
        <TouchableOpacity onPress={() => { navigation.goBack();setName(''),setImages1(""),setImages2(""),setImages3(""),setImages4(""),setPrice(""),setStock(""),setSelectedCategory(""),setDescription("") }}>
            <MaterialCommunityIcons name="arrow-left" size={30} color={COLORS.white} style={{marginTop:-30,top:-10}} />
          </TouchableOpacity>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>name product</Text>
          <TextInput
            style={styles.input}
            placeholder="اسم المنتج"
            placeholderTextColor="#7caf7e"
            value={name}
            onChangeText={setName}
          />
        </View>

      
        <View style={styles.row}>
    <View style={styles.halfInputContainer}>
        <Text style={styles.label}>longueur</Text>
        <TextInput
            style={styles.input}
            placeholder="أدخل الطول"
            placeholderTextColor="#7caf7e"
            value={length}
            onChangeText={setLength}
            keyboardType="numeric"
        />
    </View>
    <View style={styles.halfInputContainer}>
        <Text style={styles.label}>Largeur</Text>
        <TextInput
            style={styles.input}
            placeholder="أدخل العرض"
            placeholderTextColor="#7caf7e"
            value={width}
            onChangeText={setWidth}
            keyboardType="numeric"
        />
    </View>
</View>



      
        <Text style={styles.label}></Text>
        <View style={styles.row}>
          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>price</Text>
            <TextInput
              style={styles.input}
              placeholder="السعر"
              placeholderTextColor="#7caf7e"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>stock</Text>
            <TextInput
              style={styles.input}
              placeholder="المخزون"
              placeholderTextColor="#7caf7e"
              value={stock}
              onChangeText={setStock}
              keyboardType="numeric"
            />
          </View>
        </View>
        
         <View style={styles.inputContainer}>
          <Text style={styles.label}>اختيار الفئة</Text>
          <Picker
            selectedValue={selectedCategory}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          >
            {category.map((category, index) => (
  <Picker.Item key={index} label={`${category.name} ${category.specifiqueType ? category.specifiqueType : '.'}`} value={category} />
))}
          </Picker>
        </View>
       
        <Text style={styles.label}>الصور (4)</Text>
        <Text style={{color:"#2E7D32",right:134,backgroundColor:"rgba(232, 245, 233, 0.9)",marginHorizontal:129,borderRadius:5}}>الصورة الرئيسية</Text>
        <View style={styles.imageContainer}>
            <TouchableOpacity  style={styles.imageBox} onPress={()=>pickImage(1)}>
              {img1 ? (
                <Image source={{ uri: img1 }} style={styles.image} />
              ) : (
                <Text style={styles.imagePlaceholder}>+</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity  style={styles.imageBox} onPress={()=>pickImage(2)}>
              {img2 ? (
                <Image source={{ uri: img2 }} style={styles.image} />
              ) : (
                <Text style={styles.imagePlaceholder}>+</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity  style={styles.imageBox} onPress={()=>pickImage(3)}>
              {img3 ? (
                <Image source={{ uri: img3 }} style={styles.image} />
              ) : (
                <Text style={styles.imagePlaceholder}>+</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity  style={styles.imageBox} onPress={()=>pickImage(4)}>
              {img4 ? (
                <Image source={{ uri: img4 }} style={styles.image} />
              ) : (
                <Text style={styles.imagePlaceholder}>+</Text>
              )}
            </TouchableOpacity>
            
          
        </View>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFFFFF" />
            <Text style={styles.loadingText}>تحميل الصور...</Text>
          </View>
        )}
         <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={()=>{uploadImage()}}
          >
            <Ionicons name="cloud-upload-outline" size={30} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.checkboxText}>عندما تنتهي من إختيار الصور إضغط على أيقونة التحميل </Text>
        </View>
        
        <Animated.View style={{ transform: [{ scale: buttonScale }] }} >
          <TouchableOpacity style={styles.button} onPress={()=>{addproduct()}}  >
            <Text style={styles.buttonText}>إضافة المنتج</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 10,
    marginTop: 25,
  },
  title: {
    fontFamily:"bold",
    top:10,
    fontSize: 28,

   
    marginBottom: 30,
    color: '#E8F5E9',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  inputContainer: {
    fontFamily:"bold",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontFamily:"bold",
    color: '#E8F5E9',
    marginBottom: 1,
  },
  loadingText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  
  input: {
    fontFamily:"bold",
    backgroundColor: 'rgba(232, 245, 233, 0.9)',
    borderRadius: 12,
    padding: 5,
    fontSize: 16,
    color: '#2E7D32',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textArea: {
    height: 70,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  halfInputContainer: {
    width: '48%',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    top:12
  },
  imageBox: {
    width: 70,
    height: 70,
    backgroundColor: 'rgba(232, 245, 233, 0.9)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  imagePlaceholder: {
    fontSize: 30,
    color: '#4CAF50',
  },
  picker:{
    fontFamily:"bold",
    backgroundColor: 'rgba(232, 245, 233, 0.9)',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#2E7D32',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: '#81C784',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#1B5E20',
    fontSize: 18,
  
    fontFamily:"bold",
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    
     left:30,
  },
  checkbox: {
  right:10
  },
  checkboxLabel: {
    fontSize: 20,
    color: '#E8F5E9',
  },
  checkboxText: {
    color: '#E8F5E9',
    fontSize: 14,
  },
});

export default AddProduct;
