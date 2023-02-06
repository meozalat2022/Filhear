import React from "react";
import { View, Image, StyleSheet } from 'react-native';

const ImageCarasoul = (props)=>{

    console.log(props)
    return(
        <View>
            <Image style={{width: 100, height: 100}} source={{uri: props.imageUri}}/>
        </View>
    );
};

const styles = StyleSheet.create({});

export default ImageCarasoul;