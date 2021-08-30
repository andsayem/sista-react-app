import React, { useEffect, useState } from "react";
import {  StyleSheet } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';  
//import {ContactStackNavigator , MainStackNavigator } from "../navigation/AuthNavigator";
import { Icon } from "react-native-elements"; 
import Profile from '../activity/Profile';
import Chats from "../activity/Chats"; 
import Journal from "../activity/Journal"; 
import Newpost from '../activity/Newpost';
import NewListingButton from "../navigation/NewListingButton";
import Posts from '../activity/Posts';
import AsyncStorage from '@react-native-community/async-storage';
const STORAGE_KEY = 'save_user';
import Home from '../activity/home';
// import Login from '../screens/LoginScreen';
const TOKEN = 'token'; 
const Tab = createBottomTabNavigator();
function TabsScreen (navigation){ 
  const [loggedIn, setLogin] = useState(false);
  const readData = async () => {
    try { 
      const getToken = await AsyncStorage.getItem(TOKEN);   
      const userInfo = await AsyncStorage.getItem(STORAGE_KEY); 
      setToken(getToken); 
      if(getToken){
        setLogin(true);
      }else{
        setLogin(false);
      }
      
    } catch (e) { 
      // navigation.push('Login');
      // navigation.navigate("Login");
      //alert('Failed to fetch the data from storage tabscreen') 
    }
  } 
  
  //console.log('loggedIn app page ',loggedIn);
  // useEffect(() => {
  //   readData();
  // },[])

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
