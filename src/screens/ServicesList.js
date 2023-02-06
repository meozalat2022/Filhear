import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
// import { DataStore, Predicates, SortDirection } from 'aws-amplify';
// import { Service } from '../models';
import firestore from '@react-native-firebase/firestore';
import BannerAdUnite from '../../component/BannerAdUnite';
import InterstisialAdUnite from '../../component/InterstisialAdUnite';

const ServicesList = ({route, navigation}) => {
  const [isServicesListLoaded, setIsServiceListLoaded] = useState(false);

  const [service, setService] = useState([]);

  const {areaId, categoryId, serviceType} = route.params;
  useEffect(() => {
    const fetchService = async () => {
      const serviceList = [];
      await firestore()
        .collection('Service')
        .where('areaID', '==', areaId)
        .where('categoryID', '==', categoryId)
        .where('type', '==', serviceType)
        .orderBy('timestamp')
        .get()
        .then(querySnapShot => {
          querySnapShot.forEach(doc => {
            const {
              id,
              Description,
              areaID,
              categoryID,
              image,
              name,
              notes,
              serviceProviderAddress,
              serviceProviderName,
              type,
            } = doc.data();
            serviceList.push({
              id: doc.id,
              Description,
              areaID,
              categoryID,
              image,
              name,
              notes,
              serviceProviderAddress,
              serviceProviderName,
              type,
            });
          });
        });
      console.log(serviceList);
      setService(serviceList);
    };
    fetchService();
    setIsServiceListLoaded(true);
  }, []);

  if (!isServicesListLoaded) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{alignItems: 'center', flex: 1}}>
      <View style={{alignItems: 'center', flex: 1, marginBottom: 55}}>
        <BannerAdUnite />
        <InterstisialAdUnite />
      </View>
      <FlatList
        data={service}
        renderItem={({item}) => {
          return (
            //add image to assets for services without images
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ServiceDetails', {
                  itemId: item.id,
                  itemName: item.name,
                });
              }}
              style={{
                flex: 1,
                margin: 2,
                borderColor: 'white',
                borderWidth: 5,
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '100%',
                  aspectRatio: 5 / 3,
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <Image
                  style={{width: '100%', height: '100%'}}
                  source={{uri: item.image}}
                />
              </View>

              <View style={{padding: 5}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'black',
                    marginHorizontal: 5,
                  }}>
                  {item.name}
                </Text>
              </View>
              <View>
                <Text numberOfLines={2} style={{fontSize: 16}}>
                  {item.description}
                </Text>
              </View>
              <View style={{marginTop: 5}}>
                <Text style={{fontSize: 18, textAlign: 'center'}}>
                  {item.serviceProviderName}
                </Text>
                {/* <Text>{item.serviceProviderPhone}</Text> */}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ServicesList;
