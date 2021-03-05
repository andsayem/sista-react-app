import React, { Component } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Styles from "../styles";
function CongratulationResetPassword ({navigation}) {
    return (
      <View style={Styles.container}>

        <Image
          style={Styles.logo}
          source={require('../img/Screenshot_5.png')}
        />
        <Text
          style={Styles.title_center} >Congratulation</Text>
        <Text
          style={Styles.sub_title_center} > Your password has been reset </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Home_page') }   style={Styles.loginBtn}>
              <Text style={Styles.loginText}>Log in</Text>
          </TouchableOpacity>
      </View>
    );
}

export default CongratulationResetPassword;
