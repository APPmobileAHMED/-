import React, { useEffect, useState } from "react"
import { View, Text, TextInput,Button, Image, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Ale, Buttonrt } from "react-native"
import { MaterialCommunityIcons, FontAwesome, Ionicons } from "@expo/vector-icons"
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useAuth } from "../components/authcontext/authcontext"
import {AdresseIPPP_} from '@env'
import axios from "axios"
import * as Location from 'expo-location'
import MapView, { Marker } from 'react-native-maps' 

const COLORS = {
  green: '#4CAF50',
  lightGreen: '#81C784',
  darkGreen: '#388E3C',
  white: '#FFFFFF',
  lightGray: '#E0E0E0',
  darkGray: '#757575',
};

const Profile = () => {
  const [name, setName] = useState("")
  const [currentpassword,setcurrentPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [instagram, setInstagram] = useState("")
  const [refresh, setrefresh] = useState(false)
  const [newpassword, setPassword] = useState("")
  
  const [file, setfile] = useState(null)
  const {logout,seller,buyer,infor,setrefreshh,refreshh,image, setImage} = useAuth()
  const [location, setLocation] = useState(null)
  const [mapVisible, setMapVisible] = useState(false) 
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [placeName, setPlaceName] = useState('') 
  const navigation = useNavigation()
 
  

useEffect(()=>{
  console.log(infor,"hddd")

},[refresh,refreshh])

  useEffect(() => {
    if (file) {
      console.log('fileImage', file)
      console.log(image,"ff")
    }
  }, [image])


  
  const getLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
     
      return
    }


    let location = await Location.getCurrentPositionAsync({})
    setLocation(location)
    setSelectedLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    })

   
    let reverseGeocode = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    })
    if (reverseGeocode.length > 0) {
      setPlaceName(`${reverseGeocode[0].city}, ${reverseGeocode[0].region}`) 
    }
  }

  useEffect(() => {
    getLocationPermission()
  }, [])

  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate
    setSelectedLocation({ latitude, longitude })

   
    let reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude })
    if (reverseGeocode.length > 0) {
      setPlaceName(`${reverseGeocode[0].city}, ${reverseGeocode[0].region}`) 
    }
  }

 

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })

      console.log('ImagePicker result:', result)

      if (!result.canceled) {
        const source = { uri: result.assets[0].uri }
        console.log('Selected image URI:', source.uri)
        setfile(source.uri)
      }
    } catch (error) {
      console.error('ImagePicker Error: ', error)
    }
  }
 
   
  const uploadImage = () => {
    const formData = new FormData()

    if(!file){
      alert("please enter image")
    }else{
      formData.append("file", {
        uri: file,
        type: "image/jpeg",
        name: file.split("/").pop() ,
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
            setImage(imageUrl) 
            
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

  const updateProfile= async()=>{
  if(name==="" || placeName==="" || phone==="" || image===null ){
    alert("you must put the information")
  }else{

  

    try{ 
      const result =await axios.put(`${AdresseIPPP_}edit/${infor.id}`,{
        photoDeprofile:image||infor.photoDeprofile,
        instagram:instagram,
        location:placeName,
        phoneNumber:phone,
        newPassword:newpassword,
        username:name,
        password:currentpassword
      })
      
      if(result.data==="wrong current password"){
        alert("your current password isnt true please try again")
      }else{
        alert("success") 
        setTimeout(() => {
          setrefreshh(!refreshh)
          setrefresh(!refresh)  
        }, 2000) 
         
        }
    }
    catch(err){
      console.log(err)
    }
  }
  }
  

  return (
     <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => { navigation.goBack(); setrefresh(!refresh); setImage(infor.photoDeprofile) }}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.white} style={styles.backIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={() => { logout(); navigation.navigate('Login'); setrefresh(!refresh) }}>
            <MaterialCommunityIcons name="logout" size={24} color={COLORS.white} style={styles.logoutIcon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{infor.firstname + " " + infor.lastname}</Text>
          <TouchableOpacity onPress={pickImage}>
            <Image source={{ uri: image || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJsAAACUCAMAAACz6atrAAAAG1BMVEXv7/TV1djq6u/y8vfZ2dzk5Ojg4OTd3eDn5+v1tPL8AAAC2UlEQVR4nO2bCXLkIAxFzc79T5y23Zk4DjZIpr9UU/oneKUNIcSymEwmk8lkMplMpv9EYZc0RkM+pRJLySl5aZSjwvLCiu5bMZbkldivFteQAvOFNtlqvuJlbeevyDYVQbLg4x3ay3ZVzHT5nmwLO71oUn69DTVZuCGricCFNIqGj7k6juYcuAx3ioekVwke3bwKLHOehuYiDi0M5+g/w+HgqGhAwxGjbRUsVQdPhKMyKBt63UdLEcVGR0M5lXJcwdkY4eZcVcyGqXCBkQrGptynmtnIJ/0qzG1Qc32j9eNgNtaZhUHTzaa4D6FdsnYVFBujwMFuWgw2TBvSGwhe2A1TQ1jlzUUIHKsNwdxmOBVkFSJTWZXXYa7PxsZk0xxvitk01xAuG+TCwLrKgE5UzWysaxbowsA86xFozOKLYdM8D+GMonHDaHqmAh+ga6K9Z1XoWgGJDTXA30Wbc6EuWW82UgEGv59SCjDwFXCXZjZCwCFfdjcRAg6+NTV+qgosiAxXuAxHG55IYwYhJ+l16XA7IoE2eFHFR9sOp9Wjy1g6yG2E9gpwxHYgR3UNJ1I/jM3YjM3YjM3YjG2a+n2I1N+KOtD4ynyaGSHb6bBcYaEMB0tagMajjS1fcYfa2fasx48MaM85Cxi7ymfpPNWZZ+P5D0Ve8PkZmVs/4s2veGHxozWjq6nGCyHU5yb7UVyLyhQ8XxM7/G+U06PUCEvNx0+vsxUL272XP0un8nEWvCBkG10mtgPTknJIhHYg8Gs/U3F4gsh6u31KN2Q6uNHeGmhVuOtGz9X1qxxadzYsidaBk0W7hxNKgx9dJwRz02iirkpJ4C0azdXVG7VwsO1qPlLzvsFMV9urKszWLsHyifBWw3BKzNZYtlUSbav+Rpwas/1NVe6W+Cd0rnFqMmHVyamKXHrel9Pk0pNTFWXppqNTeWuxn9OvVkkZ2/Hc0tAdHXUMOGXh9mb7Aum9J7qu5UnOAAAAAElFTkSuQmCC" }} style={styles.profileImage} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.uploadButton} onPress={() => { uploadImage() }}>
          <Ionicons name="cloud-upload-outline" size={24} color={COLORS.white} />
          <Text style={styles.uploadButtonText}>تنزيل الصورة</Text>
        </TouchableOpacity>

        <View style={styles.detailsContainer}>
          
          <TouchableOpacity style={styles.detailItem}>
            <MaterialCommunityIcons name="account-outline" size={24} color={COLORS.green} />
            <TextInput
              style={styles.detailTextInput}
              value={name}
              onChangeText={setName}
              placeholder={`${infor.username}`||'name'}
            />
          </TouchableOpacity>
          <View style={styles.underline} />

          <TouchableOpacity style={styles.detailItem} >
            <FontAwesome name="map-marker" size={24} color="green" />
            <TextInput
              style={styles.detailTextInput}
              placeholder={`${infor.location}`||'location'}
              value={placeName ? placeName : selectedLocation ? `Lat: ${selectedLocation.latitude}, Lon: ${selectedLocation.longitude}` : ''}
            />
            <TouchableOpacity onPress={() => setMapVisible(true)}>
            <Ionicons name="locate-outline" size={28} style={{right:20}}  />
             </TouchableOpacity>
            
          </TouchableOpacity>
          <View style={styles.underline} />

          <TouchableOpacity style={styles.detailItem}>
            <MaterialCommunityIcons name="phone-outline" size={24} color={COLORS.green} />
            <TextInput
              style={styles.detailTextInput}
              value={phone}
              onChangeText={setPhone}
              placeholder={`${infor.phoneNumber}`||'Phone Number'}
              keyboardType="phone-pad"

            />
          </TouchableOpacity>
          <View style={styles.underline} />

          <TouchableOpacity style={styles.detailItem}>
            <MaterialCommunityIcons name="instagram" size={24} color={COLORS.green} />
            <TextInput
              style={styles.detailTextInput}
               value={instagram}
              onChangeText={setInstagram}
              placeholder={`${infor.instagram}`||'instagram'}
            />
          </TouchableOpacity>
          <View style={styles.underline} />

          <TouchableOpacity style={styles.detailItem}>
            <MaterialCommunityIcons name="lock-outline" size={24} color={COLORS.green} />
            <TextInput
              style={styles.detailTextInput}
              value={currentpassword}
              onChangeText={setcurrentPassword}
              placeholder="Current Password"
              secureTextEntry
            />
          </TouchableOpacity>
          <View style={styles.underline} />

          <TouchableOpacity style={styles.detailItem}>
            <MaterialCommunityIcons name="lock-outline" size={24} color={COLORS.green} />
            <TextInput
              style={styles.detailTextInput}
              value={newpassword}
              onChangeText={setPassword}
              placeholder="New Password "
              secureTextEntry
            />
          </TouchableOpacity>
          <View style={styles.underline} />

        

        {mapVisible && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location ? location.coords.latitude : 37.78825,
              longitude: location ? location.coords.longitude : -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={handleMapPress}
          >
            {selectedLocation && (
              <Marker
                coordinate={selectedLocation}
                title="Selected Location"
                description={placeName || `Lat: ${selectedLocation.latitude}, Lon: ${selectedLocation.longitude}`}
              />
            )}
          </MapView>
        )}

        {!mapVisible && (
          <TouchableOpacity style={styles.editButton} onPress={() => { updateProfile() }}>
            <Text style={styles.editButtonText}>تعديل الملف الشخصي</Text>
          </TouchableOpacity>
        )}

        {mapVisible && (
          <View>
            <TouchableOpacity style={styles.saveLocationButton} onPress={() => setMapVisible(false)}>
              <Text style={styles.saveLocationButtonText}>حفظ الموقع</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton} onPress={() => { updateProfile() }}>
              <Text style={styles.editButtonText}>تعديل الملف الشخصي</Text>
            </TouchableOpacity>
          </View>
        )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGreen,
  },
  header: {
    fontFamily:"bold",
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.green,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    right: 120,
  },
  logoutIcon: {
    position: 'absolute',
    top: 40,
    left: 120,
  },
  headerText: {
    color: COLORS.white,
    fontSize: 24,
    fontFamily:"bold",
    bottom: -10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: COLORS.white,
    bottom:-15
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.darkGreen,
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 20,
    marginHorizontal: 20,
  },
  uploadButtonText: {
    color: COLORS.white,
    marginLeft: 10,
    fontFamily:"bold",
    fontSize: 16,
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    fontFamily:"bold",
    marginTop: 20,
  },
  detailItem: {
    flexDirection: 'row',
    fontFamily:"bold",
    alignItems: 'center',
    marginBottom: 15,
  },
  detailTextInput: {
    flex: 1,

    fontFamily:"bold",
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    paddingVertical: 5,
    fontSize: 20,
    color: COLORS.darkGray,
  },
  map: {
    height: 320,
    marginVertical: 2,
    marginHorizontal:-20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  editButton: {
    backgroundColor: COLORS.green,
    paddingVertical: 8,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 80,
    top: 10,
  },
  editButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily:"bold",
  },
  saveLocationButton: {
    backgroundColor: COLORS.darkGreen,
    paddingVertical: 1,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 120,
     top: -315,
     left:132,
  },
  saveLocationButtonText: {
    color: "yellow",
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile
