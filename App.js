import * as React from 'react';
import { Button ,StyleSheet, Text, TouchableOpacity ,Image, View , TextInput  } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Login from "./activity/login";
import { MasterContext } from "./context";
import AuthNavigator from "./navigation/AuthNavigator";
import WelcomeScreen from "./screens/WelcomeScreen";
// import ForgotPassword from "./activity/forgot_password";
// import CheckYourEmai from "./activity/check_your_emai";
// import PasswordReset from "./activity/password_reset";
// import CongratulationResetPassword from "./activity/Congratulation_reset_password";
// import Tutorial from "./activity/tutorial";
// import Signup from "./activity/signup";
// import Home from "./activity/home";
// import Notification  from "./activity/notification";
// import Profile  from "./activity/profile";
// import Rateus from "./activity/rateus";
// import Settings from "./activity/settings";
//import  Styles   from "styles"
const ScreenContainer = ({ children }) => (
  <View >{children}</View>
);
// function HomeScreen({ navigation }) {
//   return (
//     <ScreenContainer >
//       <Button  title="Login" onPress={() => navigation.push('Login', { name: 'Jane' }) } />
//       <Button title="Forgot Your Password"  onPress={() =>  navigation.push('Forgot', { name: 'Jane' }) } />
//       <Button title="Check Your Email" onPress={() =>  navigation.push('CheckEmail') } />
//       <Button title="Password Reset" onPress={() =>  navigation.push('PasswordReset') } />
//       <Button title="Congratulation Reset Password" onPress={() => navigation.push('CongratulationResetPassword') } />
//       <Button title="Tutorial" onPress={() => navigation.push('tutorial') } />
//       <Button title="Signup" onPress={() => navigation.push('sign_up') } />
//       <Button title="Home" onPress={() => navigation.push('home') } />
//       <Button title="Notification" onPress={() => navigation.push('notification') } />
//       <Button title="Profile" onPress={() => navigation.push('profile') } />
//       <Button title="Rateus" onPress={() => navigation.push('Rateus') } />
//       <Button title="Settings" onPress={() => navigation.push('Settings') } />
//     </ScreenContainer>
//   );
// }
//
//
//  function LoginPage({ navigation, route }){
//   return  <Login/> ;
// };
//
// //Forgot_your_password
//
// function ForgotYourPassword({ navigation , route }){
//   return  <ForgotPassword/> ;
// }
// function CheckYourEmail({ navigation , route }){
//   return  <CheckYourEmai/> ;
// }
// function Password_Reset({ navigation , route }){
//   return  <PasswordReset/> ;
// }
//
// function Congratulation_ResetPassword({ navigation , route }){
//   return  <CongratulationResetPassword/> ;
// }
// function SignUp({ navigation , route }){
//   return  <Signup/> ;
// }
//
// function Tutorial_page({ navigation , route }){
//   return  <Tutorial/> ;
// }
// function Home_page({ navigation , route }){
//   return  <Home/> ;
// }
// function Notification_page({ navigation , route }){
//   return  <Notification/> ;
// }
// function Profile_page({ navigation , route }){
//   return  <Profile/> ;
// }
//
// function Rateus_page({ navigation , route }){
//   return  <Rateus/> ;
// }
// function Settings_page({ navigation , route }){
//   return  <Settings/> ;
// }
//


function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
         tabBarOptions={{
           activeBackgroundColor : "tomato",
           activeTintColor : "white",
           inactiveBackgroundColor :  "#eee",
           inactiveTintColor : 'black'
         }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown : false}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


// const Stack = createStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <AuthNavigator/>
//       {/*<Stack.Navigator initialRouteName="Home">*/}
//       {/*  <Stack.Screen name="Home" component={HomeScreen} />*/}
//
//       {/*  <Stack.Screen name="Login" component={LoginPage} options={{*/}
//       {/*    title: 'Login'*/}
//       {/*  }}/>*/}
//       {/*  <Stack.Screen name="Forgot" component={ForgotYourPassword} options={{*/}
//       {/*    title: 'Forgot Your Password'*/}
//       {/*  }}/>*/}
//
//       {/*  <Stack.Screen name="CheckEmail" component={CheckYourEmail} options={{*/}
//       {/*    title: 'Check your email'*/}
//       {/*  }}/>*/}
//       {/*  <Stack.Screen name="PasswordReset" component={Password_Reset} options={{*/}
//       {/*    title: 'Password Reset'*/}
//       {/*  }}/>*/}
//       {/*<Stack.Screen name="CongratulationResetPassword" component={Congratulation_ResetPassword} options={{*/}
//       {/*    title: 'Congratulation Reset Password'*/}
//       {/*  }}/>*/}
//
//       {/*  <Stack.Screen name="tutorial" component={Tutorial_page} options={{*/}
//       {/*    title: 'Tutorial'*/}
//       {/*  }}/>*/}
//       {/*  <Stack.Screen name="home" component={Home_page} options={{*/}
//       {/*    title: 'Home'*/}
//       {/*  }}/>*/}
//
//       {/*  <Stack.Screen name="sign_up" component={SignUp} options={{*/}
//       {/*    title: 'SignUp'*/}
//       {/*  }}/>*/}
//       {/*  <Stack.Screen name="notification" component={Notification_page} options={{*/}
//       {/*    title: 'Notification'*/}
//       {/*  }}/>*/}
//       {/*  <Stack.Screen name="profile" component={Profile_page} options={{*/}
//       {/*    title: 'Profile'*/}
//       {/*  }}/>*/}
//       {/*  <Stack.Screen name="Rateus" component={Rateus_page} options={{*/}
//       {/*    title: 'Rateus'*/}
//       {/*  }}/>*/}
//       {/*  <Stack.Screen name="Settings" component={Settings_page} options={{*/}
//       {/*    title: 'Settings'*/}
//       {/*  }}/>*/}
//
//
//       {/*</Stack.Navigator>*/}
//     </NavigationContainer>
//   );
// }
//


//export default App;
