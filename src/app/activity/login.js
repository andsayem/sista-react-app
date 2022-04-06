import React, { Component } from "react";
import ComponentOne from "../components/componentOne";
import  Styles   from "../styles";
import { StyleSheet, Text, TouchableOpacity ,Image, View , TextInput } from 'react-native';
class Login extends Component {
  state={
    email:"",
    password:""
  }

  render() {
    return (
      <View style={Styles.container}>
        <Text
          style={Styles.title} >Login</Text>
        <Text
          style={Styles.sub_title} >To flourish your inner creativity</Text>
        <Image
          style={Styles.logo}
          source={require('../../assets/img/Screenshot_1.png')}
        />
        <Text
          style={Styles.lebel} >E-mail address</Text>
        <TextInput
          style={Styles.inputText}
          placeholder="tina@gmail.com" 
          onChangeText={text => this.setState({email:text})}/>
        <Text
          style={Styles.lebel} >Password</Text>
        <TextInput
          style={Styles.inputText}
          placeholder="Enter password" 
          onChangeText={text => this.setState({email:text})}/>
        <Text
          style={Styles.lebel_right} >Forgot password?</Text>

        <Text style={Styles.signup}>Don't have any account? Signup</Text>
        <Text style={Styles.loginText}>LOGIN</Text>

      </View>
    );
  }
}

export default Login;
