import React, { Component } from "react";
import { View, Text, Image, Button , ImageBackground ,TextInput, TouchableOpacity, TouchableHighlight , StyleSheet } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView  } from "react-native-gesture-handler";
import { ListItem, Avatar , Header } from 'react-native-elements';  
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
 
//function About({navigation}) {
  class Product extends  React.Component{   
    render(){
      return (  
        <ScrollView >
          <Header
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'About My Sista\'s KeepHer', style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
          />
           
        </ScrollView> 
    );
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

export default Product;
