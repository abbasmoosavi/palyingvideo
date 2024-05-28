import React, {useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import PostItem from './PostItem';

const data = require('./Data.json');

const App = () => {
  const [visibleCurrentPost, setVisibleCurrentPost] = useState(null);

  const onViewRef = React.useRef(({viewableItems}) => {
    if (viewableItems?.length > 0) {
      setVisibleCurrentPost(viewableItems[0]?.item);
    }
  });
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});

  const renderItem = ({item, index}) => {
    return (
      <PostItem
        item={item}
        index={index}
        visibleCurrentPost={visibleCurrentPost}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index?.toString()}
        renderItem={renderItem}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        maxToRenderPerBatch={5}
        windowSize={5}
        initialNumToRender={5}
        removeClippedSubviews
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
