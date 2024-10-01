import React, { useEffect, useState } from "react"
import { View, Text, TextInput,Button, Image, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Ale, Buttonrt } from "react-native"
import { MaterialCommunityIcons, FontAwesome, Ionicons } from "@expo/vector-icons"
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useAuth } from "../components/authcontext/authcontext"
import { COLORS } from "../constants"
import axios from "axios"
import * as Location from 'expo-location'
import MapView, { Marker } from 'react-native-maps' 

const Profile = () => {
  const [name, setName] = useState("")
  const [currentpassword,setcurrentPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [instagram, setInstagram] = useState("")
  const [refresh, setrefresh] = useState(false)
  const [newpassword, setPassword] = useState("")
  const [image, setImage] = useState(null)
  const [file, setfile] = useState(null)
  const {logout,seller,buyer,infor,setrefreshh,refreshh} = useAuth()
  const [location, setLocation] = useState(null)
  const [mapVisible, setMapVisible] = useState(false) 
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [placeName, setPlaceName] = useState('') 
  const [detail,settdet]=useState()
 
  

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

  const navigation = useNavigation()
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
    formData.append("file", {
      uri: file,
      type: "image/jpeg",
      name: file.split("/").pop(),
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

  const updateProfile= async()=>{
    try{ 
      const result =await axios.put(`http://192.168.1.13:8080/api/edit/${infor.id}`,{
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
  

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}>
          <View style={styles.gradientTop} />
          <View style={styles.gradientBottom} />
          <TouchableOpacity onPress={() => { navigation.goBack();setrefresh(!refresh);setImage(infor.photoDeprofile) }}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="white" style={{ right: 150, top: 78 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={() => { logout();navigation.navigate('Login'); setrefresh(!refresh) }}>
            <MaterialCommunityIcons name="logout" size={24} color="white" style={{ left: 150, top: 50 }} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{infor.firstname+" "+infor.lastname}</Text>
          <TouchableOpacity onPress={pickImage}>
            
            <Image source={{ uri:image||"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJsAAACUCAMAAACz6atrAAAAG1BMVEXv7/TV1djq6u/y8vfZ2dzk5Ojg4OTd3eDn5+v1tPL8AAAC2UlEQVR4nO2bCXLkIAxFzc79T5y23Zk4DjZIpr9UU/oneKUNIcSymEwmk8lkMplMpv9EYZc0RkM+pRJLySl5aZSjwvLCiu5bMZbkldivFteQAvOFNtlqvuJlbeevyDYVQbLg4x3ay3ZVzHT5nmwLO71oUn69DTVZuCGricCFNIqGj7k6juYcuAx3ioekVwke3bwKLHOehuYiDi0M5+g/w+HgqGhAwxGjbRUsVQdPhKMyKBt63UdLEcVGR0M5lXJcwdkY4eZcVcyGqXCBkQrGptynmtnIJ/0qzG1Qc32j9eNgNtaZhUHTzaa4D6FdsnYVFBujwMFuWgw2TBvSGwhe2A1TQ1jlzUUIHKsNwdxmOBVkFSJTWZXXYa7PxsZk0xxvitk01xAuG+TCwLrKgE5UzWysaxbowsA86xFozOKLYdM8D+GMonHDaHqmAh+ga6K9Z1XoWgGJDTXA30Wbc6EuWW82UgEGv59SCjDwFXCXZjZCwCFfdjcRAg6+NTV+qgosiAxXuAxHG55IYwYhJ+l16XA7IoE2eFHFR9sOp9Wjy1g6yG2E9gpwxHYgR3UNJ1I/jM3YjM3YjM3YjG2a+n2I1N+KOtD4ynyaGSHb6bBcYaEMB0tagMajjS1fcYfa2fasx48MaM85Cxi7ymfpPNWZZ+P5D0Ve8PkZmVs/4s2veGHxozWjq6nGCyHU5yb7UVyLyhQ8XxM7/G+U06PUCEvNx0+vsxUL272XP0un8nEWvCBkG10mtgPTknJIhHYg8Gs/U3F4gsh6u31KN2Q6uNHeGmhVuOtGz9X1qxxadzYsidaBk0W7hxNKgx9dJwRz02iirkpJ4C0azdXVG7VwsO1qPlLzvsFMV9urKszWLsHyifBWw3BKzNZYtlUSbav+Rpwas/1NVe6W+Cd0rnFqMmHVyamKXHrel9Pk0pNTFWXppqNTeWuxn9OvVkkZ2/Hc0tAdHXUMOGXh9mb7Aum9J7qu5UnOAAAAAElFTkSuQmCC" } } style={styles.profileImage} />
          </TouchableOpacity>
         

        </View>
        <TouchableOpacity >
          <View style={{width:100,left:130,top:5}} >
          <Button onPress={()=>{uploadImage()}} color={COLORS.green} title="تنزيل الصورة "  >
            
            <Ionicons name="cloud-download" size={28} style={{right:50,bottom:20}} />
            </Button>
          </View>
           
           
          </TouchableOpacity>

        <View style={styles.detailsContainer}>
          
          <TouchableOpacity style={styles.detailItem}>
            <MaterialCommunityIcons name="account-outline" size={24} color={COLORS.green} />
            <TextInput
              style={styles.detailTextInput}
              value={name}
              onChangeText={setName}
              placeholder="Name"
            />
          </TouchableOpacity>
          <View style={styles.underline} />

          <TouchableOpacity style={styles.detailItem} >
            <FontAwesome name="map-marker" size={24} color="green" />
            <TextInput
              style={styles.detailTextInput}
              placeholder="Location"
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
              placeholder="Phone Number"
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
              placeholder="Instagram"
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

        </View>

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

        <TouchableOpacity  >
          {!mapVisible &&(
             <TouchableOpacity style={styles.buttonGradient1} onPress={()=>{updateProfile()}}>
             <Text style={styles.buttonText1}>Edit Profile</Text>
             </TouchableOpacity>
          )}
        
          {mapVisible && (
          <View  >
             <TouchableOpacity style={styles.saveButton} onPress={() => setMapVisible(false)}>
             <Text style={styles.saveButtonText}>Save Location</Text>
             </TouchableOpacity>
           
            <TouchableOpacity style={styles.buttonGradient} onPress={()=>{updateProfile()}}>
            <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        )}
         
        </TouchableOpacity>

       
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  buttonimg:{
 

  },
  header: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    overflow: 'hidden',
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: COLORS.green,
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: COLORS.green,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    bottom: 4,
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailTextInput: {
    flex: 1,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    paddingVertical: 5,
    fontSize: 16,
    color: COLORS.darkGray,
  },
  underline: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: 5,
  },
  editButton: {
    alignSelf: 'center',
    marginVertical: 20,
    left:-50
  },
  buttonGradient: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    left:120,
    width:130,
    bottom:180,
    backgroundColor: COLORS.green,
    borderRadius: 20,
  },
  buttonGradient1:{
    paddingVertical: 10,
    paddingHorizontal: 20,
    left:120,
    width:130,
    bottom:100,
    backgroundColor: COLORS.green,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonText1: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveButton: {
    alignSelf: 'center',
    marginVertical: 80,
    bottom:390,
    backgroundColor: COLORS.green,
    padding: 10,
    borderRadius: 20,
    left:130

  },
  saveButtonText: {
    color: 'yellow',
    fontSize: 10,
    fontWeight: 'bold',
  },
  map: {
    height: 300,
    marginVertical: 20,
  },
})

export default Profile
