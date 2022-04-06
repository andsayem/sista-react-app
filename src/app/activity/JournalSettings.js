 
import React, { Component } from "react";
import { View, SafeAreaView  } from "react-native";
import {colors , Icon , Header , CheckBox } from 'react-native-elements';
//function About({navigation}) {

class JournalSettings extends Component {
  render() {
    return (
      <SafeAreaView> 
            <Header 
                leftComponent={<Icon color={colors.black} size={30} name='menu' 
                onPress ={ ( ) =>  this.props.navigation.toggleDrawer()  } ></Icon> }
                centerComponent={{ text: 'Settings', style: { color: '#1E1E1E' , fontSize : 20 } }}
                rightComponent={{ icon: 'notifications', color: '#1E1E1E' }}
                containerStyle={{   
                  color : '1E1E1E',
                  backgroundColor: '#F5F5F5' }}
            /> 
       <View>
         <CheckBox
           title='Click Here' 
         />

         <CheckBox
           center
           title='Click Here'
         />

         <CheckBox
           center
           title='Click Here'
           checkedIcon='dot-circle-o'
           uncheckedIcon='circle-o'
         />

         <CheckBox
           center
           title='Click Here to Remove This Item'
           iconRight
           iconType='material'
           checkedIcon='clear'
           uncheckedIcon='add'
           checkedColor='red'
         /> 
       </View>
      </SafeAreaView>
    );
  }
}

export default JournalSettings;
