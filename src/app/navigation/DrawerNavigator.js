
import React from "react"; 
import { createDrawerNavigator } from "@react-navigation/drawer"; 
import TabsScreen from "../screens/TabsScreen";
import Chats from "../activity/Chats"; 
import {
  shareOnFacebook, 
} from 'react-native-social-share';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  facebookShare = () => { 
    shareOnFacebook({
        'text':'Global democratized marketplace for art',
        'link':'https://artboost.com/',
        'imagelink':'https://artboost.com/apple-touch-icon-144x144.png',
        //or use image
        'image': 'artboost-icon',
      },
      (results) => { 
      }
    );
  }
  return ( 
    
      <Drawer.Navigator   drawerStyle={{
        backgroundColor: '#944CD4',
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
            <Drawer.Screen name="Share app"onPress={this.facebookShare}  /> 
            <Drawer.Screen name="Rate Us" component={Chats}   /> 
            <Drawer.Screen name="Support" component={Chats}   /> 
            <Drawer.Screen name="Privacy Policy" component={Chats}   /> 
            <Drawer.Screen name="Logout Test" component={Chats}   />  
      </Drawer.Navigator> 
  );
}

export default DrawerNavigator;