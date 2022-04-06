import React, { Component } from "react";
import { Text , SafeAreaView } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import ViewSlider from 'react-native-view-slider'
class AppTutorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        require('../../assets/img/Screenshot_6.png'),
        require('../../assets/img/Screenshot_7.png'),
        require('../../assets/img/Screenshot_8.png'),
      ],
      desc: ['Hello', 'gggggggggggg' ,'te'],
      currentIndex:0
    };
  }
  render() {
    return ( <SafeAreaView>
        <Text>My Sista's KeepHersdfsdf</Text>
        <SliderBox images={this.state.images}  sliderBoxHeight={350}  title={this.state.desc} currentImageEmitter={i=>this.setState({currentIndex:i})}/>
        <ViewSlider 
        renderSlides = {
          <>
            <View style={styles.viewBox}>
              <Image source={{uri: 'https://image.shutterstock.com/image-photo/beautiful-autumn-scene-hintersee-lake-260nw-747646759.jpg'}} style={{height: 200, width}}/>
            </View>
            <View style={styles.viewBox}><Text>TWO</Text></View>
            <View style={styles.viewBox}><Text>THREE</Text></View>
            <View style={styles.viewBox}><Text>FOUR</Text></View>
         </>
      }
      style={styles.slider}     //Main slider container style
      height = {200}    //Height of your slider
      slideCount = {4}    //How many views you are adding to slide
      dots = {true}     // Pagination dots visibility true for visibile 
      dotActiveColor = 'red'     //Pagination dot active color
      dotInactiveColor = 'gray'    // Pagination do inactive color
      dotsContainerStyle={styles.dotContainer}     // Container style of the pagination dots
      autoSlide = {true}    //The views will slide automatically
      slideInterval = {1000}    //In Miliseconds
     />
      </SafeAreaView>
    );
  }
}

export default AppTutorial;
