import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Colors from '../../Constants/Colors';
import BannerAdUnite from '../../component/BannerAdUnite';
import InterstisialAdUnite from '../../component/InterstisialAdUnite';
const ServiceType = ({navigation, route}) => {
  const {areaId, categoryId} = route.params;

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{alignItems: 'center'}}></View>
      <BannerAdUnite />
      <InterstisialAdUnite />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ServicesList', {
            serviceType: 'WANTED',
            areaId,
            categoryId,
          });
        }}
        style={styles.button}>
        <Text style={styles.text}>مطلوب</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ServicesList', {
            serviceType: 'OFFERED',
            areaId,
            categoryId,
          });
        }}
        style={[styles.button, {backgroundColor: Colors.accent}]}>
        <Text style={styles.text}>معروض</Text>
      </TouchableOpacity>
      <BannerAdUnite />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    backgroundColor: Colors.primary,
    padding: 10,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    width: 150,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ServiceType;
