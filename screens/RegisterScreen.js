import React, { Component } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Styles from "../styles";
function RegisterScreen ({navigation}){
    return (
      <SafeAreaView style={Styles.container}>
        <ScrollView style={Styles.scrollView}>
          <View style={Styles.container}>
            <Text
              style={Styles.title} >Sign up</Text>
            <Text
              style={Styles.sub_title} >Create an account so your reading our
              poetry and other services.</Text>
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

            <Text
              style={Styles.lebel} >Age range</Text>
            <TextInput
              style={Styles.inputText}
              placeholder="Select you age range"
              placeholderTextColor="#707070"
              onChangeText={text => this.setState({email:text})}/>


            <Text
              style={Styles.lebel} >Gender</Text>
            <TextInput
              style={Styles.inputText}
              placeholder="Gender"
              placeholderTextColor="#707070"
              onChangeText={text => this.setState({email:text})}/>

            <Text
              style={Styles.lebel} >ZIP code</Text>
            <TextInput
              style={Styles.inputText}
              placeholder="ZIP code"
              placeholderTextColor="#707070"
              onChangeText={text => this.setState({email:text})}/>



            <Text style={Styles.signup}>By continuing, you agree to ours's
              Terms  & Privacy policy</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home_page') }  style={Styles.loginBtn}>
              <Text style={Styles.loginText}>Sign Up</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </SafeAreaView>
    );
}


export default RegisterScreen;
