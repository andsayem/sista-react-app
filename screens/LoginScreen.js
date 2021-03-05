import React, { Component } from "react";
import { Button, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Styles from "../styles";
import ForgotPassword from "../activity/forgot_password";

function LoginScreen({ navigation }){
    return (
      <View  style={Styles.container}   >
        <Text
          style={Styles.title} >Login</Text>
        <Text
          style={Styles.sub_title} >To flourish your inner creativity</Text>
        <Image
          style={Styles.logo}
          source={require('../img/Screenshot_1.png')}
        />
        <Text
          style={Styles.lebel} >E-mail address</Text>
        <TextInput
          style={Styles.inputText}
          placeholder="tina@gmail.com"
          placeholderTextColor="#707070"
          onChangeText={text => this.setState({email:text})}/>
        <Text
          style={Styles.lebel} >Password</Text>
        <TextInput
          style={Styles.inputText}
          placeholder="Enter password"
          placeholderTextColor="#707070"
          onChangeText={text => this.setState({email:text})}/>
        <Text  title="Forgot Password" onPress={() => navigation.navigate('Forgot_password') }
          style={Styles.lebel_right} >Forgot password?</Text>

        <Text   title="Register" onPress={() => navigation.navigate('Register') } style={Styles.signup}>Don't have any account? Signup</Text>
        <TouchableOpacity  onPress={() => navigation.navigate('Home_page') } style={Styles.loginBtn}>
          <Text style={Styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

      </View>
    );
}

export default LoginScreen;
