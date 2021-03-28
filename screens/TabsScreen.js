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
import Profile from '../activity/profile';
import Chats from "../activity/Chats"; 
import Journal from "../activity/Journal"; 
import Home from '../activity/home.js';
import { Avatar, ListItem , Icon  , Header} from "react-native-elements"; 

 

const Tab = createBottomTabNavigator();

function TabsScreen ({navigation,props}){ 
    return ( 
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home}   
            options={{
              headerShown : false,
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                  <Icon name='home' />
                )
            }}/> 
          <Tab.Screen name="Chats" component={Chats} 
           options={{
            headerShown : false,
            tabBarLabel: 'Chats',
            tabBarIcon: ({ color, size }) => (
                <Icon name='chat' />
              )
          }}
           />
          <Tab.Screen name="Add" component={Chats} 
           options={{
            headerShown : false,
            tabBarLabel: 'Add',
            tabBarIcon: ({ color, size }) => (
                <Icon name='add' />
              )
          }}
           /> 
          <Tab.Screen name="Journal" component={Journal} 
           options={{
            headerShown : false,
            tabBarLabel: 'Journal',
            tabBarIcon: ({ color, size }) => (
                <Icon name='book' />
              )
          }}
           />
          <Tab.Screen name="Profile" component={Profile} 
           options={{
            headerShown : false,
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
                <Icon name='account' />
              )
          }}
           />
        </Tab.Navigator> 
    );
}


export default TabsScreen;

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
