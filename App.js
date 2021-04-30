import * as React from 'react';
import { Button ,StyleSheet, Text, TouchableOpacity ,Image, View , TextInput  } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 
import Login from "./activity/login";
import { MasterContext } from "./context";
import {ContactStackNavigator , MainStackNavigator } from "./navigation/AuthNavigator";
import WelcomeScreen from "./screens/WelcomeScreen";
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerNavigator from "./navigation/DrawerNavigator";
import { DrawerContent } from './navigation/DrawerContent';
import TabsScreen from "./screens/TabsScreen";
const ScreenContainer = ({ children }) => (
  <View >{children}</View>
);
 
 
 

const Drawer = createDrawerNavigator();

  function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props}></DrawerContent>}>
      <Drawer.Screen name="Home" component={TabsScreen}   /> 
      </Drawer.Navigator>
        {/* <DrawerNavigator /> */}
    </NavigationContainer>
  );
}


// const Stack = createStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <AuthNavigator/> 
//     </NavigationContainer>
//   );
// }



export default App;
