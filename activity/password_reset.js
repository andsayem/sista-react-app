import React, { Component } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Styles from "../styles";
function PasswordReset(props) {
  const handleCongratulationResetPress = ()=>{
    props.navigation.navigate('CongratulationResetPassword')
  }
  return (
    <View style={Styles.container}>
      <Text
        style={Styles.title} >Password reset</Text>
      <Text
        style={Styles.sub_title} >We have sent a link to your email</Text>
      <Image
        style={Styles.logo}
        source={require('../img/Screenshot_4.png')}
      />
      <Text
        style={Styles.lebel} >Password</Text>
      <TextInput
        style={Styles.inputText}
        placeholder="Enter password" 
          />
      <Text
        style={Styles.lebel} >Confirm password</Text>
      <TextInput
        style={Styles.inputText}
        placeholder="Enter password" 
        />

      <TouchableOpacity onPress={handleCongratulationResetPress } style={Styles.loginBtn}>
        <Text style={Styles.loginText}>Reset password</Text>
      </TouchableOpacity>
    </View>
  );
}

export default PasswordReset;
