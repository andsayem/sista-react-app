import React, { Component, useEffect, useState, createRef } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, 
        TextInput, TouchableOpacity, View, Keyboard } from "react-native";
import Styles from "../styles";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from '../screens/WelcomeScreen'; 
import LoginScreen from '../screens/LoginScreen'; 
import ForgotPassword  from  '../activity/forgot_password';
import PasswordReset  from  '../activity/password_reset';
import CheckYourEmail  from '../activity/check_your_email';
import Profile from '../activity/Profile';
import Chats from "../activity/Chats";
import Home from '../activity/home.js';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <WelcomeScreen/>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function RegisterScreen ({navigation,props}){
 
    const [userEmail, setUserEmail] = useState('');
    const [userAge, setUserAge] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [
      isRegistraionSuccess,
      setIsRegistraionSuccess
    ] = useState(false);

    const emailInputRef = createRef();
    const ageInputRef = createRef();
    const addressInputRef = createRef();
    const passwordInputRef = createRef();

    const handleSubmitButton = () => {
      setErrortext(''); 
      if (!userEmail) {
        alert('Please fill Email');
        return;
      }
      if (!userAge) {
        alert('Please fill Age');
        return;
      }
      if (!userAddress) {
        alert('Please fill Address');
        return;
      }
      if (!userPassword) {
        alert('Please fill Password');
        return;
      }
      //Show Loader
      setLoading(true);
      var dataToSend = { 
        email: userEmail,
        age: userAge,
        address: userAddress,
        password: userPassword,
      };
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');

      fetch('http://sista.abdulmazidcse.com/api/users', {
        method: 'POST',
        body: formBody,
        headers: {
          //Header Defination
          'Content-Type':
          'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          //Hide Loader
          setLoading(false);
          console.log(responseJson);
          // If server response message same as Data Matched
          if (responseJson.status === 'success') {
            setIsRegistraionSuccess(true);
            console.log(
              'Registration Successful. Please Login to proceed'
            );
          } else {
            setErrortext(responseJson.msg);
          }
        })
        .catch((error) => {
          //Hide Loader
          setLoading(false);
          console.error(error);
        });
    };
    return ( 
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Chats" component={Chats} />
          <Tab.Screen name="Add" component={Chats} /> 
          <Tab.Screen name="Journal" component={Chats} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator> 
    );
}


export default RegisterScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});
