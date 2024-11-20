import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image,Dimensions } from "react-native";
import { COLORS, SIZES } from "../../constants";
import { FontAwesome, MaterialCommunityIcons,Ionicons} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


const { width } = Dimensions.get('window');
const Categories = () => {

  const navigation=useNavigation()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <View style={styles.categoriesWrapper}>
      
          <TouchableOpacity  style={styles.categoryCard} onPress={()=>navigation.navigate('ProductWithCategorie',{name:"أبواب"})}>
            <View style={styles.iconWrapper}>
            <Image source={{uri:"https://cdn-icons-png.flaticon.com/128/1864/1864744.png"}} style={styles.image}/>
            </View>
            <Text style={styles.categoryName}> أبواب </Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.categoryCard} onPress={()=>navigation.navigate('ProductWithCategorie',{name:"نوافذ"})}>
            <View style={styles.iconWrapper}>
            <Image source={{uri:"https://cdn-icons-png.flaticon.com/128/3944/3944770.png"}} style={styles.image}/>
            </View>
            <Text style={styles.categoryName}> نوافذ </Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.categoryCard} onPress={()=>navigation.navigate('ProductWithCategorie',{name:"أبواب حديدية كبيرة"})}>
            <View style={styles.iconWrapper}>
            <Image source={{uri:"https://cdn-icons-png.flaticon.com/128/4314/4314268.png"}} style={styles.image}/>
            </View>
            <Text style={styles.categoryName}> ابواب حديدية</Text>
          </TouchableOpacity>
        
          <TouchableOpacity  style={styles.categoryCard} onPress={()=>navigation.navigate('ProductWithCategorie',{name:"لوازم المطبخ"})}>
            <View style={styles.iconWrapper}>
            <Image source={{uri:"https://cdn-icons-png.flaticon.com/128/2851/2851991.png"}} style={styles.image}/>
            </View>
            <Text style={styles.categoryName}>لوازم المطبخ </Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 22,
    marginTop: SIZES.small,
  },
  title: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginBottom: SIZES.small,
  },
  categoriesWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    width: "48%",
    marginBottom: SIZES.small,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    elevation: 4,
    overflow: "hidden",
    alignItems: "center",
    padding: SIZES.small,
  },
  iconWrapper: {
    backgroundColor: COLORS.lightGray, // Adjust the background color if needed
    borderRadius: 50,
    padding: SIZES.small,
    marginBottom: SIZES.small,
  },
  categoryName: {
    fontFamily: "regular",
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  image: {
    width: width * 0.2,  
    height: 80,        
    borderRadius: 10,
  }
});

export default Categories;
