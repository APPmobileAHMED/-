import { View, Text, StyleSheet, TouchableOpacity, TextInput,Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Fontisto, Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import axios from "axios"
import {AdresseIPPP_} from '@env'
import ModalSearch from '../modals/modalSearch'
import { useAuth } from "../components/authcontext/authcontext";
import styles from "../style/styleSearch"
import { useNavigation } from "@react-navigation/native";
const Search = () => {
   const {searchInput, setSearchInput,ProductSearch,isProductInWishlist,infor,setrefreshh,refreshh,setProdSearch} = useAuth()
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectSearch,setSelectsearch]=useState('')
 const navigation = useNavigation();

 const searchwithBar=(name)=>{
  axios.get(`${AdresseIPPP_}/api/search/BarSearch/${name}`)
  .then((response)=>{
    setProdSearch(response.data)
    
    setFilteredData([]);
  })
  .catch((err)=>console.log(err)) 
}
 

  const addtoWishlist=(product)=>{
    axios.post(`${AdresseIPPP_}/api/wishlist/add/${infor.id}`,{
      productId: product
  }).then((res)=>{
      console.log(res.data)
      
      setrefreshh(!refreshh) 
      alert("added to cart")
    }).catch((error)=>{console.log(error)})
  }
  
  deleteFavoriteItem=(id)=>{
    axios.delete(`${AdresseIPPP_}/api/wishlist/delete/${id}`)
    .then((res) => {
         alert("item deleted")
     setrefreshh(!refreshh)
   })
   .catch((error) => {
     console.log("oops");
       
   });
  }

useEffect(()=>{
    if(searchInput===""){
        setFilteredData([])
    }else{ 
    axios.get(`${AdresseIPPP_}/api/search/BarSearch/${searchInput}`)
    .then((response)=>{
        
        setFilteredData(response.data)
    })
    .catch((err)=>console.log(err)) }
},[searchInput])

const Item = ({item}) => {
    return(
     
    <View style={styles.item}>
      
    <TouchableOpacity onPress={()=>navigation.navigate("ProductDetails", { productId: item.id, sellerId: item.userId })}>
          <Image  source={{ uri: item.img1 }} style={styles.image} />
    </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>الثمن :{item.price}</Text>
        <Text style={styles.length}>الطول: {item.length}</Text>
        <Text style={styles.width}>العرض: {item.width}</Text>
      </View>
      {isProductInWishlist(item.id) ? (
              <TouchableOpacity style={styles.heartIcon} onPress={() => deleteFavoriteItem(item.id)}>
                <Ionicons 
                              name="heart-dislike" 
                              size={25}
                              style={{top:1}}
                              color={"#f95151"} 
                          />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.heartIcon} onPress={() => addtoWishlist(item.id)}>
                <Ionicons 
                              name="heart-circle" 
                              size={33}
                              style={{top:1}}
                              color={"black"} 
                          />
              </TouchableOpacity>
            )}
    </View>
 ) }

 
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.searchCont}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Fontisto name="filter" size={SIZES.xLarge} style={styles.searchIcon} />
      </TouchableOpacity>
  
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput} 
          value={searchInput}
          onChangeText={setSearchInput}
          placeholder="What are you looking for?"
        />
      </View>
  
      <View>
        <TouchableOpacity style={styles.searchBtn} onPress={() => searchwithBar(searchInput)}>
          <Feather name="search" size={24} color={COLORS.offwhite} />
        </TouchableOpacity>
      </View>
    </View>
    
    {/* FlatList للنتائج */}
    {ProductSearch.length > 0 && (
     
    
      <FlatList
        data={ProductSearch}
        keyExtractor={(item, index) => item.id}
        renderItem={Item}
        style={styles.resultsList}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: "125%",elevation:4,backgroundColor:"white" }} 
      />
      
    )}
    
    {/* Dropdown مستقل */}
    {filteredData.length > 0 && searchInput.length > 0 && (
      <View style={styles.dropdownContainer}>
        <View style={styles.dropdown}>
          {filteredData.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => searchwithBar(item.name)}
              style={styles.dropdownItem}
            >
              <Text style={styles.dropdownText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
       
      </View>
    )}
  
    <ModalSearch modalVisible={modalVisible} setModalVisible={setModalVisible} />
  </SafeAreaView>
  
  );
};

export default Search;

