import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../components/authcontext/authcontext";

const Profile = () => {
  const [name, setName] = useState("gcfhgjhk");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const {logout}=useAuth()
  
  const navigation=useNavigation()
  const pickImage = async () => {
    // Request permission to access media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "Permission to access media library is required!");
      return;
    }

    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri); 
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null} 
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}>
        
          <View style={styles.gradientTop} />
          <View style={styles.gradientBottom} />
          <TouchableOpacity onPress={()=>{navigation.goBack()}}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="white" style={{right:150,top:78}} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={()=>{logout();navigation.navigate('Login')}} >
            <MaterialCommunityIcons name="logout" size={24} color="white"  style={{left:150,top:50}} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{name}</Text>
          <TouchableOpacity onPress={pickImage}>
            <Image source={image ? { uri: image } : { uri: 'https://via.placeholder.com/100' }} style={styles.profileImage} />
          </TouchableOpacity>
        </View>


       
        <View style={styles.detailsContainer}>
          <TouchableOpacity style={styles.detailItem}>
            <MaterialCommunityIcons name="account-outline" size={24} color="#7a49b3" />
            <TextInput
              style={styles.detailTextInput}
              value={name}
              onChangeText={setName}
              placeholder="Name"
            />
          </TouchableOpacity>
          <View style={styles.underline} />

          <TouchableOpacity style={styles.detailItem}>
            <FontAwesome name="birthday-cake" size={24} color="#7a49b3" />
            <TextInput
              style={styles.detailTextInput}
              value={birthday}
              onChangeText={setBirthday}
              placeholder="Birthday"
            />
          </TouchableOpacity>
          <View style={styles.underline} />

          <TouchableOpacity style={styles.detailItem}>
            <MaterialCommunityIcons name="phone-outline" size={24} color="#7a49b3" />
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
            <MaterialCommunityIcons name="instagram" size={24} color="#7a49b3" />
            <TextInput
              style={styles.detailTextInput}
              value={instagram}
              onChangeText={setInstagram}
              placeholder="Instagram"
            />
          </TouchableOpacity>
          <View style={styles.underline} />

         
          

          <TouchableOpacity style={styles.detailItem}>
            <MaterialCommunityIcons name="lock-outline" size={24} color="#7a49b3" />
            <TextInput
              style={styles.detailTextInput}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry
            />
          </TouchableOpacity>
          <View style={styles.underline} />
          <TouchableOpacity style={styles.detailItem}>
            <MaterialCommunityIcons name="lock-outline" size={24} color="#7a49b3" />
            <TextInput
              style={styles.detailTextInput}
              value={password}
              onChangeText={setPassword}
              placeholder=" current Password"
              secureTextEntry
            />
          </TouchableOpacity>
          <View style={styles.underline} />
        </View>

     
        <TouchableOpacity style={styles.editButton}>
          <View style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    backgroundColor: '#9b5fdd',
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: '#7a49b3',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginTop: 10,
  },
  detailsContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  detailTextInput: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  underline: {
    height: 1,
    backgroundColor: '#d3d3d3',
    marginHorizontal: 40,
    marginBottom: 10,
  },
  editButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  buttonGradient: {
    width: 200,
    paddingVertical: 10,
    backgroundColor: '#7a49b3',
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Profile;
