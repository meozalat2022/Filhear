import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import React from 'react';
import {View, Platform} from 'react-native';

const BannerAdUnite = () => {
  const adUnitId = Platform.select({
    android: 'ca-app-pub-2433696255996909/9904766133',
    ios: 'ca-app-pub-2433696255996909/2409419492',
  });

  return (
    <View style={{justifyContent: 'center', alignItems: 'center', margin: 15}}>
      <BannerAd
        unitId={adUnitId}
        servePersonalizedAds={true}
        size={BannerAdSize.BANNER}
      />
    </View>
  );
};

export default BannerAdUnite;
