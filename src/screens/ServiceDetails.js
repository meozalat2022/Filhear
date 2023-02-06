import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Share,
} from 'react-native';
// import { DataStore } from 'aws-amplify';
// import { Service } from '../models';
import Colors from '../../Constants/Colors';
// import ShareService from '../../component/Share';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';

import BannerAdUnite from '../../component/BannerAdUnite';
import InterstisialAdUnite from '../../component/InterstisialAdUnite';
let noImage =
  'data:image/jpeg;base64,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';

const ServiceDetails = ({route}) => {
  const [service, setService] = useState([]);

  const [isServicesDetailsLoaded, setIsServicesDetailsLoaded] = useState(false);

  const {itemId} = route.params;

  useEffect(() => {
    const fetchService = async () => {
      try {
        await firestore()
          .collection('Service')
          .doc(itemId)
          .get()
          .then(documentSnapshot => {
            if (documentSnapshot.exists) {
              setService(documentSnapshot.data());
            }
          });
      } catch (error) {
        console.log('erro', error);
      }
    };
    fetchService();
    setIsServicesDetailsLoaded(true);
  }, []);

  // const imageUri = [];

  // for(let i in service.image){
  //     imageUri.push(service.image[i])
  // }

  // const shareService = async () => {
  //   try {
  //     const result = await Share.share({
  //       message: "ساهم معانا في نشر الخير",
  //       url: "https://play.google.com/store/apps/details?id=com.filkhaer",
  //     });
  //     if (result.action === Share.sharedAction) {
  //       if (result.activityType) {
  //         // shared with activity type of result.activityType
  //       } else {
  //         // shared
  //       }
  //     } else if (result.action === Share.dismissedAction) {
  //       // dismissed
  //     }
  //   } catch (error) {
  //     Alert.alert(error.message);
  //   }
  // };

  if (!isServicesDetailsLoaded) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView style={{flex: 1}}>
      <View style={{alignItems: 'center'}}>
        <BannerAdUnite />
        <InterstisialAdUnite />
      </View>
      <View style={{alignItems: 'center', marginVertical: 10}}>
        <Image
          style={{width: 300, aspectRatio: 4 / 3}}
          source={!service.image ? {uri: noImage} : {uri: service.image}}
        />
      </View>
      {/* <TouchableOpacity onPress={shareService} style={styles.Container}>
        <View style={styles.shareContainer}>
          <AntDesign name="sharealt" size={20} color="#fe9070" />
        </View>
        <View>
          <Text style={{ textAlign: "center", color: "#fe9070" }}>ٍShare</Text>
        </View>
      </TouchableOpacity> */}

      <View
        style={{
          alignItems: 'center',
          marginVertical: 10,
          backgroundColor: Colors.primary,
          width: '70%',
          alignSelf: 'center',
          borderColor: 'white',
          borderWidth: 3,
          borderRadius: 10,
          paddingVertical: 7,
        }}>
        {service.type === 'OFFERED' ? (
          <Text style={styles.offeredWanted}>معروض</Text>
        ) : (
          <Text style={styles.offeredWanted}>مطلوب</Text>
        )}
      </View>
      <View style={{alignItems: 'center'}}>
        <BannerAdUnite />
      </View>
      <View style={styles.serviceView}>
        <View style={styles.serviceDetailsTitleView}>
          <Text style={styles.serviceDetails}>الخدمة</Text>
        </View>
        <View style={styles.serviceDetailsDescView}>
          <Text style={styles.serviceDetails}>{service.name}</Text>
        </View>
      </View>
      <View style={styles.serviceView}>
        <View style={styles.serviceDetailsTitleView}>
          <Text style={styles.serviceDetails}>وصف الخدمة</Text>
        </View>
        <View style={styles.serviceDetailsDescView}>
          <Text style={styles.serviceDetails}>{service.description}</Text>
        </View>
      </View>
      <View style={styles.serviceView}>
        <View style={styles.serviceDetailsTitleView}>
          <Text style={styles.serviceDetails}>اسم مقدم الخدمة</Text>
        </View>

        <View style={styles.serviceDetailsDescView}>
          <Text style={styles.serviceDetails}>
            {service.serviceProviderName}
          </Text>
        </View>
      </View>
      <View style={styles.serviceView}>
        <View style={styles.serviceDetailsTitleView}>
          <Text style={styles.serviceDetails}>عنوان مقدم الخدمة</Text>
        </View>
        <View style={styles.serviceDetailsDescView}>
          <Text style={styles.serviceDetails}>
            {service.serviceProviderAddress}
          </Text>
        </View>
      </View>
      <View style={styles.serviceView}>
        <View style={styles.serviceDetailsTitleView}>
          <Text style={styles.serviceDetails}>تليفون مقدم الخدمة</Text>
        </View>
        <View style={styles.serviceDetailsDescView}>
          <Text style={styles.serviceDetails}>
            {service.serviceProviderPhone}
          </Text>
        </View>
      </View>
      <View style={styles.serviceView}>
        <View style={styles.serviceDetailsTitleView}>
          <Text style={styles.serviceDetails}>ملاحظات</Text>
        </View>
        <View style={styles.serviceDetailsDescView}>
          <Text style={styles.serviceDetails}>{service.notes}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  serviceView: {
    flexDirection: 'row-reverse',
    margin: 5,
    padding: 5,
    // borderWidth: 1,
    // borderColor: '#ccc'
  },
  serviceDetails: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  serviceDetailsTitleView: {
    width: '30%',
    justifyContent: 'center',
  },
  serviceDetailsDescView: {
    width: '70%',
    justifyContent: 'center',
    marginRight: 5,
    padding: 1,
  },
  offeredWanted: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  shareContainer: {
    width: 50,
    height: 50,
    borderRadius: 150 / 2,
    overflow: 'hidden',
    marginTop: 15,
    // marginBottom: 10,
    borderColor: '#fe9070',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f1de',
    alignSelf: 'center',
  },
});

export default ServiceDetails;
