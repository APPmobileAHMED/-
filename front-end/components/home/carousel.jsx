import React, { useRef, useState, useEffect } from 'react';
import { View, Image, FlatList, Animated, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

// Dummy data for carousel
const DATA = [
  { id: '1', title: 'https://scontent.ftun16-1.fna.fbcdn.net/v/t39.30808-6/450145387_459719513539751_5441717218828238399_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=YNAHE3MLMjIQ7kNvgEvAau1&_nc_ht=scontent.ftun16-1.fna&oh=00_AYAOs4-PwI3Iuww5Q3lqIPWVT6FvTsAVK7ghhZ0aPwhRDw&oe=66A86063' },
  { id: '2', title: 'https://scontent.ftun16-1.fna.fbcdn.net/v/t39.30808-6/449522245_459034326941603_6763103756103614841_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=6fgsbkcigOAQ7kNvgEXh7__&_nc_ht=scontent.ftun16-1.fna&oh=00_AYBxKwGwbsES00CDUX0-x8aIo3H-vdTTvws9tkXc8OM8_Q&oe=66A8520E' },
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
