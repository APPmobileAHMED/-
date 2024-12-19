import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Fontisto, Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import axios from "axios"
import {AdresseIPPP_} from '@env'
import { useAuth } from "../components/authcontext/authcontext";
const Search = () => {
   const {searchInput, setSearchInput} = useAuth()
  const [filteredData, setFilteredData] = useState([]);

useEffect(()=>{
    if(!searchInput){
        setFilteredData([])
    }else{
    axios.get(`${AdresseIPPP_}/api/search/BarSearch/${searchInput}`)
    .then((response)=>{
        
        setFilteredData(response.data)
    })
    .catch((err)=>console.log(err)) }
},[searchInput])
 
  return (
    <SafeAreaView>
      <View style={styles.searchCont}>
        <TouchableOpacity>
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
          <TouchableOpacity style={styles.searchBtn} >
            <Feather name="search" size={24} color={COLORS.offwhite} />
          </TouchableOpacity>
        </View>
      </View>

      {filteredData.length > 0 && (
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.resultItem}>{item.name}</Text>
          )}
          style={styles.resultsList}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchCont: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.medium,
    height: 50,
    marginHorizontal: SIZES.small,
  },
  searchIcon: {
    marginTop: SIZES.small,
    marginHorizontal: 10,
    color: "#36c964",
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
  },
  searchInput: {
    fontFamily: "regular",
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.small,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.medium,
  },
  resultsList: {
    marginHorizontal: SIZES.small,
    marginTop: SIZES.small,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    padding: SIZES.small,
  },
  resultItem: {
    padding: SIZES.small,
    fontFamily: "regular",
    fontSize: SIZES.medium,
    color: COLORS.black,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
});
