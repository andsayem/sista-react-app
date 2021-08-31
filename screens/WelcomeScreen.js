import React, { useEffect, useState} from "react";
import { View, Text, Image } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import  Styles   from "../styles";

import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../components/Loader';
const STORAGE_KEY = 'save_user'; 
const TOKEN = 'token';

function WelcomeScreen (props) {
  const [user, setUser] = useState('');
  const [getToken, setToken] = useState(false);
  const [loading, setLoading] = useState('');
  const handleSubmitPress = () => {
    console.log('test');
    //props.navigation.navigate("ForgotPassword"); 
    props.navigation.navigate('Login');
  }  
   
  const readData = async () => {
    try {
      const token = await AsyncStorage.getItem(TOKEN);
      setToken(token); 
      if(getToken){ 
        props.navigation.navigate("Tabs");
      }else{
        props.navigation.navigate("AppTutorial");
        //setInitialRoute('AppTutorial'); 
      }    
      // let jsonuser = JSON.parse(userInfo)
      // if (userInfo !== null) {
      //   props.navigation.navigate("Tabs");
      // }else{
      //  // navigation.replace('Login')
      // }
    } catch (e) {
      //alert('Failed to fetch the data from storage')
    }
  } 
  useEffect(() => {
    readData();
  }, [])

    var state = {
      images: [
        require('../img/Screenshot_6.png'),
        require('../img/Screenshot_7.png'),
        require('../img/Screenshot_8.png'),
      ],
      width : 400,
      desc: ['Hello', 'My' ,'te'],
      currentIndex:0
    };
    return (
      <View style={Styles.container_tutorial} >
        <Loader loading={loading} />
        <Text style={Styles.itemContainer} >
          <Image
            style={Styles.icone}
            source={require('../img/Screenshot_9.png')}
          />
        My Sista's KeepHer</Text>
        <SliderBox style={ Styles.itemContainerSlider }
                   parentWidth={state.width}
                   sliderBoxHeight={20}
                   images={state.images}
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

                   imageLoadingColor="#2196F3"   title={state.desc} />
        <Text style={ Styles.subtitle}>Boost your day with the
          power of poetry</Text>
        <Text style={ Styles.sub_subtitle}>Boost your day with the power of poetry</Text>
        <Text style={ Styles.lodin_button} onPress={handleSubmitPress} title="Get started" > Get started </Text>

      </View>
    );
}

export default WelcomeScreen;
