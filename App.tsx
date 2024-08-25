import { View, StatusBar, StyleSheet, FlatList, ViewToken } from 'react-native'
import React from 'react'
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import data, { OnboardingData } from './src/data/data'
import RenderItem from './src/components/RenderItem';
import Pagination from './src/components/Pagination';


const App = () => {
  const flatListRef = useAnimatedRef<FlatList<OnboardingData>>();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x
    }
  });

  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0].index !== null) {
      flatListIndex.value = viewableItems[0].index;
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        ref={flatListRef}
        data={data}
        onScroll={onScroll}
        renderItem={({ item, index }) => {
          return <RenderItem item={item} index={index} x={x} />;
        }}
        keyExtractor={item => item.id}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10
        }}
      />
      <View style={styles.bottomContainer}>
        <Pagination data={data} x={x} />
      </View>
    </View>
  )
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    right: 0,
    left: 0,
    marginHorizontal: 30,
    paddingVertical: 30
  }
})