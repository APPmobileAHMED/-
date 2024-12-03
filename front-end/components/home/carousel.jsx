import React, { useRef, useState, useEffect } from 'react';
import { View, Image, FlatList, Animated, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

// Dummy data for carousel
const DATA = [
  { id: '1', title: 'https://quattro.tn/wp-content/uploads/2019/05/porte_chene-2-1170x756.jpg' },
  { id: '2', title: 'https://quattro.tn/wp-content/uploads/2019/05/porte_chene-2-1170x756.jpg' },
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
      <Image source={{ uri: item.title }} style={styles.image} />
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
    width: width * 0.9,  // Adjust the width as needed
    height: 200,        // Adjust the height as needed
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
