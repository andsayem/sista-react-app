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
                centerComponent={{ text: 'Quizzes', style: {fontFamily: 'IBMPlexSans-Regular', color: '#1E1E1E' , fontSize : 20 } }}
                rightComponent={{ icon: 'notifications', color: '#1E1E1E' }}
                containerStyle={{   
                  color : '1E1E1E',
                  backgroundColor: '#F5F5F5' }}
            /> 
          <View> 
            <Text style={{fontFamily : 'IBMPlexSans-Regular',
              padding : 20,
              lineHeight: 30,
            }}> 
             <Text
             style={{fontFamily : 'IBMPlexSans-Regular',
              fontWeight :'bold'
             }}>Coming soon</Text> 
          </Text>
          </View> 
        </SafeAreaView> 
    );
  }
}
var styles = StyleSheet.create({
  container: {fontFamily: 'IBMPlexSans-Regular',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {fontFamily: 'IBMPlexSans-Regular',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  seperator:{
    marginBottom: 20
  }
});

export default Quizzes;
