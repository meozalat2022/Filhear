import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../Constants/Colors';
import firestore from '@react-native-firebase/firestore';
import BannerAdUnite from '../../component/BannerAdUnite';
import InterstisialAdUnite from '../../component/InterstisialAdUnite';

const Categories = ({navigation, route}) => {
  const numColumns = 2;
  const areaId = route.params.areaId;
  const [isCategoryLoaded, setIsCategoryLoaded] = useState(false);

  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const catList = [];
        await firestore()
          .collection('Category')
          .orderBy('sort', 'asc')
          .get()
          .then(querySnapShot => {
            querySnapShot.forEach(doc => {
              const {id, name} = doc.data();
              catList.push({id: doc.id, name});
            });
          });
        setCategory(catList);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchCategory();
    setIsCategoryLoaded(true);
  }, []);

  if (!isCategoryLoaded) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View style={{flex: 1, marginHorizontal: 20}}>
      <View style={{alignItems: 'center', marginVertical: 10}}>
        <BannerAdUnite />
        <InterstisialAdUnite />
      </View>
      <FlatList
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        data={category}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={{
                width: Dimensions.get('window').width / numColumns,
                backgroundColor: Colors.primary,
                borderColor: Colors.accent,
                borderWidth: 1,
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'space-evenly',
                flex: 1,
                margin: 3,
                height: Dimensions.get('window').width / numColumns,
              }}
              onPress={() => {
                navigation.navigate('ServiceType', {
                  categoryId: item.id,
                  areaId,
                });
              }}>
              <View>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <View style={{alignItems: 'center', marginVertical: 10}}>
        <BannerAdUnite />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Categories;
