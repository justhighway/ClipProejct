import React from 'react';
import {colors} from '@/constants';
import {StyleSheet, View} from 'react-native';

export default function CustomMarker() {
  return (
    <View style={styles.container}>
      <View style={styles.marker}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    transform: [{rotate: '45deg'}],
    width: 27,
    height: 27,
    borderRadius: 27,
    borderBottomRightRadius: 1,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: colors.PINK400,
  },
});
