import React, {Fragment, useEffect, useState } from "react"; 
import {Flatform} from 'react-native';
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
import ForgotPassword  from  './activity/forgot_password'; 
import CheckYourEmail  from './activity/check_your_email';
import PasswordReset  from  './activity/password_reset';
import CongratulationResetPassword from './activity/Congratulation_reset_password';
import Journaladd from "./activity/Journaladd";
import Quizzes from "./activity/Quizzes";
import Product from "./product/Product";
import PrivacyPolicy from "./activity/PrivacyPolicy";
import Settings from "./activity/Settings";
import About from "./activity/About";
import AppInformation from "./activity/AppInformation";
import RatingApp from "./activity/RatingApp";
import Support from "./activity/Support";
import Chating from "./activity/Chating";
import { useHistory } from "react-router-dom";
import SplashScreen from "react-native-splash-screen";
import PostDetails from './activity/PostDetails';
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
        <Drawer.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown : false}}/>       
        <Drawer.Screen name="CheckYourEmail" component={CheckYourEmail} options={{ headerShown : false}}/>       
        <Drawer.Screen name="PasswordReset" component={PasswordReset} options={{ headerShown : false}}/>       
        <Drawer.Screen name="CongratulationResetPassword" component={CongratulationResetPassword} options={{ headerShown : false}}/>
        <Drawer.Screen name="Journal_add" component={Journaladd} options={{ headerShown : false}}/>
        <Drawer.Screen name="Quizzes" component={Quizzes} options={{ headerShown : false}}/>
        <Drawer.Screen name="Product" component={Product} options={{ headerShown : false}}/>
        <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown : false}}/>
        <Drawer.Screen name="Settings" component={Settings} options={{ headerShown : false}}/>
        <Drawer.Screen name="About" component={About} options={{ headerShown : false}}/>
        <Drawer.Screen name="AppInformation" component={AppInformation} options={{ headerShown : false}}/>
        <Drawer.Screen name="RatingApp" component={RatingApp} options={{ headerShown : false}}/>
        <Drawer.Screen name="Support" component={Support} options={{ headerShown : false}}/>
         
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
      //alert('Failed to fetch the data app' ) 
      //navigate('Login');
      setInitialRoute('Login');
      //props.navigation.navigate("Login");
    }
  } 

  //useEffect(() => { readData() },[getToken])  
  useEffect(() => { SplashScreen.hide() },[getToken]) 
  useEffect(() => {  
    return () => { 
      console.log(initialRoute,'dfgf'); 
      readData();
    }
  }, [getToken]);
  return (
    <NavigationContainer>
      <StackApp.Navigator initialRouteName={initialRoute}>
        <StackApp.Screen name="Home" component={DrawerNavigator}  options={{ headerShown : false}}/>
        <StackApp.Screen name="Tabs" component={TabsScreen}  options={{ headerShown : false}}/>
        <StackApp.Screen name="Login" component={Login}  options={{ headerShown : false}}/>
        <StackApp.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown : false}}/>       
        <StackApp.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown : false}}/>       
        <StackApp.Screen name="CheckYourEmail" component={CheckYourEmail} options={{ headerShown : false}}/>       
        <StackApp.Screen name="PasswordReset" component={PasswordReset} options={{ headerShown : false}}/>       
        <StackApp.Screen name="CongratulationResetPassword" component={CongratulationResetPassword} options={{ headerShown : false}}/>       
        <StackApp.Screen name="Journal_add" component={Journaladd} options={{ headerShown : false, name : 'Add Journal '}} />
        <StackApp.Screen name="Quizzes" component={Quizzes} options={{ headerShown : false, name : 'Quizzes'}} />
        <StackApp.Screen name="Product" component={Product} options={{ headerShown : false, name : 'Product'}} />
        <StackApp.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown : false, name : 'Privacy Policy'}} />
        <StackApp.Screen name="Settings" component={Settings} options={{ headerShown : false, name : 'Settings'}} />
        <StackApp.Screen name="About" component={About} options={{ headerShown : false, name : 'About'}} />
        <StackApp.Screen name="AppInformation" component={AppInformation} options={{ headerShown : false, name : 'App Information'}} />
        <StackApp.Screen name="RatingApp" component={RatingApp} options={{ headerShown : false, name : 'Rate Us'}} />
        <StackApp.Screen name="Support" component={Support} options={{ headerShown : false, name : 'Support'}} />
        <StackApp.Screen name="Chating" component={Chating} options={{ headerShown : false, name : 'Chating'}} />
        <StackApp.Screen name="PostDetails" component={PostDetails} options={{ headerShown : false, name : 'PostDetails'}} />
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
        //alert('Failed to fetch the data from storage App.js page') 
        history.push("/login");
      }
    } 
    
    // useEffect(() => {
    //   readData();
    // })

    useEffect(() => {
      window.addEventListener('mousemove', () => {
        console.log('returned function will be called on component unmount mousemove');
      });    
      console.log('returned function will be called on component unmount ');
      // returned function will be called on component unmount 
      return () => {
        window.removeEventListener('mousemove', () => {
          console.log('returned function will be called on component mount ');
        })
      }
      
    }, [])

    //console.log('loggedIn app page ',loggedIn);
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
