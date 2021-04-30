
import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer"; 
import TabsScreen from "../screens/TabsScreen";
import Chats from "../activity/Chats";
import { View, Text, Image, Button , ImageBackground ,TextInput, TouchableOpacity, ToastAndroid, StyleSheet } from "react-native";
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return ( 
    
      <Drawer.Navigator   drawerStyle={{
        backgroundColor: '#ff5d8e',
        color : '#fff',
        width: 240,
      }}>  
            <Drawer.Screen name="Home" component={TabsScreen}   /> 
            <Drawer.Screen name="Poetry" component={Chats}   /> 
            <Drawer.Screen name="Quotes" component={Chats}   /> 
            <Drawer.Screen name="Short Stories" component={Chats}   /> 
            <Drawer.Screen name="Quizzes" component={Chats}   /> 
            <Drawer.Screen name="Product's" component={Chats}   /> 
            <Drawer.Screen name="Settings" component={Chats}   /> 
            <Drawer.Screen name="About My Sista's KeepHer " component={Chats}   /> 
            <Drawer.Screen name="Share app" component={Chats}   /> 
            <Drawer.Screen name="Rate Us" component={Chats}   /> 
            <Drawer.Screen name="Support" component={Chats}   /> 
            <Drawer.Screen name="Privacy Policy" component={Chats}   /> 
            <Drawer.Screen name="Logout" component={Chats}   />  
      </Drawer.Navigator> 
  );
}

export default DrawerNavigator;