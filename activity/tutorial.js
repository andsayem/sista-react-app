import React, { Component } from "react";
import { Text, View } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        require('../img/Screenshot_6.png'),
        require('../img/Screenshot_7.png'),
        require('../img/Screenshot_8.png'),
      ],
      desc: ['Hello', 'My' ,'te'],
      currentIndex:0
    };
  }
  render() {
    return ( <View>
        <Text>My Sista's KeepHer</Text>
        <SliderBox images={this.state.images}  sliderBoxHeight={350}  title={this.state.desc} currentImageEmitter={i=>this.setState({currentIndex:i})}/>
      </View>
    );
  }
}

export default Tutorial;
