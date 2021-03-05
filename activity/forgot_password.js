import React, { Component } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Styles from "../styles";
function ForgotPassword({ navigation}){
    return (
      <View style={Styles.container}>
        <Text
          style={Styles.title_center} >Forgot your password?</Text>
        <Text
          style={Styles.sub_title_center} >Enter your registered email below
          to receive password reset link </Text>
        <Image
          style={Styles.logo}
          source={require('../img/Screenshot_2.png')}
        />
        <TextInput
          style={Styles.inputText}
          placeholder="tina@gmail.com"
          placeholderTextColor="#707070"
          onChangeText={text => this.setState({email:text})}/>
        <TouchableOpacity onPress={() => navigation.navigate('Check_your_email') }  style={Styles.loginBtn}>
          <Text  style={Styles.loginText}>Log In</Text>
        </TouchableOpacity>
      </View>
    );
}

export default ForgotPassword;
