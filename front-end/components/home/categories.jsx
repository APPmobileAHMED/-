import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image,Dimensions } from "react-native";
import { COLORS, SIZES } from "../../constants";
import { FontAwesome, MaterialCommunityIcons,Ionicons} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "../../components/home/styleHomeFile/styleCategories"

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

export default Categories;
