import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Areas from '../src/screens/Areas';
import Categories from '../src/screens/Categories';
import AddService from '../src/screens/AddService';
import ServiceDetails from '../src/screens/ServiceDetails';
import ServiceType from '../src/screens/ServiceType';
import ServicesList from '../src/screens/ServicesList';
import ServiceSearchResults from '../src/screens/ServiceSearchResults';
import Colors from '../Constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Stack = createNativeStackNavigator();

function RooteNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Areas"
        component={Areas}
        options={({navigation}) => ({
          //  headerRight:()=>(
          //   <Pressable
          //     onPress={()=>{navigation.navigate("ServiceSearchResults")}}
          //     style={{flexDirection: 'row',  alignItems: 'center'}}
          //   >
          //     <Text style={{color: 'white', marginHorizontal: 5, fontWeight: '500'}}>بحث عن خدمة</Text>
          //       <AntDesign name={"search1"} size={22} color={"#ccc"} />
          //   </Pressable>
          // ),

          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.navigate('AddService');
              }}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: 'white',
                  marginHorizontal: 5,
                  fontWeight: '600',
                }}>
                اضف خدمة
              </Text>
              <FontAwesome5 name={'edit'} size={22} color={'#ccc'} />
            </Pressable>
          ),

          title: 'المنطقة',
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: '600',
          },
          headerStyle: {
            backgroundColor: Colors.accent,
          },
        })}
      />
      <Stack.Screen
        name="ServiceSearchResults"
        component={ServiceSearchResults}
        options={{
          title: 'ابحث عن خدمة',
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        }}
      />
      <Stack.Screen
        name="AddService"
        component={AddService}
        options={({navigation}) => ({
          headerRight: () => (
            <Pressable
              onPress={() => {
                navigation.navigate('Areas');
              }}
              style={{flexDirection: 'row'}}>
              <FontAwesome5 name={'home'} size={24} color={'white'} />
            </Pressable>
          ),
          title: 'ساهم في نشر الخير وضيف خدمة',
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        })}
      />
      <Stack.Screen
        name="ServicesList"
        component={ServicesList}
        options={{
          title: 'قائمة الخدمات',
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        }}
      />
      <Stack.Screen
        name="ServiceDetails"
        component={ServiceDetails}
        options={({route}) => ({
          title: route.params.itemName,
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: Colors.accent,
          },
        })}
      />
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{
          title: 'نوع الخدمة',
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        }}
      />
      <Stack.Screen
        name="ServiceType"
        component={ServiceType}
        options={{
          title: 'مطلوب / معروض',
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default RooteNavigator;
