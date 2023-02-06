import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Linking,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Colors from '../../Constants/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import {TWITER} from '../../socialMedia/SocialMediaLinks';
import {INSTAGRAM} from '../../socialMedia/SocialMediaLinks';
import {FACEBOOK} from '../../socialMedia/SocialMediaLinks';
import firestore from '@react-native-firebase/firestore';
import BannerAdUnite from '../../component/BannerAdUnite';
import InterstisialAdUnite from '../../component/InterstisialAdUnite';
import RNBootSplash from 'react-native-bootsplash';

const Areas = ({navigation}) => {
  RNBootSplash.hide();
  const [area, setArea] = useState();
  const [isAreaLoaded, setIsAreaLoaded] = useState(false);

  useEffect(() => {
    const fetchArea = async () => {
      try {
        const areaList = [];
        await firestore()
          .collection('Area')
          .orderBy('sort', 'asc')
          .get()
          .then(querySnapShot => {
            querySnapShot.forEach(doc => {
              const {id, name} = doc.data();
              areaList.push({id: doc.id, name});
            });
          });
        setArea(areaList);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchArea();
    setIsAreaLoaded(true);
  }, []);

  if (!isAreaLoaded) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View style={{flex: 1, margin: 10, alignItems: 'center'}}>
      <BannerAdUnite />
      <InterstisialAdUnite />
      <FlatList
        data={area}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={{
                width: '100%',
                aspectRatio: 10 / 2,
                justifyContent: 'center',
                borderRadius: 20,
                marginVertical: 1,
                borderWidth: 2,
                borderColor: Colors.accent,
                backgroundColor: Colors.primary,
              }}
              onPress={() => {
                navigation.navigate('Categories', {areaId: item.id});
              }}>
              <View style={{margin: 5}}>
                <Text
                  style={{
                    marginBottom: 15,
                    color: 'white',
                    fontSize: 22,
                    fontWeight: '700',
                  }}>
                  {item.name}
                </Text>
                {/* <Text style={{color: Colors.accent, fontSize: 18, fontWeight: '500'}}>{item.description}</Text> */}
              </View>
            </TouchableOpacity>
          );
        }}
      />

      {/* <View
        style={{
          position: 'absolute',
          left: 25,
          bottom: 20,
          marginVertical: 25,
        }}>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(FACEBOOK);
          }}
          style={{
            marginBottom: 20,
            backgroundColor: 'white',
            borderRadius: 25,
          }}>
          <Entypo name={'facebook-with-circle'} size={40} color={'#4267B2'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(TWITER);
          }}
          style={{
            marginBottom: 20,
            backgroundColor: 'white',
            borderRadius: 25,
          }}>
          <Entypo name={'twitter-with-circle'} size={40} color={'#1DA1F2'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(INSTAGRAM);
          }}
          style={{
            marginBottom: 20,
            backgroundColor: 'white',
            borderRadius: 25,
          }}>
          <Entypo name={'instagram-with-circle'} size={40} color={'#E1306C'} />
        </TouchableOpacity>
      </View> */}
      <BannerAdUnite />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Areas;
