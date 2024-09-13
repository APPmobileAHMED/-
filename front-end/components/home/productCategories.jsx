import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, Ionicons } from "@expo/vector-icons";
import { COLORS,SIZES } from '../../constants';
import { useNavigation } from "@react-navigation/native";
const jackets = [
  {
    id: '1',
    title: 'Club Fleece Mens Jacket',
    price: '$55.97',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqGK3diR3Zi-mnOXEaj-3ewmFyRYVxGzVzZw&s', // Add a valid image link here
  },
  {
    id: '2',
    title: 'Skate Jacket',
    price: '$150.97',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqGK3diR3Zi-mnOXEaj-3ewmFyRYVxGzVzZw&s', // Add a valid image link here
  },
  {
    id: '3',
    title: 'Therma Fit Puffer Jacket',
    price: '$280.97',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqGK3diR3Zi-mnOXEaj-3ewmFyRYVxGzVzZw&s', // Add a valid image link here
  },
  {
    id: '4',
    title: 'Men\'s Workwear Jacket',
    price: '$128.97',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqGK3diR3Zi-mnOXEaj-3ewmFyRYVxGzVzZw&s', // Add a valid image link here
  }
];

const ProductWithCategorie = () => {

    const navigation=useNavigation()
  return (
    <View style={styles.contain}>
        <TouchableOpacity style={{left:10,}} >
          <Ionicons name="arrow-back-circle-outline" size={45} color={COLORS.black} onPress={()=>{navigation.goBack()}} />
          </TouchableOpacity>
    <FlatList
      data={jackets}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        </TouchableOpacity>
      )}
      numColumns={2} // Display items in two columns
    />
    </View>
  );
};

const styles = StyleSheet.create({
    contain:{
        top:50
    },
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  textContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default ProductWithCategorie
