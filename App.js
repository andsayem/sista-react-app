import React, {useEffect, useState } from "react";
import { LogBox } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './src/app/navigation/DrawerContent';
import AsyncStorage from '@react-native-community/async-storage';
const STORAGE_KEY = 'save_user';
const TOKEN = 'token';
import TabsScreen from "./src/app/screens/TabsScreen"; 
import Login from './src/app/screens/LoginScreen';
import RegisterScreen from './src/app/screens/RegisterScreen';
import ForgotPassword from './src/app/activity/ForgotPassword';
import CheckYourEmail from './src/app/activity/CheckYourEmail';
import PasswordReset from './src/app/activity/PasswordReset';
import CongratulationResetPassword from './src/app/activity/Congratulation_reset_password';
import Journaladd from "./src/app/activity/Journaladd";
import JournalSettings from "./src/app/activity/JournalSettings";
import Quizzes from "./src/app/activity/Quizzes";
import Product from "./src/app/product/Product";
import PrivacyPolicy from "./src/app/activity/PrivacyPolicy";
import Settings from "./src/app/activity/Settings";
import About from "./src/app/activity/About";
import EventsList from "./src/app/components/EventsList";
import ProductInfo from "./src/app/product/ProductInfo";
import AppInformation from "./src/app/activity/AppInformation";
import RatingApp from "./src/app/activity/RatingApp";
import Support from "./src/app/activity/support/Support";
import Chating from "./src/app/activity/Chating";
import { useHistory } from "react-router-dom";
import SplashScreen from "react-native-splash-screen";
import PostDetails from './src/app/activity/PostDetails';
import EventDetails from './src/app/components/EventsDetails';
import JournalDetails from './src/app/activity/JournalDetails';
import Profile from "./src/app/activity/Profile";
import UserProfile from './src/app/activity/UserProfile';
import AppTutorial from './src/app/screens/WelcomeScreen';
import ProductDetail from "./src/app/product/ProductDetail"; 
import GlobalFont from 'react-native-global-font'


const Stack = createStackNavigator();
const StackApp = createStackNavigator();
const Drawer = createDrawerNavigator();
const AuthContext = React.createContext();
LogBox.ignoreAllLogs();
function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Tabs" drawerContent={props => <DrawerContent {...props}></DrawerContent>}>
      <Drawer.Screen name="Tabs" component={TabsScreen} />
      <Drawer.Screen name="AppTutorial" component={AppTutorial} /> 
      <Drawer.Screen name="RegisterScreen" component={RegisterScreen} />
      <Drawer.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
      <Drawer.Screen name="CheckYourEmail" component={CheckYourEmail} options={{ headerShown: false }} />
      <Drawer.Screen name="PasswordReset" component={PasswordReset} options={{ headerShown: false }} />
      <Drawer.Screen name="CongratulationResetPassword" component={CongratulationResetPassword} options={{ headerShown: false }} />
      <Drawer.Screen name="Journal_add" component={Journaladd} options={{ headerShown: false }} />
      <Drawer.Screen name="JournalSettings" component={JournalSettings} options={{ headerShown: false }} />
      <Drawer.Screen name="Quizzes" component={Quizzes} options={{ headerShown: false }} />
      <Drawer.Screen name="Product" component={Product} options={{ headerShown: false }} />
      <Drawer.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false }} />
      <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown: false }} />
      <Drawer.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
      <Drawer.Screen name="About" component={About} options={{ headerShown: false }} />
      <Drawer.Screen name="EventsList" component={EventsList} options={{ headerShown: false }} />
      <Drawer.Screen name="ProductInfo" component={ProductInfo} options={{ headerShown: false }} />
      <Drawer.Screen name="AppInformation" component={AppInformation} options={{ headerShown: false }} />
      <Drawer.Screen name="RatingApp" component={RatingApp} options={{ headerShown: false }} />
      <Drawer.Screen name="Support" component={Support} options={{ headerShown: false }} />

    </Drawer.Navigator>
  );
}

function App() {
  const [getToken, setToken] = useState(false);
  const [initialRoute, setInitialRoute] = useState('AppTutorial');
  const readData = async () => {
    const user = await AsyncStorage.getItem(STORAGE_KEY);
      const token = await AsyncStorage.getItem(TOKEN);
      setInitialRoute("Home");
 
    if ((token) && (user)) {
      props.navigation.navigate("Home");
    } 
  }

  useEffect(() => { readData() },[getToken])  
  useEffect(() => { 
    let fontName = 'IBMPlexSans-Regular'
    GlobalFont.applyGlobal(fontName)
  }, [getToken])
  useEffect(() => { SplashScreen.hide() }, [getToken])
  useEffect(() => {
    return () => {
      readData();
    }
  }, [getToken]);
  return (
    <NavigationContainer>
      <StackApp.Navigator initialRouteName={initialRoute}>
        <StackApp.Screen name="Home" component={DrawerNavigator} options={{ headerShown: false }} />
        <StackApp.Screen name="Tabs" component={TabsScreen} options={{ headerShown: false }} />
        <StackApp.Screen name="AppTutorial" component={AppTutorial} options={{ headerShown: false }} />
        <StackApp.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <StackApp.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
        <StackApp.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
        <StackApp.Screen name="CheckYourEmail" component={CheckYourEmail} options={{ headerShown: false }} />
        <StackApp.Screen name="PasswordReset" component={PasswordReset} options={{ headerShown: false }} />
        <StackApp.Screen name="CongratulationResetPassword" component={CongratulationResetPassword} options={{ headerShown: false }} />
        <StackApp.Screen name="Journal_add" component={Journaladd} options={{ headerShown: false, name: 'Add Journal ' }} />
        <StackApp.Screen name="JournalSettings" component={JournalSettings} options={{ headerShown: false, name: 'Add Journal ' }} />
        <StackApp.Screen name="Quizzes" component={Quizzes} options={{ headerShown: false, name: 'Quizzes' }} />
        <StackApp.Screen name="Product" component={Product} options={{ headerShown: false, name: 'Product' }} />
        <StackApp.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false, name: 'Product Detail' }} />
        <StackApp.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown: false, name: 'Privacy Policy' }} />
        <StackApp.Screen name="Settings" component={Settings} options={{ headerShown: false, name: 'Settings' }} />
        <StackApp.Screen name="About" component={About} options={{ headerShown: false, name: 'ProductInfo' }} />
        <StackApp.Screen name="EventsList" component={EventsList} options={{ headerShown: false, name: 'EventsList' }} />
        <StackApp.Screen name="ProductInfo" component={ProductInfo} options={{ headerShown: false, name: 'About' }} />
        <StackApp.Screen name="AppInformation" component={AppInformation} options={{ headerShown: false, name: 'App Information' }} />
        <StackApp.Screen name="RatingApp" component={RatingApp} options={{ headerShown: false, name: 'Rate Us' }} />
        <StackApp.Screen name="Support" component={Support} options={{ headerShown: false, name: 'Support' }} />
        <StackApp.Screen name="Chating" component={Chating} options={{ headerShown: false, name: 'Chating' }} />
        <StackApp.Screen name="PostDetails" component={PostDetails} options={{ headerShown: false, name: 'PostDetails' }} />
        <StackApp.Screen name="EventDetails" component={EventDetails} options={{ headerShown: false, name: 'Event Details' }} />
        <StackApp.Screen name="JournalDetails" component={JournalDetails} options={{ headerShown: false, name: 'JournalDetails' }} />
        <StackApp.Screen name="Profile" component={Profile} options={{ headerShown: false, name: 'UserProfile' }} />
        <StackApp.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false, name: 'UserProfile' }} /> 
      </StackApp.Navigator>
    </NavigationContainer>
  );
}
export default App;
