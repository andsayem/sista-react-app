import React, { useEffect, useState } from "react";
import {  StyleSheet } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';  
import Profile from '../activity/profile';
import Chats from "../activity/Chats"; 
import Journal from "../activity/Journal"; 
import Home from '../activity/home.js';
import Posts from '../activity/Posts.js';
import Newpost from '../activity/Newpost';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from "react-native-elements"; 
import NewListingButton from "../navigation/NewListingButton";
import {ContactStackNavigator , MainStackNavigator } from "../navigation/AuthNavigator";
const STORAGE_KEY = 'save_user';
const TOKEN = 'token'; 
const Tab = createBottomTabNavigator();

function TabsScreen ({navigation,props}){ 
  // const [user, setUser] = useState('');
  // const readData = async () => {
  //   try {
  //     const userInfo = await AsyncStorage.getItem(STORAGE_KEY);
  //     let jsonuser = JSON.parse(userInfo)
  //     if (userInfo !== null) {
  //       setUser(jsonuser)
  //     }else{
  //       navigation.replace('Login')
  //     }
  //   } catch (e) {
  //     alert('Failed to fetch the data from storage')
  //   }
  // } 
  // useEffect(() => {
  //   readData();
  // }, [])
    return ( 
        <Tab.Navigator>
          <Tab.Screen name="Posts" component={Posts}   
            options={{
              headerShown : false,
              tabBarLabel: 'Posts',
              tabBarIcon: ({ color, size }) => (
                  <Icon name='home' />
                )
            }}/> 
          <Tab.Screen name="Home" component={MainStackNavigator}   
            options={{
              headerShown : false,
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                  <Icon name='home' />
                )
            }}/> 
          <Tab.Screen name="Chats" component={Chats} 
           options={{
            headerShown : true,
            tabBarBadge: '+9',
            tabBarLabel: 'Chats',
            tabBarIcon: ({ color, size }) => (
                <Icon name='chat' />
              )
          }}
           />
          <Tab.Screen name="Newpost" component={Newpost} 
           options={({ navigation  })=>({ 
            tabBarButton : () =><NewListingButton onPress={()=> navigation.navigate("Newpost")  }  ></NewListingButton>,
            tabBarIcon: ({ color, size }) => (
                <Icon name='add' />
              )
          })}
           /> 
          <Tab.Screen name="Journal" component={Journal} 
           options={{
            headerShown : true,
            tabBarLabel: 'Journal',
            tabBarIcon: ({ color, size }) => (
                <Icon name='book' />
              )
          }}
           />
          <Tab.Screen name="Profile" component={Profile} 
           options={{
            headerShown : true,
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
                <Icon type='font-awesome' name='user' />
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
    alignItems: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    alignItems: 'center',
    fontSize: 18,
    padding: 30,
  },
});
