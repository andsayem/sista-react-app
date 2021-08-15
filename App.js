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
import { useHistory } from "react-router-dom";
const Stack = createStackNavigator();
const StackApp = createStackNavigator();
const Drawer = createDrawerNavigator();

const AuthContext = React.createContext();

function DrawerNavigator() {
    return (
      <Drawer.Navigator initialRouteName="Tabs" drawerContent={props => <DrawerContent {...props}></DrawerContent>}> 
        <Drawer.Screen name="Tabs" component={TabsScreen} />      
         <Drawer.Screen name="Login" component={Login} />  
        <Drawer.Screen name="RegisterScreen" component={RegisterScreen} /> 
      </Drawer.Navigator>
    );
}
 
function App(){
  const [getToken, setToken] = useState(false);
  const [initialRoute, setInitialRoute] = useState('Login');
  const readData = async () => {
    try { 
      const token = await AsyncStorage.getItem(TOKEN);          
      setToken(token); 
      if(getToken){ 
        setInitialRoute('Home'); 
      }else{
        props.navigation.navigate("Login");
        setInitialRoute('Login'); 
      }      
    } catch (e) {  
      alert('Failed to fetch the data app' ) 
      navigate('Login');
      setInitialRoute('Login');
      props.navigation.navigate("Login");
    }
  } 
  useEffect(() => {
    readData(); 
  },[]) 
  return (
    <NavigationContainer>
      <StackApp.Navigator initialRouteName={initialRoute}>
        <StackApp.Screen name="Home" component={DrawerNavigator}  options={{ headerShown : false}}/>
        <StackApp.Screen name="Tabs" component={TabsScreen}  options={{ headerShown : false}}/>
        <StackApp.Screen name="Login" component={Login}  options={{ headerShown : false}}/>
        <StackApp.Screen name="RegisterScreen" component={RegisterScreen}  options={{ headerShown : false}}/>       
      </StackApp.Navigator>
    </NavigationContainer>
  );
}

function App22(navigation) {
  const [user, setUser] = useState('');
    const [token, setToken] = useState(null);
    const [loggedIn, setLogin] = useState(false); 
    const history = useHistory();    
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
        history.push("/login");
      }
    } 
    
    // useEffect(() => {
    //   readData();
    // })

    useEffect(() => {
      window.addEventListener('mousemove', () => {});
    
      // returned function will be called on component unmount 
      return () => {
        window.removeEventListener('mousemove', () => {})
      }
    }, [])

    console.log('loggedIn app page ',loggedIn);
  return (
    <NavigationContainer>
      <Stack.Navigator>
      {loggedIn ?          
        <Stack.Screen
          name="Root"
          component={Root}
          options={{ 
            title: 'Sign in',
            animationTypeForReplace: loggedIn ? 'pop' : 'push',
            headerShown: false }}
        />   
         : 
         <Stack.Screen name="Login" component={Login} />
        }        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

  function Apps() {
    const [user, setUser] = useState('');
    const [token, setToken] = useState(null);
    const [loggedIn, setLogin] = useState(false); 

    const history = useHistory();
    
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
        history.push("/login");
      }
    } 
    useEffect(() => {
      readData();
    })
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props}></DrawerContent>}>
      {/* <Drawer.Screen name="Home" component={TabsScreen}   />    */}
      {loggedIn ?  
        <Drawer.Screen name="Home" component={TabsScreen} />        
         : 
         <Drawer.Screen name="Login" component={Login} /> 
        }
      <Drawer.Screen name="RegisterScreen" component={RegisterScreen} /> 
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
export default App;
