import React, { useRef, useState, useEffect } from 'react';
import { View, Image, FlatList, Animated, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

// Dummy data for carousel
const DATA = [
  { id: '1', title: require("../../assets/images/cuisine.jpg") },
  { id: '2', title: require("../../assets/images/cuisine1.jpg") },
  { id: '3', title: require("../../assets/images/porte.jpg") },
  { id: '4', title: require("../../assets/images/porte1.jpg") },
  { id: '5', title: require("../../assets/images/porte2.jpg") },
  { id: '6', title: require("../../assets/images/porte3.jpg") },
  { id: '7', title: require("../../assets/images/cuisine2.jpg") },
];

// Screen width
const { width } = Dimensions.get('window');

const Carousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  
  // Function to handle auto-scrolling
  const autoScroll = () => {
    const nextIndex = (activeIndex + 1) % DATA.length;
    flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
    setActiveIndex(nextIndex);
  };

  useEffect(() => {
    const interval = setInterval(autoScroll, 3000); // Change 3000 to the desired interval in milliseconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [activeIndex]);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.title} style={styles.image} />
    </View>
  );
 
  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        scrollEventThrottle={16}
      />
      <View style={styles.pagination}>
        {DATA.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === activeIndex ? '#000' : '#888' }
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  itemContainer: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.9,  
    height: 260,       
    borderRadius: 10,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
  },
});

export default Carousel;
