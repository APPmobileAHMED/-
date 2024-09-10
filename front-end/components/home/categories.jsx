import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { COLORS, SIZES } from "../../constants";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

const categories = [
  { id: 1, name: "Electronics", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi8fS9JgkgInLtjhlzgwXotxLtaWkbmbviQA&s"  },
  { id: 2, name: "Fashion", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi8fS9JgkgInLtjhlzgwXotxLtaWkbmbviQA&s"  },
  { id: 3, name: "Home", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi8fS9JgkgInLtjhlzgwXotxLtaWkbmbviQA&s" },
  { id: 4, name: "Beauty", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi8fS9JgkgInLtjhlzgwXotxLtaWkbmbviQA&s"  },
];

const Categories = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <View style={styles.categoriesWrapper}>
      
          <TouchableOpacity  style={styles.categoryCard}>
            <View style={styles.iconWrapper}>
              <FontAwesome
                name="fa-door-open"
                size={50} // Adjust size as needed
                color={COLORS.primary} // Use your primary color or adjust as needed
              />
            </View>
            <Text style={styles.categoryName}> hscq</Text>
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
});

export default Categories;
