import { View, StyleSheet, TouchableOpacity,Text, Dimensions, ImageBackground, Image, Alert, FlatList  } from "react-native";
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import { images } from "../assets";
import { dataButton } from "../dataButton";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const numCol = 4;

const Home = () => {
  const navigation = useNavigation();
  const [item, setRandomItem] = useState(dataButton[Math.floor(Math.random()* dataButton.length)]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(5);
  const [indexClick, setIndexClick] = useState(null);
  const [play, setPlay] = useState(true);
  const [arr, setArr] = useState(dataButton);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if(play && time > 0){
        setTime(time - 1);
      }
      if(play && time === 0){
        if(item.id === indexClick){
          setScore(score + 1);
        } else{
          setPlay(false);
        }
        setIndexClick(null);
        setRandomItem(dataButton[Math.floor(Math.random()* dataButton.length)]);
        setArr(randomArray(dataButton));
        if(score > 10 && score < 20){
          setTime(3);
        } else if(score > 20){
          setTime(1);
        }else{
          setTime(5);
        }
      }
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    }
  }, [time]);

  const onClickBackButton = () => {
    navigation.goBack();
  }

  const onClickItemButton = (index) => {
    setIndexClick(index);
    setTime(0);
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <View style={appStyle.appBar}>
        <Text style={appStyle.turnText}>{`Score: ${score}`}</Text>
        <TouchableOpacity onPress={onClickBackButton} style={appStyle.turnView}>
          <Image source={images.close} style={appStyle.buyImage}/>
        </TouchableOpacity>
      </View>
      <Image source={item.image} style={appStyle.textImage}/>
      <View style={appStyle.buttonView}>
        <FlatList 
          data={arr}
          numColumns={numCol}
          scrollEnabled={false}
          renderItem={({item}) => (
            <TouchableOpacity key={item.id} onPress={() => onClickItemButton(item.id)}>
              <Image source={item.image} style={appStyle.backStyle} />
            </TouchableOpacity>
          )}
        />
      </View>
      {
        !play && 
        <View style={appStyle.centerView}>
          <TouchableOpacity onPress={onClickBackButton}>
            <ImageBackground source={images.score_popup} style={appStyle.popupStyle}>
              <Text style={appStyle.scoreText}>{`Score: ${score}`}</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        
      }
    </ImageBackground>
  );
};

export const randomArray = (arr) =>{
  const lengthArr = arr.length;
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    arr.splice(index, 1);
    arr.splice(Math.floor(Math.random()* lengthArr), 0, element);
  }
  return arr;
}


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
    width: windowWidth * 0.1,
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
  scoreText: {
    fontSize: windowWidth > 640 ? 70 : 35,
    color: 'black',
    fontWeight: 'bold',
  },
  popupStyle: {
    width: windowWidth * 0.5,
    height: windowWidth > 640 ? windowWidth * 0.4 : windowHeight * 0.23,
    alignItems: 'center',
    justifyContent: 'center',
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
  centerView: {
    position: 'absolute',
    top:'0%',
    width: '100%',
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
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