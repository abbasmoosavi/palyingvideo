import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Video from 'react-native-video';
import NetInfo from '@react-native-community/netinfo';

const PostItem = ({item, index, visibleCurrentPost}) => {
  const [maxBitRate, setMaxBitRate] = useState(1000000); // Default to 1 Mbps

  useEffect(() => {
    const monitorNetworkSpeed = async () => {
      NetInfo.addEventListener(state => {
        if (state.isConnected) {
          const speedMbps = state.details.downlink; // Downlink in Mbps
          if (speedMbps > 5) {
            setMaxBitRate(5000000); // 5 Mbps
          } else if (speedMbps > 2) {
            setMaxBitRate(3000000); // 3 Mbps
          } else {
            setMaxBitRate(1000000); // 1 Mbps
          }
        } else {
          setMaxBitRate(500000); // Fallback to low quality 500 KB
        }
      });
    };

    monitorNetworkSpeed();
  }, []);

  const onLoadStart = event => {
    if (index === 0) {
      console.log(
        'onLoadStart',
        `${
          new Date().getHours() +
          ':' +
          new Date().getMinutes() +
          ':' +
          new Date().getSeconds()
        }`,
        event,
        item?.video,
      );
    }
  };
  const onLoad = event => {
    if (index === 0) {
      console.log(
        'onLoad',
        `${
          new Date().getHours() +
          ':' +
          new Date().getMinutes() +
          ':' +
          new Date().getSeconds()
        }`,
        event,
      );
    }
  };
  const onReadyForDisplay = event => {
    if (index === 0) {
      console.log(
        'onReadyForDisplay',
        `${
          new Date().getHours() +
          ':' +
          new Date().getMinutes() +
          ':' +
          new Date().getSeconds()
        }`,
        event,
      );
    }
  };
  const onBuffer = event => {
    if (index === 0) {
      console.log(
        'onBuffer',
        `${
          new Date().getHours() +
          ':' +
          new Date().getMinutes() +
          ':' +
          new Date().getSeconds()
        }`,
        event,
      );
    }
  };
  const onProgress = event => {
    if (index === 0) {
      console.log(
        'onProgress',
        `${
          new Date().getHours() +
          ':' +
          new Date().getMinutes() +
          ':' +
          new Date().getSeconds()
        }`,
        event,
      );
    }
  };
  const onEnd = event => {
    if (index === 0) {
      console.log(
        'onEnd',
        `${
          new Date().getHours() +
          ':' +
          new Date().getMinutes() +
          ':' +
          new Date().getSeconds() +
          ':'
        }`,
      );
    }
  };
  const onError = event => {
    if (index === 0) {
      console.log(
        'onError',
        `${
          new Date().getHours() +
          ':' +
          new Date().getMinutes() +
          ':' +
          new Date().getSeconds()
        }`,
        event,
      );
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
          maxBitRate={maxBitRate}
          bufferConfig={{
            minBufferMs: 1000,
            maxBufferMs: 5000,
            bufferForPlaybackMs: 1000,
            bufferForPlaybackAfterRebufferMs: 1000,
            backBufferDurationMs: 120000,
            cacheSizeMB: 800,
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
        <Text style={styles.username}>Footer: {item?.video}</Text>
      </Row>
    </Col>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  item: {
    width: wp(100),
    height: hp(70),
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
