import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import  Styles   from "../styles";
import { Avatar, ListItem , Icon , Header} from "react-native-elements"; 
function Profile ({navigation}){ 
    return ( <View>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Profile', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />

        <View  style={{  backgroundColor: "#FEFEFE",  width: '100%' , padding : 10 }}  >
            <View style={{ width : '20%'}}>
              <Avatar rounded   size="medium" source={require('../img/images/user_1.jpg')} />
               <Text>Alina Hall</Text> 
            </View> 
            <View  style={{ width : '20%'}} >
              <Avatar rounded   size="medium" source={require('../img/images/user_1.jpg')} />
               <Text>Alina Hall</Text> 
            </View>  
            <View>
              <Avatar rounded   size="medium" source={require('../img/images/user_1.jpg')} />
               <Text>Alina Hall</Text> 
            </View>    
        </View>
      </View>
    );
  }  
export default Profile;
