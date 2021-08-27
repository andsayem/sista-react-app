 
import React, { Component } from "react";
import { View, Text,  SafeAreaView , StyleSheet } from "react-native";
import {colors , Icon , Header , CheckBox } from 'react-native-elements';
//function About({navigation}) {

class Settings extends Component {
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
                  backgroundColor: '#E4E4E4' }}
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

         {/*<CheckBox*/}
         {/*  checkedIcon={<Image source={require('../checked.png')} />}*/}
         {/*  uncheckedIcon={<Image source={require('../unchecked.png')} />}*/}
         {/*  checked={this.state.checked}*/}
         {/*  onPress={() => this.setState({checked: !this.state.checked})}*/}
         {/*/>*/}
       </View>
      </SafeAreaView>
    );
  }
}

export default Settings;
