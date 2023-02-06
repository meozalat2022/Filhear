/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useEffect} from 'react';
 import {
   SafeAreaView,
 
   StyleSheet,
   Text,
   useColorScheme,
   View,
 } from 'react-native';
 import { NavigationContainer } from '@react-navigation/native';
 import RootNavigator from './navigator/RootNavigator';
 import { Provider as PaperProvider } from 'react-native-paper';



 const App = () => {
  
   return (
     <PaperProvider>
       <NavigationContainer>
         <RootNavigator />
       </NavigationContainer>
     </PaperProvider>
   );
 };
 
 const styles = StyleSheet.create({
   
 });
 
 export default App;
 