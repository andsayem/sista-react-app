import React, { Component } from "react";
import { View , Text } from "react-native";
import { CheckBox } from 'react-native-elements'
class Settings extends Component {
  render() {
    return (
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
    );
  }
}

export default Settings;
