import React, {Component , useEffect, useState} from "react";
import { View, Text, Image , ScrollView ,SafeAreaView} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import  Styles   from "../styles";
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../components/Loader';
const STORAGE_KEY = 'save_user'; 
const TOKEN = 'token';
class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      items:[], 
      isLoading: false,
      images: [
        require('../img/Screenshot_6.png'),
        require('../img/Screenshot_7.png'),
        require('../img/Screenshot_8.png'),
      ],
      width : 400,
      desc: ['Hello', 'My' ,'te'],
      currentIndex:0
      };  
  }   
   handleSubmitPress = async () => {  
  
    try {
      
      if(this.getToken()){ 
        this.props.navigation.navigate("Tabs");
      }else{
        this.props.navigation.navigate("Login"); 
      }     
    } catch (e) {
      this.props.navigation.navigate("Login"); 
    }
  }  
   
   readData = async () => {
    try {
       user = await AsyncStorage.getItem(STORAGE_KEY); 
       token = await AsyncStorage.getItem(TOKEN);    
       this.setToken(token);
      if((token) && (user)) {  
        this.props.navigation.navigate("Tabs");
      }
    } catch (e) {
      setErrortext({ message: 'Failed to save the data to the storage readdata' });  
    }
  } 
  render(){
    return (
      <ScrollView style={Styles.container_tutorial} >
        <Text style={Styles.itemContainer} >
          <Image
            style={Styles.icone}
            source={require('../img/Screenshot_9.png')}
          />
        My Sista's KeepHer </Text>
        <SliderBox style={ Styles.itemContainerSlider }
                   parentWidth={this.state.width}
                   sliderBoxHeight={20}
                   images={this.state.images}
                   dotColor="#FFEE58"
                   inactiveDotColor="#90A4AE"
                   paginationBoxVerticalPadding={20}
                   autoplay
                   circleLoop
                   resizeMethod={'resize'}
                   resizeMode={'cover'}
                   paginationBoxStyle={{
                     position: "absolute",
                     bottom: 0,
                     padding: 0,
                     alignItems: "center",
                     alignSelf: "center",
                     justifyContent: "center",
                     paddingVertical: 10
                   }}
                   dotStyle={{
                     width: 30,
                     borderRadius: 5,
                     marginHorizontal: 0,
                     padding: 0,
                     margin: 0,
                     backgroundColor: "rgba(128, 128, 128, 0.92)"
                   }}

                   imageLoadingColor="#2196F3"   title={this.state.desc} />
        <Text style={ Styles.subtitle}>Boost your day with the
          power of poetry</Text>
        <Text style={ Styles.sub_subtitle}>Boost your day with the power of poetry</Text>
        <Text style={ Styles.lodin_button} onPress={this.handleSubmitPress} title="Get started" > Get started </Text> 
      </ScrollView>
    );
 }
}

export default WelcomeScreen;
