import React, { Component } from "react";
import { View, Text,  SafeAreaView , StyleSheet } from "react-native";
import {colors , Icon , Header } from 'react-native-elements';
//function About({navigation}) {
  class Quizzes extends  React.Component{   
    render(){
      return (   
          <SafeAreaView> 
            <Header 
                leftComponent={<Icon color={colors.black} size={30} name='menu' 
                onPress ={ ( ) =>  this.props.navigation.toggleDrawer()  } ></Icon> }
                centerComponent={{ text: 'Quizzes', style: { color: '#1E1E1E' , fontSize : 20 } }}
                rightComponent={{ icon: 'notifications', color: '#1E1E1E' }}
                containerStyle={{   
                  color : '1E1E1E',
                  backgroundColor: '#E4E4E4' }}
            /> 
          <View> 
            <Text style={{
              padding : 20,
              lineHeight: 30,
            }}> 
             <Text
             style={{
              fontWeight :'bold'
             }}>Coming soon</Text> 
          </Text>
          </View> 
        </SafeAreaView> 
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

export default Quizzes;
