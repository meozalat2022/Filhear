import React from 'react';
import { Share, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';



const ShareService = ({serviceImage}) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
          url: serviceImage
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    
      <TouchableOpacity onPress={onShare} style={styles.Container}>
        <View style={styles.shareContainer}>
            <AntDesign name="sharealt" size={20} color="#fe9070" />
        </View>
        <View>
          <Text style={{ textAlign: 'center', color: '#fe9070' }}>ٍShare</Text>
        </View>
      </TouchableOpacity>
    
  );
};

const styles = StyleSheet.create({
  Container:{
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
    alignItems: 'center'
  },
  shareContainer:{
    width: 50,
    height: 50,
    borderRadius: 150 / 2,
    overflow: "hidden",
    marginTop: 15,
    // marginBottom: 10,
    borderColor: '#fe9070',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f1de'
  },
})

export default ShareService;