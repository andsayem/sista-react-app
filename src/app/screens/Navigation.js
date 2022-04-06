import React, { Component } from 'react';
import 'react-native-gesture-handler';
import WelcomeScreen from './WelcomeComponent';
import LoginScreen from './LoginComponent';
import RegisterScreen from './RegisterComponent';
import HomeScreen from './HomeComponent';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'; 
import AsyncStorage from '@react-native-community/async-storage';

const AuthStack = createStackNavigator();
const AuthStackScreen = () => {
    return <AuthStack.Navigator initialRouteName="Welcome">
        <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
};

const HomeTab = createMaterialBottomTabNavigator();
const HomeTabScreen = () => {
    return <HomeTab.Navigator initialRouteName="Home">
        <HomeTab.Screen name="Home" component={HomeScreen} />
    </HomeTab.Navigator>
}

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
        };
        this.loginStatusCheck();
    }

    loginStatusCheck = async () => {
        const userToken = await AsyncStorage.getItem("userprofile");
        if(userToken) {
            this.setState({ isLoggedIn: true })
        } else {
            this.setState({ isLoggedIn: false })
        }
    }
    
    render() {
        return(
            <NavigationContainer>
                {this.state.isLoggedIn ? <AuthStackScreen /> : <HomeTabScreen />}
            </NavigationContainer>
        );
    };
};
export default Navigation;