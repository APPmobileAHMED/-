import { StyleSheet, FlatList, Text, View, ScrollView } from "react-native";
import React from "react";
import { SIZES } from "../../constants";
import ProductCardView from "../products/productCardView";

const ProductRow = () => {
  const products = [1, 2, 3, 4];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <FlatList
          data={products}
          renderItem={({ item }) => <ProductCardView />}
          horizontal
          contentContainerStyle={styles.contentContainer}
          keyExtractor={(item) => item.toString()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    marginTop: 1,
  },
  contentContainer: {
    columnGap: SIZES.medium,
  },
});

export default ProductRow;
