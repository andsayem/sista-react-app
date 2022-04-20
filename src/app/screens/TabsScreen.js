import React, {useState } from "react";
import { StyleSheet, Image, Text } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../activity/Profile';
import Chats from "../activity/Chats";
import Journal from "../activity/Journal";
import Newpost from '../activity/Newpost';
import Posts from '../activity/Posts';
import AsyncStorage from '@react-native-community/async-storage';
const STORAGE_KEY = 'save_user';
const TOKEN = 'token';
const Tab = createBottomTabNavigator();
function TabsScreen(props) {
  const [loggedIn, setLogin] = useState(false);
  const readData = async () => {
    try {
      const getToken = await AsyncStorage.getItem(TOKEN);
      const userInfo = await AsyncStorage.getItem(STORAGE_KEY);
      setToken(getToken);
      if (getToken) {
        setLogin(true);
      } else {
        setLogin(false);
      }

    } catch (e) {
    }
  }


  return (
    <Tab.Navigator tabBarOptions={{
      style: {
        height: 100 ,
      },
    }}>
      <Tab.Screen name="Home" component={Posts}
        options={({ route }) => ({
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#944CD4' : '#ababab', fontFamily: 'Montserrat-SemiBold', fontSize: 12, paddingBottom:10 }} >Home</Text>
          ),
          tabBarIcon: ({ focused }) => (
            focused ? <Image style={{
              resizeMode: 'contain',
              flex: 1,
              aspectRatio: 0.45
            }} source={require('../../assets/img/icon/home_active.png')} />
              : <Image style={{
                resizeMode: 'contain',
                flex: 1,
                aspectRatio: 0.45 
              }} source={require('../../assets/img/icon/home.png')} />
          ),
          tabBarOnPress: () => {
            props.navigation.navigate("Posts"); 
          },
        })} />
      <Tab.Screen name="Chats" component={Chats}
        options={({ route }) => ({
          headerShown: true,
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#944CD4' : '#ababab', fontFamily: 'Montserrat-SemiBold', fontSize: 12, paddingBottom:10 }} >Chats</Text>
          ),
          tabBarIcon: ({ focused }) => (
            focused ? <Image style={{
              resizeMode: 'contain',
              flex: 1,
              aspectRatio: 0.45
            }} source={require('../../assets/img/icon/chart_active.png')} /> : <Image style={{
              resizeMode: 'contain',
              flex: 1,
              aspectRatio: 0.45
            }} source={require('../../assets/img/icon/chart.png')} />
          ),
        })}
      />

      <Tab.Screen name="Add" onPress={() => navigation.navigate("Newpost")} component={Newpost}
        options={{
          headerShown: true,
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#944CD4' : '#ababab', fontFamily: 'Montserrat-SemiBold', fontSize: 12, paddingBottom:10 }} >Add</Text>
          ),
          tabBarIcon: ({ focused }) => (
            focused ? <Image style={{
              resizeMode: 'contain',
              flex: 1,
              aspectRatio: 0.45
            }} source={require('../../assets/img/icon/add_active.png')} /> : <Image style={{
              resizeMode: 'contain',
              flex: 1,
              aspectRatio: 0.45
            }} source={require('../../assets/img/icon/add.png')} />
          ),
        }}
      /> 
      <Tab.Screen name="Journal" component={Journal}
        options={{
          headerShown: true,
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#944CD4' : '#ababab', fontFamily: 'Montserrat-SemiBold', fontSize: 12, paddingBottom:10 }} >Journal</Text>
          ),
          tabBarIcon: ({ focused }) => (
            focused ? <Image style={{
              resizeMode: 'contain',
              flex: 1,
              aspectRatio: 0.45
            }} source={require('../../assets/img/icon/journal_active.png')} /> : <Image
              style={{
                resizeMode: 'contain',
                flex: 1,
                aspectRatio: 0.45
              }} source={require('../../assets/img/icon/journal.png')} />
          ),
        }}
      />
      <Tab.Screen name="Profile" component={Profile}
        options={{
          headerShown: true,
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#944CD4' : '#ababab', fontFamily: 'Montserrat-SemiBold', fontSize: 12, paddingBottom:10 }} >Profile</Text>
          ),
          tabBarIcon: ({ focused }) => (
            focused ? <Image
              style={{
                resizeMode: 'contain',
                flex: 1,
                aspectRatio: 0.45
              }}
              source={require('../../assets/img/icon/profile_active.png')} /> : <Image
              style={{
                resizeMode: 'contain',
                flex: 1,
                aspectRatio: 0.45
              }} source={require('../../assets/img/icon/profile.png')} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


export default TabsScreen;

const styles = StyleSheet.create({
  home: {
    color: '#783EA4',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16, paddingBottom:10,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    alignItems: 'center',
    fontSize: 14, paddingBottom:10,
  },
  successTextStyle: {
    color: 'white',
    alignItems: 'center',
    fontSize: 18, paddingBottom:10,
    padding: 30,
  },
});
