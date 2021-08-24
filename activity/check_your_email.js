import React, { Component } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Styles from "../styles";
function CheckYourEmail(props ) {
  const handlePasswordResetPress = ()=>{
    props.navigation.navigate('PasswordReset')
  }
  return (
    <View style={Styles.container}>
      <Text
        style={Styles.title_center} >Check your email</Text>
      <Text
        style={Styles.sub_title_center} >We have sent a link
        to your email</Text>
      <Image
        style={Styles.logo}
        source={require('../img/Screenshot_2.png')}
      />
      <TouchableOpacity onPress={handlePasswordResetPress }  style={Styles.loginBtn}>
        <Text style={Styles.loginText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CheckYourEmail;
