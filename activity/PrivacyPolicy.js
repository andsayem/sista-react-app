import React, { Component } from "react";
import { View, Text,  TouchableHighlight , StyleSheet } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView  } from "react-native-gesture-handler";
import {  colors , Icon ,  Header  } from 'react-native-elements'; 
class PrivacyPolicy extends  React.Component{  
//function PrivacyPolicy({navigation}) { 
  render(){
    return ( 
      
        <ScrollView >
          <Header
            leftComponent={<Icon color={colors.black} size={30} name='arrow-back' 
            onPress ={ ( ) =>  this.props.navigation.goBack() } ></Icon> }
            centerComponent={{ text: 'Privacy and Policy', style: {  fontSize : 18  , color: '#1E1E1E' } }}
            containerStyle={{   
              color : '1E1E1E',
              backgroundColor: '#E4E4E4' }}
          />
          <View> 
            <Text style={{
              padding : 20,
              color : '#000000',
              lineHeight: 30,
            }}> 
             <Text
             style={{
              fontWeight :'bold'
             }}>It</Text> is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose.There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly
          </Text>
          </View>
      
        </ScrollView>
      
    )
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  seperator:{
    marginBottom: 20
  }
});

export default PrivacyPolicy;
