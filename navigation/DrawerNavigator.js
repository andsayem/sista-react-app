
import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer"; 
import TabsScreen from "../screens/TabsScreen";
import Chats from "../activity/Chats";
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={TabsScreen}   /> 
      <Drawer.Screen name="Chats" component={Chats}   /> 
       
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;