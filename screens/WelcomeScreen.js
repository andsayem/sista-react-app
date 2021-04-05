import React, { useEffect, useState} from "react";
import { View, Text, Image } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import  Styles   from "../styles";

import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../components/Loader';
const STORAGE_KEY = 'save_user';

function WelcomeScreen ({ navigation }) {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState('');
  // const handleSubmitPress = () => {
  //   setLoading(true); 
  //   console.log('welcomePadeaa@1',user);
  //   if(!user){  
  //     navigation.replace('Login')
  //   } else{
  //     console.log('welcomePadeaa@12',user);
  //     navigation.replace('Tabs')
  //   }   
  // }  
   
  const readData = async () => {
    try {
      const userInfo = await AsyncStorage.getItem(STORAGE_KEY);
      let jsonuser = JSON.parse(userInfo)
      if (userInfo !== null) {
        setUser(jsonuser)
      }else{
        navigation.replace('Login')
      }
    } catch (e) {
      alert('Failed to fetch the data from storage')
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
        <Text style={ Styles.lodin_button}  title="Get started" onPress={handleSubmitPress}> Get started </Text>

      </View>
    );
}

export default WelcomeScreen;
