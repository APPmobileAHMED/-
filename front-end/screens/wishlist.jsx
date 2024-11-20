import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DATA = [
  {
    id: '1',
    title: 'Recycle Boucle Knit Cardigan Pink',
    price: '$120',
    rating: 4.8,
    sizes: ['S', 'M', 'L'],
    image: 'https://gratisography.com/wp-content/uploads/2024/03/gratisography-funflower-800x525.jpg',
    description:"hdccjiefji"
  },
  // أضف المزيد من العناصر بنفس الطريقة
];

const Item = ({ title, description, price, rating, sizes, image }) => (
    <View style={styles.item}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.rating}>Rating: {rating}</Text>
        <Text style={styles.sizes}>Sizes: {sizes.join(', ')}</Text>
      </View>
      <TouchableOpacity style={styles.heartIcon}>
        <Ionicons name="heart-dislike-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.cartticon}>
        <Ionicons name="cart-outline" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
const Whishlist = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity>
            <Ionicons name="search" size={30} color="black" />
          </TouchableOpacity>
        <Text style={styles.headerTitle}>Open Fashion</Text>
        <View style={styles.headerIcons}>
         
          <TouchableOpacity>
            <Ionicons name="cart" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        padding:5,
       
      flex: 1,
      backgroundColor: 'white',
    },
    header: {
        marginTop:25,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    headerIcons: {
      flexDirection: 'row',
    },

item: {
  flexDirection: 'row',
  padding: 5,
  marginVertical: 8,
  marginHorizontal: 16,
  backgroundColor: '#f9f9f9',
  borderRadius: 10,
  alignItems: 'center', // تركز المحتوى عموديا
},
image: {
  width: 100,
  height: 100,
  borderRadius: 10,
  marginRight: 10,
},
textContainer: {
  flex: 1,
  justifyContent: 'center',
},
cartticon:{
    top:50
},
title: {
  fontSize: 16,
  fontWeight: 'bold',
  marginVertical: 5,
},
description: {
  fontSize: 14,
  color: '#333',
  marginBottom: 5,
},
price: {
  fontSize: 14,
  color: 'green',
},
rating: {
  fontSize: 14,
},
sizes: {
  fontSize: 14,
},
heartIcon: {
  alignSelf: 'center',
  marginLeft: 10,
  bottom:50,
  left:25
},


    });
    
export default Whishlist;
