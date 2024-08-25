import { View, StatusBar,StyleSheet, FlatList } from 'react-native'
import React from 'react'
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import data, { OnboardingData } from './src/data/data'
import RenderItem from './src/components/RenderItem';


const App = () => {
  const flatListRef = useAnimatedRef<FlatList<OnboardingData>>();
  const x = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x
    }
  });

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
      ref={flatListRef}
      data={data} 
      onScroll={onScroll}
      renderItem={({item, index}) => {
          return <RenderItem item={item} index={index} x={x}/>;
      }} 
      keyExtractor={item => item.id}
      scrollEventThrottle={16}
      horizontal={true}
      bounces={false}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

export default App;

const styles = StyleSheet.create({
  container:{
    flex: 1
  }
})