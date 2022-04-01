 
import React, { Component } from "react";
import { View, Text,  SafeAreaView , StyleSheet } from "react-native";
import {colors , Icon , Header , CheckBox } from 'react-native-elements';
import IconIonic from 'react-native-vector-icons/Ionicons';
import ToggleSwitch from 'toggle-switch-react-native'
//function About({navigation}) {
//arrow-back
class Settings extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      location : true, 
      notification : true ,
      contacts : true ,
      information : true ,
    }
  }
  render() {
    return (
      <SafeAreaView> 
            <Header 
                leftComponent={<IconIonic  name="arrow-back" color={colors.black} size={30} 
                onPress ={ ( ) =>  this.props.navigation.goBack()  } /> }
                centerComponent={{ text: 'Settings', style: { color: '#1E1E1E' , fontSize : 20  , textAlign : 'left'  } }}
               
                containerStyle={{   
                  color : '1E1E1E',
                  backgroundColor: '#F5F5F5' }}
            /> 
       <View style={{fontFamily : 'IBMPlexSans-Regular', backgroundColor : '#ffffff' , height : '100%'}}>
        <ToggleSwitch
            isOn={ this.state.notification }
            onColor="green" 
            offColor="#757575"
            label="Push Notifications"
            labelStyle={{ marginVertical  : 25, color: "black",  fontWeight: "900" , width : '80%' }}
            size="small"
            onToggle={isOn =>  this.setState({notification : this.state.notification ? false : true })}
          />

        <ToggleSwitch
            isOn={ this.state.contacts }
            onColor="green"
            offColor="#757575"
            label="Allow Access to My Contacts"
            labelStyle={{ marginVertical  : 25, color: "black",  fontWeight: "900" , width : '80%' }}
            size="small"
            onToggle={isOn =>  this.setState({contacts : this.state.contacts ? false : true })}
          />


        <ToggleSwitch
            isOn={ this.state.location }
            onColor="green"
            offColor="#757575"
            label="Allow My Location"
             labelStyle={{ marginVertical  : 25, color: "black",  fontWeight: "900" , width : '80%' }}
            onToggle={isOn =>  this.setState({location : this.state.location ? false : true })}
          />


          {/* <ToggleSwitch
            isOn={ this.state.information }
            onColor="green"
            offColor="#757575"
            label="Save Login information"
            size="small"
            labelStyle={{ marginVertical  : 25, color: "black",  fontWeight: "900" , width : '80%' }}
            size="small"
            onToggle={isOn =>  this.setState({information : this.state.information ? false : true })}
          /> */}
       
          {/* <ToggleSwitch
            isOn={ this.state.everythingn }
            onColor="green"
            offColor="#757575"
            label="Auto Save Everythingn"
            size="small"
            labelStyle={{ marginVertical  : 25, color: "black",  fontWeight: "900" , width : '80%' }}
            size="small"
            onToggle={isOn =>  this.setState({everythingn : this.state.everythingn ? false : true })}
          />
          <Text>Your Journal, Quotes, Short Story etc will be auto saved
without your feed post's</Text> */}

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
