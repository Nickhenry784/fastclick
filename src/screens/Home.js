import { View, StyleSheet, TouchableOpacity,Text, Dimensions, ImageBackground, Image, Alert, FlatList  } from "react-native";
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {decrement} from '../redux/pointSlice';
import {useDispatch, useSelector} from 'react-redux';
import { images } from "../assets";
import { dataButton } from "../dataButton";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const numCol = 4;

const Home = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(points);
  },[]);

  const onClickStartButton = () => {
    if (points.value === 0) {
      Alert.alert('Please buy more turn');
      return false;
    }
    dispatch(decrement());
    navigation.navigate("Play");
  }

  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <View style={appStyle.appBar}>
        <Text style={appStyle.turnText}>{`Score: 0`}</Text>
        <TouchableOpacity onPress={onClickTurnButton} style={appStyle.turnView}>
          <View style={appStyle.turn}>
            <Image source={images.buy} style={appStyle.buyImage}/>
            <Text style={appStyle.turnText}>{points.value}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Image source={images.text} style={appStyle.textImage}/>
      <TouchableOpacity
        onPress={onClickStartButton}
        style={appStyle.buttonStyle}>
          <Image source={images.start} style={appStyle.buttonStyle} />
      </TouchableOpacity>
      <View style={appStyle.buttonView}>
        <FlatList 
          data={dataButton}
          numColumns={numCol}
          scrollEnabled={false}
          renderItem={({item}) => (
            <Image key={item.id} source={item.image} style={appStyle.backStyle} />
          )}
        />
      </View>
    </ImageBackground>
  );
};


export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    resizeMode: 'cover',
  },
  appBar:{
    flex: 0.1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  turnView: {
    width: windowWidth * 0.2,
    marginRight: 10,
  },
  turn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  turnText: {
    fontSize: windowWidth > 640 ? 50 : 20,
    color: 'white',
    fontWeight: 'bold',
  },
  buyImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  textImage: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.15,
    resizeMode: 'contain',
  },
  buttonView: {
    position: 'absolute',
    bottom:'0%',
    alignItems: 'center',
    height: windowHeight * 0.5,
    width: '100%',
  },
  backStyle: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    margin: 10,
    resizeMode: 'contain',
  },
  buttonStyle: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
    marginTop: 20,
  }
});

export default Home;