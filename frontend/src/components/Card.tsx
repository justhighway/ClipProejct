/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useRef} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Swiper, type SwiperCardRefType} from 'rn-swiper-list';
import LinearGradient from 'react-native-linear-gradient';

const IMAGES: ImageSourcePropType[] = [
  require('../assets/airpods.jpeg'),
  require('../assets/ipad.jpeg'),
  require('../assets/iphone.jpeg'),
  require('../assets/mac.jpeg'),
  require('../assets/macbook.jpeg'),
  require('../assets/visionpro.jpg'),
];

const {width: windowWidth, height: windowHeight} = Dimensions.get('screen');

export default function CardSwiper() {
  const ref = useRef<SwiperCardRefType>();

  const renderCard = useCallback((image: ImageSourcePropType) => {
    return (
      <View style={styles.cardContainer}>
        <Image source={image} style={styles.cardImage} resizeMode="cover" />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitleText}>에어팟 맥스 실버</Text>
          <Text style={styles.cardDetailsText}>450,000 · S · 대명9동</Text>
        </View>
      </View>
    );
  }, []);

  const OverlayLabelRight = useCallback(() => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: 'green',
          },
        ]}>
        <Text style={styles.overlayLabelText}>LIKE</Text>
      </View>
    );
  }, []);

  const OverlayLabelLeft = useCallback(() => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: 'red',
          },
        ]}>
        <Text style={styles.overlayLabelText}>DISLIKE</Text>
      </View>
    );
  }, []);

  const OverlayLabelTop = useCallback(() => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: 'blue',
          },
        ]}>
        <Text style={styles.overlayLabelText}>PASS</Text>
      </View>
    );
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.subContainer}>
        <Swiper
          ref={ref}
          cardStyle={styles.cardStyle}
          data={IMAGES}
          renderCard={renderCard}
          onSwipeRight={cardIndex => {
            console.log('onSwipeRight', cardIndex);
          }}
          onSwipedAll={() => {
            console.log('onSwipedAll');
          }}
          onSwipeLeft={cardIndex => {
            console.log('onSwipeLeft', cardIndex);
          }}
          onSwipeTop={cardIndex => {
            console.log('onSwipeTop', cardIndex);
          }}
          OverlayLabelRight={OverlayLabelRight}
          OverlayLabelLeft={OverlayLabelLeft}
          OverlayLabelTop={OverlayLabelTop}
          onSwipeActive={() => {
            console.log('onSwipeActive');
          }}
          onSwipeStart={() => {
            console.log('onSwipeStart');
          }}
          onSwipeEnd={() => {
            console.log('onSwipeEnd');
          }}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    bottom: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 80,
    borderRadius: 40,
    marginHorizontal: 20,
    aspectRatio: 1,
    backgroundColor: '#3A3D45',
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardStyle: {
    width: '95%',
    height: '90%',
    borderRadius: 15,
    marginVertical: 20,
  },
  cardContainer: {
    flex: 1,
    borderRadius: 20,
    height: '75%',
    width: '100%',
  },
  cardImage: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  cardTextContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
  },
  cardTitleText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  cardDetailsText: {
    fontSize: 22,
    color: 'white',
  },
  overlayLabelContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayLabelText: {
    color: 'white',
    fontSize: 60,
    fontWeight: 'bold',
  },
});
