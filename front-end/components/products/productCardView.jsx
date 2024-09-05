import { TouchableOpacity, Text, View, Image,StyleSheet ,ScrollView} from "react-native";
import React from "react";

import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants";
import { useNavigation } from "@react-navigation/native";


const ProductCardView = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
    <TouchableOpacity onPress={() => navigation.navigate("ProductDetails")}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://axio-menuiseries.fr/wp-content/uploads/2019/11/fenetre_aluminium.png"
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            Product
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            Product
          </Text>
          <Text style={styles.price}>$2335</Text>
          <TouchableOpacity style={styles.addBtn}>
            <Ionicons name="add-circle" size={35} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
    </ScrollView>
  );
};

export default ProductCardView;

const styles = StyleSheet.create({
    container: {
      width: 182,
      height: 280,
      marginEnd: 22,
      marginBottom:120,
      borderRadius: SIZES.medium,
      backgroundColor: COLORS.secondary,
    },
    imageContainer: {
      flex: 1,
      width: 170,
      marginLeft: SIZES.small / 2,
      marginTop: SIZES.small / 2,
      borderRadius: SIZES.small,
      overflow: "hidden",
    },
    image: {
      aspectRatio: 1,
      resizeMode: "cover",
      height:160,
      width:160
    },
    details: {
      padding: SIZES.small,
    },
    title: {
      fontFamily: "bold",
      fontSize: SIZES.large,
      marginBottom: 2,
    },
    supplier: {
      fontFamily: "regular",
      fontSize: SIZES.large,
      color:COLORS.gray ,
      marginBottom: 2,
    },
    price: {
      fontFamily: "bold",
      fontSize: SIZES.large,
      marginBottom: 2,
   
    },
    addBtn:{
    position:"absolute",
    bottom:SIZES.xSmall,
    right:SIZES.xSmall
    }

    
  });
  