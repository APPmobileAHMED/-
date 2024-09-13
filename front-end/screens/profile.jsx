import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { MaterialCommunityIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../components/authcontext/authcontext";
import { COLORS } from "../constants";
import * as Location from 'expo-location'; // Import Location
import MapView, { Marker } from 'react-native-maps'; 

const Profile = () => {
  const [name, setName] = useState("gcfhgjhk");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const {logout, tokenDecoded, token} = useAuth();
  const [location, setLocation] = useState(null);
  const [mapVisible, setMapVisible] = useState(false); // To toggle the map view
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [placeName, setPlaceName] = useState(''); // New state to store the place name

  const getLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Permission to access location is required.');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setSelectedLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    // Reverse geocode the current location to get the place name
    let reverseGeocode = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    if (reverseGeocode.length > 0) {
      setPlaceName(`${reverseGeocode[0].city}, ${reverseGeocode[0].region}`); // Set city and region as place name
    }
  };

  useEffect(() => {
    getLocationPermission(); // Request permission when the component mounts
  }, []);

  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });

    // Reverse geocode the selected location
    let reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (reverseGeocode.length > 0) {
      setPlaceName(`${reverseGeocode[0].city}, ${reverseGeocode[0].region}`); // Set city and region as place name
    }
  };

  const navigation = useNavigation();
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "Permission to access media library is required!");
      return;
    }

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
          <TouchableOpacity onPress={() => { navigation.goBack(); }}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="white" style={{ right: 150, top: 78 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={() => { logout(); navigation.navigate('Login'); }}>
            <MaterialCommunityIcons name="logout" size={24} color="white" style={{ left: 150, top: 50 }} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{name}</Text>
          <TouchableOpacity onPress={pickImage}>
            <Image source={image ? { uri: image } : { uri: 'https://via.placeholder.com/100' }} style={styles.profileImage} />
          </TouchableOpacity>
        </View>

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
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry
            />
          </TouchableOpacity>
          <View style={styles.underline} />

          <TouchableOpacity style={styles.detailItem}>
            <MaterialCommunityIcons name="lock-outline" size={24} color={COLORS.green} />
            <TextInput
              style={styles.detailTextInput}
              value={password}
              onChangeText={setPassword}
              placeholder=" Current Password"
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

        <TouchableOpacity style={styles.editButton}>
          <View style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </View>
        </TouchableOpacity>

        {mapVisible && (
          <TouchableOpacity style={styles.saveButton} onPress={() => setMapVisible(false)}>
            <Text style={styles.saveButtonText}>Save Location</Text>
          </TouchableOpacity>
        )}
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
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
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
  },
  buttonGradient: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.green,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveButton: {
    alignSelf: 'center',
    marginVertical: 80,
    bottom:40,
    backgroundColor: COLORS.green,
    padding: 10,
    borderRadius: 20,

  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  map: {
    height: 300,
    marginVertical: 20,
  },
});

export default Profile;
