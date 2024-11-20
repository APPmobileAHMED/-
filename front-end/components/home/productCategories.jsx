import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity,KeyboardAvoidingView,ScrollView, StyleSheet, Animated } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from '../../constants';
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import axios from 'axios';
import {AdresseIPPP_} from '@env'


const ProductWithCategorie = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const[allproductBycategories,setall]=useState([])
  const[refresh,setrefresh]=useState(false)
  const navigation = useNavigation();
  
 const route=useRoute()
 const{name}=route.params
 useEffect(()=>{
  console.log(name)
  axios.get(`${AdresseIPPP_}category/${name}`).then((res)=>{
     setall(res.data) 
    console.log(res.data)
   })
  .catch((error)=>console.log(error))
 },[refresh])
const specifiqueproduct=(selectcategory)=>{
  axios.get(`${AdresseIPPP_}category/${name}/${selectcategory}`).then((res)=>{
    setall(res.data) 
   console.log(res.data)
  })
 .catch((error)=>console.log(error))
}

  

  
  const renderCard = ({ item }) => {
    const scaleValue = new Animated.Value(1);

    const onPressIn = () => {
      Animated.spring(scaleValue, {
        toValue: 0.95,
        friction: 7,
        useNativeDriver: true,
      }).start();
    };

    const onPressOut = () => {
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 7,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View style={[styles.card, { transform: [{ scale: scaleValue }] }]}>
        <TouchableOpacity
        onPress={() => navigation.navigate("ProductDetails", { productId: item.id, sellerId: item.userId })}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          <Image source={{ uri: item.img1 }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.supplier} numberOfLines={1}>
            مقاس: الطول {item.length} <Text style={{ fontWeight: 'bold',fontSize: 18}}>/</Text> العرض {item.width}
            </Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
          
        </TouchableOpacity>
        
      </Animated.View>
    );
  };

  return (
   
    <View style={styles.container}>
      <TouchableOpacity style={{ left: 10,top:20 }}>
        <Ionicons name="arrow-back-outline" size={35} color={COLORS.black} onPress={() => { navigation.goBack() }} />
      </TouchableOpacity>

      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => {setSelectedCategory('خشب') ;specifiqueproduct("خشب")}}>
          <Text style={[styles.filterButton, selectedCategory === 'خشب' && styles.selectedFilter]}>خشب</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setSelectedCategory('ألومنيوم');specifiqueproduct("ألومنيوم")}}>
          <Text style={[styles.filterButton, selectedCategory === 'ألومنيوم' && styles.selectedFilter]}>ألومنيوم</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setSelectedCategory('حديد');specifiqueproduct("حديدية")}}>
          <Text style={[styles.filterButton, selectedCategory === 'حديد' && styles.selectedFilter]}>حديد</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setSelectedCategory('');setrefresh(!refresh)}}>
          <Text style={styles.filterButton}>كل الأنواع</Text>
        </TouchableOpacity>
      </View>
 
      <FlatList
        data={allproductBycategories}
        keyExtractor={item => item.id}
        renderItem={renderCard}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 90 }} 
 
      />
      
   
      
      
    </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: 20,
  },
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    padding: 10,
    
    transition: 'transform 0.2s ease-in-out',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  supplier: {
    fontFamily: "regular",
    fontSize: 10,
    color: COLORS.gray,
    marginBottom: 2,
  },
  textContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 5,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    top: 20,
    
  },
  filterButton: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
    marginHorizontal: 5,
    transition: 'background-color 0.2s ease',
  },
  selectedFilter: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
  },
});


export default ProductWithCategorie;
