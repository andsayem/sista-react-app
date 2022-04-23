import React, { Component  } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import Styles from "../../theme/styles";
import AsyncStorage from '@react-native-community/async-storage'; 
const STORAGE_KEY = 'save_user';
const TOKEN = 'token';
class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoading: false,
      images: [
        require('../../assets/img/Screenshot_6.png'),
        require('../../assets/img/Screenshot_7.png'),
        require('../../assets/img/Screenshot_8.png'),
      ],
      width: 400,
      desc: ['Hello', 'My', 'te'],
      currentIndex: 0
    };
  }

  async componentDidMount() {
    const user = await AsyncStorage.getItem(STORAGE_KEY);
    const token = await AsyncStorage.getItem(TOKEN); 
    if ((token) && (user)) {
      this.props.navigation.navigate("Home");
    }
  }
  handleSubmitPress = async () => {

    try {

      if (this.getToken()) {
        this.props.navigation.navigate("Tabs");
      } else {
        this.props.navigation.navigate("Login");
      }
    } catch (e) {
      this.props.navigation.navigate("Login");
    }
  }

  readData = async () => {
    try {
      user = await AsyncStorage.getItem(STORAGE_KEY);
      const token = await AsyncStorage.getItem(TOKEN);
      this.setToken(token);
      if ((token) && (user)) {
        this.props.navigation.navigate("Tabs");
      }
    } catch (e) {
      setErrortext({ message: 'Failed to save the data to the storage readdata' });
    }
  }
  render() {
    return (
      <ScrollView style={Styles.container_tutorial} >
        <Text style={Styles.itemContainer } >
          {/* <Image
            style={[Styles.icone,{ paddingTop : 30}]}
            source={require('../../assets/img/Screenshot_9.png')}
          /> */}
          My Sista's KeepHer  </Text>
        <SliderBox style={Styles.itemContainerSlider}
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

          imageLoadingColor="#2196F3" title={this.state.desc} />
        <Text style={
          {
            fontFamily: 'IBMPlexSans-Medium',
            fontSize: 16,
            color: '#383838',
            textAlign: 'center',
            alignItems: 'center',
            paddingLeft: 60,
            paddingRight: 60
          }
        }>Boost your day with the
          power of poetry</Text>
        <Text style={{
          fontFamily: 'IBMPlexSans-Medium',
          textAlign: 'center',
          color: '#383838',
          fontSize: 16,
        }}>Boost your day with the power of poetry</Text>
        <Text style={Styles.lodin_button} onPress={this.handleSubmitPress} title="Get started" > Get started </Text>
      </ScrollView>
    );
  }
}

export default WelcomeScreen;
