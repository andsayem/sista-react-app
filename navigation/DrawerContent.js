
import React from "react";

import { createDrawerNavigator , DrawerItem  , DrawerContentScrollView } from "@react-navigation/drawer"; 
import TabsScreen from "../screens/TabsScreen";
import Chats from "../activity/Chats";
import { View , ScrollView , StyleSheet } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Drawer,
  Text,
  TouchableRipple,
  Switch, 
  Paragraph
} from 'react-native-paper';
import {
  shareOnFacebook,
  shareOnTwitter,
} from 'react-native-social-share';

//import Chats from "../activity/Chats";
import { Icon } from "react-native-elements"; 
export function DrawerContent(props){
  facebookShare = () => { 
    shareOnFacebook({
        'text':'Global democratized marketplace for art',
        'link':'https://artboost.com/',
        'imagelink':'https://artboost.com/apple-touch-icon-144x144.png',
        //or use image
        'image': 'artboost-icon',
      },
      (results) => {
        console.log(results);
      }
    );
  }
  return (
    <ScrollView style={{ flex : 1 , backgroundColor : '#5C48BA'  }}>
      <DrawerContentScrollView {...props} >
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{  flexDirection : 'row' , marginTop : 15 }}>
              <Avatar.Image size={50}  source={require('../img/images/user_3.jpg')} > </Avatar.Image>
              <View style={{ marginLeft : 15 , marginTop : 15  , flexDirection : 'column'}}>
                <Title  style={{ color : '#fff'}}   > AS Sayem  </Title>
                <Caption   style={{ color : '#fff'}} >Information </Caption>
              </View>
            </View>   
          </View>
        </View> 
      </DrawerContentScrollView>
      <Drawer.Section style={{ color : '#fff'}}> 
    
        
         <DrawerItem
          style={{ color : '#fff'}} 
          onPress={()=>{props.navigation.navigate('Quizzes')}} 
          label="Quizzes" 
        />
         <DrawerItem
          style={{ color : '#fff'}} 
          onPress={()=>{props.navigation.navigate('Product')}} 
          label="Product's" 
        />
         <DrawerItem
          style={{ color : '#fff'}} 
          onPress={()=>{props.navigation.navigate('Settings')}} 
          label="Settings" 
        />
         <DrawerItem
          style={{ color : '#fff'}} 
          onPress={()=>{props.navigation.navigate('AppInformation')}} 
          label="App Information" 
        />
         <DrawerItem
          onPress={()=>{props.navigation.navigate('About')}} 
          label="About My Sista's KeepHer " 
        />
         <DrawerItem
          onPress={()=>{this.facebookShare()}} 
          label="Share app" 
        />
         <DrawerItem
          onPress={()=>{props.navigation.navigate('RatingApp')}} 
          label="Rate Us" 
        />
         <DrawerItem
          onPress={()=>{props.navigation.navigate('Support')}} 
          label="Support" 
        />
         <DrawerItem
          onPress={()=>{props.navigation.navigate('PrivacyPolicy')}} 
          label="Privacy Policy" 
        />
         <DrawerItem
          onPress={()=>{props.navigation.navigate('Login')}} 
          label="Login" 
        />
      </Drawer.Section>
    
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  drawerContent : {
    flex : 1 
  },
  userInfoSection : {
    paddingLeft : 20 ,
  },
  title : {
    fontSize : 16 ,
    lineHeight : 14 
  },
  caption : {
    fontSize : 14 ,
    lineHeight : 14 
  },
  row : {
    marginTop : 20 ,
    flexDirection : 'row',
    alignItems : 'center'
  },
  section : {
    flexDirection :'row',
    alignItems :  'center',
    marginRight : 15
  },
  paragraph :{
    fontWeight : 'bold',
    marginRight : 3
  },
  drawerSection :{
    marginTop : 10 
  },
  buttomDrawerSection : {
    marginBottom : 15 ,
    borderTopColor : '#f4f4f4',
    borderTopWidth : 1 ,
    color :  '#fff'
  },
  preferecnce : {
    flexDirection : 'row' ,
    justifyContent : 'space-between' ,
    paddingVertical : 12 ,
    paddingHorizontal : 16
  }
  

})
//const Drawer = createDrawerNavigator();

// const DrawerNavigator = () => {
//   return ( 
    
//       <Drawer.Navigator   drawerStyle={{
//         backgroundColor: '#ff5d8e',
//         color : '#fff',
//         width: 240,
//       }}>  
//             <Drawer.Screen name="Home" component={TabsScreen}   /> 
//             <Drawer.Screen name="Poetry" component={Chats}   /> 
//             <Drawer.Screen name="Quotes" component={Chats}   /> 
//             <Drawer.Screen name="Short Stories" component={Chats}   /> 
//             <Drawer.Screen name="Quizzes" component={Chats}   /> 
//             <Drawer.Screen name="Product's" component={Chats}   /> 
//             <Drawer.Screen name="Settings" component={Chats}   /> 
//             <Drawer.Screen name="About My Sista's KeepHer " component={Chats}   /> 
//             <Drawer.Screen name="Share app" component={Chats}   /> 
//             <Drawer.Screen name="Rate Us" component={Chats}   /> 
//             <Drawer.Screen name="Support" component={Chats}   /> 
//             <Drawer.Screen name="Privacy Policy" component={Chats}   /> 
//             <Drawer.Screen name="Logout" component={Chats}   />  
//       </Drawer.Navigator> 
//   );
// }

// export default DrawerNavigator;