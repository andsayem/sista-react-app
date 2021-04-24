import * as React from 'react';
import { Button ,StyleSheet, Text, TouchableOpacity ,Image, View , TextInput  } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 
import Login from "./activity/login";
import { MasterContext } from "./context";
import AuthNavigator from "./navigation/AuthNavigator";
import WelcomeScreen from "./screens/WelcomeScreen";
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerNavigator from "./navigation/DrawerNavigator";
const ScreenContainer = ({ children }) => (
  <View >{children}</View>
);
 
 

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

  function App() {
  return (
    <NavigationContainer>
        <DrawerNavigator />
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
