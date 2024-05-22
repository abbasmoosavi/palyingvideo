import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Video from 'react-native-video';

const PostItem = ({item, index, visibleCurrentPost}) => {
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
          maxBitRate={500}
          style={styles.video}
          repeat={true}
          paused={visibleCurrentPost?.id !== item?.id}
          muted={false}
          playInBackground={false}
          minLoadRetryCount={5}
          selectedVideoTrack={{type: 'disable'}}
          resizeMode="cover"
          onError={e => console.log('error video', e)}
          bufferConfig={{
            minBufferMs: 200,
            maxBufferMs: 400,
            bufferForPlaybackMs: 200,
            bufferForPlaybackAfterRebufferMs: 200,
            backBufferDurationMs: 120000,
            cacheSizeMB: 50,
            live: {
              targetOffsetMs: 500,
            },
          }}
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
