import React, { useEffect, useState } from "react"; 
import { createStackNavigator } from "@react-navigation/stack"; 
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './navigation/DrawerContent';
import AsyncStorage from '@react-native-community/async-storage';
const STORAGE_KEY = 'save_user'; 
const TOKEN = 'token';
import TabsScreen from "./screens/TabsScreen";
import Login from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
const Drawer = createDrawerNavigator();
  function App() {
    const [user, setUser] = useState('');
    const [token, setToken] = useState(null);
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
        alert('Failed to fetch the data from storage App.js page') 
      }
    } 
    useEffect(() => {
      readData();
    })
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props}></DrawerContent>}>
      <Drawer.Screen name="Home" component={TabsScreen}   />   
      {loggedIn ?  
        <Drawer.Screen name="Tabs" component={TabsScreen} />        
         : 
         <Drawer.Screen name="Login" component={Login} /> 
        }
      <Drawer.Screen name="RegisterScreen" component={RegisterScreen} /> 
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
export default App;
