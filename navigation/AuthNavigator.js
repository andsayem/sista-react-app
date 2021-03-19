import React from "react";
import  { createStackNavigator } from  '@react-navigation/stack'
import  WelcomeScreen from '../screens/WelcomeScreen';
import  LoginScreen from '../screens/LoginScreen';
import  RegisterScreen from '../screens/RegisterScreen';
import  ForgotPassword  from  '../activity/forgot_password';
import  PasswordReset  from  '../activity/password_reset';
import  CheckYourEmail  from '../activity/check_your_email';
import PostDetails  from '../activity/PostDetails';
import Chats from "../activity/Chats";
import CongratulationResetPassword from '../activity/Congratulation_reset_password';
import Home from '../activity/home.js';
import Tabs from '../screens/TabsScreen.js';

const  Stack  = createStackNavigator();

const  AuthNavigator = () => (
  <Stack.Navigator >
    <Stack.Screen name="Chats" component={Chats} options={{ headerShown : true}} />
    <Stack.Screen name="PostDetails" component={PostDetails} options={{ headerShown : true}} />
    <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown : false}} />
    <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown : false}} />
    <Stack.Screen name="Register" component={RegisterScreen}  options={{ headerShown : false}} />
    <Stack.Screen name="Forgot_password" component={ForgotPassword}  options={{ headerShown : false}} />
    <Stack.Screen name="Password_Reset" component={PasswordReset}  options={{ headerShown : false}} />
    <Stack.Screen name="Check_your_email" component={CheckYourEmail}  options={{ headerShown : false}} />
    <Stack.Screen name="Congratulation_reset" component={CongratulationResetPassword}  options={{ headerShown : false}} />
    <Stack.Screen name="Home_page" component={Home}  options={{ title: 'Inspire me'  }} />
    <Stack.Screen name="Tabs" component={Tabs}  options={{ headerShown : false}} />
  </Stack.Navigator>
)
export default  AuthNavigator ;
