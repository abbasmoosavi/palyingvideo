import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Video from 'react-native-video';

const PostItem = ({item, index, visibleCurrentPost}) => {
  const onLoadStart = event => {
    if (index === 0) {
      console.log('onLoadStart', event, item?.video);
    }
  };
  const onLoad = event => {
    if (index === 0) {
      console.log('onLoad', event);
    }
  };
  const onReadyForDisplay = event => {
    if (index === 0) {
      console.log('onReadyForDisplay', event);
    }
  };
  const onBuffer = event => {
    if (index === 0) {
      console.log('onBuffer', event);
    }
  };
  const onProgress = event => {
    if (index === 0) {
      console.log('onProgress', event);
    }
  };
  const onEnd = event => {
    if (index === 0) {
      console.log('onEnd');
    }
  };
  const onError = event => {
    if (index === 0) {
      console.log('onError', event);
    }
  };
  return (
    <Col style={[styles.item, index !== 0 && styles.itemSeparator]}>
      <Row style={styles.itemHeader}>
        <Text style={styles.username}>Abbas</Text>
      </Row>
      <Grid>
        <Video
          source={{
            uri: item?.video,
          }}
          disableFocus={true}
          controls={true}
          style={styles.video}
          repeat={true}
          paused={visibleCurrentPost?.id !== item?.id}
          muted={false}
          playInBackground={false}
          minLoadRetryCount={5}
          resizeMode="cover"
          maxBitRate={500} // Increase maxBitRate for better quality (ensure network can handle it)
          bufferConfig={{
            minBufferMs: 50,
            maxBufferMs: 100,
            bufferForPlaybackMs: 25,
            bufferForPlaybackAfterRebufferMs: 50,
          }}
          onError={onError}
          onLoadStart={onLoadStart}
          onLoad={onLoad}
          onBuffer={onBuffer}
          onEnd={onEnd}
          onProgress={onProgress}
          onReadyForDisplay={onReadyForDisplay}
        />
      </Grid>
      <Row style={styles.itemHeader}>
        <Text style={styles.username}>Footer</Text>
      </Row>
    </Col>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  item: {
    width: wp(100),
    height: hp(60),
  },
  itemSeparator: {
    marginTop: hp(2),
    borderTopWidth: 0.5,
    borderTopColor: 'grey',
  },
  username: {
    color: 'black',
    fontWeight: '600',
    fontSize: 12,
  },
  itemHeader: {
    height: hp(5),
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: wp(4),
  },
  video: {
    width: '100%',
    height: '100%',
  },
});
