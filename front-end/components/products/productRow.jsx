import { StyleSheet, FlatList, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SIZES } from "../../constants";
import ProductCardView from "../products/productCardView";
import axios from "axios";
import { useAuth } from "../authcontext/authcontext";
import {AdresseIPPP_} from '@env'
const ProductRow = () => {
  const [finStock,setFinStock]=useState([]) 

  const {category,setrefreshh,refreshh,infor,fetchCartItems} =useAuth()
  const fetchFinStockProducts = async () => {

    try {
      const result = await axios.get(`${AdresseIPPP_}/api/product/finstock`);
      setFinStock(result.data);
    } catch (err) {
      console.log('Error fetching fin stock products:', err);
      setFinStock([]);
    }
  };

    useEffect(() => {

      const fetchData = async () => {
        await fetchFinStockProducts();
        if (infor.id) {
          await fetchCartItems(infor.id);
        }
      };
      
      fetchData();
    }, [refreshh, infor.id]);

  

    const renderProduct = ({ item }) => (
      <ProductCardView 
        product={item}
        key={item.id}
      />
    );
  
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {finStock.length > 0 ? (
            <FlatList
              data={finStock}
              renderItem={renderProduct}
              horizontal
              contentContainerStyle={styles.contentContainer}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <Text style={styles.noProductsText}>
              لا توجد منتجات في نهاية المخزون
            </Text>
          )}
        </View>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    marginTop: 30,
  },
  contentContainer: {
    columnGap: SIZES.medium,
  },
});

export default ProductRow;
