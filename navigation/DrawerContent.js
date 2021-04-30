
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
//import Chats from "../activity/Chats";
import { Icon } from "react-native-elements"; 
export function DrawerContent(props){
  return (
    <ScrollView style={{ flex : 1 }}>
      <DrawerContentScrollView {...props} >
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{  flexDirection : 'row' , marginTop : 15 }}>
              <Avatar.Image size={50}  source={require('../img/images/user_3.jpg')} > </Avatar.Image>
              <View style={{ marginLeft : 15 , marginTop : 15  , flexDirection : 'column'}}>
                <Title  style={ styles.title } > AS Sayem  </Title>
                <Caption style={ styles.caption}>Information </Caption>
              </View>
            </View> 
            <View  style={styles.row}> 
              <View>
                <Paragraph>80</Paragraph>
                <Caption>Following</Caption>
              </View>
              <View> 
                <Paragraph>100</Paragraph>
                <Caption>Follower</Caption>
              </View>
            </View> 
          </View>
        </View> 
      </DrawerContentScrollView>
      <Drawer.Section style={ styles.buttomDrawerSection }> 
    
        <DrawerItem
          onPress={()=>{props.navigation.navigate('Chats')}} 
          label="Poetry" 
        />
        <DrawerItem
          onPress={()=>{props.navigation.navigate('Chats')}} 
          label="Quotes" 
        />
         <DrawerItem
          onPress={()=>{props.navigation.navigate('Chats')}} 
          label="Short Stories" 
        />
         <DrawerItem
          onPress={()=>{props.navigation.navigate('Chats')}} 
          label="Quizzes" 
        />
         <DrawerItem
          onPress={()=>{props.navigation.navigate('Chats')}} 
          label="Product's" 
        />
         <DrawerItem
          onPress={()=>{props.navigation.navigate('Chats')}} 
          label="Settings" 
        />
         <DrawerItem
          onPress={()=>{props.navigation.navigate('Chats')}} 
          label="About My Sista's KeepHer " 
        />
         <DrawerItem
          onPress={()=>{props.navigation.navigate('Chats')}} 
          label="Share app" 
        />
         <DrawerItem
          onPress={()=>{props.navigation.navigate('Chats')}} 
          label="Rate Us" 
        />
         <DrawerItem
          onPress={()=>{props.navigation.navigate('Chats')}} 
          label="Support" 
        />
         <DrawerItem
          onPress={()=>{props.navigation.navigate('Chats')}} 
          label="Privacy Policy" 
        />
         <DrawerItem
          onPress={()=>{props.navigation.navigate('Chats')}} 
          label="Logout" 
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
    borderTopWidth : 1 
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