import React, { useEffect, useState, createRef } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Styles from "../styles";
function ForgotPassword(props){
  const [userEmail, setUserEmail] = useState(false);
  const handleCheckYourEmailPress = () => { 
    props.navigation.navigate("CheckYourEmail");  
  }
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
        onChangeText={(userEmail) => setUserEmail(userEmail) }/>
      <TouchableOpacity  style={Styles.loginBtn}
        onPress={handleCheckYourEmailPress} >
        <Text  style={Styles.loginText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ForgotPassword;
